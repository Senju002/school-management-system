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
        Schema::create('subject_lists', function (Blueprint $table) {
    
            $table->string('id')->primary();
            $table->string('ins_id');
            $table->foreign('ins_id')
                ->references('id')->on('institution_lists')
                ->onDelete('cascade');
            $table->string('subject_name');
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
        Schema::dropIfExists('subject_lists');
    }
};
