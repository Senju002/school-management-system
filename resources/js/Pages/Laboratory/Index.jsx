import { Head, router, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Table from "@/Components/Table";
import Header from "@/Components/Header";
import AddUserModal from "@/Components/Modal/AddUserModal";
import { useState, useMemo } from "react";
import Swal from "sweetalert2";

export default function Laboratorium({ laboratorium,institutions, institutions_name, auth, errors }) {
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const { data, setData, post, put, processing, reset } = useForm({
        lab_name: "",
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
        console.log(rowData)
        setShowModal(true);
        setIsEditMode(true);
        setData({
            id: rowData.id,
            lab_name: rowData.lab_name,
            ins_id: getIdByName(institutions, "ins_name", rowData.ins_name),
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
    
        const method = isEditMode ? "put" : "post";
        const routeName = isEditMode
            ? route("laboratorium.update", { id: data.id })
            : route("laboratorium.store");
    
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
                    text: `Laboratorium ${isEditMode ? "updated" : "added"} successfully!`,
                });
            },
            onError: (error) => {
                console.error("Error:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: error.lab_name || "Something went wrong!",
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
                router.delete(route("laboratorium.destroy", { id }), {
                    onSuccess: () => {
                        Swal.fire("Deleted!", "Laboratorium has been deleted.", "success");
                    },
                    onError: () => {
                        Swal.fire("Error!", "Failed to delete laboratorium.", "error");
                    },
                });
            }
        });
    };
    // Memoized transformation of laboratorium data
    const tableData = useMemo(() => {
        return institutions_name.map((item) => ({
            id: item.id,
            lab_name: item.lab_name,
            ins_name: item.institution?.ins_name || "Unknown",
        }));
    }, [institutions_name]);
    return (
        <AuthenticatedLayout auth={auth} errors={errors}>
            <Head title="Laboratorium" />
            <Header title="Laboratorium" />
            <div className="w-full px-4 mt-8">
                <Table
                    title="Laboratorium List"
                    data={tableData}
                    onAddClick={handleAddClick}
                    handleDelete={handleDelete}
                    onEditClick={handleEditClick}
                />
                {showModal && (
                    <AddUserModal
                        showModal={showModal}
                        onClose={() => setShowModal(false)}
                        title="Laboratorium"
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
