import { useMemo } from "react";
import Select from "react-select";

const fieldsConfig = {
    "Jenis Institusi": [
        { key: "id", label: "Kode Jenis" },
        { key: "ins_type_name", label: "Nama Jenis Institusi" },
    ],
    "Group Institusi": [
        { key: "id", label: "Kode Grup" },
        { key: "ins_group_name", label: "Nama Grup Institusi" },
    ],
    "Daftar Institusi": [
        { key: "id", label: "Kode Institusi" },
        { key: "ins_name", label: "Nama Institusi" },
        {
            key: "ins_type_id",
            label: "Jenis Institusi",
            type: "dropdown",
            source: "institutions",
        },
    ],
    Laboratorium: [
        { key: "id", label: "Kode Lab" },
        { key: "lab_name", label: "Nama Laboratorium" },
        {
            key: "institusi_id",
            label: "Institusi",
            type: "dropdown",
            source: "institutions",
        },
    ],
    Assignments: [
        { key: "user_id", label: "User", type: "dropdown", source: "users" },
        {
            key: "position_id",
            label: "Position",
            type: "dropdown",
            source: "positions",
        },
        {
            key: "institution_id",
            label: "Institution",
            type: "dropdown",
            source: "institutions",
        },
    ],
    "Daftar User": [
        { key: "name", label: "Name" },
        { key: "email", label: "Email", type: "email" },
        { key: "password", label: "Password", type: "password" },
        {
            key: "password_confirmation",
            label: "Confirm Password",
            type: "password",
        }, // 🔹 Add this line
    ],
};

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        padding: "6px",
        borderRadius: "6px",
        borderColor: state.isFocused ? "#888" : "#ccc",
        boxShadow: state.isFocused ? "none" : "none", // Remove the blue focus box
        "&:hover": { borderColor: "#888" },
    }),
    option: (provided, { isFocused }) => ({
        ...provided,
        backgroundColor: isFocused ? "#edf2f7" : "white",
        color: "#333",
    }),
    input: (provided) => ({
        ...provided,
        boxShadow: "none", // Removes the blue outline inside the input
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: "#666", // Customize arrow color
        "&:hover": { color: "#444" },
    }),
    clearIndicator: (provided) => ({
        ...provided,
        color: "#999",
        "&:hover": { color: "#666" },
    }),
};

const AddDataModal = ({
    showModal,
    onClose,
    title,
    data,
    setData,
    handleSubmit,
    processing,
    isEditMode,
    users = [],
    positions = [],
    institutions = [],
}) => {
    if (!showModal) return null;

    const fields = useMemo(() => fieldsConfig[title] || [], [title]);

    // Map available options based on the source
    const getDropdownOptions = (source) => {
        const sourceMap = {
            users: { data: users, labelKey: "name" },
            positions: { data: positions, labelKey: "position_name" },
            institutions: { data: institutions, labelKey: "ins_name" },
        };

        const { data, labelKey } = sourceMap[source] || {};

        return (
            data?.map((item) => ({
                value: item.id,
                label: item[labelKey], // Dynamically get label based on the correct key
            })) || []
        );
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                {/* Modal Title */}
                <h2 className="text-xl font-bold mb-4">{title}</h2>

                {/* Form Section */}
                <form onSubmit={handleSubmit}>
                    {fields.map(({ key, label, type, source }) => (
                        <div key={key} className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {label}
                            </label>

                            {type === "dropdown" ? (
                                <Select
                                    options={getDropdownOptions(source)}
                                    value={
                                        getDropdownOptions(source).find(
                                            (option) =>
                                                option.value === data[key]
                                        ) || null
                                    }
                                    onChange={(selectedOption) =>
                                        setData((prev) => ({
                                            ...prev,
                                            [key]: selectedOption.value,
                                        }))
                                    }
                                    styles={customStyles}
                                    placeholder={`Select ${label}`}
                                    isSearchable
                                />
                            ) : (
                                <input
                                    type={
                                        key.includes("password")
                                            ? "password"
                                            : "text"
                                    } // ✅ Set type to password
                                    value={data[key] || ""}
                                    onChange={(e) =>
                                        setData((prev) => ({
                                            ...prev,
                                            [key]: e.target.value,
                                        }))
                                    }
                                    className={`w-full p-2 border rounded focus:ring focus:ring-blue-300 
                        ${
                            key === "id" ? "bg-gray-300 cursor-not-allowed" : ""
                        }`}
                                    disabled={key === "id"}
                                />
                            )}
                        </div>
                    ))}

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {processing ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddDataModal;
