    import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
    import { Head } from "@inertiajs/react";
    import Header from "@/Components/Header";
    import { useState } from "react";
    import Table from "@/Components/Table"; // Import the reusable table

    export default function ManagementPage(props) {
        const [employees, setEmployees] = useState([
            { no: "1", institusi: "SD" },
            { no: "2", institusi: "SMP" },
            { no: "3", institusi: "SMA  " },
        ]);

        const [sortConfig, setSortConfig] = useState({
            key: null,
            direction: "asc",
        });

        const requestSort = (key) => {
            let direction = "asc";
            if (sortConfig.key === key && sortConfig.direction === "asc") {
                direction = "desc";
            }
            setSortConfig({ key, direction });

            const sortedData = [...employees].sort((a, b) =>
                direction === "asc"
                    ? a[key]?.localeCompare(b[key] || "")
                    : b[key]?.localeCompare(a[key] || "")
            );
            setEmployees(sortedData);
        };

        // Define the columns dynamically
        const columns = [
            { key: "no", label: "No" },
            { key: "institusi", label: "Institusi" },
        ];

        return (
            <AuthenticatedLayout auth={props.auth} errors={props.errors}>
                <Head title="Institusi" />
                <Header title="Institusi" />

                {/* Jenis Institusi */}
                <div className="w-[95%] mx-auto mt-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            Jenis Institusi
                        </h2>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            + Tambah Jenis Institusi
                        </button>
                    </div>

                    <Table
                        columns={columns}
                        data={employees}
                        onSort={requestSort}
                    />
                </div>

                {/* Group Institusi */}
                <div className="w-[95%] mx-auto mt-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            Group Institusi
                        </h2>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            + Tambah Group Institusi
                        </button>
                    </div>

                    <Table
                        columns={columns}
                        data={employees}
                        onSort={requestSort}
                    />
                </div>

                {/* Daftar Institusi */}
                <div className="w-[95%] mx-auto mt-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            Daftar Institusi
                        </h2>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            + Tambah Daftar Institusi
                        </button>
                    </div>

                    <Table
                        columns={columns}
                        data={employees}
                        onSort={requestSort}
                    />
                </div>
            </AuthenticatedLayout>
        );
    }
