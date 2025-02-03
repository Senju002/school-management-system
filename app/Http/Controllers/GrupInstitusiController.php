<?php

namespace App\Http\Controllers;

use App\Models\GrupInstitusi;

class GroupInstitusiController extends Controller
{
    public function index()
    {
        $groupInstitusi = GrupInstitusi::all();

        return response()->json($groupInstitusi);
    }
}
