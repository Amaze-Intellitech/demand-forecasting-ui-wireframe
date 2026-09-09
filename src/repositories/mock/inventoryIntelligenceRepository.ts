import {
  mockInventoryFilters,
  mockInventoryKpis,
  mockInventoryPositionSeries,
  mockInventoryByCategory,
  mockInventoryByPlant,
  mockInventoryHealthBySku,
  mockInventoryCoverage,
  mockInventoryRisks,
  mockInventoryOpportunities,
  mockServiceLevelForecast,
  mockSafetyStockScenarios,
  mockMultiEchelonNetwork,
  mockAbcXyzSegments,
  mockAIRecommendation,
} from '../../data/inventoryIntelligenceMock';
import {
  InventoryFilterOptions,
  InventoryKpi,
  InventoryPositionSeriesPoint,
  InventoryCategoryShare,
  InventoryPlantShare,
  InventorySkuItem,
  InventoryCoveragePoint,
  InventoryRisk,
  InventoryOpportunity,
  ServiceLevelForecastPoint,
  SafetyStockScenario,
  InventoryNode,
  AbcXyzSegment,
  AIInventoryRecommendation,
  ApprovalStatus,
} from '../../types/domain/inventoryIntelligence';

export class InventoryIntelligenceRepository {
  private opportunities: InventoryOpportunity[] = [...mockInventoryOpportunities];

  getFilterOptions(): InventoryFilterOptions {
    return mockInventoryFilters;
  }

  getInventoryKpis(filters?: { plant?: string; product?: string; region?: string }): InventoryKpi[] {
    if (!filters || (filters.plant === 'All Plants' && filters.product === 'All Products' && filters.region === 'All Regions')) {
      return mockInventoryKpis;
    }

    // Dynamic contextual tweaks if plant or product filtered
    return mockInventoryKpis.map((kpi) => {
      if (filters.plant && filters.plant !== 'All Plants') {
        if (kpi.id === 'kpi-total-inventory') {
          return { ...kpi, value: '242K units', subtext: 'Selected plant holding' };
        }
        if (kpi.id === 'kpi-inventory-value') {
          return { ...kpi, value: '$348M', subtext: 'Plant capitalized value' };
        }
        if (kpi.id === 'kpi-at-risk-skus') {
          return { ...kpi, value: '8', subtext: 'Plant active alerts' };
        }
      }
      return kpi;
    });
  }

  getInventoryPosition(period?: string): InventoryPositionSeriesPoint[] {
    if (period === 'Quarterly') {
      return [
        { month: 'Q1 2025', monthShort: 'Q1', onHand: 753, target: 432, upperLimit: 766, lowerLimit: 288, isForecast: false, status: 'Above Target' },
        { month: 'Q2 2025', monthShort: 'Q2', onHand: 613, target: 440, upperLimit: 708, lowerLimit: 275, isForecast: false, status: 'Above Target' },
        { month: 'Q3 2025', monthShort: 'Q3', onHand: 391, target: 440, upperLimit: 703, lowerLimit: 276, isForecast: true, status: 'Below Target' },
        { month: 'Q4 2025', monthShort: 'Q4', onHand: 456, target: 447, upperLimit: 760, lowerLimit: 295, isForecast: true, status: 'On Target' },
      ];
    }
    return mockInventoryPositionSeries;
  }

  getInventoryByCategory(): InventoryCategoryShare[] {
    return mockInventoryByCategory;
  }

  getInventoryByPlant(metric: 'Units' | 'Value' | 'Days of Supply' = 'Units'): InventoryPlantShare[] {
    if (metric === 'Days of Supply') {
      return mockInventoryByPlant.map((p) => ({
        ...p,
        units: p.daysOfSupply,
        percentage: Math.round((p.daysOfSupply / 68) * 100),
      }));
    }
    if (metric === 'Value') {
      const valueMap: Record<string, number> = {
        'Columbus #04': 348,
        'Düsseldorf #01': 285,
        'Jurong Island': 251,
        'Houston #03': 204,
        'Antwerp #02': 152,
      };
      return mockInventoryByPlant.map((p) => ({
        ...p,
        units: valueMap[p.plant] || 200,
        percentage: Math.round(((valueMap[p.plant] || 200) / 348) * 100),
      }));
    }
    return mockInventoryByPlant;
  }

  getInventoryHealth(tab: string = 'All SKUs'): InventorySkuItem[] {
    if (tab === 'At Risk') {
      return mockInventoryHealthBySku.filter((s) => s.status === 'At Risk');
    }
    if (tab === 'Overstocked') {
      return mockInventoryHealthBySku.filter((s) => s.status === 'Overstocked');
    }
    if (tab === 'Understocked') {
      return mockInventoryHealthBySku.filter((s) => s.status === 'Understocked');
    }
    return mockInventoryHealthBySku;
  }

  getInventoryCoverage(horizon: string = 'Next 6 Months'): InventoryCoveragePoint[] {
    if (horizon === 'Next 3 Months') {
      return mockInventoryCoverage.slice(0, 3);
    }
    if (horizon === 'Next 12 Months') {
      return [
        ...mockInventoryCoverage,
        { month: 'Jul', baseCase: 92, highDemandScenario: 95, variance: 3 },
        { month: 'Aug', baseCase: 91, highDemandScenario: 94, variance: 3 },
        { month: 'Sep', baseCase: 93, highDemandScenario: 96, variance: 3 },
        { month: 'Oct', baseCase: 94, highDemandScenario: 97, variance: 3 },
        { month: 'Nov', baseCase: 95, highDemandScenario: 98, variance: 3 },
        { month: 'Dec', baseCase: 96, highDemandScenario: 99, variance: 3 },
      ];
    }
    return mockInventoryCoverage;
  }

  getInventoryRisks(): InventoryRisk[] {
    return mockInventoryRisks;
  }

  getInventoryOpportunities(): InventoryOpportunity[] {
    return this.opportunities;
  }

  updateOpportunityApproval(
    oppId: string,
    status: ApprovalStatus,
    userName: string = 'Siddhartha M'
  ): InventoryOpportunity[] {
    this.opportunities = this.opportunities.map((opp) => {
      if (opp.id === oppId) {
        return {
          ...opp,
          approvalStatus: status,
          approvedBy: userName,
          approvedAt: 'Just now',
        };
      }
      return opp;
    });
    return this.opportunities;
  }

  getServiceLevelForecast(): ServiceLevelForecastPoint[] {
    return mockServiceLevelForecast;
  }

  getSafetyStockScenarios(): SafetyStockScenario[] {
    return mockSafetyStockScenarios;
  }

  getSafetyStockScenarioByBuffer(bufferPct: number): SafetyStockScenario {
    const closest = mockSafetyStockScenarios.reduce((prev, curr) => {
      return Math.abs(curr.bufferPct - bufferPct) < Math.abs(prev.bufferPct - bufferPct) ? curr : prev;
    });
    return closest;
  }

  getNetworkNodes(): InventoryNode[] {
    return mockMultiEchelonNetwork;
  }

  getAbcXyzSegments(): AbcXyzSegment[] {
    return mockAbcXyzSegments;
  }

  getAIRecommendation(context?: string): AIInventoryRecommendation {
    if (context === 'At Risk') {
      return {
        title: 'Buffer priority on 46 high-risk SKUs',
        narrative: 'Identified 46 SKUs with stockout risk >15%. Deploying targeted buffer injections at Columbus and Jurong will prevent an estimated $32M in lost orders without inflating general inventory.',
        targetService: 98.4,
        potentialCashRelease: '$14M',
        excessSkuPercentage: 8,
        variant: 'at-risk',
      };
    }
    if (context === 'Overstocked') {
      return {
        title: 'Rebalance 72 overstocked SKUs to free $42M',
        narrative: 'Excess inventory of PET and PP resin is currently concentrated in Houston and Columbus. Transferring 48K units releases working capital while lifting downstream service.',
        targetService: 97.6,
        potentialCashRelease: '$42M',
        excessSkuPercentage: 18,
        variant: 'overstocked',
      };
    }
    return mockAIRecommendation;
  }
}

export const mockInventoryRepository = new InventoryIntelligenceRepository();
