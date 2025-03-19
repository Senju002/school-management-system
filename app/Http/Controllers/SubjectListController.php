<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\SubjectList;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\InstitutionList;

class SubjectListController extends Controller
{
    public function index()
    {
        return Inertia::render('Subject List/Index', [
            'subjects' => SubjectList::with(['institution'])->get(),
            'subjectLists' => SubjectList::orderBy('created_at', 'asc')->get(),
            'institutions' => InstitutionList::select('id', 'ins_name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'ins_id' => 'required|exists:institution_lists,id',
            'subject_name' => 'required|string|max:255',
        ]);

        $prefix = 'S';
        $lastEntry = SubjectList::select('id')->get()->map(function ($item) use ($prefix) {
            return (int) str_replace($prefix, '', $item->id);
        })->max();
        $newIdNumber = $lastEntry ? $lastEntry + 1 : 1;
        $newId = $prefix . str_pad($newIdNumber, 3, '0', STR_PAD_LEFT);

        // Insert into database
        SubjectList::create([
            'id' => $newId,
            'ins_id' => $request->ins_id,
            'subject_name' => $request->subject_name,
        ]);

        return redirect()->back()->with('success', 'Subject added successfully.');
    }

    public function edit(SubjectList $id)
    {
        $Subject = SubjectList::findOrFail($id);
        return response()->json($Subject);
    }

    public function update(Request $request, SubjectList $id)
    {
        $validated = $request->validate([
            'id' => 'required|string|max:255',
            'subject_name' => 'required|string|max:255',
            'ins_id' => 'required|exists:institution_lists,id',
        ]);

        $id->id = $validated['id'];
        $id->subject_name = $validated['subject_name'];
        $id->ins_id = $validated['ins_id'];
        $id->save();

        return redirect()->back()->with('success', 'Subject added successfully.');
    }

    public function destroy(SubjectList $id)
    {
        $id->delete();
        return redirect()->back()->with('success', 'Subject deleted successfully.');
    }
}
