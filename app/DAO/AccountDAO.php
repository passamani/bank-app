<?php

namespace App\DAO;

use App\Enum\TransactionStatus;
use App\Enum\TransactionType;
use App\Models\Account;
use App\Models\User;
use InvalidArgumentException;
use stdClass;

class AccountDAO {
    /**
     * Create a new Account.
     *
     * @param User $user
     *
     * @return mixed
     */
    public static function create(User $user)
    {
        // Generate random account number.
        $accountNumber = rand(0,999999);
        $accountNumber = str_pad($accountNumber, 6, 0, STR_PAD_LEFT);

        return Account::create([
            'user_id' => $user->id,
            'number' => $accountNumber,
        ]);
    }

    /**
     * Get the balance of the Account.
     *
     * @param Account $account
     *
     * @return stdClass
     *
     * @throws InvalidArgumentException
     */
    public static function getBalance(Account $account)
    {
        $balance = new stdClass();

        $balance->incomes = $account->transactions()
            ->where('type', TransactionType::INCOME)
            ->where('status', TransactionStatus::APPROVED)
            ->sum('amount');

        $balance->expenses = $account->transactions()
            ->where('type', TransactionType::EXPENSE)
            ->where('status', TransactionStatus::APPROVED)
            ->sum('amount');

        $balance->total = $balance->incomes - $balance->expenses;

        return $balance;
    }
}
