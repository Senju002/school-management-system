<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ClassList;
use App\Models\Laboratory;
use App\Models\ScheduleList;
use App\Models\SubjectList;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class ScheduleListController extends Controller
{
    public function index()
    {
        // Paginate the schedules with 7 items per page
        $schedules = ScheduleList::with(['lab', 'subject', 'user', 'class'])
            ->paginate(7); // 7 schedules per page

        // Pass the paginated data to the view
        return Inertia::render('Schedule List/Index', [
            'schedules' => $schedules,
            'labs' => Laboratory::all(),
            'subjects' => SubjectList::all(),
            'users' => User::all(),
            'classes' => ClassList::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'lab_id' => 'required|exists:lab_computers,id',
            'subject_id' => 'required|exists:subject_lists,id',
            'user_id' => 'required|exists:users,id',
            'class_id' => 'required|exists:class_lists,id',
            'day' => 'required|string|in:Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday',
        ]);

        $prefix = 'SS'; // Prefix for Jenis Institusi

        // Retrieve all IDs and extract numeric parts
        $lastEntry = ScheduleList::select('id')->get()->map(function ($item) use ($prefix) {
            return (int) str_replace($prefix, '', $item->id);
        })->max(); // Get the maximum numeric value

        // Generate the next ID
        $newIdNumber = $lastEntry ? $lastEntry + 1 : 1;
        $newId = $prefix . str_pad($newIdNumber, 3, '0', STR_PAD_LEFT);

        ScheduleList::create([
            'id' => $newId,
            'lab_id' => $request->lab_id,
            'subject_id' => $request->subject_id,
            'user_id' => $request->user_id,
            'class_id' => $request->class_id,
            'day' => $request->day, // Include the day field
        ]);

        return redirect()->route('schedule_lists.index')->with('success', 'Schedule assigned successfully!');
    }

    public function edit(ScheduleList $id)
    {
        $schedule = ScheduleList::findOrFail($id);
        return response()->json($schedule);
    }

    public function update(Request $request, $id)
    {
        // Validate request data
        $request->validate([
            'lab_id' => 'required|exists:lab_computers,id',
            'subject_id' => 'required|exists:subject_lists,id',
            'user_id' => 'required|exists:users,id',
            'class_id' => 'required|exists:class_lists,id',
            'day' => 'required|string|in:Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday',
        ]);

        $schedule = ScheduleList::findOrFail($id);

        $schedule->update([
            'lab_id' => $request->lab_id,
            'subject_id' => $request->subject_id,
            'user_id' => $request->user_id,
            'class_id' => $request->class_id,
            'day' => $request->day,
        ]);

        return redirect()->route('schedule_lists.index')->with('success', 'Schedule updated successfully!');
    }

    public function destroy($id)
    {
        // Find the record by ID
        $schedule = ScheduleList::findOrFail($id);

        // Delete the record
        $schedule->delete();

        // Return a success response
        return redirect()->route('schedule_lists.index')->with('success', 'Schedule deleted successfully!');
    }

    public function filterByDay($day)
    {
        $schedules = ScheduleList::where('day', $day)->get();
        return response()->json($schedules);
    }
}
