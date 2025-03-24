<?php

namespace Database\Seeders;

use App\Models\SubjectList;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class SubjectListSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        $subjecs = ['Math', 'Physics', 'History', 'Chems', 'Science', 'English'];
        for ($i = 1; $i <= 3; $i++) {
            $id = 'S' . str_pad($i, 3, '0', STR_PAD_LEFT);
            $ins_id = 'I' . str_pad($i, 3, '0',  STR_PAD_LEFT);
            $subject = $faker->randomElement($subjecs);

            SubjectList::create([
                'id' => $id,
                'ins_id' => $ins_id,
                'subject_name' => $subject
            ]);
        }
    }
}
