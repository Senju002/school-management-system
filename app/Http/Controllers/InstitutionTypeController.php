<?php

namespace App\Http\Controllers;

use App\Models\InstitutionType;
use Illuminate\Http\Request;

class InstitutionTypeController extends Controller
{
    // Store new Jenis Institusi
    public function store(Request $request)
    {
        $validated = $request->validate([
            'ins_type_id' => 'required|string',
            'ins_type_name' => 'required|string',
        ]);

        InstitutionType::create($validated);

        return redirect()->route('institusi')->with('success', 'Jenis Institusi added successfully');
    }
}
