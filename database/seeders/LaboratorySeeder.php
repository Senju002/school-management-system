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
        Laboratory::create(['id' => 'L001','ins_id' => 'I001', 'lab_name' => 'Lab 1']);
        Laboratory::create(['id' => 'L002','ins_id' => 'I002', 'lab_name' => 'Lab 2']);
        Laboratory::create(['id' => 'L003','ins_id' => 'I003', 'lab_name' => 'Lab 3']);
    }
}
