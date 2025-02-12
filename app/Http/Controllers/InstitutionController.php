<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\InstitutionType;
use App\Models\InstitutionGroup;
use App\Models\InstitutionList;

class InstitutionController extends Controller
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

    // ✅ Store new Jenis Institusi
    public function storeJenis(Request $request)
    {
        $request->validate([
            'id' => 'required|string|unique:institution_type,id',
            'ins_type_name' => 'required|string|max:255',
        ]);

        InstitutionType::create([
            'id' => $request->id,
            'ins_type_name' => $request->ins_type_name,
        ]);

        return redirect()->route('institusi.index')->with('success', 'Jenis Institusi added successfully.');
    }

    // ✅ Edit Jenis Institusi
    public function editJenis(InstitutionType $id)
    {
        $jenisInstitusi = InstitutionType::findOrFail($id);
        return response()->json($jenisInstitusi);
    }

    // ✅ Update Jenis Institusi
    public function updateJenis(Request $request, InstitutionType $id)
    {
        $validated = $request->validate([
            'id' => 'required|string|max:255',
            'ins_type_name' => 'required|string|max:255',
        ]);

        $id->id = $validated['id'];
        $id->ins_type_name = $validated['ins_type_name'];
        $id->save();

        return redirect()->back()->with('success', 'Institusi berhasil ditambah');
    }

    // ✅ Update Jenis Institusi
    public function updateGroup(Request $request, InstitutionGroup $id)
    {
        $validated = $request->validate([
            'id' => 'required|string|max:255',
            'ins_group_name' => 'required|string|max:255',
        ]);

        $id->id = $validated['id'];
        $id->ins_group_name = $validated['ins_group_name'];
        $id->save();

        return redirect()->back()->with('success', 'Institusi berhasil ditambah');
    }

    // ✅ Store new Group Institusi
    public function storeGroup(Request $request)
    {
        $request->validate([
            'id' => 'required|string|unique:institution_group,id',
            'ins_group_name' => 'required|string|max:255',
        ]);

        InstitutionGroup::create([
            'id' => $request->id,
            'ins_group_name' => $request->ins_group_name,
        ]);

        return redirect()->route('institusi.index')->with('success', 'Group Institusi added successfully.');
    }

    // ✅ Edit Daftar Institusi
    public function editGroup($id)
    {
        $groupInstitusi = InstitutionGroup::findOrFail($id);
        return response()->json($groupInstitusi);
    }


    // ✅ Store new Daftar Institusi
    public function storeDaftar(Request $request)
    {
        $request->validate([
            'id' => 'required|string|unique:institution_lists,id',
            'ins_name' => 'required|string|max:255',
        ]);

        InstitutionList::create([
            'id' => $request->id,
            'ins_name' => $request->ins_name,
        ]);

        return redirect()->route('institusi.index')->with('success', 'Daftar Institusi added successfully.');
    }



    // ✅ Edit Daftar Institusi
    public function editDaftar($id)
    {
        $daftarInstitusi = InstitutionList::findOrFail($id);
        return response()->json($daftarInstitusi);
    }

    // ✅ Update Daftar Institusi
    public function updateDaftar(Request $request, $id)
    {
        $request->validate([
            'ins_name' => 'required|string|max:255',
        ]);

        $daftarInstitusi = InstitutionList::findOrFail($id);
        $daftarInstitusi->update([
            'ins_name' => $request->ins_name,
        ]);

        return redirect()->route('institusi.index')->with('success', 'Daftar Institusi updated successfully.');
    }

    // ✅ Delete Jenis Institusi
    public function destroyJenis($id)
    {
        $jenisInstitusi = InstitutionType::findOrFail($id);
        $jenisInstitusi->delete();

        return redirect()->route('institusi.index')->with('success', 'Jenis Institusi deleted successfully.');
    }

    // ✅ Delete Group Institusi
    public function destroyGroup($id)
    {
        $groupInstitusi = InstitutionGroup::findOrFail($id);
        $groupInstitusi->delete();

        return redirect()->route('institusi.index')->with('success', 'Group Institusi deleted successfully.');
    }

    // ✅ Delete Daftar Institusi
    public function destroyDaftar($id)
    {
        $daftarInstitusi = InstitutionList::findOrFail($id);
        $daftarInstitusi->delete();

        return redirect()->route('institusi.index')->with('success', 'Daftar Institusi deleted successfully.');
    }
}
