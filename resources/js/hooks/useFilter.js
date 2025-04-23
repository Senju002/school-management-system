// src/hooks/useFilter.js
import { useState, useEffect } from 'react';

export default function useFilter(initialData, filterKeys) {
    const [filters, setFilters] = useState(
        filterKeys.reduce((acc, key) => ({ ...acc, [key]: "" }), {})
    );

    const [filteredData, setFilteredData] = useState(initialData);

    useEffect(() => {
        let result = initialData;
        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                result = result.filter(item => 
                    item[key] === value || item[`${key}_id`] === value
                );
            }
        });
        setFilteredData(result);
    }, [filters, initialData]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return { 
        filteredData,
        filters,  // Make sure this is returned
        handleFilterChange
    };
}