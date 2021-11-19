<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return response()->redirectToRoute('login');
});

/**
 * Customer routes.
 */
Route::middleware(['auth', 'isCustomer'])->name('customer.')->prefix('customer')->group(function () {
    // GET: /customer/dashboard
    Route::get('dashboard', [CustomerController::class, 'dashboard'])->name('dashboard');

    // GET: /customer/dashboard/deposit
    Route::get('/deposit', [CustomerController::class, 'deposit'])->name('deposit');

    // POST: /customer/dashboard/create-income
    Route::post('/create-income', [CustomerController::class, 'storeIncome'])->name('storeIncome');

    // GET: /customer/dashboard/purchase
    Route::get('/purchase', [CustomerController::class, 'purchase'])->name('purchase');

    // POST: /customer/dashboard/create-expense
    Route::post('/create-expense', [CustomerController::class, 'storeExpense'])->name('storeExpense');

    // GET: /customer/dashboard/purchases
    Route::get('/purchases', [CustomerController::class, 'purchases'])->name('purchases');

    // GET: /customer/dashboard/deposits
    Route::get('/deposits', [CustomerController::class, 'deposits'])->name('deposits');
});

/**
 * Admin routes.
 */
Route::middleware(['auth', 'isAdmin'])->name('admin.')->prefix('admin')->group(function () {
    // GET: /admin/dashboard
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');

    /**
     * Admin's transactions routes.
     */
    Route::name('transactions.')->prefix('transactions')->group(function() {
        // GET: /admin/transactions/{transaction}
        Route::get('{transaction}', [AdminController::class, 'transaction'])->name('show');

        // PUT: /admin/transactions/{transaction}/approve
        Route::put('{transaction}/approve', [AdminController::class, 'approveTransaction'])->name('approve');

        // PUT: /admin/transactions/{transaction}/deny
        Route::put('{transaction}/deny', [AdminController::class, 'denyTransaction'])->name('deny');
    });
});

require __DIR__.'/auth.php';
