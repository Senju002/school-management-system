import { Head, router, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Table from "@/Components/Table";
import Header from "@/Components/Header";
import AddUserModal from "@/Components/Modal/AddUserModal";
import { useState } from "react";

export default function DaftarUser({ users, auth, errors }) {
    const [modalTitle, setModalTitle] = useState("User Management");
    const [showUserModal, setShowUserModal] = useState(false);
    
    const formTemplate = { name: "", email: "", password: "", role: "" };
    const { data, setData, post, put, reset } = useForm(formTemplate);

    const openModal = (title, userData = formTemplate) => {
        setModalTitle(title);
        setData(userData);
        setShowUserModal(true);
    };

    const handleSubmit = (e) => {
        console.log("Submitting form data:", data);
        const action = data.id ? put : post;
        const routeName = data.id ? "user.update" : "user.store";
        
        action(route(routeName, { id: data.id }), {
            onSuccess: () => {
                setShowUserModal(false);
                reset();
            },
            onError: (error) => {
                console.error("User operation failed:", error);
                alert(`Failed to ${data.id ? "update" : "add"} user!`);
            },
        });
    };

    const handleDeleteUser = (id) => {
        if (confirm("Are you sure you want to delete this user?")) {
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
                    onAddClick={() => openModal("Add User")}
                    onEditClick={(user) => openModal("Edit User", user)}
                    handleDelete={handleDeleteUser}
                />
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
