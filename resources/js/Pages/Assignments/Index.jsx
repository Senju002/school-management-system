import { Head, router, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Table from "@/Components/Table";
import Header from "@/Components/Header";
import AddDataModal from "@/Components/Modal/AddDataModal";
import { useState } from "react";
import Swal from "sweetalert2";

export default function AssignRoles({
    users,
    positions,
    institutions,
    assignments,
    auth,
    errors,
}) {
    const [modalTitle, setModalTitle] = useState("Assignments");
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const { data, setData, post, put, processing, reset } = useForm({
        user_id: "",
        position_id: "",
        institution_id: "",
    });

    const handleAddClick = () => {
        setShowModal(true);
        setIsEditMode(false);
        setData({ user_id: "", position_id: "", institution_id: "" });
    };

    const handleEditClick = (rowData) => {
        setShowModal(true);
        setIsEditMode(true);
        setData({ ...rowData });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const routeName = isEditMode
            ? route("assignments.update", { id: data.id })
            : route("assignments.store");
        const method = isEditMode ? "put" : "post";
        console.log("data", data);

        router[method](routeName, data, {
            onSuccess: () => {
                reset();
                setShowModal(false);
                Swal.fire({
                    icon: "success",
                    title: isEditMode ? "Updated!" : "Assigned!",
                    text: `Role ${
                        isEditMode ? "updated" : "assigned"
                    } successfully!`,
                });
            },
            onError: (error) => {
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: error.user_id || "Something went wrong!",
                });
            },
        });
    };

    // Handle delete with confirmation
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("assignments.destroy", { id }), {
                    onSuccess: () => {
                        Swal.fire(
                            "Deleted!",
                            "Assignment has been deleted.",
                            "success"
                        );
                    },
                    onError: () => {
                        Swal.fire(
                            "Error!",
                            "Failed to delete assignment.",
                            "error"
                        );
                    },
                });
            }
        });
    };

    return (
        <AuthenticatedLayout auth={auth} errors={errors}>
            <Head title="Assign Roles" />
            <Header title="Assign Roles" />
            <div className="w-full px-4 mt-8">
                <Table
                    title="Assigned Roles"
                    data={assignments}
                    onAddClick={handleAddClick}
                    handleDelete={handleDelete}
                    onEditClick={handleEditClick}
                />
                {showModal && (
                    <AddDataModal
                        showModal={showModal}
                        onClose={() => setShowModal(false)}
                        title="Assignments"
                        data={data}
                        setData={setData}
                        handleSubmit={handleSubmit}
                        processing={processing}
                        isEditMode={isEditMode}
                        users={users} // Pass dropdown data
                        positions={positions}
                        institutions={institutions}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
}
