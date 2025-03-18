<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UserSeeder::class);
        $this->call(PositionSeeder::class);
        $this->call(PositionGradeSeeder::class);
        $this->call(InstitusiSeeder::class);
        $this->call(LaboratorySeeder::class);
        $this->call(InstitutionUserPositionSeeder::class);
        $this->call(ClassListSeeder::class);
        $this->call(AcademicYearSeeder::class);
    }
}
