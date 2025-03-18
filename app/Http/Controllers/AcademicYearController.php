<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\AcademicYear;

class AcademicYearController extends Controller
{
    public function index()
    {
        return Inertia::render('Academic Year/Index', [
            'academicYears' => AcademicYear::orderBy('created_at', 'asc')->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'ac_years' => 'required|string|max:255',
        ]);

        $prefix = 'A'; // Prefix for Jenis Institusi

        // Retrieve all IDs and extract numeric parts
        $lastEntry = AcademicYear::select('id')->get()->map(function ($item) use ($prefix) {
            return (int) str_replace($prefix, '', $item->id);
        })->max(); // Get the maximum numeric value

        // Generate the next ID
        $newIdNumber = $lastEntry ? $lastEntry + 1 : 1;
        $newId = $prefix . str_pad($newIdNumber, 3, '0', STR_PAD_LEFT);

        // Insert into database
        AcademicYear::create([
            'id' => $newId, //
            'ac_years' => $request->ac_years,
        ]);

        return redirect()->route('academic_years.index')->with('success', 'Academic Year added successfully.');
    }

    public function edit(AcademicYear $id)
    {
        $academic_year = AcademicYear::findOrFail($id);
        return response()->json($academic_year);
    }

    public function update(Request $request, AcademicYear $id)
    {
        $validated = $request->validate([
            'id' => 'required|string|max:255',
            'ac_years' => 'required|string|max:255',
        ]);

        $id->id = $validated['id'];
        $id->ac_years = $validated['ac_years'];
        $id->save();

        return redirect()->back()->with('success', 'Academic Year updated successfully');
    }

    public function destroy(AcademicYear $id)
    {
        $id->delete();
        return redirect()->back()->with('success', 'Academic Year deleted successfully.');
    }
}
