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
        return Inertia::render('Institution/Index', [
            'jenisInstitusi' => InstitutionType::orderBy('created_at', 'asc')->get(),
            'groupInstitusi' => InstitutionGroup::orderBy('created_at', 'asc')->get(),
            'daftarInstitusi' => InstitutionList::orderBy('created_at', 'asc')->get(),
        ]);
    }

    // ✅ Store new Jenis Institusi
    public function storeType(Request $request)
    {
        $request->validate([
            'ins_type_name' => 'required|string|max:255',
        ]);

        $prefix = 'J'; // Prefix for Jenis Institusi

        // Retrieve all IDs and extract numeric parts
        $lastEntry = InstitutionType::select('id')->get()->map(function ($item) use ($prefix) {
            return (int) str_replace($prefix, '', $item->id);
        })->max(); // Get the maximum numeric value

        // Generate the next ID
        $newIdNumber = $lastEntry ? $lastEntry + 1 : 1;
        $newId = $prefix . str_pad($newIdNumber, 3, '0', STR_PAD_LEFT);

        // Insert into database
        InstitutionType::create([
            'id' => $newId, // ✅ Use the correctly generated ID
            'ins_type_name' => $request->ins_type_name,
        ]);

        return redirect()->route('institution.index')->with('success', 'Jenis Institusi added successfully.');
    }


    // ✅ Edit Jenis Institusi
    public function editType(InstitutionType $id)
    {
        $jenisInstitusi = InstitutionType::findOrFail($id);
        return response()->json($jenisInstitusi);
    }

    // ✅ Update Jenis Institusi
    public function updateType(Request $request, InstitutionType $id)
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

    // ✅ Delete Jenis Institusi
    public function destroyType(InstitutionType $id)
    {
        $id->delete();
        return redirect()->back()->with('success', 'Institusi deleted successfully.');
    }

    // ✅ Store new Group Institusi
    public function storeGroup(Request $request)
    {
        $request->validate([
            'ins_group_name' => 'required|string|max:255',
        ]);

        $prefix = 'G'; // Prefix for Jenis Institusi

        // Retrieve all IDs and extract numeric parts
        $lastEntry = InstitutionGroup::select('id')->get()->map(function ($item) use ($prefix) {
            return (int) str_replace($prefix, '', $item->id);
        })->max(); // Get the maximum numeric value

        // Generate the next ID
        $newIdNumber = $lastEntry ? $lastEntry + 1 : 1;
        $newId = $prefix . str_pad($newIdNumber, 3, '0', STR_PAD_LEFT);

        // Insert into database
        InstitutionGroup::create([
            'id' => $newId, // ✅ Use the correctly generated ID
            'ins_group_name' => $request->ins_group_name,
        ]);

        return redirect()->route('institution.index')->with('success', 'Group Institusi added successfully.');
    }


    // ✅ Edit Daftar Institusi
    public function editGroup($id)
    {
        $groupInstitusi = InstitutionGroup::findOrFail($id);
        return response()->json($groupInstitusi);
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

    // ✅ Delete Group Institusi
    public function destroyGroup(InstitutionGroup $id)
    {
        $id->delete();
        return redirect()->back()->with('success', 'Laboratorium deleted successfully.');
    }

    // ✅ Store new Daftar Institusi
    public function storeList(Request $request)
    {
        $request->validate([
            'ins_name' => 'required|string|max:255',
        ]);

        $prefix = 'I'; // Prefix for Jenis Institusi

        // Retrieve all IDs and extract numeric parts
        $lastEntry = InstitutionList::select('id')->get()->map(function ($item) use ($prefix) {
            return (int) str_replace($prefix, '', $item->id);
        })->max(); // Get the maximum numeric value

        // Generate the next ID
        $newIdNumber = $lastEntry ? $lastEntry + 1 : 1;
        $newId = $prefix . str_pad($newIdNumber, 3, '0', STR_PAD_LEFT);

        // Insert into database
        InstitutionList::create([
            'id' => $newId, // ✅ Use the correctly generated ID
            'ins_name' => $request->ins_name,
        ]);

        return redirect()->route('institution.index')->with('success', 'Institusi added successfully.');
    }

    // ✅ Edit Daftar Institusi
    public function editList($id)
    {
        $daftarInstitusi = InstitutionList::findOrFail($id);
        return response()->json($daftarInstitusi);
    }

    // ✅ Update Daftar Institusi
    public function updateList(Request $request, $id)
    {
        $request->validate([
            'ins_name' => 'required|string|max:255',
        ]);

        $daftarInstitusi = InstitutionList::findOrFail($id);
        $daftarInstitusi->update([
            'ins_name' => $request->ins_name,
        ]);

        return redirect()->route('institution.index')->with('success', 'Daftar Institusi updated successfully.');
    }

    // ✅ Delete Daftar Institusi
    public function destroyList(InstitutionList $id)
    {
        $id->delete();
        return redirect()->back()->with('success', 'Laboratorium deleted successfully.');
    }
}
