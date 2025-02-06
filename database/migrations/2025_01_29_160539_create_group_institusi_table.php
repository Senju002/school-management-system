<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('institution_group', function (Blueprint $table) {
            $table->id();
            $table->string('ins_group_id')->unique();
            $table->string('ins_group_name');
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('institution_group');
    }
};
