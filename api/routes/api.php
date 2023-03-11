<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::get('/usuarios', 'App\Http\Controllers\Api\UsuarioController@index');
Route::get('/usuarios/{usuario}', 'App\Http\Controllers\Api\UsuarioController@show');
Route::post('/usuarios', 'App\Http\Controllers\Api\UsuarioController@store');
Route::put('/usuarios/{usuario}', 'App\Http\Controllers\Api\UsuarioController@update');
Route::delete('/usuarios/{usuario}', 'App\Http\Controllers\Api\UsuarioController@destroy');
Route::post('/usuarios/login', 'App\Http\Controllers\Api\UsuarioController@login')->middleware('canAccess');
Route::get('/usuarios/logout', 'App\Http\Controllers\Api\UsuarioController@logout')->middleware('canAccess');
