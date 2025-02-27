<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ClassList;
use App\Models\InstitutionList;
use App\Models\InstitutionType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClassListController extends Controller
{
    public function index()
    {
        return Inertia::render('Class List/Index', [
            'class_lists_name' => ClassList::with(['institution_type', 'institution_list'])->get(),
            'class_lists' => ClassList::orderBy('created_at', 'asc')->get(),
            'institution_names' => InstitutionList::orderBy('created_at', 'asc')->get(),
            'institution_types' => InstitutionType::orderBy('created_at', 'asc')->get(),
        ]);
    }


    public function store(Request $request) {
        $request->validate([
            'ins_id' => 'required|exists:institution_lists,id', 
            'ins_type_id' => 'required|exists:institution_type,id', 
            'class_name' => 'required|string|max:255', 
        ]);

        $prefix = 'K';
        $lastEntry = ClassList::select('id')->get()->map(function ($item) use ($prefix) {
            return (int) str_replace($prefix, '', $item->id);
        })->max(); 
        $newIdNumber = $lastEntry ? $lastEntry + 1 : 1;
        $newId = $prefix . str_pad($newIdNumber, 3, '0', STR_PAD_LEFT);

        ClassList::create([
            'id' => $newId,
            'ins_id' => $request->ins_id,
            'ins_type_id' => $request->ins_type_id,
            'class_name' => $request->class_name,
        ]);

        return redirect()->route('class_lists.index')->with('success', 'Daftar Kelas Berhasil Ditambahkan!');
    }
}
