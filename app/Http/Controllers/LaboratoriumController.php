<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Laboratorium;

class LaboratoriumController extends Controller
{
    public function index()
    {
        return Inertia::render('Laboratorium/Index', [
            'laboratorium' => Laboratorium::orderBy('created_at', 'asc')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'lab_name' => 'required|string|max:255',
        ]);

        $prefix = 'L'; // Prefix for Laboratorium

        // Retrieve all IDs and extract numeric parts
        $lastEntry = Laboratorium::select('id')->get()->map(function ($item) use ($prefix) {
            return (int) str_replace($prefix, '', $item->id);
        })->max(); // Get the maximum numeric value

        // Generate the next ID
        $newIdNumber = $lastEntry ? $lastEntry + 1 : 1;
        $newId = $prefix . str_pad($newIdNumber, 3, '0', STR_PAD_LEFT);

        // Insert into database
        Laboratorium::create([
            'id' => $newId, // ✅ Use the correctly generated ID
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
        ]);

        $id->id = $validated['id'];
        $id->lab_name = $validated['lab_name'];
        $id->save();

        return redirect()->back()->with('success', 'Laboratorium added successfully.');
    }

    public function destroy(Laboratorium $id)
    {
        $id->delete();
        return redirect()->back()->with('success', 'Laboratorium deleted successfully.');
    }
}
