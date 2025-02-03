<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\JenisInstitusi;
use App\Models\GrupInstitusi;
use App\Models\DaftarInstitusi;

class InstitusiSeeder extends Seeder {
    public function run() {
        // Insert Jenis Institusi
        JenisInstitusi::create(['kode_jenis_ins' => 'J001', 'nama_jenis_ins' => 'Sekolah Dasar']);
        JenisInstitusi::create(['kode_jenis_ins' => 'J002', 'nama_jenis_ins' => 'Sekolah Menengah']);
        JenisInstitusi::create(['kode_jenis_ins' => 'J003', 'nama_jenis_ins' => 'Perguruan Tinggi']);

        // Insert Group Institusi
        GrupInstitusi::create(['kode_grup_ins' => 'G001', 'nama_grup_ins' => 'Negeri']);
        GrupInstitusi::create(['kode_grup_ins' => 'G002', 'nama_grup_ins' => 'Swasta']);
        GrupInstitusi::create(['kode_grup_ins' => 'G003', 'nama_grup_ins' => 'Internasional']);

        // Insert Nama Institusi
        DaftarInstitusi::create(['kode_ins' => 'I001', 'nama_ins' => 'SD Negeri 1']);
        DaftarInstitusi::create(['kode_ins' => 'I002', 'nama_ins' => 'SMP Negeri 2']);
        DaftarInstitusi::create(['kode_ins' => 'I003', 'nama_ins' => 'Universitas XYZ']);
    }
}
