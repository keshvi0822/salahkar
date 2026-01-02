import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useURLFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const filterObj = {};
    searchParams.forEach((value, key) => {
      filterObj[key] = value;
    });
    setFilters(filterObj);
  }, [searchParams]);

  const updateFilter = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    setSearchParams(params);
  };

  return { filters, updateFilter };
};

export default useURLFilters;
