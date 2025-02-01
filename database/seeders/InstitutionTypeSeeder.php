<?php

namespace Database\Seeders;

use App\Models\InstitutionType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InstitutionTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        $data = [
            ['id' => 'SD-001', 'class_grade' => 'SD'],
            ['id' => 'SMP-001', 'class_grade' => 'SMP'],
            ['id' => 'SMA-001', 'class_grade' => 'SMA'],
        ];

        foreach ($data as $item) {
            InstitutionType::create($item);
        }
    }
}
