import { Head, router, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Table from "@/Components/Table";
import Header from "@/Components/Header";
import AddDataModal from "@/Components/AddDataModal";
import { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert

export default function Institusi({
    jenisInstitusi,
    groupInstitusi,
    daftarInstitusi,
    auth,
    errors,
}) {
    const [modalTitle, setModalTitle] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const formTemplates = {
        "Jenis Institusi": { ins_type_name: "" },
        "Group Institusi": { ins_group_name: "" },
        "Daftar Institusi": { ins_name: "" },
    };

    const { data, setData, post, put, processing, reset } = useForm({});

    // Open modal for adding new data
    const handleAddClick = (type) => {
        setModalTitle(type);
        setShowModal(true);
        setIsEditMode(false);
        setData(formTemplates[type] || {});
    };

    // Open modal for editing existing data
    const handleEditClick = (type, rowData) => {
        setModalTitle(type);
        setShowModal(true);
        setIsEditMode(true);
        setData({ ...rowData });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        let routeName = "";
        const method = isEditMode ? "put" : "post";

        switch (modalTitle) {
            case "Jenis Institusi":
                routeName = isEditMode
                    ? route("institusi.updateJenis", { id: data.id })
                    : route("institusi.storeJenis");
                break;
            case "Group Institusi":
                routeName = isEditMode
                    ? route("institusi.updateGroup", { id: data.id })
                    : route("institusi.storeGroup");
                break;
            case "Daftar Institusi":
                routeName = isEditMode
                    ? route("institusi.updateDaftar", { id: data.id })
                    : route("institusi.storeDaftar");
                break;
            default:
                return;
        }

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
                    title: isEditMode ? "Updated!" : "Inserted!",
                    text: `Institusi ${
                        isEditMode ? "updated" : "added"
                    } successfully!`,
                });
            },
            onError: (error) => {
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: error.ins_type_name || "Something went wrong!",
                });
            },
        });
    };

    // Handle delete with confirmation
    const handleDelete = (id, title) => {
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
                let routeName = "";

                switch (title) {
                    case "Jenis Institusi":
                        routeName = route("institusi.destroyJenis", { id });
                        break;
                    case "Group Institusi":
                        routeName = route("institusi.destroyGroup", { id });
                        break;
                    case "Daftar Institusi":
                        routeName = route("institusi.destroyDaftar", { id });
                        break;
                    default:
                        return;
                }

                router.delete(routeName, {
                    onSuccess: () => {
                        Swal.fire(
                            "Deleted!",
                            "Institusi has been deleted.",
                            "success"
                        );
                    },
                    onError: () => {
                        Swal.fire(
                            "Error!",
                            "Failed to delete institusi.",
                            "error"
                        );
                    },
                });
            }
        });
    };

    return (
        <AuthenticatedLayout auth={auth} errors={errors}>
            <Head title="Institusi" />
            <Header title="Institusi" />
            <div className="w-full px-4 mt-8">
                {[
                    { title: "Jenis Institusi", data: jenisInstitusi },
                    { title: "Group Institusi", data: groupInstitusi },
                    { title: "Daftar Institusi", data: daftarInstitusi },
                ].map((table) => (
                    <Table
                        key={table.title}
                        title={table.title}
                        data={table.data}
                        onAddClick={() => handleAddClick(table.title)}
                        onEditClick={(rowData) =>
                            handleEditClick(table.title, rowData)
                        }
                        handleDelete={handleDelete}
                    />
                ))}

                {showModal && (
                    <AddDataModal
                        showModal={showModal}
                        onClose={() => setShowModal(false)}
                        title={modalTitle}
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
