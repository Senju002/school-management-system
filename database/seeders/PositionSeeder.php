<?php

namespace Database\Seeders;

use App\Models\Position;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            ['id' => 'KOORD-001', 'position_name' => 'Koordinator'],
            ['id' => 'INST-001', 'position_name' => 'Instruktur'],
            ['id' => 'ASST-001', 'position_name' => 'Asisten'],
        ];

        foreach ($data as $item) {
            Position::create($item);
        }
    }
}
