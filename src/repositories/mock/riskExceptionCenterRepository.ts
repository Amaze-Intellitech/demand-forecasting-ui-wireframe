import {
  RiskException,
  ExceptionSeverity,
  ExceptionCategory,
  ExceptionStatus,
  ExceptionSeverityCounts,
  ExceptionFilterOptions,
} from '../../types/domain/riskExceptionCenter';
import { RISK_EXCEPTIONS_MOCK } from '../../data/riskExceptionCenterMock';

export interface RiskExceptionFilterParams {
  severity?: ExceptionSeverity | 'all';
  category?: ExceptionCategory | 'all';
  status?: ExceptionStatus | 'all';
}

export class RiskExceptionCenterRepository {
  public getExceptions(filters?: RiskExceptionFilterParams): RiskException[] {
    return RISK_EXCEPTIONS_MOCK.filter((exception) => {
      if (filters?.severity && filters.severity !== 'all' && exception.severity !== filters.severity) {
        return false;
      }
      if (filters?.category && filters.category !== 'all' && exception.category !== filters.category) {
        return false;
      }
      if (filters?.status && filters.status !== 'all' && exception.status !== filters.status) {
        return false;
      }
      return true;
    });
  }

  public getExceptionById(id: string): RiskException | undefined {
    return RISK_EXCEPTIONS_MOCK.find((exception) => exception.id === id);
  }

  public getSeverityCounts(): ExceptionSeverityCounts {
    return RISK_EXCEPTIONS_MOCK.reduce(
      (acc, exception) => {
        if (exception.status === 'Resolved') return acc;
        acc[exception.severity] += 1;
        return acc;
      },
      { critical: 0, high: 0, medium: 0, low: 0 } as ExceptionSeverityCounts
    );
  }

  public getFilterOptions(): ExceptionFilterOptions {
    return {
      severities: ['critical', 'high', 'medium', 'low'],
      categories: ['Supply Risk', 'Demand Surge', 'Inventory', 'Market Signal', 'Sourcing'],
      statuses: ['Open', 'In Review', 'Monitoring', 'Resolved'],
    };
  }
}

export const mockRiskExceptionCenterRepository = new RiskExceptionCenterRepository();
