<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up()
  {
    Schema::create('registration', function (Blueprint $table) {
      $table->id();
      $table->string('email');
      $table->string('firstname');
      $table->string('lastname');
      $table->foreignId('event_id')->constrained()->cascadeOnDelete();
      $table->foreignId('user_id')->nullable()->constrained()->cascadeOnDelete();
      $table->timestamps();
    });
  }

  public function down()
  {
    Schema::dropIfExists('registration');
  }
};
