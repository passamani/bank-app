import React, { useCallback, useState } from 'react';
import Customer from '@/Layouts/Customer';
import { Head, Link } from '@inertiajs/inertia-react';
import { TransactionType, TransactionStatus } from '@/utils/constants';
import { currencyFormatter } from '@/utils/helpers';

export default function Dashboard(props) {
    const [transactionStatusFilter, setTransactionStatusFilter] = useState(TransactionStatus.APPROVED);

    const handleChangeTransactionStatusFilter = (transactionStatusFilter) => {
        setTransactionStatusFilter(transactionStatusFilter);
    };

    const renderTransactionsList = () => {
        const transactions = props.transactions;
        let filteredTransactions = 0;

        const transactionsElements = transactions.map((transaction) => {
            // Filter transactions
            if (transaction.status !== transactionStatusFilter) {
                return false;
            }

            filteredTransactions++;

            const transactionDate = new Date(transaction.date);

            return (<div key={transaction.id} className="flex items-center justify-between py-2">
                <div className="flex flex-col items-start justify-center text-blue-500">
                    <span className="block mb-1 font-bold text-md">{transaction.description}</span>
                    <span className="block text-md">{transactionDate.toLocaleDateString()}</span>
                </div>

                { transaction.type === TransactionType.INCOME
                    ? <span className="block text-xl font-bold text-blue-500">{currencyFormatter.format(transaction.amount)}</span>
                    : <span className="block text-xl font-bold text-red-500">-{currencyFormatter.format(transaction.amount)}</span>
                }
            </div>);
        });

        if (!filteredTransactions) {
            return (<div className="w-full flex items-center justify-center text-3xl">
                <span className="inline-block">Without transactions to show</span>
            </div>);
        }

        return (transactionsElements);
    };

    return (
        <Customer
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Bank | Dashboard" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 my-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200 divide-y-2 divide-dotted">
                        <div className="flex justify-between items-center flex-col md:flex-row py-6">
                            <div className="flex flex-col items-center justify-center text-2xl md:items-start">
                                <span className="font-bold">{currencyFormatter.format(props.auth.user.account.balance.total)}</span>
                                <span>Current Balance</span>
                            </div>

                            <div className="flex justify-center items-center mt-3 md:mt-0">
                                <Link href={route('customer.deposit')} className="text-blue-500 flex flex-col items-center justify-center hover:opacity-75">
                                    <span className="font-bold">INCOMES {currencyFormatter.format(props.auth.user.account.balance.incomes)}</span>
                                    <span className="underline">Deposit check</span>
                                </Link>

                                <Link href={route('customer.purchase')} className="text-blue-500 flex flex-col items-center justify-center hover:opacity-75 ml-12">
                                    <span className="font-bold">EXPENSES {currencyFormatter.format(props.auth.user.account.balance.expenses)}</span>
                                    <span className="underline">Purchase</span>
                                </Link>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <button type="button" onClick={() => handleChangeTransactionStatusFilter(TransactionStatus.APPROVED)} className={`text-xl border-b-2 border-transparent p-2 w-full ${transactionStatusFilter === TransactionStatus.APPROVED ? 'border-blue-500' : ''}`}>Approved</button>
                            <button type="button" onClick={() => handleChangeTransactionStatusFilter(TransactionStatus.PENDING)} className={`text-xl border-b-2 border-transparent p-2 w-full ${transactionStatusFilter === TransactionStatus.PENDING ? 'border-blue-500' : ''}`}>Pending</button>
                            <button type="button" onClick={() => handleChangeTransactionStatusFilter(TransactionStatus.DENIED)} className={`text-xl border-b-2 border-transparent p-2 w-full ${transactionStatusFilter === TransactionStatus.DENIED ? 'border-blue-500' : ''}`}>Denied</button>
                        </div>

                        <div>
                            <div className="mt-10 divide-y-2">
                                {renderTransactionsList()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Customer>
    );
}
