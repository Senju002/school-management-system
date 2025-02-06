import { useState } from "react";

const AddUserModal = ({ showModal, onClose, handleSubmit, processing, data, setData }) => {
    const [localData, setLocalData] = useState(data);

    // Handle changes in the input fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLocalData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submit
    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSubmit(localData); // pass localData to handleSubmit
    };

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Add New User</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={localData.name || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={localData.email || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={localData.password || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <select
                            name="role"
                            value={localData.role || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
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
