<?php

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
    Route::get('/institusi', [InstitutionController::class, 'index'])->name('institusi.index');

    // Institution Jenis Routes
    Route::post('/institusi/jenis', [InstitutionController::class, 'storeJenis'])->name('institusi.storeJenis');
    Route::get('/institusi/jenis/{id}/edit', [InstitutionController::class, 'editJenis'])->name('institusi.editJenis');
    Route::put('/institusi/jenis/{id}', [InstitutionController::class, 'updateJenis'])->name('institusi.updateJenis');
    Route::delete('/institusi/jenis/{id}', [InstitutionController::class, 'destroyJenis'])->name('institusi.destroyJenis');

    // Institution Group Routes
    Route::post('/institusi/group', [InstitutionController::class, 'storeGroup'])->name('institusi.storeGroup');
    Route::get('/institusi/group/{id}/edit', [InstitutionController::class, 'editGroup'])->name('institusi.editGroup');
    Route::put('/institusi/group/{id}', [InstitutionController::class, 'updateGroup'])->name('institusi.updateGroup');
    Route::delete('/institusi/group/{id}', [InstitutionController::class, 'destroyGroup'])->name('institusi.destroyGroup');

    // Institution Daftar Routes
    Route::post('/institusi/daftar', [InstitutionController::class, 'storeDaftar'])->name('institusi.storeDaftar');
    Route::get('/institusi/daftar/{id}/edit', [InstitutionController::class, 'editDaftar'])->name('institusi.editDaftar');
    Route::put('/institusi/daftar/{id}', [InstitutionController::class, 'updateDaftar'])->name('institusi.updateDaftar');
    Route::delete('/institusi/daftar/{id}', [InstitutionController::class, 'destroyDaftar'])->name('institusi.destroyDaftar');


    // Daftar User Routes
    Route::get('/daftar-user', [UserController::class, 'index'])->name('user.index');
    Route::post('/daftar-user/store', [UserController::class, 'store'])->name('user.store');
    Route::put('/daftar-user/update/{id}', [UserController::class, 'update'])->name('user.update');
    Route::delete('/daftar-user/destroy/{id}', [UserController::class, 'destroy'])->name('user.destroy');

    // Position Routes
    Route::get('/position', [PositionController::class, "index"])->name('position.index');

    // laboratorium Routes
    Route::get('/laboratorium', [LaboratoryController::class, "index"])->name('laboratorium.index');
    Route::post('/laboratorium/store', [LaboratoryController::class, "store"])->name('laboratorium.store');
    Route::put('/laboratorium/update{id}', [LaboratoryController::class, "update"])->name('laboratorium.update');
    Route::delete('/laboratorium/destroy{id}', [LaboratoryController::class, "destroy"])->name('laboratorium.destroy');


    // Route to display the Assign Roles page
    Route::get('/assignments', [InstitutionUserPositionController::class, 'index'])->name('assignments.index');
    Route::post('/assignments', [InstitutionUserPositionController::class, 'store'])->name('assignments.store');
    Route::get('/assignments/{id}/edit', [InstitutionUserPositionController::class, 'edit'])->name('assignments.edit');
    Route::put('/assignments/{id}', [InstitutionUserPositionController::class, 'update'])->name('assignments.update');
    Route::delete('/assignments/{id}', [InstitutionUserPositionController::class, 'destroy'])->name('assignments.destroy');
    
    Route::get('/daftar-kelas', [ClassListController::class, 'index'])->name('class_lists.index');
    Route::post('/daftar-kelas', [ClassListController::class, 'store'])->name('class_lists.store');
    Route::get('/daftar-kelas/{id}/edit', [ClassListController::class, 'edit'])->name('class_lists.edit');
    Route::put('/daftar-kelas/{id}', [ClassListController::class, 'update'])->name('class_lists.update');
    Route::delete('/daftar-kelas/{id}', [ClassListController::class, 'destroy'])->name('class_lists.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
