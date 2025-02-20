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
        $user = User::first(); // Get any user
        $position = Position::first(); // Get any position
        $institution = InstitutionList::first(); // Get any institution

        InstitutionUserPosition::create([
            'user_id' => $user->id,
            'position_id' => $position->id,
            'institution_id' => $institution->id,
        ]);
    }
}
