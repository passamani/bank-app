<?php

namespace App\Http\Controllers;

use App\DAO\AccountDAO;
use App\DAO\TransactionDAO;
use App\Models\User;
use Faker\Provider\Uuid;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function dashboard(Request $request)
    {
        $transactions = $request->user()->account->transactions;

        return Inertia::render('Customer/Dashboard', compact('transactions'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function deposit()
    {
        return Inertia::render('Customer/Deposit');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function purchase()
    {
        return Inertia::render('Customer/Purchase');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\Response
     */
    public function storeIncome(Request $request)
    {
        $data = $request->validate([
            'amount' => 'required|numeric',
            'description' => 'required|string',
            'check' => 'required|file',
        ]);

        $data['account_id'] = $request->user()->account->id;
        $data['check_image'] = base64_encode($request->check->get());

        TransactionDAO::createIncome($data);

        return response()->redirectToRoute('customer.dashboard');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\Response
     */
    public function storeExpense(Request $request)
    {
        $data = $request->validate([
            'amount' => 'required|numeric',
            'description' => 'required|string',
            'date' => 'nullable|date',
        ]);

        $account = $request->user()->account;
        $data['account_id'] = $account->id;

        if ($account->balance && $account->balance->total >= (float) $data['amount']) {
            TransactionDAO::createExpense($data);

            return response()->redirectToRoute('customer.dashboard');
        }

        return back()->withErrors([
            'balance' => "You don't have enough balance."
        ]);
    }

    /**
     * All deposits of authenticated User.
     *
     * @param Request $request
     *
     * @return Response
     */
    public function deposits(Request $request)
    {
        $transactions = TransactionDAO::userIncomes($request->user());

        return Inertia::render('Customer/Deposits', compact('transactions'));
    }

    /**
     * All purchases of authenticated User.
     *
     * @param Request $request
     *
     * @return Response
     */
    public function purchases(Request $request)
    {
        $transactions = TransactionDAO::userExpenses($request->user());

        return Inertia::render('Customer/Purchases', compact('transactions'));
    }
}
