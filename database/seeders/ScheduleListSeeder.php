<?php

namespace Database\Seeders;

use App\Models\ScheduleList;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class ScheduleListSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        $days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        for ($i = 1; $i <= 3; $i++) { // Create 10 schedules with random days
            $id = 'SS' . str_pad($i, 3, '0', STR_PAD_LEFT);
            $labId = 'L' . str_pad($i, 3, '0', STR_PAD_LEFT);
            $subjectId = 'S' . str_pad($i, 3, '0', STR_PAD_LEFT);
            $classId = 'C' . str_pad($i, 3, '0', STR_PAD_LEFT);
            $day = $faker->randomElement($days);

            ScheduleList::create([
                'id' => $id,
                'lab_id' => $labId,
                'subject_id' => $subjectId,
                'user_id' => $i,
                'class_id' => $classId,
                'day' => $day,
            ]);
        }
    }
}