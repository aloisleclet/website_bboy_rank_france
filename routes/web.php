<?php

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
Route::get('/notfound', 'Controller@notfound')->name('404');

Route::group(['prefix' => 'admin'], function () {
    Voyager::routes();
});

Route::get('/', 'Controller@news')->name('news');
Route::get('/news', 'Controller@news')->name('news');
Route::get('/news/{last_id}', 'Controller@news');
Route::get('/post/{id}', 'Controller@post');
Route::get('/rank', 'Controller@rank')->name('rank');
Route::get('/{actor}', 'Controller@actor');


