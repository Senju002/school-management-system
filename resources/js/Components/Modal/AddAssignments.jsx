import { useMemo } from "react";

const assignmentFields = [
    { key: "user_id", label: "User", type: "dropdown" },
    { key: "position_id", label: "Position", type: "dropdown" },
    { key: "institution_id", label: "Institution", type: "dropdown" }
];

const AddAssignments = ({ showModal, onClose, data, setData, handleSubmit, processing, isEditMode, users, positions, institutions }) => {
    if (!showModal) return null;

    // Memoize fields for better performance
    const fields = useMemo(() => assignmentFields, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                {/* Modal Title */}
                <h2 className="text-xl font-bold mb-4">{isEditMode ? "Edit Assignment" : "Assign User"}</h2>

                {/* Form Section */}
                <form onSubmit={handleSubmit}>
                    {fields.map(({ key, label, type }) => (
                        <div key={key} className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {label}
                            </label>
                            {type === "dropdown" ? (
                                <select
                                    value={data[key] || ""}
                                    onChange={(e) => setData(prev => ({ ...prev, [key]: e.target.value }))}
                                    className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                                >
                                    <option value="">Select {label}</option>

                                    {key === "user_id" &&
                                        users?.map(user => (
                                            <option key={user.id} value={user.id}>
                                                {user.name}
                                            </option>
                                        ))}

                                    {key === "position_id" &&
                                        positions?.map(position => (
                                            <option key={position.id} value={position.id}>
                                                {position.position_name}
                                            </option>
                                        ))}

                                    {key === "institution_id" &&
                                        institutions?.map(inst => (
                                            <option key={inst.id} value={inst.id}>
                                                {inst.ins_name}
                                            </option>
                                        ))}
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    value={data[key] || ""}
                                    onChange={(e) => setData(prev => ({ ...prev, [key]: e.target.value }))}
                                    className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
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

export default AddAssignments;
