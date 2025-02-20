import { Head, router, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Table from "@/Components/Table";
import Header from "@/Components/Header";
import AddDataModal from "@/Components/Modal/AddDataModal";
import { useState } from "react";
import Swal from "sweetalert2";

export default function DaftarUser({ users, auth, errors }) {
    const [modalTitle, setModalTitle] = useState("User Management");
    const [showModal, setShowModal] = useState(false);

    const formTemplate = { name: "", email: "", password: "", password_confirmation: "", role: "" };
    const { data, setData, post, put, reset } = useForm(formTemplate);

    const openModal = (title, userData = formTemplate) => {
        console.log("Opening modal with data:", userData); // Debugging
        setModalTitle(title);
        setData({
            ...userData,
            password: "", // Reset password fields when editing
            password_confirmation: "",
        });
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting form data:", data);

        const formData = { ...data };

        // Remove password fields if empty (edit mode)
        if (data.id && !data.password) {
            delete formData.password;
            delete formData.password_confirmation;
        }

        const action = data.id ? put : post;
        const routeName = data.id ? "user.update" : "user.store";

        action(route(routeName, { id: data.id }), {
            data: formData,
            onSuccess: () => {
                setShowModal(false);
                reset();
                Swal.fire({
                    title: data.id ? "User Updated!" : "User Added!",
                    text: "The user data has been successfully saved.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            },
            onError: (error) => {
                console.error("User operation failed:", error);
                Swal.fire({
                    title: "Error!",
                    text: `Failed to ${data.id ? "update" : "add"} user!`,
                    icon: "error",
                    confirmButtonText: "OK",
                });
            },
        });
    };

    const handleDeleteUser = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("user.destroy", { id }), {
                    onSuccess: () => {
                        Swal.fire("Deleted!", "User has been deleted.", "success");
                    },
                    onError: () => {
                        Swal.fire("Error!", "Delete failed!", "error");
                    },
                });
            }
        });
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
                {showModal && (
                    <AddDataModal
                        showModal={showModal}
                        onClose={() => setShowModal(false)}
                        title="Daftar User"
                        data={data}
                        setData={setData}
                        handleSubmit={handleSubmit}
                        isEditMode={!!data.id}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
}
