<?php

namespace App\Http\Controllers;

use App\Models\InstitutionList;

class InstitutionListController extends Controller
{
    public function index()
    {
        $daftarInstitusi = InstitutionList::all();

        return response()->json($daftarInstitusi);
    }
}
