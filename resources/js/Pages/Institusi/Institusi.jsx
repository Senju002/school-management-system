import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Table from "@/Components/Table";
import React, { useEffect, useState } from "react";
import Header from "@/Components/Header";

export default function Institusi({
    jenisInstitusi = [],
    groupInstitusi = [],
    daftarInstitusi = [],
    auth,
    errors,
}) {
    const columns = {
        jenisInstitusi: [
            { key: "kode_jenis_ins", label: "Kode Jenis" },
            { key: "nama_jenis_ins", label: "Nama Jenis Institusi" },
        ],
        groupInstitusi: [
            { key: "kode_grup_ins", label: "Kode Group" },
            { key: "nama_grup_ins", label: "Nama Group Institusi" },
        ],
        daftarInstitusi: [
            { key: "kode_ins", label: "Kode Institusi" },
            { key: "nama_ins", label: "Nama Institusi" },
        ],
    };

    return (
        <AuthenticatedLayout auth={auth} errors={errors}>
            <Head title="Institusi" />
            <Header title="Institusi" />
            <div className="w-full px-4 mt-8 ">
                {/* Jenis Institusi Table */}
                <Table
                    title="Jenis Institusi"
                    columns={columns.jenisInstitusi}
                    data={jenisInstitusi}
                />

                {/* Group Institusi Table */}
                <Table
                    title="Group Institusi"
                    columns={columns.groupInstitusi}
                    data={groupInstitusi}
                />

                {/* Daftar Institusi Table */}
                <Table
                    title="Daftar Institusi"
                    columns={columns.daftarInstitusi}
                    data={daftarInstitusi}
                />
            </div>
        </AuthenticatedLayout>
    );
}
