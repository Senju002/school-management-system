<?php

namespace App\Http\Controllers;

use App\Models\JenisInstitusi;

class JenisInstitusiController extends Controller
{
    public function index()
    {
        $jenisInstitusi = JenisInstitusi::all();

        return response()->json($jenisInstitusi);
    }
}
