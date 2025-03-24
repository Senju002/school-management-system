<?php

namespace Database\Seeders;

use App\Models\Laboratory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LaboratorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 1; $i <= 3; $i++) {
            $id = 'L' . str_pad($i, 3, '0', STR_PAD_LEFT);
            $ins_id = 'I' . str_pad($i, 3, '0',  STR_PAD_LEFT);
            Laboratory::create([
                'id' => $id,
                'ins_id' => $ins_id,
                'lab_name' => 'Lab ' . $i,
            ]);
        }
    }
}
