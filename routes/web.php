<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});
Route::inertia('/about', 'About')->name('about');
require __DIR__.'/settings.php';
Route::inertia('/schedule', 'Schedule')->name('schedule');
require __DIR__.'/settings.php';
Route::inertia('/coach', 'Coach')->name('coach');
require __DIR__.'/settings.php';
Route::inertia('/faq', 'Faq')->name('faq');
require __DIR__.'/settings.php';
Route::inertia('/program', 'Program')->name('program');
require __DIR__.'/settings.php';
// Tambahkan 'program/' sebelum nama komponennya
Route::inertia('/program/member', 'program/Member')->name('member');