import { Head, useForm } from "@inertiajs/react";
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
    const [modalTitle, setModalTitle] = useState("");
    const [showModal, setShowModal] = useState(false);

    // Define initial form state dynamically
    const formTemplates = {
        "Jenis Institusi": {ins_type_id: "", ins_type_name: "" },
        "Group Institusi": { ins_group_id: "", ins_group_name: "" },
        "Daftar Institusi": { ins_id: "", ins_name: "" },
    };

    const { data, setData, post, processing, reset } = useForm({});
    // Handle opening the modal with the correct form structure
    const handleAddClick = (type) => {
        setModalTitle(type);
        setShowModal(true);
        setData(formTemplates[type] || {});
    };

    // Define API endpoints dynamically
    const apiEndpoints = {
        "Jenis Institusi": "/institusi/jenis",
        "Group Institusi": "/institusi/group",
        "Daftar Institusi": "/institusi/daftar",
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const url = apiEndpoints[modalTitle];
        console.log("url", url);
        console.log("data", data);
        post(url, {
            data,
            onSuccess: () => {
                reset();
                setShowModal(false);
            },
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
                    />
                ))}

                {/* Add Data Modal */}
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
