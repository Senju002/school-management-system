import { useMemo } from "react";
import Select from "react-select";

const roleOptions = [
    { value: "KOORDINATOR", label: "KOORDINATOR" },
    { value: "INSTRUKTUR", label: "INSTRUKTUR" },
    { value: "ASISTEN", label: "ASISTEN" },
];

const fieldsConfig = {
    Assignments: [
        { key: "user_id", label: "User", type: "dropdown", source: "users" },
        { key: "position_id", label: "Position", type: "dropdown", source: "positions" },
        { key: "institution_id", label: "Institution", type: "dropdown", source: "institutions" },
    ],
    "Daftar User": [
        { key: "name", label: "Name" },
        { key: "email", label: "Email", type: "email" },
        { key: "role", label: "Role", type: "dropdown", source: "roles" },
        { key: "password", label: "Password", type: "password" },
        { key: "password_confirmation", label: "Confirm Password", type: "password" },
    ],
};

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        padding: "6px",
        borderRadius: "6px",
        borderColor: state.isFocused ? "#888" : "#ccc",
        boxShadow: state.isFocused ? "none" : "none",
        "&:hover": { borderColor: "#888" },
    }),
    option: (provided, { isFocused }) => ({
        ...provided,
        backgroundColor: isFocused ? "#edf2f7" : "white",
        color: "#333",
    }),
};

const AddUserModal = ({
    showModal,
    onClose,
    title,
    data,
    setData,
    handleSubmit,
    processing,
    users = [],
    positions = [],
    institutions = [],
}) => {
    if (!showModal) return null;

    const fields = useMemo(() => fieldsConfig[title] || [], [title]);

    const getDropdownOptions = (source) => {
        if (source === "roles") return roleOptions;
        
        const sourceMap = {
            users: { data: users, labelKey: "name" },
            positions: { data: positions, labelKey: "position_name" },
            institutions: { data: institutions, labelKey: "ins_name" },
        };

        const { data, labelKey } = sourceMap[source] || {};

        return (
            data?.map((item) => ({
                value: item.id,
                label: item[labelKey],
            })) || []
        );
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
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
                                            (option) => option.value === data[key]
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
                                    type={type || "text"}
                                    value={data[key] || ""}
                                    onChange={(e) =>
                                        setData((prev) => ({
                                            ...prev,
                                            [key]: e.target.value,
                                        }))
                                    }
                                    className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                                />
                            )}
                        </div>
                    ))}
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

export default AddUserModal;
