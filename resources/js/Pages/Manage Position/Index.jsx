import { Head, router, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Table from "@/Components/Table";
import Header from "@/Components/Header";
import AddUserModal from "@/Components/Modal/AddUserModal";
import { useState, useMemo } from "react";
import Swal from "sweetalert2";

export default function AssignRoles({
    users,
    positions,
    institution_names,
    assignments,
    auth,
    errors,
}) {
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const { data, setData, post, put, processing, reset } = useForm({
        user_id: "",
        position_id: "",
        institution_id: "",
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
        console.log("rowdata", rowData);
        setShowModal(true);
        setIsEditMode(true);
        setData({
            id: rowData.id,
            user_id: getIdByName(users, "name", rowData.user),
            position_id: getIdByName(
                positions,
                "position_name",
                rowData.position
            ),
            institution_id: getIdByName(
                institution_names,
                "ins_name",
                rowData.institution
            ),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const method = isEditMode ? "put" : "post";
        const routeName = isEditMode
            ? route("assignments.update", { id: data.id })
            : route("assignments.store");
    
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
                    text: `Assignment ${
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

    // Memoized transformation of assignments data
    const tableData = useMemo(() => {
        return assignments.map((item) => ({
            id: item.id,
            user: item.user?.name || "Unknown",
            position: item.position?.position_name || "Unknown",
            institution: item.institution?.ins_name || "Unknown",
        }));
    }, [assignments]);
    return (
        <AuthenticatedLayout auth={auth} errors={errors}>
            <Head title="Assign Roles" />
            <Header title="Assign Roles" />
            <div className="w-full px-4 mt-8">
                <Table
                    title="Assigned Roles"
                    data={tableData}
                    onAddClick={handleAddClick}
                    handleDelete={handleDelete}
                    onEditClick={handleEditClick}
                />
                {showModal && (
                    <AddUserModal
                        showModal={showModal}
                        onClose={() => setShowModal(false)}
                        title="Assignments"
                        data={data}
                        setData={setData}
                        handleSubmit={handleSubmit}
                        processing={processing}
                        isEditMode={isEditMode}
                        users={users}
                        positions={positions}
                        institution_names={institution_names}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
}
