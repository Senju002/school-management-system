<?php

namespace Database\Seeders;

use App\Models\SubjectList;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubjectListSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        SubjectList::create(['id' => 'S001','ins_id' => 'I001', 'subject_name' => 'Math']);
        SubjectList::create(['id' => 'S002','ins_id' => 'I001', 'subject_name' => 'History']);
        SubjectList::create(['id' => 'S003','ins_id' => 'I001', 'subject_name' => 'Physics']);
    }
}
