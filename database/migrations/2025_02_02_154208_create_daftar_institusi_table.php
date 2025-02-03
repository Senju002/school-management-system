<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('daftar_institusi', function (Blueprint $table) {
            $table->id();
            $table->string('kode_ins')->unique();
            $table->string('nama_ins');
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('daftar_institusi');
    }
};

