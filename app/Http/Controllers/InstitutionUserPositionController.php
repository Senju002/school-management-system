<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Position;
use App\Models\InstitutionList;
use App\Models\InstitutionUserPosition;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InstitutionUserPositionController extends Controller
{
    public function index()
    {
        return Inertia::render('Assignments/Index', [
            'assignments' => InstitutionUserPosition::with(['position', 'institution', 'user'])->get(),
            'users' => User::orderBy('created_at', 'asc')->get(),
            'positions' => Position::orderBy('created_at', 'asc')->get(),
            'institutions' => InstitutionList::orderBy('created_at', 'asc')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'position_id' => 'required|exists:positions,id',
            'institution_id' => 'required|exists:institution_lists,id', // ✅ Check if your table is `institutions`
        ]);

        InstitutionUserPosition::create([
            'user_id' => $request->user_id,
            'position_id' => $request->position_id,
            'institution_id' => $request->institution_id,
        ]);

        return redirect()->route('assignments.index')->with('success', 'User assigned successfully!');
    }

    public function edit($id)
    {
        // Find the record by ID
        $institutionUserPosition = InstitutionUserPosition::findOrFail($id);

        // Return response (for API or View)
        return response()->json([
            'success' => true,
            'data' => $institutionUserPosition
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Validate request data
        $request->validate([
            'user_id'       => 'required|exists:users,id',
            'position_id'   => 'required|exists:positions,id',
            'institution_id' => 'required|exists:institution_lists,id',
        ]);

        // Find the record by ID
        $institutionUserPosition = InstitutionUserPosition::findOrFail($id);

        // Update the record
        $institutionUserPosition->update([
            'user_id'       => $request->user_id,
            'position_id'   => $request->position_id,
            'institution_id' => $request->institution_id,
        ]);

        return redirect()->route('assignments.index')->with('success', 'User assigned successfully!');
    }

    public function destroy($id)
    {
        // Find the record by ID
        $institutionUserPosition = InstitutionUserPosition::findOrFail($id);

        // Delete the record
        $institutionUserPosition->delete();

        // Return a success response
        return redirect()->route('assignments.index')->with('success', 'User assigned successfully!');
    }
}
