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
    selectedDay,
    setSelectedDay,
    selectedLab,
    setSelectedLab,
    selectedClass,
    setSelectedClass,
    labs,
    classes,
}) => {
    // Format labs and classes for react-select
    const labOptions = [
        { value: "", label: "All Labs" }, // Add "All Labs" option
        ...labs.map((lab) => ({
            value: lab.id,
            label: lab.lab_name,
        })),
    ];

    const classOptions = [
        { value: "", label: "All Classes" }, // Add "All Classes" option
        ...classes.map((cls) => ({
            value: cls.id,
            label: cls.class_name,
        })),
    ];

    // Day options
    const dayOptions = [
        { value: "", label: "All Days" },
        { value: "Sunday", label: "Sunday" },
        { value: "Monday", label: "Monday" },
        { value: "Tuesday", label: "Tuesday" },
        { value: "Wednesday", label: "Wednesday" },
        { value: "Thursday", label: "Thursday" },
        { value: "Friday", label: "Friday" },
        { value: "Saturday", label: "Saturday" },
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Filter Schedules
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Day Filter */}
                <div>
                    <label htmlFor="dayFilter" className="block text-sm font-medium text-gray-700">
                        Filter by Day:
                    </label>
                    <Select
                        options={dayOptions}
                        value={dayOptions.find((option) => option.value === selectedDay) || null}
                        onChange={(selected) => setSelectedDay(selected.value)}
                        styles={customStyles}
                        placeholder="Select Day"
                        isSearchable
                    />
                </div>

                {/* Lab Filter */}
                <div>
                    <label htmlFor="labFilter" className="block text-sm font-medium text-gray-700">
                        Filter by Lab:
                    </label>
                    <Select
                        options={labOptions}
                        value={labOptions.find((option) => option.value === selectedLab) || null}
                        onChange={(selected) => setSelectedLab(selected.value)}
                        styles={customStyles}
                        placeholder="Select Lab"
                        isSearchable
                    />
                </div>

                {/* Class Filter */}
                <div>
                    <label htmlFor="classFilter" className="block text-sm font-medium text-gray-700">
                        Filter by Class:
                    </label>
                    <Select
                        options={classOptions}
                        value={classOptions.find((option) => option.value === selectedClass) || null}
                        onChange={(selected) => setSelectedClass(selected.value)}
                        styles={customStyles}
                        placeholder="Select Class"
                        isSearchable
                    />
                </div>
            </div>
        </div>
    );
};

export default Filter;