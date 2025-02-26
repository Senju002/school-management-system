<?php

namespace Database\Seeders;

use App\Models\ClassList;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClassListSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ClassList::create(['id' => 'C001','ins_id' => 'I001', 'ins_type_id' => 'J001', 'class_name' => 'X MIA 1']);
        ClassList::create(['id' => 'C002','ins_id' => 'I002', 'ins_type_id' => 'J002', 'class_name' => 'X MIA 2']);
        ClassList::create(['id' => 'C003','ins_id' => 'I003', 'ins_type_id' => 'J003', 'class_name' => 'X MIA 3']);
    }
}
