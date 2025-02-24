<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table("users")->insert([
            'name' => 'Cristiano Ronaldo',
            'role' => 'KOORDINATOR',
            'email' => 'superadmin@gmail.com',
            'password' => Hash::make('12345678'),
            'email_verified_at' => now()
        ]);

        DB::table("users")->insert([
            'name' => 'Lionel Messi',
            'role' => 'INSTRUKTUR',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('12345678'),
            'email_verified_at' => now()
        ]);

        DB::table("users")->insert([
            'name' => 'Neymar Jr',
            'role' => 'ASISTEN',
            'email' => 'neymar@gmail.com',
            'password' => Hash::make('12345678'),
            'email_verified_at' => now()
        ]);
    }
}
