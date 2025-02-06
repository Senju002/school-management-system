import { Head, router, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Table from "@/Components/Table";
import Header from "@/Components/Header";
import AddDataModal from "@/Components/AddDataModal";
import { useState } from "react";

export default function Institusi({
    jenisInstitusi,
    groupInstitusi,
    daftarInstitusi,
    auth,
    errors,
}) {
    // State for managing modal visibility and title
    const [modalTitle, setModalTitle] = useState("");
    const [showModal, setShowModal] = useState(false);

    // Define initial form templates for different types of institutions
    const formTemplates = {
        "Jenis Institusi": { ins_type_id: "", ins_type_name: "" },
        "Group Institusi": { ins_group_id: "", ins_group_name: "" },
        "Daftar Institusi": { ins_id: "", ins_name: "" },
    };

    // useForm hook for handling form state and submission
    const { data, setData, post, processing, reset } = useForm({});

    // Handle the "Add" button click, opening the modal with an empty form
    const handleAddClick = (type) => {
        setModalTitle(type);
        setShowModal(true);
        setData(formTemplates[type] || {}); // Reset form for new entry
    };

    // Handle the "Edit" button click, opening the modal with existing data
    const handleEditClick = (type, rowData) => {
        setModalTitle(type);
        setShowModal(true);
        setData({ ...rowData }); // Prefill form with selected data
    };

    // Handle form submission for adding or updating data
    const handleSubmit = (e) => {
        e.preventDefault();
    
        let routeName = "";
    
        // Dynamically set the route based on the modal title
        switch (modalTitle) {
            case "Jenis Institusi":
                routeName = data.id ? route("institusi.updateJenis", { id: data.id }) : route("institusi.storeJenis");
                break;
            case "Group Institusi":
                routeName = data.id ? route("institusi.updateGroup", { id: data.id }) : route("institusi.storeGroup");
                break;
            case "Daftar Institusi":
                routeName = data.id ? route("institusi.updateDaftar", { id: data.id }) : route("institusi.storeDaftar");
                break;
            default:
                return; // Return early if title doesn't match
        }
    
        // Check if it's an update or insert
        const method = data.id ? 'put' : 'post';
    
        // Send the request (either update or insert)
        router[method](routeName, data, {
            onSuccess: () => {
                reset();
                setShowModal(false);
            },
            onError: (error) => alert(`${method === 'put' ? 'Update' : 'Insert'} failed!`),
        });
    };
    

    // On the "Institusi" page component
const handleDelete = (id, title) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
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
            onSuccess: () => alert("Record deleted successfully!"),
            onError: (error) => {
                console.error("Delete error:", error);
                alert("Delete failed!");
            },
        });
    }
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
                        onEditClick={(rowData) =>
                            handleEditClick(table.title, rowData)
                        }
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
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
}
