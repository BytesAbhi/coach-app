<?php

use App\Http\Controllers\CoachLoginController;
use App\Http\Controllers\StudentsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('welcome');
});


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/image', function () {
    return "working";
});

Route::apiResource('/v1/students', StudentsController::class);

Route::apiResource('/v1/CoachLogin', CoachLoginController::class);