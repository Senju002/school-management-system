<?php

namespace Database\Seeders;

use App\Models\ClassList;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class ClassListSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        $classes = ['X MIA 1', 'X MIA 2', 'X MIA 3', 'X IS 1', 'X IS 2', 'X IS 3'];
        for ($i = 1; $i <= 3; $i++) {
            $id = 'C' . str_pad($i, 3, '0', STR_PAD_LEFT);
            $ins_id = 'I' . str_pad($i, 3, '0',  STR_PAD_LEFT);
            $ins_type_id = 'J' . str_pad($i, 3, '0',  STR_PAD_LEFT);
            $class = $faker->randomElement($classes);
            ClassList::create([
                'id' => $id,
                'ins_id' => $ins_id,
                'ins_type_id' => $ins_type_id,
                'class_name' => $class
            ]);
        }
    }
}
