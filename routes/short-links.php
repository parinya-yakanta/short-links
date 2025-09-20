<?php

use App\Http\Controllers\ShortLinkController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('/my-links', [ShortLinkController::class, 'index'])->name('my-links');
    Route::get('/generate-links', [ShortLinkController::class, 'generate'])->name('generate-links');
    Route::post('/short-links', [ShortLinkController::class, 'store'])->middleware('throttle:6,1')->name('short-links.store');
    Route::put('/short-links/{id}', [ShortLinkController::class, 'update'])->middleware('throttle:6,1')->name('short-links.update');
    Route::delete('/short-links/{id}', [ShortLinkController::class, 'destroy'])->middleware('throttle:6,1')->name('short-links.destroy');
});
