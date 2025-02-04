<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\InstitutionType;
use App\Models\InstitutionGroup;
use App\Models\InstitutionList;

class InstitusiSeeder extends Seeder {
    public function run() {
        // Insert Jenis Institusi
        InstitutionType::create(['ins_type_id' => 'J001', 'ins_type_name' => 'Sekolah Dasar']);
        InstitutionType::create(['ins_type_id' => 'J002', 'ins_type_name' => 'Sekolah Menengah Pertama']);
        InstitutionType::create(['ins_type_id' => 'J003', 'ins_type_name' => 'Sekolah Menengah Atas']);

        // Insert Group Institusi
        InstitutionGroup::create(['ins_group_id' => 'G001', 'ins_group_name' => 'Sutomo']);
        InstitutionGroup::create(['ins_group_id' => 'G002', 'ins_group_name' => 'Methodist']);
        InstitutionGroup::create(['ins_group_id' => 'G003', 'ins_group_name' => 'Kalam Kudus']);

        // Insert Nama Institusi
        InstitutionList::create(['ins_id' => 'I001', 'ins_name' => 'SD Sutomo']);
        InstitutionList::create(['ins_id' => 'I002', 'ins_name' => 'SMP Sutomo']);
        InstitutionList::create(['ins_id' => 'I003', 'ins_name' => 'Methodist 1']);
    }
}
