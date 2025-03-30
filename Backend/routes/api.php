<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

use App\Http\Middleware\AdminMiddleware;
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/login', [AuthController::class, 'login']);


Route::middleware(['auth:sanctum', AdminMiddleware::class])->group(function () {
    Route::post('/createuser', [AuthController::class, 'createUser']);
});