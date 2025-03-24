<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Initialize Faker
        $faker = Faker::create();

        // Define roles
        $roles = ['KOORDINATOR', 'INSTRUKTUR', 'ASISTEN'];

        // // Loop to create users
        // for ($i = 0; $i < 10; $i++) { // Create 10 random users
        //     $name = $faker->name; // Generate a random name
        //     $role = $roles[array_rand($roles)]; // Randomly select a role
        //     $email = $faker->unique()->safeEmail; // Generate a unique email
        //     $password = Hash::make('12345678'); // Default password

        //     DB::table('users')->insert([
        //         'name' => $name,
        //         'role' => $role,
        //         'email' => $email,
        //         'password' => $password,
        //         'email_verified_at' => now(),
        //     ]);
        // }
        
        // specific users 
        DB::table('users')->insert([
            'name' => 'Cristiano Ronaldo',
            'role' => 'KOORDINATOR',
            'email' => 'superadmin@gmail.com',
            'password' => Hash::make('12345678'),
            'email_verified_at' => now(),
        ]);

        DB::table('users')->insert([
            'name' => 'Lionel Messi',
            'role' => 'INSTRUKTUR',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('12345678'),
            'email_verified_at' => now(),
        ]);

        DB::table('users')->insert([
            'name' => 'Neymar Jr',
            'role' => 'ASISTEN',
            'email' => 'neymar@gmail.com',
            'password' => Hash::make('12345678'),
            'email_verified_at' => now(),
        ]);
    }
}
