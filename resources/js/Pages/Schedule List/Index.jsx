import { Head, router, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Table from "@/Components/Table";
import Header from "@/Components/Header";
import AddUserModal from "@/Components/Modal/AddUserModal";
import { useState, useMemo } from "react";
import Swal from "sweetalert2";

export default function ScheduleList({
    schedules,
    labs,
    subjects,
    users,
    classes,
    auth,
    errors,
}) {
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const { data, setData, post, put, processing, reset } = useForm({
        lab_id: "",
        subject_id: "",
        user_id: "",
        class_id: "",
    });

    // Function to find an ID based on a name
    const getIdByName = (list, key, value) => {
        return list.find((item) => item[key] === value)?.id || "";
    };

    const handleAddClick = () => {
        reset(); // Instead of manually resetting each field
        setShowModal(true);
        setIsEditMode(false);
    };

    const handleEditClick = (rowData) => {
        setShowModal(true);
        setIsEditMode(true);
        setData({
            id: rowData.id,
            lab_id: getIdByName(labs, "lab_name", rowData.lab),
            subject_id: getIdByName(subjects, "subject_name", rowData.subject),
            user_id: getIdByName(users, "name", rowData.user),
            class_id: getIdByName(classes, "class_name", rowData.class),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const method = isEditMode ? "put" : "post";
        const routeName = isEditMode
            ? route("schedule_lists.update", { id: data.id })
            : route("schedule_lists.store");
    
        // Remove ID field for new inserts
        const payload = { ...data };
        if (!isEditMode) delete payload.id;
    
        // Send request
        router[method](routeName, payload, {
            onSuccess: () => {
                reset();
                setShowModal(false);
                Swal.fire({
                    icon: "success",
                    title: isEditMode ? "Updated!" : "Assigned!",
                    text: `Schedule ${
                        isEditMode ? "updated" : "assigned"
                    } successfully!`,
                });
            },
            onError: (error) => {
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: error.lab_id || "Something went wrong!",
                });
            },
        });
    };

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
                router.delete(route("schedule_lists.destroy", { id }), {
                    onSuccess: () => {
                        Swal.fire(
                            "Deleted!",
                            "Schedule has been deleted.",
                            "success"
                        );
                    },
                    onError: () => {
                        Swal.fire(
                            "Error!",
                            "Failed to delete schedule.",
                            "error"
                        );
                    },
                });
            }
        });
    };
    
    // Memoized transformation of schedules data
    const tableData = useMemo(() => {
        return schedules.map((item) => ({
            id: item.id,
            lab: item.lab?.lab_name || "Unknown",
            subject: item.subject?.subject_name || "Unknown",
            user: item.user?.name || "Unknown",
            class: item.class?.class_name || "Unknown",
        }));
    }, [schedules]);
    return (
        <AuthenticatedLayout auth={auth} errors={errors}>
            <Head title="Schedule List" />
            <Header title="Schedule List" />
            <div className="w-full px-4 mt-8">
                <Table
                    title="Schedules"
                    data={tableData}
                    onAddClick={handleAddClick}
                    handleDelete={handleDelete}
                    onEditClick={handleEditClick}
                />
                {showModal && (
                    <AddUserModal
                        showModal={showModal}
                        onClose={() => setShowModal(false)}
                        title="Schedules"
                        data={data}
                        setData={setData}
                        handleSubmit={handleSubmit}
                        processing={processing}
                        isEditMode={isEditMode}
                        labs={labs}
                        subjects={subjects}
                        users={users}
                        classes={classes}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
}