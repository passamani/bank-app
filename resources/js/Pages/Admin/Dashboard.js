import React, { useCallback, useState } from 'react';
import Admin from '@/Layouts/Admin';
import { Head, Link } from '@inertiajs/inertia-react';
import { TransactionStatus, TransactionType } from '@/utils/constants';
import { currencyFormatter } from '@/utils/helpers';

export default function Dashboard(props) {
    const [transactionStatusFilter, setTransactionStatusFilter] = useState(TransactionStatus.PENDING);

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

            return (<Link href={route('admin.transactions.show', [transaction])} key={transaction.id} className="flex items-center justify-between py-2 hover:opacity-75">
                <div className="flex flex-col items-start justify-center text-blue-500">
                    <span className="block mb-1 font-bold text-md">{transaction.description}</span>
                    <span className="block text-md">{transactionDate.toLocaleDateString()} {transactionDate.toLocaleTimeString()}</span>
                </div>

                <span className="block text-xl font-bold text-blue-500">{currencyFormatter.format(transaction.amount)}</span>
            </Link>);
        });

        if (!filteredTransactions) {
            return (<div>
                <span className="inline-block">Without deposits to show.</span>
            </div>);
        }

        return transactionsElements;
    };

    return (
        <Admin
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Bank | Admin Dashboard" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 my-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <div className="flex flex-col items-between justify-center h-full">
                            <span className="text-3xl">Deposits</span>

                            <div className="flex items-center justify-between my-8">
                                <button type="button" onClick={() => setTransactionStatusFilter(TransactionStatus.PENDING)} className={`text-xl border-b-2 border-transparent p-2 w-full ${transactionStatusFilter === TransactionStatus.PENDING ? 'border-b-2 border-blue-500' : ''}`}>Pending</button>
                                <button type="button" onClick={() => setTransactionStatusFilter(TransactionStatus.APPROVED)} className={`text-xl border-b-2 border-transparent p-2 w-full ${transactionStatusFilter === TransactionStatus.APPROVED ? 'border-b-2 border-blue-500' : ''}`}>Approved</button>
                                <button type="button" onClick={() => setTransactionStatusFilter(TransactionStatus.DENIED)} className={`text-xl border-b-2 border-transparent p-2 w-full ${transactionStatusFilter === TransactionStatus.DENIED ? 'border-b-2 border-blue-500' : ''}`}>Denied</button>
                            </div>

                            <div className="mt-3 divide-y-2">
                                {renderTransactionsList()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Admin>
    );
}
