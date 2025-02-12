<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('institution_lists', function (Blueprint $table) {
            $table->string('id')->primary(); // Use a string as the primary key
            $table->string('ins_name');
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('institution_lists');
    }
};

