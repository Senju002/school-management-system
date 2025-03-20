<?php

use App\Http\Controllers\AcademicYearController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ClassListController;
use App\Http\Controllers\InstitutionController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LaboratoryController;
use App\Http\Controllers\InstitutionUserPositionController;
use App\Http\Controllers\Neon;
use App\Http\Controllers\ScheduleListController;
use App\Http\Controllers\SubjectListController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome');
});


// ! Not Found 
Route::fallback(function () {
    return Inertia::render('Additional Page/NotFoundPage');
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified', 'role:KOORDINATOR'])->group(function () {
    // Institution Routes
    Route::get('/institution', [InstitutionController::class, 'index'])->name('institution.index');

    // Institution Jenis Routes
    Route::post('/institution/type', [InstitutionController::class, 'storeType'])->name('institution.storeType');
    Route::get('/institution/type/{id}/edit', [InstitutionController::class, 'editType'])->name('institution.editType');
    Route::put('/institution/type/{id}', [InstitutionController::class, 'updateType'])->name('institution.updateType');
    Route::delete('/institution/type/{id}', [InstitutionController::class, 'destroyType'])->name('institution.destroyType');

    // Institution Group Routes
    Route::post('/institution/group', [InstitutionController::class, 'storeGroup'])->name('institution.storeGroup');
    Route::get('/institution/group/{id}/edit', [InstitutionController::class, 'editGroup'])->name('institution.editGroup');
    Route::put('/institution/group/{id}', [InstitutionController::class, 'updateGroup'])->name('institution.updateGroup');
    Route::delete('/institution/group/{id}', [InstitutionController::class, 'destroyGroup'])->name('institution.destroyGroup');

    // Institution Daftar Routes
    Route::post('/institution/list', [InstitutionController::class, 'storeList'])->name('institution.storeList');
    Route::get('/institution/list/{id}/edit', [InstitutionController::class, 'editList'])->name('institution.editList');
    Route::put('/institution/list/{id}', [InstitutionController::class, 'updateList'])->name('institution.updateList');
    Route::delete('/institution/list/{id}', [InstitutionController::class, 'destroyList'])->name('institution.destroyList');


    // Daftar User Routes
    Route::get('/user_lists', [UserController::class, 'index'])->name('user_lists.index');
    Route::post('/user_lists/store', [UserController::class, 'store'])->name('user_lists.store');
    Route::put('/user_lists/update/{id}', [UserController::class, 'update'])->name('user_lists.update');
    Route::delete('/user_lists/destroy/{id}', [UserController::class, 'destroy'])->name('user_lists.destroy');

    // Position Routes
    Route::get('/position', [PositionController::class, "index"])->name('position.index');

    // laboratorium Routes
    Route::get('/laboratory', [LaboratoryController::class, "index"])->name('laboratory.index');
    Route::post('/laboratory/store', [LaboratoryController::class, "store"])->name('laboratory.store');
    Route::put('/laboratory/update{id}', [LaboratoryController::class, "update"])->name('laboratory.update');
    Route::delete('/laboratory/destroy{id}', [LaboratoryController::class, "destroy"])->name('laboratory.destroy');


    // Roles page
    Route::get('/assignments', [InstitutionUserPositionController::class, 'index'])->name('assignments.index');
    Route::post('/assignments', [InstitutionUserPositionController::class, 'store'])->name('assignments.store');
    Route::get('/assignments/{id}/edit', [InstitutionUserPositionController::class, 'edit'])->name('assignments.edit');
    Route::put('/assignments/{id}', [InstitutionUserPositionController::class, 'update'])->name('assignments.update');
    Route::delete('/assignments/{id}', [InstitutionUserPositionController::class, 'destroy'])->name('assignments.destroy');

    // Class List Routes
    Route::get('/class_lists', [ClassListController::class, 'index'])->name('class_lists.index');
    Route::post('/class_lists', [ClassListController::class, 'store'])->name('class_lists.store');
    Route::get('/class_lists/{id}/edit', [ClassListController::class, 'edit'])->name('class_lists.edit');
    Route::put('/daftarclass_lists{id}', [ClassListController::class, 'update'])->name('class_lists.update');
    Route::delete('/class_lists/{id}', [ClassListController::class, 'destroy'])->name('class_lists.destroy');

    // Academic Year
    Route::get('/academic_years', [AcademicYearController::class, 'index'])->name('academic_years.index');
    Route::post('/academic_years', [AcademicYearController::class, 'store'])->name('academic_years.store');
    Route::get('/academic_years/{id}/edit', [AcademicYearController::class, 'edit'])->name('academic_years.edit');
    Route::put('/academic_years/{id}', [AcademicYearController::class, 'update'])->name('academic_years.update');
    Route::delete('/academic_years/{id}', [AcademicYearController::class, 'destroy'])->name('academic_years.destroy');

    // Subject List
    Route::get('/subject_lists', [SubjectListController::class, 'index'])->name('subject_lists.index');
    Route::post('/subject_lists', [SubjectListController::class, 'store'])->name('subject_lists.store');
    Route::get('/subject_lists/{id}/edit', [SubjectListController::class, 'edit'])->name('subject_lists.edit');
    Route::put('/subject_lists/{id}', [SubjectListController::class, 'update'])->name('subject_lists.update');
    Route::delete('/subject_lists/{id}', [SubjectListController::class, 'destroy'])->name('subject_lists.destroy');

    // Schedule list
    Route::get('/schedule_lists', [ScheduleListController::class, 'index'])->name('schedule_lists.index');
    Route::post('/schedule_lists', [ScheduleListController::class, 'store'])->name('schedule_lists.store');
    Route::get('/schedule_lists/{id}/edit', [ScheduleListController::class, 'edit'])->name('schedule_lists.edit');
    Route::put('/schedule_lists/{id}', [ScheduleListController::class, 'update'])->name('schedule_lists.update');
    Route::delete('/schedule_lists/{id}', [ScheduleListController::class, 'destroy'])->name('schedule_lists.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
