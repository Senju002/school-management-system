<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\JenisInstitusi;
use App\Models\GrupInstitusi;
use App\Models\DaftarInstitusi;

class InstitusiController extends Controller {
    public function index() {
        return Inertia::render('Institusi/Institusi', [
            'jenisInstitusi' => JenisInstitusi::all(),
            'groupInstitusi' => GrupInstitusi::all(),
            'daftarInstitusi' => DaftarInstitusi::all(),
        ]);
    }
}
