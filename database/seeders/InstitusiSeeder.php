<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\InstitutionType;
use App\Models\InstitutionGroup;
use App\Models\InstitutionList;
use Faker\Factory as Faker;

class InstitusiSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        $ins_type = ['Sekolah Dasar', 'Sekolah Menengah Pertama', 'Sekolah Menengah Atas'];
        $ins_group = ['Sutomo', 'Santo Thomas', 'Methodist'];

        // Insert Jenis Institusi
        for ($i = 0; $i < count($ins_type); $i++) {
            $id = 'J' . str_pad($i + 1, 3, '0', STR_PAD_LEFT);
            InstitutionType::create([
                'id' => $id,
                'ins_type_name' => $ins_type[$i]
            ]);
        }

        // Insert Group Institusi
        for ($i = 0; $i < count($ins_group); $i++) {
            $id = 'G' . str_pad($i + 1, 3, '0', STR_PAD_LEFT);
            InstitutionGroup::create([
                'id' => $id,
                'ins_group_name' => $ins_group[$i]
            ]);
        }

        // Insert InsitutionList
        for ($i = 1; $i <= 3; $i++) {
            $id = 'I' . str_pad($i, 3, '0', STR_PAD_LEFT);
            InstitutionList::create([
                'id' => $id,
                'ins_name' => $faker->company,
            ]);
        }
    }
}
