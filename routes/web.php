<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\InstitutionController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\UserController;

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
});

Route::middleware(['auth', 'verified', 'role:KOORDINATOR'])->group(function () {
    Route::get('/position', [PositionController::class, "index"])->name('position.index');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
