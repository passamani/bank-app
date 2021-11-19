import React, { useCallback, useState, useEffect } from 'react';
import Button from '@/Components/Button';
import Admin from '@/Layouts/Admin';
import { Head, Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import { TransactionStatus, TransactionType } from '@/utils/constants';
import { currencyFormatter } from '@/utils/helpers';

export default function CreateExpense(props) {
    const [processing, setProcessing] = useState(false);

    const approve = useCallback((e) => {
        e.preventDefault();

        setProcessing(true);
        Inertia.visit(route('admin.transactions.approve', [props.transaction]), {
            method: 'put',
            onSuccess: () => setProcessing(false),
            onError: () => setProcessing(false),
        });
    }, [props.transaction]);

    const deny = useCallback((e) => {
        e.preventDefault();

        setProcessing(true);
        Inertia.visit(route('admin.transactions.deny', [props.transaction]), {
            method: 'put',
            onSuccess: () => setProcessing(false),
            onError: () => setProcessing(false),
        });
    }, [props.transaction]);

    const renderApproveOrDenyButtons = useCallback(() => {
        if (props.transaction.status !== TransactionStatus.PENDING) {
            return false;
        }

        return (<>
            <button aria-label="Accept deposit" type="button" onClick={approve} disabled={processing} className={`inline-flex items-center px-4 py-2 bg-blue-500 border border-blue-500 rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-blue-500 transition ease-in-out duration-150 ${processing && 'opacity-25'} hover:opacity-75`}>
                Accept
            </button>

            <button aria-label="Reject deposit" type="button" onClick={deny} disabled={processing} className={`ml-4 inline-flex items-center px-4 py-2 bg-white border border-blue-500 rounded-md font-semibold text-xs text-black-500 uppercase tracking-widest active:bg-white transition ease-in-out duration-150 hover:bg-blue-500 hover:text-white ${processing && 'opacity-25'} hover:opacity-75`}>
                Reject
            </button>
        </>);
    }, [props.transaction]);

    return (
        <Admin
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Bank | Check Details" />

            <section className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-5">
                    {/* Check details */}
                    <div className="block">
                        {/* Customer name */}
                        <div className="flex flex-col items-start justify-center mb-4">
                            <span className="text-lg text-blue-300 font-bold">Customer</span>
                            <span className="text-2xl text-blue-500">{props.transaction.account.user.name}</span>
                        </div>

                        {/* Customer email */}
                        <div className="flex flex-col items-start justify-center mb-4">
                            <span className="text-lg text-blue-300 font-bold">Customer email</span>
                            <span className="text-2xl text-blue-500">{props.transaction.account.user.email}</span>
                        </div>

                        {/* Account number */}
                        <div className="flex flex-col items-start justify-center mb-4">
                            <span className="text-lg text-blue-300 font-bold">Customer account</span>
                            <span className="text-2xl text-blue-500">{props.transaction.account.number}</span>
                        </div>

                        {/* Transaction amount */}
                        <div className="flex flex-col items-start justify-center mb-4">
                            <span className="text-lg text-blue-300 font-bold">Reported Amount</span>
                            <span className="text-2xl text-blue-500">{currencyFormatter.format(props.transaction.amount)}</span>
                        </div>

                        {/* Transaction amount */}
                        <div className="flex flex-col items-start justify-center mb-4">
                            <img src={`data:image/jpeg;base64,${props.transaction.check_image}`} alt={`Deposit ${props.transaction.id} - check photo`} />
                        </div>
                    </div>

                    {/* Approve or Deny buttons */}
                    {renderApproveOrDenyButtons()}
                </div>
            </section>
        </Admin>
    );
}
