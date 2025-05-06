import { useState, useEffect } from "react";

export const useJobFilter = (initialData: any) => {
  const [filters, setFilters] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState(initialData);

  const applyFilters = (data: any[], activeFilters: string[]) => {
    if (activeFilters.length === 0) return data;
    return data.filter((item) => {
      return activeFilters.every((filter) => {
        return (
          item.role === filter ||
          item.level === filter ||
          item.languages.includes(filter) ||
          item.tools.includes(filter)
        );
      });
    });
  };

  useEffect(() => {
    const result = applyFilters(initialData, filters);
    setFilteredData(result);
  }, [filters]);

  const addFilter = (filter: string) => {
    if (!filters.includes(filter)) {
      setFilters([...filters, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    setFilters(filters.filter((item) => item !== filter));
  };

  const clearFilters = () => {
    setFilters([]);
  };

  return { filters, filteredData, addFilter, removeFilter, clearFilters };
};
