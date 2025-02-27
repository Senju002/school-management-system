<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\InstitutionList;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Laboratorium;

class LaboratoriumController extends Controller
{
    public function index()
    {
        return Inertia::render('Laboratory/Index', [
            'institutions_name' => Laboratorium::with(['institution'])->get(),
            'laboratorium' => Laboratorium::orderBy('created_at', 'asc')->get(),
            'institutions' => InstitutionList::select('id', 'ins_name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'institution_id' => 'required|exists:institution_lists,id', // ✅ Check if your table is `institutions`
            'lab_name' => 'required|string|max:255',
        ]);

        $prefix = 'L';
        $lastEntry = Laboratorium::select('id')->get()->map(function ($item) use ($prefix) {
            return (int) str_replace($prefix, '', $item->id);
        })->max();
        $newIdNumber = $lastEntry ? $lastEntry + 1 : 1;
        $newId = $prefix . str_pad($newIdNumber, 3, '0', STR_PAD_LEFT);

        // Insert into database
        Laboratorium::create([
            'id' => $newId,
            'institution_id' => $request->institution_id,
            'lab_name' => $request->lab_name,
        ]);

        return redirect()->back()->with('success', 'Laboratorium added successfully.');
    }

    public function edit(Laboratorium $id)
    {
        $laboratorium = Laboratorium::findOrFail($id);
        return response()->json($laboratorium);
    }

    public function update(Request $request, Laboratorium $id)
    {
        $validated = $request->validate([
            'id' => 'required|string|max:255',
            'lab_name' => 'required|string|max:255',
            'institution_id' => 'required|exists:institution_lists,id',
        ]);

        $id->id = $validated['id'];
        $id->lab_name = $validated['lab_name'];
        $id->institution_id = $validated['institution_id'];
        $id->save();

        return redirect()->back()->with('success', 'Laboratorium added successfully.');
    }

    public function destroy(Laboratorium $id)
    {
        $id->delete();
        return redirect()->back()->with('success', 'Laboratorium deleted successfully.');
    }
}
