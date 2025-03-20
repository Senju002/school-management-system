<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('institution_user_positions', function (Blueprint $table) {
            $table->id();
            // Use unsignedBigInteger for user_id since users.id is BIGINT (auto-increment)
            $table->unsignedBigInteger('user_id');

            // Use string for position_id and institution_id as needed
            $table->string('position_id');
            $table->string('institution_id');

            // Define foreign key constraints
            $table->foreign('user_id')
                ->references('id')->on('users') // references the 'id' column in the 'users' table
                ->onDelete('cascade');

            // Foreign key for position_id (assuming 'id' is a string in 'positions' table)
            $table->foreign('position_id')
                ->references('id')->on('positions')
                ->onDelete('cascade');

            // Foreign key for institution_id (assuming 'id' is a string in 'institution_lists' table)
            $table->foreign('institution_id')
                ->references('id')->on('institution_lists')
                ->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('institution_user_positions');
    }
};
