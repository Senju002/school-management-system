import { Head, router, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Table from "@/Components/Table";
import Header from "@/Components/Header";
import AddUserModal from "@/Components/Modal/AddUserModal";
import { useState, useMemo } from "react";
import Swal from "sweetalert2";

export default function SubjectList({
    subjectLists,
    subjects,
    institutions,
    auth,
    errors,
}) {
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const { data, setData, post, put, processing, reset } = useForm({
        subject_name: "",
        ins_id: "",
    });

    // Function to get an ID based on a name
    const getIdByName = (list, key, value) => {
        return list.find((item) => item[key] === value)?.id || "";
    };

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
            subject_name: rowData.subject_name,
            ins_id: getIdByName(institutions, "ins_name", rowData.ins_name),
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const method = isEditMode ? "put" : "post";
        const routeName = isEditMode
            ? route("subject_lists.update", { id: data.id })
            : route("subject_lists.store");

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
                    text: `Subject ${
                        isEditMode ? "updated" : "added"
                    } successfully!`,
                });
            },
            onError: (error) => {
                console.error("Error:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: error.subject_name || "Something went wrong!",
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
                router.delete(route("subject_lists.destroy", { id }), {
                    onSuccess: () => {
                        Swal.fire(
                            "Deleted!",
                            "Subject has been deleted.",
                            "success"
                        );
                    },
                    onError: () => {
                        Swal.fire(
                            "Error!",
                            "Failed to delete subject.",
                            "error"
                        );
                    },
                });
            }
        });
    };


    // Memoized transformation of subject data
    const tableData = useMemo(() => {
        return subjects.map((item) => ({
            id: item.id,
            subject_name: item.subject_name,
            ins_name: item.institution?.ins_name || "Unknown",
        }));
    }, [subjects]);
    console.log('ayam', subjects)

    return (
        <AuthenticatedLayout auth={auth} errors={errors}>
            <Head title="Subject List" />
            <Header title="Subject List" />
            <div className="w-full px-4 mt-8">
                <Table
                    title="Subject List"
                    data={tableData}
                    onAddClick={handleAddClick}
                    handleDelete={handleDelete}
                    onEditClick={handleEditClick}
                />
                {showModal && (
                    <AddUserModal
                        showModal={showModal}
                        onClose={() => setShowModal(false)}
                        title="Subject List"
                        data={data}
                        setData={setData}
                        handleSubmit={handleSubmit}
                        processing={processing}
                        isEditMode={isEditMode}
                        institution_names={institutions}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
}
