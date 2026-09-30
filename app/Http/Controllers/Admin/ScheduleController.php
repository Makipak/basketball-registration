<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Schedule', [
            'schedules' => Schedule::orderBy('day')->get(),
            'breadcrumbs' => [
                ['label' => 'Dashboard', 'url' => route('dashboard')],
                ['label' => 'Schedules', 'url' => '#'],
            ]
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'day' => 'required',
            'time' => 'required',
            'duration' => 'required',
            'title' => 'required',
            'coach' => 'required',
            'court' => 'required',
            'category' => 'required',
            'intensity' => 'required',
            'status' => 'required',
        ]);

        Schedule::create($validated);

        return redirect()->back()->with('message', 'Jadwal berhasil ditambahkan!');
    }

    public function update(Request $request, Schedule $schedule)
    {
        // Digunakan juga oleh fitur toggleStatus di frontend
        $schedule->update($request->all());
        return redirect()->back();
    }

    public function destroy(Schedule $schedule)
    {
        $schedule->delete();
        return redirect()->back()->with('message', 'Jadwal berhasil dihapus!');
    }
}