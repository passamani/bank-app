<?php

namespace Database\Seeders;

use App\Enum\UserType;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class CreateAdminUser extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (!User::where('type', UserType::ADMIN)->exists()) {
            User::create([
                'name' => 'Admin',
                'type' => UserType::ADMIN,
                'email' => 'admin@example.com',
                'username' => 'admin',
                'password' => Hash::make('12345678')
            ]);
        }
    }
}
