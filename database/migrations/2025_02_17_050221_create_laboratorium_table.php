<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('laboratorium', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('institution_id');
            $table->foreign('institution_id')
                ->references('id')->on('institution_lists')
                ->onDelete('cascade');
            $table->string('lab_name');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('laboratorium');
    }
};
