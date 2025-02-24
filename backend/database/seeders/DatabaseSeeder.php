<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
  public function run()
  {
    // Admin-User
    User::create([
      'firstname' => 'Admin',
      'lastname' => 'User',
      'email' => 'admin@example.com',
      'password' => Hash::make('password123'),
    ]);
  }
}
