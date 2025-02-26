import { Head, router, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Table from "@/Components/Table";
import Header from "@/Components/Header";
import AddUserModal from "@/Components/Modal/AddUserModal";
import { useState, useMemo } from "react";
import Swal from "sweetalert2";

export default function ClassLists({ class_lists_name, institution_types, institution_names, auth, errors }) {
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const { data, setData, post, put, processing, reset } = useForm({
        class_name: "",
        institution_type: "",
        institution_list: "",
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
            class_name: rowData.class_name,
            institution_type: rowData.institution_type,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        const method = isEditMode ? put : post;
        const routeName = isEditMode
            ? route("classlists.update", { id: data.id })
            : route("classlists.store");

        method(routeName, data, {
            onSuccess: () => {
                reset();
                setShowModal(false);
                Swal.fire({
                    icon: "success",
                    title: isEditMode ? "Updated!" : "Added!",
                    text: `Class ${isEditMode ? "updated" : "added"} successfully!`,
                });
            },
            onError: (error) => {
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: error.class_name || "Something went wrong!",
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
                router.delete(route("classlists.destroy", { id }), {
                    onSuccess: () => {
                        Swal.fire("Deleted!", "Class has been deleted.", "success");
                    },
                    onError: () => {
                        Swal.fire("Error!", "Failed to delete class.", "error");
                    },
                });
            }
        });
    };
    // Memoized transformation of class lists data
    const tableData = useMemo(() => {
        return class_lists_name.map((item) => ({
            id: item.id,
            class_name: item.class_name,
            institution_list: item.institution_type?.ins_type_name || "Unknown",
            institution_type: item.institution_list?.ins_name    || "Unknown",
        }));
    }, [class_lists_name]);

    return (
        <AuthenticatedLayout auth={auth} errors={errors}>
            <Head title="Class Lists" />
            <Header title="Class Lists" />
            <div className="w-full px-4 mt-8">
                <Table
                    title="Class Lists"
                    data={tableData}
                    onAddClick={handleAddClick}
                    handleDelete={handleDelete}
                    onEditClick={handleEditClick}
                />
                {showModal && (
                    <AddUserModal
                        showModal={showModal}
                        onClose={() => setShowModal(false)}
                        title="Class"
                        data={data}
                        setData={setData}
                        handleSubmit={handleSubmit}
                        processing={processing}
                        isEditMode={isEditMode}
                        institution_names={institution_names}
                        institution_types={institution_types}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
}
