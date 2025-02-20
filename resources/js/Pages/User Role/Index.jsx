import { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import AddUserModal from "@/Components/AddUserModal";

const AssignRole = () => {
    const { assignedRoles, users, roles, institusi } = usePage().props;
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="p-6">
            <Head title="Assign Roles" />

            {/* Page Title & Add Button */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Assign Roles</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    + Add Role
                </button>
            </div>

            {/* Table of Assigned Roles */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">User</th>
                            <th className="border p-2">Role</th>
                            <th className="border p-2">Institusi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignedRoles.length > 0 ? (
                            assignedRoles.map((role) => (
                                <tr key={role.id} className="text-center">
                                    <td className="border p-2">{role.user.name}</td>
                                    <td className="border p-2">{role.role.role_name}</td>
                                    <td className="border p-2">{role.institusi.ins_name}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="border p-2 text-center text-gray-500">
                                    No assigned roles yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add Role Modal */}
            {showModal && (
                <AddUserModal
                    showModal={showModal}
                    onClose={() => setShowModal(false)}
                    title="Assign Role"
                    users={users}
                    roles={roles}
                    institusi={institusi}
                />
            )}
        </div>
    );
};

export default AssignRole;
