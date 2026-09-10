import {
  SupplyKpiItem,
  SupplyDemandPoint,
  PlantCapacityItem,
  ProductSupplyPlanRow,
  OptimizationOpportunityItem,
  SupplyConstraintAlert,
  TradeoffScenarioPoint,
  SupplyAiRecommendation,
  SupplyFilterOptions,
  WhatIfSupplyParams,
  WhatIfSupplyResult,
  SupplyPlanApprovalState,
} from '../../types/domain/supplyCapacityOptimization';

import {
  mockSupplyFilterOptions,
  mockSupplyKpiItems,
  mockMonthlySupplyDemandSeries,
  mockQuarterlySupplyDemandSeries,
  mockPlantCapacityList,
  mockProductSupplyPlanRows,
  mockOptimizationOpportunities,
  mockSupplyConstraintAlerts,
  mockTradeoffScenarioPoints,
  mockSupplyAiRecommendation,
  mockWhatIfLookup,
} from '../../data/supplyCapacityOptimizationMock';

class SupplyCapacityRepository {
  private approvalState: SupplyPlanApprovalState = {
    status: 'Draft',
    notes: 'Ready for S&OP Executive sign-off',
  };

  private opportunities: OptimizationOpportunityItem[] = [...mockOptimizationOpportunities];

  getFilterOptions(): SupplyFilterOptions {
    return mockSupplyFilterOptions;
  }

  getSupplyKpis(plantFilter?: string): SupplyKpiItem[] {
    if (!plantFilter || plantFilter === 'All Plants') {
      return mockSupplyKpiItems;
    }
    // Dynamic adjustment when a plant is filtered
    return mockSupplyKpiItems.map((kpi) => {
      if (kpi.id === 'kpi-cap-util') {
        const plant = mockPlantCapacityList.find((p) => p.name === plantFilter);
        return {
          ...kpi,
          value: plant ? `${plant.utilizationPercent}%` : kpi.value,
          subtext: `Specific to ${plantFilter}`,
        };
      }
      return kpi;
    });
  }

  getSupplyDemandSeries(granularity: 'Monthly' | 'Quarterly'): SupplyDemandPoint[] {
    return granularity === 'Monthly'
      ? mockMonthlySupplyDemandSeries
      : mockQuarterlySupplyDemandSeries;
  }

  getPlantCapacityList(): PlantCapacityItem[] {
    return mockPlantCapacityList;
  }

  getProductSupplyPlan(productFilter?: string): ProductSupplyPlanRow[] {
    if (!productFilter || productFilter === 'All Products') {
      return mockProductSupplyPlanRows;
    }
    return mockProductSupplyPlanRows.filter((p) => p.product === productFilter);
  }

  getOptimizationOpportunities(): OptimizationOpportunityItem[] {
    return this.opportunities;
  }

  getSupplyConstraintsAlerts(): SupplyConstraintAlert[] {
    return mockSupplyConstraintAlerts;
  }

  getTradeoffScenarios(): TradeoffScenarioPoint[] {
    return mockTradeoffScenarioPoints;
  }

  getAiRecommendation(): SupplyAiRecommendation {
    return mockSupplyAiRecommendation;
  }

  simulateWhatIf(params: WhatIfSupplyParams): WhatIfSupplyResult {
    const key = `${params.adjustment}:${params.plant}:${params.changePercent}`;
    if (mockWhatIfLookup[key]) {
      return mockWhatIfLookup[key];
    }
    // Dynamic calculation fallback
    const numericPct = parseInt(params.changePercent.replace('%', '').replace('+', '')) || 10;
    const supplyDelta = Math.round(numericPct * 5.2);
    const costDelta = Math.round(numericPct * 1.8);
    const fulfillmentVal = (98.2 + numericPct * 0.15).toFixed(1);

    return {
      demandFulfillment: {
        value: `+${(numericPct * 0.25).toFixed(1)}%`,
        trend: 'up',
        isPositive: true,
      },
      incrementalSupply: {
        value: `+${supplyDelta}K units`,
        trend: 'up',
        isPositive: true,
      },
      supplyCostImpact: {
        value: `+$${costDelta}M`,
        trend: 'down',
        isPositive: false,
      },
      serviceLevel: {
        value: `${Math.min(99.8, parseFloat(fulfillmentVal))}%`,
        trend: 'up',
        isPositive: true,
      },
      summaryNarrative: `Applying ${params.adjustment} on ${params.plant} by ${params.changePercent} shifts production allocations and unlocks +${supplyDelta}K units across the network.`,
    };
  }

  getApprovalState(): SupplyPlanApprovalState {
    return this.approvalState;
  }

  setApprovalState(state: SupplyPlanApprovalState): SupplyPlanApprovalState {
    this.approvalState = state;
    return this.approvalState;
  }

  updateOpportunityStatus(id: string, status: 'Identified' | 'Simulated' | 'Approved' | 'In Progress') {
    this.opportunities = this.opportunities.map((opp) =>
      opp.id === id ? { ...opp, status } : opp
    );
    return this.opportunities;
  }
}

export const mockSupplyCapacityRepository = new SupplyCapacityRepository();
