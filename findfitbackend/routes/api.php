<?php

use App\Http\Controllers\CoachLoginController;
use App\Http\Controllers\StudentsController;
use App\Http\Controllers\TestingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/admin/login', [CoachLoginController::class, 'login'])->name('admin.login');

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/image', function () {
    return "working";
});

Route::apiResource('/v1/students', StudentsController::class);
Route::apiResource('/v1/test', TestingController::class);


Route::apiResource('/v1/coachlogin', CoachLoginController::class);