<?php

namespace App\DAO;

use App\Enum\TransactionStatus;
use App\Enum\TransactionType;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Builder;
use InvalidArgumentException;
use Illuminate\Database\Eloquent\InvalidCastException;

class TransactionDAO {
    /**
     * Create a new Income Transaction.
     *
     * @param array $data
     *
     * @return Transaction
     */
    public static function createIncome(array $data)
    {
        $data['type'] = TransactionType::INCOME;
        $data['date'] = now();

        return Transaction::create($data);
    }

    /**
     * Create a new Expense Transaction.
     *
     * @param array $data
     *
     * @return Transaction
     */
    public static function createExpense(array $data)
    {
        $data['type'] = TransactionType::EXPENSE;
        $data['status'] = TransactionStatus::APPROVED;
        $data['date'] = $data['date'] ?? now();

        return Transaction::create($data);
    }

    /**
     * Approve an Transaction.
     *
     * @param Transaction $transaction
     *
     * @return Transaction
     *
     * @throws InvalidArgumentException
     * @throws InvalidCastException
     */
    public static function approveTransaction(Transaction $transaction)
    {
        $transaction->status = TransactionStatus::APPROVED;
        $transaction->save();

        return $transaction;
    }

    /**
     * Deny an Transaction.
     *
     * @param Transaction $transaction
     *
     * @return Transaction
     *
     * @throws InvalidArgumentException
     * @throws InvalidCastException
     */
    public static function denyTransaction(Transaction $transaction)
    {
        $transaction->status = TransactionStatus::DENIED;
        $transaction->save();

        return $transaction;
    }

    /**
     * A list of all transactions for Admins review.
     *
     * @return mixed
     */
    public static function adminTransactions()
    {
        return Transaction::with(['account.user'])->orderBy('date', 'desc')->get();
    }

    /**
     * A list of all incomes for Admins review.
     *
     * @return mixed
     */
    public static function adminIncomes()
    {
        return Transaction::with(['account.user'])
            ->where('type', TransactionType::INCOME)
            ->orderBy('date', 'desc')
            ->get();
    }

    /**
     * A list of all expenses for Admins review.
     *
     * @return mixed
     */
    public static function adminExpenses()
    {
        return Transaction::with(['account.user'])
            ->where('type', TransactionType::EXPENSE)
            ->orderBy('date', 'desc')
            ->get();
    }

    /**
     * A list of all pending transactions for Admins review.
     *
     * @return mixed
     */
    public static function adminPendingTransactions()
    {
        return Transaction::with(['account.user'])
            ->orderBy('date', 'desc')
            ->where('status', TransactionStatus::PENDING)
            ->get();
    }

    /**
     * A list of all approved transactions for Admins.
     *
     * @return mixed
     */
    public static function adminApprovedTransactions()
    {
        return Transaction::with(['account.user'])
            ->orderBy('date', 'desc')
            ->where('status', TransactionStatus::APPROVED)
            ->get();
    }

    /**
     * A list of all denied transactions for Admins.
     *
     * @return mixed
     */
    public static function adminDeniedTransactions()
    {
        return Transaction::with(['account.user'])
            ->orderBy('date', 'desc')
            ->where('status', TransactionStatus::DENIED)
            ->get();
    }

    /**
     * User's incomes.
     *
     * @param User $user
     *
     * @return Collection<mixed, Builder>
     *
     * @throws InvalidArgumentException
     */
    public static function userIncomes(User $user)
    {
        return Transaction::with(['account.user'])
            ->where('type', TransactionType::INCOME)
            ->where('account_id', $user->account->id)
            ->orderBy('date', 'desc')
            ->get();
    }

    /**
     * User's expenses.
     *
     * @param User $user
     *
     * @return Collection<mixed, Builder>
     *
     * @throws InvalidArgumentException
     */
    public static function userExpenses(User $user)
    {
        return Transaction::with(['account.user'])
            ->where('type', TransactionType::EXPENSE)
            ->where('account_id', $user->account->id)
            ->orderBy('date', 'desc')
            ->get();
    }
}
