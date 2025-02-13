import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Header from "@/Components/Header";
import { useState } from "react";
import Table from "@/Components/Table"; // Import the reusable table

export default function Index({ auth, errors, positions, positionGrades }) {
    // console.warn(positions);
    // console.warn(positionGrades);
    return (
        <AuthenticatedLayout auth={auth} errors={errors}>
            <Head title="Position" />
            <Header title="Position" />

            <div className="w-full px-4 mt-8">
                {/* Render tables dynamically for different institution types */}
                {[
                    { title: "Jabatan Karyawan", data: positions },
                    { title: "Level Karyawan", data: positionGrades },
                ].map((table) => (
                    <Table
                        key={table.title}
                        title={table.title}
                        data={table.data}
                        onAddClick={() => handleAddClick(table.title)}
                        onEditClick={(rowData) =>
                            handleEditClick(table.title, rowData)
                        }
                        // handleDelete={handleDelete}
                    />
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
