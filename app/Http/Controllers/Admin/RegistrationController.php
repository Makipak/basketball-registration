<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Registration;
use Inertia\Inertia;
use Illuminate\Http\Request;

class RegistrationController extends Controller
{
    /**
     * FOLDER: Pages/Admin/Register
     * Menampilkan list pendaftar yang statusnya masih pending
     */
    public function index()
    {
        $registrations = Registration::where('status', 'pending')
                        ->orderBy('created_at', 'desc')
                        ->get();

        // Mengarah ke: resources/js/Pages/Admin/Register/Manage-member.tsx
        return Inertia::render('Admin/Register/Manage-member', [
            'registrations' => $registrations
        ]);
    }

    /**
     * FOLDER: Pages/Admin/Register
     * Detail pendaftaran (Masih ada tombol Approve/Reject)
     */
    public function showRegistration($id)
    {
        $registration = Registration::findOrFail($id);
        
        // Mengarah ke: resources/js/Pages/Admin/Register/Registration-detail.tsx
        return Inertia::render('Admin/Register/Registration-detail', [
            'registration' => $registration
        ]);
    }

    /**
     * FOLDER: Pages/Admin
     * Menampilkan list semua atlet yang sudah APPROVED
     */
    public function memberIndex(Request $request)
    {
        $query = Registration::where('status', 'approved');

        // Fitur Search sederhana
        if ($request->search) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%');
            });
        }

        $members = $query->orderBy('created_at', 'desc')->get();

        // Mengarah ke: resources/js/Pages/Admin/Member.tsx
        return Inertia::render('Admin/Member', [
            'members' => $members,
            'filters' => $request->only(['search']) // Mengirim balik kata kunci pencarian ke UI
        ]);
    }

    /**
     * FOLDER: Pages/Admin
     * Detail member yang sudah aktif (Tanpa tombol action approve/reject)
     */
    public function showMember($id)
    {
        $member = Registration::where('status', 'approved')->findOrFail($id);
        
        // Mengarah ke: resources/js/Pages/Admin/Member-detail.tsx
        return Inertia::render('Admin/Member-detail', [
            'member' => $member
        ]);
    }

    /**
     * ACTION: Approve Pendaftar
     */
    public function accept($id)
    {
        $registration = Registration::findOrFail($id);
        $registration->update(['status' => 'approved']);
        
        return redirect()->route('admin.manage-member')->with('success', 'Athlete approved successfully!');
    }

    /**
     * ACTION: Reject Pendaftar
     */
    public function reject($id)
    {
        $registration = Registration::findOrFail($id);
        $registration->update(['status' => 'rejected']);
        
        return redirect()->route('admin.manage-member')->with('error', 'Registration rejected.');
    }
}