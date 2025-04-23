import { Head, router, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Table from "@/Components/Table";
import Header from "@/Components/Header";
import AddUserModal from "@/Components/Modal/AddUserModal";
import Filter from "@/Components/Filter";
import { useState, useMemo, useEffect } from "react";
import Swal from "sweetalert2";
import useFilter from "@/hooks/useFilter";
import { createFilterOptions } from "@/utils/filterHelpers";

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
        day: "",
    });

    // Use the custom filter hook
    const { 
        filteredData: filteredSchedules, 
        handleFilterChange 
    } = useFilter(schedules.data, ["day", "lab", "class"]);

    // Filter configuration
    const filterConfig = useMemo(() => [
        {
            id: 'day',
            label: 'Day',
            options: [
                { value: "", label: "All Days" },
                { value: "Sunday", label: "Sunday" },
                { value: "Monday", label: "Monday" },
                { value: "Tuesday", label: "Tuesday" },
                { value: "Wednesday", label: "Wednesday" },
                { value: "Thursday", label: "Thursday" },
                { value: "Friday", label: "Friday" },
                { value: "Saturday", label: "Saturday" },
            ],
        },
        {
            id: 'lab',
            label: 'Lab',
            options: createFilterOptions(labs, "id", "lab_name", "Labs"),
        },
        {
            id: 'class',
            label: 'Class',
            options: createFilterOptions(classes, "id", "class_name", "Classes"),
        }
    ], [labs, classes]);

    // Function to find an ID based on a name
    const getIdByName = (list, key, value) => {
        return list.find((item) => item[key] === value)?.id || "";
    };

    const handleAddClick = () => {
        reset();
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
            day: rowData.day || "",
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = isEditMode ? "put" : "post";
        const routeName = isEditMode
            ? route("schedule_lists.update", { id: data.id })
            : route("schedule_lists.store");

        const payload = { ...data };
        if (!isEditMode) delete payload.id;

        router[method](routeName, payload, {
            onSuccess: () => {
                reset();
                setShowModal(false);
                Swal.fire({
                    icon: "success",
                    title: isEditMode ? "Updated!" : "Assigned!",
                    text: `Schedule ${isEditMode ? "updated" : "assigned"} successfully!`,
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
                        Swal.fire("Deleted!", "Schedule has been deleted.", "success");
                    },
                    onError: () => {
                        Swal.fire("Error!", "Failed to delete schedule.", "error");
                    },
                });
            }
        });
    };

    // Table data transformation
    const tableData = useMemo(() => {
        return filteredSchedules.map((item) => ({
            id: item.id,
            lab: item.lab?.lab_name || "Unassigned",
            subject: item.subject?.subject_name || "Unassigned",
            user: item.user?.name || "Unassigned",
            class: item.class?.class_name || "Unassigned",
            day: item.day || "Unassigned",
        }));
    }, [filteredSchedules]);

    // Pagination navigation
    const handlePageChange = (url) => {
        router.visit(url);
    };

    return (
        <AuthenticatedLayout auth={auth} errors={errors}>
            <Head title="Schedule List" />
            <Header title="Schedule List" />
            <div className="w-full px-4 mt-8">
                <Filter
                    title="Filter Schedules"
                    filters={filterConfig}
                    onFilterChange={handleFilterChange}
                />

                <Table
                    title="Schedules"
                    data={tableData}
                    onAddClick={handleAddClick}
                    handleDelete={handleDelete}
                    onEditClick={handleEditClick}
                />

                {/* Pagination Controls */}
                <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-gray-700">
                        Showing {schedules.from} to {schedules.to} of {schedules.total} entries
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handlePageChange(schedules.prev_page_url)}
                            disabled={!schedules.prev_page_url}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => handlePageChange(schedules.next_page_url)}
                            disabled={!schedules.next_page_url}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>

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