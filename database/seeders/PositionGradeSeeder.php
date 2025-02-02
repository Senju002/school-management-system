<?php

namespace Database\Seeders;

use App\Models\PositionGrade;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PositionGradeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            ['id' => 'LVL-001', 'job_level' => 'Level 1'],
            ['id' => 'LVL-002', 'job_level' => 'Level 2'],
            ['id' => 'LVL-003', 'job_level' => 'Level 3'],
        ];

        foreach ($data as $item) {
            PositionGrade::create($item);
        }
    }
}
