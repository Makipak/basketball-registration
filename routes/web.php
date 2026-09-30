<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use Inertia\Inertia;
use App\Http\Controllers\Admin\RegistrationController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ScheduleController;

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


    Route::get('/', function () {
        return Inertia::render('Admin/Dashboard', [
            'breadcrumbs' => [
                ['label' => 'Admin', 'href' => '#'],
                // Tetap gunakan nama route 'admin.dashboard' agar tidak merusak Link di frontend
                ['label' => 'Dashboard', 'href' => route('admin.dashboard')],
            ],
        ]);
    })->name('dashboard');



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
    

    // ROUTE ANALYTICS (Halaman Chart.tsx)
    // Menggunakan DashboardController agar bisa memfilter status 'approved'
// ROUTE ANALYTICS (Halaman Chart.tsx)
// Menggunakan DashboardController agar bisa memfilter status 'approved'
Route::get('/analytics', [DashboardController::class, 'analytics'])->name('analytics');

    Route::get('/schedule', [ScheduleController::class, 'index'])->name('schedule.index');
    Route::post('/schedule', [ScheduleController::class, 'store'])->name('schedule.store');
    Route::put('/schedule/{schedule}', [ScheduleController::class, 'update'])->name('schedule.update');
    Route::delete('/schedule/{schedule}', [ScheduleController::class, 'destroy'])->name('schedule.destroy');

}); // Tutup dari Route::prefix('admin')







// Halaman Form
Route::inertia('/program/member', 'program/Member')->name('member');

// Proses Kirim Form
Route::post('/program/member', [MemberController::class, 'store'])->name('member.store');

require __DIR__.'/settings.php';