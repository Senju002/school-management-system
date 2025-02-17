import { useMemo } from "react";

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
    ],
    "Laboratorium": [
        { key: "id", label: "Kode Lab" },
        { key: "lab_name", label: "Nama Laboratorium" },
    ]
};

const AddDataModal = ({ showModal, onClose, title, data, setData, handleSubmit, processing, isEditMode }) => {
    if (!showModal) return null;

    // Memoize field selection for better performance
    const fields = useMemo(() => fieldsConfig[title] || [], [title]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                {/* Modal Title */}
                <h2 className="text-xl font-bold mb-4">{title}</h2>

                {/* Form Section */}
                <form onSubmit={handleSubmit}>
                    {fields.map(({ key, label }) => (
                        <div key={key} className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {label}
                            </label>
                            <input
                                type="text"
                                value={data[key] || ""}
                                onChange={(e) => setData(prev => ({ ...prev, [key]: e.target.value }))}
                                className={`w-full p-2 border rounded focus:ring focus:ring-blue-300 
                                    ${key === "id" ? "bg-gray-300 cursor-not-allowed" : ""}`} 
                                disabled={key === "id"} // Disable the 'id' input field
                            />
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
