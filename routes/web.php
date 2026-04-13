<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use Inertia\Inertia;
use App\Http\Controllers\Admin\RegistrationController;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::inertia('/about', 'About')->name('about');
Route::inertia('/schedule', 'Schedule')->name('schedule');
Route::inertia('/coach', 'Coach')->name('coach');
Route::inertia('/faq', 'Faq')->name('faq');
Route::inertia('/program', 'Program')->name('program');
Route::inertia('/program/member', 'program/Member')->name('member');

// HAPUS BAGIAN INI (Karena sudah diganti oleh Controller di bawah):
// Route::inertia('/admin/manage-member', 'Admin/Manage-member')... 

// GRUP ADMIN & BACKEND
Route::prefix('admin')->name('admin.')->group(function () {
    
    // BAGIAN PENDAFTARAN (FOLDER: Pages/Admin/Register)
    // Menampilkan list calon member yang butuh verifikasi
    Route::get('/manage-member', [RegistrationController::class, 'index'])->name('manage-member');
    
    // Detail calon member (Ada tombol Approve/Reject)
    Route::get('/registration-detail/{id}', [RegistrationController::class, 'showRegistration'])->name('registration-detail');

    // Action untuk Approve/Reject
    Route::post('/registrations/{id}/accept', [RegistrationController::class, 'accept'])->name('registrations.accept');
    Route::post('/registrations/{id}/reject', [RegistrationController::class, 'reject'])->name('registrations.reject');


    // BAGIAN MEMBER AKTIF (FOLDER: Pages/Admin)
    // Menampilkan list atlet yang sudah resmi/aktif
    Route::get('/member', [RegistrationController::class, 'memberIndex'])->name('member');
    
    // Detail atlet aktif (Tanpa tombol Approve/Reject)
    Route::get('/member-detail/{id}', [RegistrationController::class, 'showMember'])->name('member-detail');
    
});
use App\Http\Controllers\MemberController;

// Halaman Form
Route::inertia('/program/member', 'program/Member')->name('member');

// Proses Kirim Form
Route::post('/program/member', [MemberController::class, 'store'])->name('member.store');

require __DIR__.'/settings.php';