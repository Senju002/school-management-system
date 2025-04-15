// Components/Filter.jsx
import Select from "react-select";

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        padding: "6px",
        borderRadius: "6px",
        borderColor: state.isFocused ? "#888" : "#ccc",
        boxShadow: "none",
        "&:hover": { borderColor: "#888" },
    }),
    option: (provided, { isFocused }) => ({
        ...provided,
        backgroundColor: isFocused ? "#edf2f7" : "white",
        color: "#333",
    }),
};

const Filter = ({
    title = "Filter Data",
    filters = [], // Array of filter configurations
    onFilterChange, // Callback when any filter changes
    className = "",
}) => {
    return (
        <div className={`bg-white p-6 rounded-lg shadow-md mb-6 ${className}`}>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                {title}
            </h2>
            <div className={`grid grid-cols-1 md:grid-cols-${filters.length} gap-4`}>
                {filters.map((filter) => (
                    <div key={filter.id}>
                        <label htmlFor={filter.id} className="block text-sm font-medium text-gray-700">
                            {filter.label}:
                        </label>
                        <Select
                            options={filter.options}
                            value={filter.options.find((option) => option.value === filter.selectedValue) || null}
                            onChange={(selected) => onFilterChange(filter.id, selected.value)}
                            styles={customStyles}
                            placeholder={filter.placeholder || `Select ${filter.label}`}
                            isSearchable={filter.isSearchable !== false}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Filter;