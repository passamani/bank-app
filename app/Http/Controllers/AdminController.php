<?php

namespace App\Http\Controllers;

use App\DAO\TransactionDAO;
use App\Models\Transaction;
use Illuminate\Http\RedirectResponse;
use Illuminate\Database\Eloquent\InvalidCastException;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use InvalidArgumentException;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function dashboard()
    {
        $pendingTransactions = TransactionDAO::adminIncomes();

        return Inertia::render('Admin/Dashboard', [
            'transactions' => $pendingTransactions,
        ]);
    }

    /**
     * Show the page to approve or deny an Transaction.
     *
     * @param Request $request
     * @param Transaction $transaction
     *
     * @return Response
     */
    public function transaction(Transaction $transaction)
    {
        $transaction->load(['account.user']);

        return Inertia::render('Admin/Transaction', [
            'transaction' => $transaction,
        ]);
    }

    /**
     * Approves an Transaction.
     *
     * @param Request $request
     * @param Transaction $transaction
     *
     * @return RedirectResponse
     *
     * @throws InvalidArgumentException
     * @throws InvalidCastException
     * @throws BindingResolutionException
     */
    public function approveTransaction(Transaction $transaction)
    {
        TransactionDAO::approveTransaction($transaction);

        return response()->redirectToRoute('admin.dashboard');
    }

    /**
     * Denies an Transaction.
     *
     * @param Request $request
     * @param Transaction $transaction
     *
     * @return RedirectResponse
     *
     * @throws InvalidArgumentException
     * @throws InvalidCastException
     * @throws BindingResolutionException
     */
    public function denyTransaction(Transaction $transaction)
    {
        TransactionDAO::denyTransaction($transaction);

        return response()->redirectToRoute('admin.dashboard');
    }
}
