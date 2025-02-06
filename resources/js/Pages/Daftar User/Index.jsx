import { useState } from "react";
import { router } from "@inertiajs/react";
import AddUserModal from "@/Components/AddUserModal";

const DaftarUser = ({ users }) => {
    const [showUserModal, setShowUserModal] = useState(false);
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
    });
    const [processing, setProcessing] = useState(false);

    // Handle Add New User button click
    const handleAddUser = () => {
        setShowUserModal(true);
    };

    // Handle form submission for adding a user
    const handleStore = async (data) => {
        setProcessing(true);
        try {
            await router.post(route("user.store"), data); // Adjust the route name as needed
            setProcessing(false);
            setShowUserModal(false);
        } catch (error) {
            setProcessing(false);
            console.error("Failed to add user:", error);
            alert("Failed to add user!");
        }
    };

    // Handle edit button click to prefill the modal with user data
    const handleEditUser = (user) => {
        setUserData(user);
        setShowUserModal(true);
    };

    // Handle user update (PUT request)
    const handleUpdateUser = async (id, data) => {
        setProcessing(true);
        try {
            await router.put(route("user.update", { id }), data); // Adjust the route name as needed
            setProcessing(false);
            setShowUserModal(false);
        } catch (error) {
            setProcessing(false);
            console.error("Failed to update user:", error);
            alert("Failed to update user!");
        }
    };

    // Handle user deletion
    const handleDeleteUser = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            router.delete(route("user.destroy", { id }), {
                onSuccess: () => alert("User deleted successfully!"),
                onError: (error) => {
                    console.error("Delete error:", error);
                    alert("Delete failed!");
                },
            });
        }
    };

    return (
        <>
            <div className="w-full px-4 mt-8">
                <button
                    onClick={handleAddUser}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                    Add New User
                </button>

                <div className="mt-8">
                    <Table
                        title="Users"
                        data={users}
                        onAddClick={handleAddUser}
                        onEditClick={handleEditUser}
                    />
                </div>
            </div>

            <AddUserModal
                showModal={showUserModal}
                onClose={() => setShowUserModal(false)}
                handleSubmit={userData.id ? handleUpdateUser : handleStore}
                processing={processing}
                data={userData}
                setData={setUserData}
            />
        </>
    );
};
