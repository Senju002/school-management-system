<?php

namespace App\Http\Controllers;

use App\Models\InstitutionGroup;

class InstitutionGroupController extends Controller
{
    public function index()
    {
        $groupInstitusi = InstitutionGroup::all();

        return response()->json($groupInstitusi);
    }
}
