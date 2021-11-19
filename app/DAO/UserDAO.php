<?php

namespace App\DAO;

use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserDAO {
    /**
     * Create new User.
     *
     * @param array $data
     *
     * @return mixed
     */
    public static function create(array $data)
    {
        return User::create($data);
    }
}
