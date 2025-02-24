<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('location');
            $table->string('address');
            $table->date('date');
            $table->string('time');
            $table->text('content')->nullable();
            $table->text('longDescription')->nullable();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();

            // Verhindert Duplikate basierend auf Titel, Datum, Zeit und Location
            $table->unique(['title', 'date', 'time', 'location']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('events');
    }
};
