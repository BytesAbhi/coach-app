<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('coach_logins', function (Blueprint $table) {
            $table->id();
            $table->string('image')->nullable(); 
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('contact')->nullable(); 
            $table->string('description')->nullable(); 
            $table->string('sports')->nullable(); 
            $table->string('city')->nullable();
            $table->string('available')->nullable(); 
            $table->time('available_from')->nullable(); 
            $table->time('available_to')->nullable(); 
            $table->decimal('cost', 8, 2)->nullable(); 
            $table->decimal('TokenId', 8, 2)->nullable(); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coach_logins');
    }
};