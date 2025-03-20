<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('schedule_lists', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('lab_id');
            $table->string('subject_id');
            $table->unsignedBigInteger('user_id');
            $table->string('class_id');

            $table->foreign('lab_id')
                ->references('id')->on('lab_computers')
                ->onDelete('cascade');
            $table->foreign('subject_id')
                ->references('id')->on('subject_lists')
                ->onDelete('cascade');
            $table->foreign('user_id')
                ->references('id')->on('users')
                ->onDelete('cascade');
            $table->foreign('class_id')
                ->references('id')->on('class_lists')
                ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('schedule_lists');
    }
};
