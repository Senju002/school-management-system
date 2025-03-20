<?php

namespace Database\Seeders;

use App\Models\ScheduleList;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ScheduleListSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ScheduleList::create(['id' => 'SS001','lab_id' => 'L001', 'subject_id' => 'S001', 'user_id' => '1', 'class_id' => 'C001']);
        ScheduleList::create(['id' => 'SS002','lab_id' => 'L002', 'subject_id' => 'S002', 'user_id' => '2', 'class_id' => 'C002']);
        ScheduleList::create(['id' => 'SS003','lab_id' => 'L003', 'subject_id' => 'S003', 'user_id' => '3', 'class_id' => 'C003']);
    }
}
