<?php

use App\Http\Controllers\ShortLinkController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/s/{code}', [ShortLinkController::class, 'redirect'])->name('redirect');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [ShortLinkController::class, 'dashboard'])->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/short-links.php';

