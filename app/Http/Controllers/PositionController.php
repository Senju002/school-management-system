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
        $positions = Position::all();
        $positionGrades = PositionGrade::all();

        return Inertia::render('Position Page/Index', [
            'positions' => $positions,
            'positionGrades' => $positionGrades
        ]);
    }
}
