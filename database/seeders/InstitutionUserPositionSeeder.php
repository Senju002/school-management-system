<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Position;
use App\Models\InstitutionList;
use App\Models\InstitutionUserPosition;

class InstitutionUserPositionSeeder extends Seeder
{
    public function run()
    {
        InstitutionUserPosition::create(['user_id' => '1','position_id' => 'ASST-001', 'institution_id' => 'I001']);
        InstitutionUserPosition::create(['user_id' => '2','position_id' => 'INST-001', 'institution_id' => 'I002']);
        InstitutionUserPosition::create(['user_id' => '3','position_id' => 'KOORD-001', 'institution_id' => 'I003']);
    }
}
