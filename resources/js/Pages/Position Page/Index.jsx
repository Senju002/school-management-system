import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Header from "@/Components/Header";
import { useState } from "react";
import Table from "@/Components/Table"; // Import the reusable table

export default function Index({ auth, errors, positions, positionGrades }) {
    console.warn(positions);
    console.warn(positionGrades);
    return (
        <AuthenticatedLayout auth={auth} errors={errors}>
            <Head title="Position" />
            <Header title="Position" />

            {/* Jenis Institusi */}
            <div className="w-[95%] mx-auto mt-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        Jabatan Karyawan
                    </h2>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700">
                        + Tambah Jabatan Karyawan
                    </button>
                </div>

                {/* <Table
                    columns={columns}
                    data={employees}
                    onSort={requestSort}
                /> */}
            </div>

            {/* Group Institusi */}
            <div className="w-[95%] mx-auto mt-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        Level Karyawan
                    </h2>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700">
                        + Tambah Level Karyawan
                    </button>
                </div>

                {/* <Table
                    columns={columns}
                    data={employees}
                    onSort={requestSort}
                /> */}
            </div>
        </AuthenticatedLayout>
    );
}
