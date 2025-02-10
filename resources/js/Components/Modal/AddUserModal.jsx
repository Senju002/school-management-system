import { useState, useEffect } from "react";

const AddUserModal = ({ showModal, onClose, handleSubmit, data, setData }) => {
    if (!showModal) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Add New User</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(data); }}>
                    {[
                        { label: "Name", type: "text", name: "name" },
                        { label: "Email", type: "email", name: "email" },
                        { label: "Password", type: "password", name: "password" },
                        { label: "Confirm Password", type: "password", name: "password_confirmation" }
                    ].map(({ label, type, name }) => (
                        <div key={name} className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                            <input
                                type={type}
                                name={name}
                                value={data[name] || ""}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                                required
                            />
                        </div>
                    ))}

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <select
                            name="role"
                            value={data.role || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="KOORDINATOR">Admin</option>
                            <option value="INSTRUKTUR">User</option>
                            <option value="editor">Editor</option>
                        </select>
                    </div>

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
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUserModal;
