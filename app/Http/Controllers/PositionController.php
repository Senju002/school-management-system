<?php

namespace App\Http\Controllers;

use App\Models\Position;
use App\Models\PositionGrade;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PositionController extends Controller
{
    public function index(Request $request)
    {
        $positions = Position::all()->map(function ($position) {
            return [
                'Key' => $position->id,
                'Posisi Karyawan' => $position->position_name
            ];
        });

        $positionGrades = PositionGrade::all()->map(function ($positionGrade) {
            return [
                'Key' => $positionGrade->id,
                'Level Karyawan' => $positionGrade->job_level
            ];
        });

        return Inertia::render('Position Page/Index', [
            'positions' => $positions,
            'positionGrades' => $positionGrades
        ]);
    }
}
