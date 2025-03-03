<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\InstitutionList;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Laboratory;

class LaboratoryController extends Controller
{
    public function index()
    {
        return Inertia::render('Laboratory/Index', [
            'institutions_name' => Laboratory::with(['institution'])->get(),
            'Laboratory' => Laboratory::orderBy('created_at', 'asc')->get(),
            'institutions' => InstitutionList::select('id', 'ins_name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'ins_id' => 'required|exists:institution_lists,id', // ✅ Check if your table is `institutions`
            'lab_name' => 'required|string|max:255',
        ]);

        $prefix = 'L';
        $lastEntry = Laboratory::select('id')->get()->map(function ($item) use ($prefix) {
            return (int) str_replace($prefix, '', $item->id);
        })->max();
        $newIdNumber = $lastEntry ? $lastEntry + 1 : 1;
        $newId = $prefix . str_pad($newIdNumber, 3, '0', STR_PAD_LEFT);

        // Insert into database
        Laboratory::create([
            'id' => $newId,
            'ins_id' => $request->ins_id,
            'lab_name' => $request->lab_name,
        ]);

        return redirect()->back()->with('success', 'Laboratory added successfully.');
    }

    public function edit(Laboratory $id)
    {
        $Laboratory = Laboratory::findOrFail($id);
        return response()->json($Laboratory);
    }

    public function update(Request $request, Laboratory $id)
    {
        $validated = $request->validate([
            'id' => 'required|string|max:255',
            'lab_name' => 'required|string|max:255',
            'ins_id' => 'required|exists:institution_lists,id',
        ]);

        $id->id = $validated['id'];
        $id->lab_name = $validated['lab_name'];
        $id->ins_id = $validated['ins_id'];
        $id->save();

        return redirect()->back()->with('success', 'Laboratory added successfully.');
    }

    public function destroy(Laboratory $id)
    {
        $id->delete();
        return redirect()->back()->with('success', 'Laboratory deleted successfully.');
    }
}
