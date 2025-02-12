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
    // State for managing modal visibility, title, and edit mode
    const [modalTitle, setModalTitle] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false); // Track whether editing or adding

    // Define initial form templates for different types of institutions
    const formTemplates = {
        "Jenis Institusi": { id: "", ins_type_name: "" },
        "Group Institusi": { id: "", ins_group_name: "" },
        "Daftar Institusi": { id: "", ins_name: "" },
    };

    // useForm hook for handling form state and submission
    const { data, setData, post, processing, reset } = useForm({});

    // Handle the "Add" button click, opening the modal with an empty form
    const handleAddClick = (type) => {
        setModalTitle(type);
        setShowModal(true);
        setIsEditMode(false); // Set to insert mode
        setData(formTemplates[type] || {}); // Reset form for new entry
    };

    // Handle the "Edit" button click, opening the modal with existing data
    const handleEditClick = (type, rowData) => {
        console.log('ini lagi dipencet')
        setModalTitle(type);
        setShowModal(true);
        setIsEditMode(true); // Set to edit mode
        setData({ ...rowData }); // Prefill form with selected data
    };

    // Handle form submission for adding or updating data
    const handleSubmit = (e) => {
        e.preventDefault();
    
        let routeName = "";
    
        // Dynamically set the route based on the modal title
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
                return; // Return early if title doesn't match
        }

        // Check if it's an update or insert
        const method = isEditMode ? "put" : "post";

        // Send the request (either update or insert)
        router[method](routeName, data, {
            onSuccess: () => {
                reset();
                setShowModal(false);
                Swal.fire({
                    icon: "success",
                    title: isEditMode ? "Updated!" : "Inserted!",
                    text: `Institusi ${isEditMode ? "updated" : "added"} successfully!`,
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

    // Handle delete action with confirmation prompt
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

                // Dynamically set the route based on the modal title
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
                        return; // Return early if title doesn't match
                }

                // Perform the deletion action
                router.delete(routeName, {
                    onSuccess: () => {
                        Swal.fire("Deleted!", "Institusi has been deleted.", "success");
                    },
                    onError: () => {
                        Swal.fire("Error!", "Failed to delete institusi.", "error");
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
                {/* Render tables dynamically for different institution types */}
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
                        onEditClick={(rowData) => handleEditClick(table.title, rowData)}
                        handleDelete={handleDelete}
                    />
                ))}

                {/* Modal for adding/editing data */}
                {showModal && (
                    <AddDataModal
                        showModal={showModal}
                        onClose={() => setShowModal(false)}
                        title={modalTitle}
                        data={data}
                        setData={setData}
                        handleSubmit={handleSubmit}
                        processing={processing}
                        isEditMode={isEditMode} // ✅ Pass edit mode flag
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
}
