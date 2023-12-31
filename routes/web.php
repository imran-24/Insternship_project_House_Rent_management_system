<?php

use App\Http\Controllers\ListingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RentalInfoController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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


Route::redirect('/', 'login');

Route::resource('/rental-infos', RentalInfoController::class)->middleware(['auth']);
Route::get('/dashboard',[ RentalInfoController::class, 'dashboard'])->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/critical-listings',[ RentalInfoController::class, 'criticalListings'])->middleware(['auth', 'verified'])->name('critical-listings');
Route::get('/expired-listings',[ RentalInfoController::class, 'expiredListings'])->middleware(['auth', 'verified'])->name('expired-listings');


Route::resource('listings', ListingController::class)->middleware(['auth', 'is_admin']);


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
