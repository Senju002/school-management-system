<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('jenis_institusi', function (Blueprint $table) {
            $table->id();
            $table->string('kode_jenis_ins')->unique();
            $table->string('nama_jenis_ins');
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('jenis_institusi');
    }
};

