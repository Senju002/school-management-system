import { Head, router, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Table from "@/Components/Table";
import Header from "@/Components/Header";
import AddUserModal from "@/Components/Modal/AddUserModal";
import { useState, useMemo } from "react";
import Swal from "sweetalert2";

export default function AcademicYear({ academicYears, auth, errors }) {
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const { data, setData, post, put, processing, reset } = useForm({
        id: "",
        ac_years: "",
    });

    // Handle Add button click
    const handleAddClick = () => {
        reset();
        setShowModal(true);
        setIsEditMode(false);
    };

    // Handle Edit button click
    const handleEditClick = (rowData) => {
        setShowModal(true);
        setIsEditMode(true);
        setData({
            id: rowData.id,
            ac_years: rowData.ac_years,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const method = isEditMode ? "put" : "post";
        const routeName = isEditMode
            ? route("academic_years.update", { id: data.id })
            : route("academic_years.store");

        // Remove ID field for new inserts
        const payload = { ...data };
        if (!isEditMode) delete payload.id;

        // Send request
        router[method](routeName, payload, {
            onSuccess: () => {
                console.log("Success! Data saved.");
                reset();
                setShowModal(false);
                Swal.fire({
                    icon: "success",
                    title: isEditMode ? "Updated!" : "Added!",
                    text: `Academic Year ${isEditMode ? "updated" : "added"} successfully!`,
                });
            },
            onError: (error) => {
                console.error("Error:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: error.year || "Something went wrong!",
                });
            },
        });
    };

    // Handle Delete button click
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
                router.delete(route("academic_years.destroy", { id }), {
                    onSuccess: () => {
                        Swal.fire("Deleted!", "Academic Year has been deleted.", "success");
                    },
                    onError: () => {
                        Swal.fire("Error!", "Failed to delete academic year.", "error");
                    },
                });
            }
        });
    };



    return (
        <AuthenticatedLayout auth={auth} errors={errors}>
            <Head title="Academic Year" />
            <Header title="Academic Year" />
            <div className="w-full px-4 mt-8">
                <Table
                    title="Academic Year"
                    data={academicYears}
                    onAddClick={handleAddClick}
                    handleDelete={handleDelete}
                    onEditClick={handleEditClick}
                />
                {showModal && (
                    <AddUserModal
                        showModal={showModal}
                        onClose={() => setShowModal(false)}
                        title="Academic Year"
                        data={data}
                        setData={setData}
                        handleSubmit={handleSubmit}
                        processing={processing}
                        isEditMode={isEditMode}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
}