import {
  MOCK_VARIABLES,
  DEFAULT_SELECTED_VARIABLE_IDS,
  DEFAULT_SELECTED_INDEPENDENT_VARIABLE_IDS,
} from '../data/dataSelectionMock';
import { AnalysisConfig, AnalysisValidation, ParameterMetadata } from '../types/analysisConfig';
import { CustomFieldItem, DataSelectionSession } from '../types';

export const INGESTION_SESSION_STORAGE_KEY = 'aitek_data_selection_session';
export const INGESTION_SELECTION_EVENT = 'aitek_data_selection_updated';

class ParameterMetadataService {
  private masterCatalog: ParameterMetadata[];

  constructor() {
    this.masterCatalog = MOCK_VARIABLES.map((v) => {
      // Determine if the column is a continuous numeric variable eligible for statistical modeling
      const dt = v.dataType.toUpperCase();
      const isNumeric =
        dt.includes('DECIMAL') ||
        dt.includes('INTEGER') ||
        dt.includes('FLOAT') ||
        dt.includes('DOUBLE') ||
        dt.includes('NUMERIC');

      const isBooleanOrFlag = dt.includes('BOOLEAN') || v.id.endsWith('_flag');

      const isEligible = isNumeric && !isBooleanOrFlag;

      return {
        ...v,
        isEligible,
        isTarget: v.id === 'demand_sales',
      };
    });
  }

  /**
   * Return the active data selection session from local storage, or fallback to canonical default
   */
  public getActiveSession(): { selectedVariableIds: string[]; customFields: CustomFieldItem[] } {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = localStorage.getItem(INGESTION_SESSION_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed.selectedVariableIds) && parsed.selectedVariableIds.length > 0) {
            return {
              selectedVariableIds: parsed.selectedVariableIds,
              customFields: Array.isArray(parsed.customFields) ? parsed.customFields : [],
            };
          }
        }
      }
    } catch {
      // ignore parse or storage exception
    }

    return {
      selectedVariableIds: [...DEFAULT_SELECTED_VARIABLE_IDS],
      customFields: [],
    };
  }

  /**
   * Save active data selection session and notify all analytical pages
   */
  public saveActiveSession(session: Partial<DataSelectionSession>): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const existingRaw = localStorage.getItem(INGESTION_SESSION_STORAGE_KEY);
        const existing = existingRaw ? JSON.parse(existingRaw) : {};
        const updated = { ...existing, ...session };
        localStorage.setItem(INGESTION_SESSION_STORAGE_KEY, JSON.stringify(updated));
        window.dispatchEvent(new CustomEvent(INGESTION_SELECTION_EVENT, { detail: updated }));
      }
    } catch {
      // ignore
    }
  }

  /**
   * Return ONLY parameters selected in Data Ingestion (plus mapped custom fields).
   * Downstream analytics (Univariate, Bivariate, Multivariate) operate strictly on this set.
   */
  public getAllParameters(): ParameterMetadata[] {
    const { selectedVariableIds, customFields } = this.getActiveSession();
    const idSet = new Set(selectedVariableIds);
    // Ensure primary target is always guaranteed
    idSet.add('demand_sales');

    const activeList = this.masterCatalog.filter((p) => idSet.has(p.id));

    // Append any active custom numeric fields defined in data ingestion
    const customParams: ParameterMetadata[] = customFields.map((cf) => {
      const dt = cf.dataType.toUpperCase();
      const isNumeric =
        dt.includes('DECIMAL') ||
        dt.includes('INTEGER') ||
        dt.includes('FLOAT') ||
        dt.includes('DOUBLE') ||
        dt.includes('NUMERIC');

      return {
        id: cf.id,
        name: cf.fieldName,
        description: `Custom field from ${cf.sourceSystem} (${cf.tableOrEndpoint}.${cf.fieldOrColumn})`,
        category: 'Custom Fields',
        isDependent: false,
        isMandatory: false,
        dataType: cf.dataType,
        defaultSourceSystem: cf.sourceSystem,
        defaultTable: cf.tableOrEndpoint,
        defaultField: cf.fieldOrColumn,
        unit: 'Units',
        isEligible: isNumeric,
        isTarget: false,
      };
    });

    const combined = [...activeList, ...customParams];

    // Order: demand_sales first, stock_level second, then by name
    return combined.sort((a, b) => {
      if (a.id === 'demand_sales') return -1;
      if (b.id === 'demand_sales') return 1;
      if (a.id === 'stock_level') return -1;
      if (b.id === 'stock_level') return 1;
      return a.name.localeCompare(b.name);
    });
  }

  /**
   * Return the entire master catalog for reference if needed
   */
  public getMasterCatalog(): ParameterMetadata[] {
    return [...this.masterCatalog];
  }

  /**
   * Eligible Dependent Variables (Continuous variables that can serve as target variable Y),
   * strictly filtered to those selected in Data Ingestion.
   * Guaranteed: 'demand_sales' is first.
   */
  public getEligibleDependentVariables(): ParameterMetadata[] {
    const allActive = this.getAllParameters();
    const list = allActive.filter(
      (p) =>
        p.isEligible &&
        (p.isDependent ||
          ['demand_sales', 'stock_level', 'open_backlog_orders'].includes(p.id))
    );

    // Ensure demand_sales is always first
    return list.sort((a, b) => {
      if (a.id === 'demand_sales') return -1;
      if (b.id === 'demand_sales') return 1;
      if (a.id === 'stock_level') return -1;
      if (b.id === 'stock_level') return 1;
      return 0;
    });
  }

  /**
   * Eligible Independent Variables (Continuous explanatory variables that can serve as driver X),
   * strictly filtered to those selected in Data Ingestion (excluding the primary target).
   */
  public getEligibleIndependentVariables(): ParameterMetadata[] {
    const allActive = this.getAllParameters();

    // Priority ordering for canonical drivers
    const priorityIds = DEFAULT_SELECTED_INDEPENDENT_VARIABLE_IDS;

    const eligible = allActive.filter(
      (p) => p.isEligible && p.id !== 'demand_sales'
    );

    return eligible.sort((a, b) => {
      const idxA = priorityIds.indexOf(a.id);
      const idxB = priorityIds.indexOf(b.id);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.name.localeCompare(b.name);
    });
  }

  /**
   * Find parameter metadata by ID or semantic alias
   */
  public getParameterById(id?: string): ParameterMetadata | undefined {
    if (!id) return undefined;
    const lower = id.toLowerCase().trim();

    // 1. Search active ingested parameters first
    const active = this.getAllParameters();
    const exactActive = active.find((p) => p.id === lower);
    if (exactActive) return exactActive;

    const nameActive = active.find((p) => p.name.toLowerCase() === lower);
    if (nameActive) return nameActive;

    // Semantic alias mapping among active
    if (lower.includes('price') && !lower.includes('competitor') && !lower.includes('raw')) {
      const found = active.find((p) => p.id === 'unit_price');
      if (found) return found;
    }
    if (lower.includes('promo')) {
      const found = active.find((p) => p.id === 'promotions' || p.id === 'promotional_lift_flag');
      if (found) return found;
    }
    if (lower.includes('demand') || lower.includes('sales')) {
      const found = active.find((p) => p.id === 'demand_sales');
      if (found) return found;
    }
    if (lower.includes('gdp') || lower.includes('economic') || lower.includes('pmi')) {
      const found = active.find((p) => p.id === 'manufacturing_pmi_index');
      if (found) return found;
    }
    if (lower.includes('competitor')) {
      const found = active.find((p) => p.id === 'competitor_price_index');
      if (found) return found;
    }
    if (lower.includes('weather') || lower.includes('temp')) {
      const found = active.find((p) => p.id === 'temp_variance_weather');
      if (found) return found;
    }
    if (lower.includes('season')) {
      const found = active.find((p) => p.id === 'seasonality_index');
      if (found) return found;
    }
    if (lower.includes('inventory') || lower.includes('stock')) {
      const found = active.find((p) => p.id === 'stock_level');
      if (found) return found;
    }
    if (lower.includes('production') || lower.includes('oee') || lower.includes('uptime')) {
      const found = active.find((p) => p.id === 'plant_uptime_oee');
      if (found) return found;
    }
    if (lower.includes('lead') || lower.includes('supplier')) {
      const found = active.find((p) => p.id === 'supplier_lead_time');
      if (found) return found;
    }
    if (lower.includes('quality') || lower.includes('purity')) {
      const found = active.find((p) => p.id === 'quality_purity');
      if (found) return found;
    }

    // 2. Fallback to master catalog if needed
    const exactMaster = this.masterCatalog.find((p) => p.id === lower);
    if (exactMaster) return exactMaster;

    return this.masterCatalog.find((p) => p.name.toLowerCase() === lower);
  }

  /**
   * Validate analysis configuration according to analytical consistency rules
   */
  public validateConfig(config: AnalysisConfig): AnalysisValidation {
    const depParam = this.getParameterById(config.dependentVariable);

    if (!depParam) {
      return {
        isValid: false,
        severity: 'error',
        message: `Unknown target variable '${config.dependentVariable}'. Defaulting to Demand / Sales.`,
      };
    }

    if (!depParam.isEligible) {
      return {
        isValid: false,
        severity: 'error',
        message: `Parameter '${depParam.name}' has non-numeric data type (${depParam.dataType}) and cannot be used as an analytical dependent variable.`,
      };
    }

    if (config.mode === 'bivariate') {
      if (config.independentVariable && config.independentVariable !== 'all') {
        const indepParam = this.getParameterById(config.independentVariable);
        if (!indepParam) {
          return {
            isValid: false,
            severity: 'error',
            message: `Selected independent driver '${config.independentVariable}' is not recognized.`,
          };
        }
        if (indepParam.id === depParam.id) {
          return {
            isValid: false,
            severity: 'error',
            message: `Dependent variable and Independent driver cannot be the same parameter (${depParam.name}). Please select a distinct driver.`,
          };
        }
      }
    }

    if (config.mode === 'multivariate') {
      const vars = config.independentVariables || [];
      if (vars.length === 0) {
        return {
          isValid: false,
          severity: 'error',
          message: 'At least one explanatory driver must be selected for multivariate modeling.',
        };
      }
    }

    return { isValid: true };
  }
}

export const parameterMetadataService = new ParameterMetadataService();
