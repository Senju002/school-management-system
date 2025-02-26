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
            'institution_names' => InstitutionList::select('id', 'ins_name')->get(),
            'institution_types' => InstitutionType::select('id', 'ins_type_name')->get(),
        ]);
    }
}
