<?php

namespace App\Http\Controllers;

use App\Models\DaftarInstitusi;

class DaftarInstitusiController extends Controller
{
    public function index()
    {
        $daftarInstitusi = DaftarInstitusi::all();

        return response()->json($daftarInstitusi);
    }
}
