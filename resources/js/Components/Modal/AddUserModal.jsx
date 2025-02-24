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
        { key: "role", label: "Role", type: "dropdown", source: "roles" },
        { key: "password", label: "Password", type: "password" },
        {
            key: "password_confirmation",
            label: "Confirm Password",
            type: "password",
        },
    ],
    Laboratorium: [
        { key: "id", label: "ID" },
        {
            key: "institution_id",
            label: "Institution",
            type: "dropdown",
            source: "institutions",
        },
        { key: "lab_name", label: "Name" },
    ],
};

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

    const dropdownOptions = useMemo(
        () => ({
            roles: roleOptions,
            users: users.map(({ id, name }) => ({ value: id, label: name })),
            positions: positions.map(({ id, position_name }) => ({
                value: id,
                label: position_name,
            })),
            institutions: institutions.map(({ id, ins_name }) => ({
                value: id,
                label: ins_name,
            })),
        }),
        [users, positions, institutions]
    );

    // const renderFormField = ({ key, label, type, source }) => {
    //     if (type === "dropdown") {
    //         const options = dropdownOptions[source] || [];
    //         return (
    //             <Select
    //                 options={options}
    //                 value={
    //                     options.find((option) => option.value === data[key]) ||
    //                     null
    //                 }
    //                 onChange={(selected) =>
    //                     setData((prev) => ({ ...prev, [key]: selected.value }))
    //                 }
    //                 styles={customStyles}
    //                 placeholder={`Select ${label}`}
    //                 isSearchable
    //             />
    //         );
    //     }
    //     return (
    //         <input
    //             type="text"
    //             name="id"
    //             value={data.id}
    //             onChange={(e) => setData("id", e.target.value)}
    //             disabled // This makes the field non-editable
    //             className="border rounded px-3 py-2 w-full bg-gray-200 cursor-not-allowed"
    //         />
    //     );
    // };
    const renderFormField = ({ key, label, type, source }) => {
        if (type === "dropdown") {
            const options = dropdownOptions[source] || [];
            return (
                <Select
                    options={options}
                    value={
                        options.find((option) => option.value === data[key]) ||
                        null
                    }
                    onChange={(selected) =>
                        setData((prev) => ({ ...prev, [key]: selected.value }))
                    }
                    styles={customStyles}
                    placeholder={`Select ${label}`}
                    isSearchable
                />
            );
        }
        return (
            <input
                type="text"
                name={key} // Dynamically set name
                value={data[key] || ""}
                onChange={(e) =>
                    setData((prev) => ({ ...prev, [key]: e.target.value }))
                }
                disabled={label === "ID"} // Disable only if the key is "id"
                className={`border rounded px-3 py-2 w-full ${
                    label === "ID" ? "bg-gray-200 cursor-not-allowed" : ""
                }`}
            />
        );
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <form onSubmit={handleSubmit}>
                    {fields.map((field) => (
                        <div key={field.key} className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {field.label}
                            </label>
                            {renderFormField(field)}
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
