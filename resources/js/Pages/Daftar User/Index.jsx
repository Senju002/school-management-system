import { Head, router, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Table from "@/Components/Table";
import Header from "@/Components/Header";
import AddUserModal from "@/Components/Modal/AddUserModal";
import { useState } from "react";

export default function DaftarUser({ users, auth, errors }) {
    // State for managing modal visibility and title
    const [modalTitle, setModalTitle] = useState("User Management");
    const [showUserModal, setShowUserModal] = useState(false);

    // Define initial form template
    const formTemplate = {
        name: "",
        email: "",
        password: "",
        role: "",
    };

    // useForm hook for handling form state and submission
    const { data, setData, post, put, reset } =
        useForm(formTemplate);

    // Handle the "Add User" button click
    const handleAddUser = () => {
        setModalTitle("Add User");
        setShowUserModal(true);
        setData(formTemplate); // Reset form for new entry
    };

    // Handle the "Edit User" button click
    const handleEditUser = (userData) => {
        setModalTitle("Edit User");
        setShowUserModal(true);
        setData({ ...userData }); // Prefill form with selected data
    };

    // Handle form submission for adding or updating user
    const handleSubmit = async (e) => {
        // e.preventDefault(); // Prevent default form submission
        console.log("Submitting form data:", data);
        if (data.id) {
            put(route("user.update", { id: data.id }), {
                onSuccess: () => setShowUserModal(false), // Close modal on success
                onError: (error) => {
                    console.error("Update failed:", error);
                    alert("Failed to update user!");
                },
            });
        } else {
            post(route("user.store"), {
                onSuccess: () => {
                    setShowUserModal(false); // Close modal on success
                    reset(); // Reset form fields
                },
                onError: (error) => {
                    console.error("User creation failed:", error);
                    alert("Failed to add user!");
                },
            });
        }
    };

    // Handle user deletion
    const handleDeleteUser = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            router.delete(route("user.destroy", { id }), {
                onSuccess: () => alert("User deleted successfully!"),
                onError: () => alert("Delete failed!"),
            });
        }
    };

    return (
        <AuthenticatedLayout auth={auth} errors={errors}>
            <Head title="Daftar User" />
            <Header title="User Management" />
            <div className="w-full px-4 mt-8">
                <Table
                    title="Users"
                    data={users}
                    onAddClick={handleAddUser}
                    onEditClick={handleEditUser}
                    handleDelete={handleDeleteUser}
                />
                {/* Add/Edit User Modal */}
                {showUserModal && (
                    <AddUserModal
                        showModal={showUserModal}
                        onClose={() => setShowUserModal(false)}
                        title={modalTitle}
                        data={data}
                        setData={setData}
                        handleSubmit={handleSubmit}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
}
