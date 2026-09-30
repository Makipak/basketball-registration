<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function analytics()
    {
        // 1. Data Member Approved
        $memberData = DB::table('registrations')
            ->select(
                DB::raw("DATE_FORMAT(created_at, '%b') as month"), 
                DB::raw('count(*) as members'),
                DB::raw('MIN(created_at) as sort_date')
            )
            ->where('status', 'approved')
            ->groupBy('month')
            ->orderBy('sort_date', 'ASC')
            ->get();

        // 2. Data Revenue berdasarkan Harga Paket Terbaru
        $revenueData = DB::table('registrations')
            ->select(
                DB::raw("DATE_FORMAT(created_at, '%b') as month"), 
                DB::raw("SUM(CASE 
                    WHEN program = 'pro' THEN 600000 
                    WHEN program = 'junior' THEN 450000 
                    WHEN program = 'private' THEN 200000 
                    ELSE 0 END) as revenue"),
                DB::raw('MIN(created_at) as sort_date')
            )
            ->where('status', 'approved')
            ->groupBy('month')
            ->orderBy('sort_date', 'ASC')
            ->get();

        return Inertia::render('Admin/Chart', [
            'memberData' => $memberData,
            'revenueData' => $revenueData,
            'breadcrumbs' => [
                ['label' => 'Admin', 'href' => '#'],
                ['label' => 'Analytics', 'href' => route('admin.analytics')],
            ]
        ]);
    }
}