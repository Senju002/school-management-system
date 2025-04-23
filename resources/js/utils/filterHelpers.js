
export const createFilterOptions = (items, idKey, labelKey, allLabel = null) => [
    { value: "", label: allLabel ? `All ${allLabel}` : "All" },  // Fixed this line
    ...items.map((item) => ({
        value: item[idKey],
        label: item[labelKey],
    })),
];