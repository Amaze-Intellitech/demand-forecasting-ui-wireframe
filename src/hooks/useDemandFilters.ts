import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export interface DemandFilters {
  plant: string;
  product: string;
  region: string;
  setPlant: (value: string) => void;
  setProduct: (value: string) => void;
  setRegion: (value: string) => void;
  searchParams: URLSearchParams;
}

const DEFAULTS = {
  plant: 'All Plants',
  product: 'All Products',
  region: 'All Regions',
};

/**
 * Shared Plant/Product/Region filter state, persisted in the URL via useSearchParams so it
 * survives navigation between Demand Intelligence pages and can be deep-linked/shared.
 */
export function useDemandFilters(): DemandFilters {
  const [searchParams, setSearchParams] = useSearchParams();

  const plant = searchParams.get('plant') ?? DEFAULTS.plant;
  const product = searchParams.get('product') ?? DEFAULTS.product;
  const region = searchParams.get('region') ?? DEFAULTS.region;

  const setParam = useCallback(
    (key: 'plant' | 'product' | 'region', value: string) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (value === DEFAULTS[key]) {
          next.delete(key);
        } else {
          next.set(key, value);
        }
        return next;
      });
    },
    [setSearchParams]
  );

  return {
    plant,
    product,
    region,
    setPlant: (value: string) => setParam('plant', value),
    setProduct: (value: string) => setParam('product', value),
    setRegion: (value: string) => setParam('region', value),
    searchParams,
  };
}
