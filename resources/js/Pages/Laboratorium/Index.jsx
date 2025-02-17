import { Head, router, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Table from "@/Components/Table";
import Header from "@/Components/Header";
import AddDataModal from "@/Components/AddDataModal";
import { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert

export default function Laboratorium({ laboratorium, auth, errors }) {
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    
    const formTemplate = { lab_name: "" };
    console.log(laboratorium)
    const { data, setData, post, put, processing, reset } = useForm({});

    // Open modal for adding new data
    const handleAddClick = () => {
        setShowModal(true);
        setIsEditMode(false);
        setData(formTemplate);
    };

    // Open modal for editing existing data
    const handleEditClick = (rowData) => {
        setShowModal(true);
        setIsEditMode(true);
        setData({ ...rowData });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const routeName = isEditMode
            ? route("laboratorium.update", { id: data.id })
            : route("laboratorium.store");

        // Remove ID field for new inserts
        const payload = { ...data };
        if (!isEditMode) delete payload.id;

        // Send request
        router[isEditMode ? "put" : "post"](routeName, payload, {
            onSuccess: () => {
                reset();
                setShowModal(false);
                Swal.fire({
                    icon: "success",
                    title: isEditMode ? "Updated!" : "Inserted!",
                    text: `Laboratorium ${isEditMode ? "updated" : "added"} successfully!`,
                });
            },
            onError: (error) => {
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: error.lab_name || "Something went wrong!",
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
                router.delete(route("laboratorium.destroy", { id }), {
                    onSuccess: () => {
                        Swal.fire("Deleted!", "Laboratorium has been deleted.", "success");
                    },
                    onError: () => {
                        Swal.fire("Error!", "Failed to delete laboratorium.", "error");
                    },
                });
            }
        });
    };

    return (
        <AuthenticatedLayout auth={auth} errors={errors}>
            <Head title="Laboratorium" />
            <Header title="Laboratorium" />
            <div className="w-full px-4 mt-8">
                <Table
                    title="Laboratorium"
                    data={laboratorium}
                    onAddClick={handleAddClick}
                    onEditClick={handleEditClick}
                    handleDelete={handleDelete}
                />

                {showModal && (
                    <AddDataModal
                        showModal={showModal}
                        onClose={() => setShowModal(false)}
                        title="Laboratorium"
                        data={data}
                        setData={setData}
                        handleSubmit={handleSubmit}
                        processing={processing}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
}
