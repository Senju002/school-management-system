import { Head, router, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Table from "@/Components/Table";
import Header from "@/Components/Header";
import AddUserModal from "@/Components/Modal/AddUserModal";
import Filter from "@/Components/Filter";
import { useState, useMemo, useEffect } from "react";
import Swal from "sweetalert2";

export default function ScheduleList({
    schedules, // Paginated schedules data passed from the controller
    labs,
    subjects,
    users,
    classes,
    auth,
    errors,
}) {
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedDay, setSelectedDay] = useState(""); // State for selected day
    const [filteredSchedules, setFilteredSchedules] = useState(schedules.data); // State for filtered schedules
    const [selectedLab, setSelectedLab] = useState(""); // State for selected lab
    const [selectedClass, setSelectedClass] = useState(""); // State for selected class

    const { data, setData, post, put, processing, reset } = useForm({
        lab_id: "",
        subject_id: "",
        user_id: "",
        class_id: "",
        day: "", // Add day field to the form
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
            day: rowData.day || "", // Add day field for editing
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

    // Filter schedules based on selected day
    useEffect(() => {
        let filtered = schedules.data;

        if (selectedDay) {
            filtered = filtered.filter(
                (schedule) => schedule.day === selectedDay
            );
        }
        if (selectedLab) {
            filtered = filtered.filter(
                (schedule) => schedule.lab_id === selectedLab
            );
        }
        if (selectedClass) {
            filtered = filtered.filter(
                (schedule) => schedule.class_id === selectedClass
            );
        }

        setFilteredSchedules(filtered);
    }, [selectedDay, selectedLab, selectedClass, schedules.data]);

    // Memoized transformation of filtered schedules data
    const tableData = useMemo(() => {
        return filteredSchedules.map((item) => ({
            id: item.id,
            lab: item.lab?.lab_name || "Unknown",
            subject: item.subject?.subject_name || "Unknown",
            user: item.user?.name || "Unknown",
            class: item.class?.class_name || "Unknown",
            day: item.day || "Unknown", // Add day to the table data
        }));
    }, [filteredSchedules]);

    // Pagination navigation
    const handlePageChange = (url) => {
        router.visit(url); // Navigate to the selected page
    };

    return (
        <AuthenticatedLayout auth={auth} errors={errors}>
            <Head title="Schedule List" />
            <Header title="Schedule List" />
            <div className="w-full px-4 mt-8">
                {/* Filter Component */}
                <Filter
                    selectedDay={selectedDay}
                    setSelectedDay={setSelectedDay}
                    selectedLab={selectedLab}
                    setSelectedLab={setSelectedLab}
                    selectedClass={selectedClass}
                    setSelectedClass={setSelectedClass}
                    labs={labs}
                    classes={classes}
                />

                {/* Table */}
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
                        Showing {schedules.from} to {schedules.to} of{" "}
                        {schedules.total} entries
                    </div>
                    <div className="flex gap-2">
                        {/* Previous Page Button */}
                        <button
                            onClick={() =>
                                handlePageChange(schedules.prev_page_url)
                            }
                            disabled={!schedules.prev_page_url}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            Previous
                        </button>

                        {/* Next Page Button */}
                        <button
                            onClick={() =>
                                handlePageChange(schedules.next_page_url)
                            }
                            disabled={!schedules.next_page_url}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>

                {/* Add/Edit Modal */}
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
