<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\InstitutionType;
use App\Models\InstitutionGroup;
use App\Models\InstitutionList;

class InstitusiSeeder extends Seeder {
    public function run() {
        // Insert Jenis Institusi
        for ($i = 1; $i <= 10; $i++) {
            $id = 'J' . str_pad($i, 3, '0', STR_PAD_LEFT);
            InstitutionType::create([
                'id' => $id,
                'ins_type_name' => 'Sekolah Menengah Atas'
            ]);
        }

        // Insert Group Institusi
        for ($i = 1; $i <= 3; $i++) {
            $id = 'G' . str_pad($i, 3, '0', STR_PAD_LEFT);
            InstitutionGroup::create([
                'id' => $id,
                'ins_group_name' => 'Sutomo ' . $i,
            ]);
        }

        // Insert InsitutionList
        for ($i = 1; $i <= 3; $i++) {
            $id = 'I' . str_pad($i, 3, '0', STR_PAD_LEFT);
            InstitutionList::create([
                'id' => $id,
                'ins_name' => 'Insitusi ' . $i,
            ]);
        }
    }
}
