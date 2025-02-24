<?php

namespace Database\Seeders;

use App\Models\Laboratorium;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LaboratoriumSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Laboratorium::create(['id' => 'L001','institution_id' => 'I001', 'lab_name' => 'Lab 1']);
        Laboratorium::create(['id' => 'L002','institution_id' => 'I002', 'lab_name' => 'Lab 2']);
        Laboratorium::create(['id' => 'L003','institution_id' => 'I003', 'lab_name' => 'Lab 3']);
    }
}
