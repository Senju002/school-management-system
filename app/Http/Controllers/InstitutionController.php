<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\InstitutionType;
use App\Models\InstitutionGroup;
use App\Models\InstitutionList;

class   InstitutionController extends Controller
{
    // Show the Institusi page with data
    public function index()
    {
        return Inertia::render('Institusi/Institusi', [
            'jenisInstitusi' => InstitutionType::orderBy('created_at', 'asc')->get(),
            'groupInstitusi' => InstitutionGroup::orderBy('created_at', 'asc')->get(),
            'daftarInstitusi' => InstitutionList::orderBy('created_at', 'asc')->get(),
        ]);
    }

    // Store new Jenis Institusi
    public function storeJenis(Request $request)
    {
        $request->validate([
            'ins_type_id' => 'required|string|unique:institution_type,ins_type_id',
            'ins_type_name' => 'required|string|max:255',
        ]);

        InstitutionType::create([
            'ins_type_id' => $request->ins_type_id,
            'ins_type_name' => $request->ins_type_name,
        ]);

        return redirect()->route('institusi.index')->with('success', 'Jenis Institusi added successfully.');
    }

    // Store new Group Institusi
    public function storeGroup(Request $request)
    {
        $request->validate([
            'ins_group_id' => 'required|string|unique:group_institusi,ins_group_id',
            'ins_group_name' => 'required|string|max:255',
        ]);

        InstitutionGroup::create([
            'ins_group_id' => $request->ins_group_id,
            'ins_group_name' => $request->ins_group_name,
        ]);

        return redirect()->route('institusi.index')->with('success', 'Group Institusi added successfully.');
    }

    // Store new Daftar Institusi
    public function storeDaftar(Request $request)
    {
        $request->validate([
            'ins_id' => 'required|string|unique:institution_lists,ins_id',
            'ins_name' => 'required|string|max:255',
        ]);

        InstitutionList::create([
            'ins_id' => $request->ins_id,
            'ins_name' => $request->ins_name,
        ]);

        return redirect()->route('institusi.index')->with('success', 'Daftar Institusi added successfully.');
    }
}
    