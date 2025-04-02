<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

use App\Http\Middleware\AdminMiddleware;

use App\Http\Controllers\LeandingController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


Route::post('/login', [AuthController::class, 'login']);


Route::middleware(['auth:sanctum', AdminMiddleware::class])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/createuser', [AuthController::class, 'createUser']);

    Route::get('/users', [AuthController::class, 'users']);


    // Lending routes
    Route::post('/lending_book', [LeandingController::class, 'lendingBook']);

    Route::get('/get_lended_book', [LeandingController::class, 'getLendedBook']);

    Route::post('/return_book', [LeandingController::class, 'returnBook']);


});
