<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Registration;
use Illuminate\Support\Facades\Storage;

class MemberController extends Controller
{
    public function store(Request $request)
    {
        // 1. Validasi data
        $request->validate([
            'name'          => 'required|string|max:255',
            'email'         => 'nullable|email',
            'phone'         => 'required|string|max:20',
            'program_type'  => 'required', // Dari data.program_type di React
            'age'           => 'required|integer',
            'school'        => 'required|string',
            'payment_proof' => 'required|image|mimes:jpg,jpeg,png|max:5120',
        ]);

        // 2. Handle Upload File
        $path = null;
        if ($request->hasFile('payment_proof')) {
            // Simpan ke folder 'storage/app/public/payments'
            $path = $request->file('payment_proof')->store('payments', 'public');
        }

        // 3. Simpan ke Database
        Registration::create([
            'name'              => $request->name,
            'email'             => $request->email,
            'phone'             => $request->phone,
            'program'           => $request->program_type, // Map ke kolom 'program'
            'age'               => $request->age,
            'school'            => $request->school,
            'status'            => 'pending', // Default status
            'payment_proof_url' => $path,      // Map ke kolom 'payment_proof_url'
        ]);

        // 4. Redirect kembali
        return redirect()->back()->with('message', 'Pendaftaran berhasil dikirim!');
    }

}
