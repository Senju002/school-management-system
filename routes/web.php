<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\InstitutionController;
use App\Http\Controllers\JenisInstitusiController;
use App\Http\Controllers\PositionController;

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

Route::middleware(['auth'])->group(function () {
    // Show the Institusi page
    Route::get('/institusi', [InstitutionController::class, 'index'])->name('institusi.index');

    // Store new data for each table
    Route::post('/institusi/jenis', [InstitutionController::class, 'storeJenis'])->name('institusi.storeJenis');
    Route::post('/institusi/group', [InstitutionController::class, 'storeGroup'])->name('institusi.storeGroup');
    Route::post('/institusi/daftar', [InstitutionController::class, 'storeDaftar'])->name('institusi.storeDaftar');
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
