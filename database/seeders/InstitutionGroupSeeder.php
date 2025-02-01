<?php

namespace Database\Seeders;

use App\Models\InstitutionGroup;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InstitutionGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            ['id' => 'ST-001', 'group_name' => 'Sutomo'],
            ['id' => 'MD-001', 'group_name' => 'Methodist'],
        ];

        foreach ($data as $item) {
            InstitutionGroup::create($item);
        }
    }
}
