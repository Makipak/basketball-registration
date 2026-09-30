<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // database/migrations/xxxx_xx_xx_create_schedules_table.php
    public function up(): void
    {
        Schema::create('schedules', function (Illuminate\Database\Schema\Blueprint $table) {
            $table->id();
            $table->string('day'); // Senin, Selasa, dst
            $table->string('time'); // 15:00
            $table->string('duration'); // 120 min
            $table->string('title');
            $table->string('coach');
            $table->string('court');
            $table->enum('category', ['Junior', 'Pro', 'Private']);
            $table->enum('intensity', ['Low', 'Medium', 'High']);
            $table->enum('status', ['Tersedia', 'Penuh'])->default('Tersedia');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedules');
    }
};
