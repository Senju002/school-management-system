<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\InstitutionType;
use App\Models\InstitutionGroup;
use App\Models\InstitutionList;

class InstitusiSeeder extends Seeder {
    public function run() {
        // Insert Jenis Institusi
        InstitutionType::create(['id' => 'J001', 'ins_type_name' => 'Sekolah Dasar']);
        InstitutionType::create(['id' => 'J002', 'ins_type_name' => 'Sekolah Menengah Pertama']);
        InstitutionType::create(['id' => 'J003', 'ins_type_name' => 'Sekolah Menengah Atas']);

        // Insert Group Institusi
        InstitutionGroup::create(['id' => 'G001', 'ins_group_name' => 'Sutomo']);
        InstitutionGroup::create(['id' => 'G002', 'ins_group_name' => 'Methodist']);
        InstitutionGroup::create(['id' => 'G003', 'ins_group_name' => 'Kalam Kudus']);

        // Insert Nama Institusi
        InstitutionList::create(['id' => 'I001', 'ins_name' => 'SD Sutomo']);
        InstitutionList::create(['id' => 'I002', 'ins_name' => 'SMP Sutomo']);
        InstitutionList::create(['id' => 'I003', 'ins_name' => 'Methodist 1']);
    }
}
