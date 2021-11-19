import React, { useEffect } from 'react';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import Customer from '@/Layouts/Customer';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, useForm } from '@inertiajs/inertia-react';
import IntlCurrencyInput from 'react-intl-currency-input';

export default function Purchase(props) {
    const { data, setData, post, processing, errors, reset, progress } = useForm({
        amount: '',
        date: '',
        description: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const onHandleAmountChange = (event, value, maskedValue) => {
      event.preventDefault();

      setData('amount', value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('customer.storeExpense'));
    };

    return (
        <Customer
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Bank | New Purchase" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 my-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-5">
                    <ValidationErrors errors={errors} />

                    <form onSubmit={submit} encType="multipart/form-data">
                        <div>
                            <Label forInput="amount" value="Amount" />

                            <IntlCurrencyInput
                                type="text"
                                className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                onChange={onHandleAmountChange}
                            />
                        </div>

                        <div className="mt-4">
                            <Label forInput="description" value="Description" />

                            <Input
                                type="text"
                                name="description"
                                value={data.description}
                                className="mt-1 block w-full"
                                autoComplete="description"
                                handleChange={onHandleChange}
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <Label forInput="date" value="Date" />

                            <Input
                                type="date"
                                name="date"
                                value={data.date}
                                className="mt-1 block w-full"
                                autoComplete="date"
                                handleChange={onHandleChange}
                            />
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <Button className="ml-4" processing={processing}>
                                Register
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Customer>
    );
}
