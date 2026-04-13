<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class Registration extends Model
{
    protected $fillable = [
        'name', 'email', 'phone', 'program', 
        'age', 'school', 'status', 'payment_proof_url'
    ];

    /**
     * Menambahkan atribut 'date' secara otomatis saat dikirim ke Inertia/Frontend.
     * Jadi di React kamu bisa panggil {registration.date}
     */
    protected $appends = ['date'];

    public function getDateAttribute()
    {
        // Mengubah "2026-04-12 21:35:00" menjadi "12 April 2026"
        return Carbon::parse($this->attributes['created_at'])->translatedFormat('d F Y');
    }

    /**
     * Opsional: Pastikan URL bukti pembayaran selalu valid
     * Jika kamu menyimpan nama file saja di DB, ini akan otomatis menambah path lengkapnya.
     */
    public function getPaymentProofUrlAttribute($value)
    {
        if (!$value || $value === '#') return '#';
        
        // Sesuaikan dengan disk penyimpananmu (misal: public)
        return asset('storage/' . $value);
    }
}