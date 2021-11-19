import React, { useCallback, useState } from 'react';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import Customer from '@/Layouts/Customer';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, useForm } from '@inertiajs/inertia-react';
import IntlCurrencyInput from 'react-intl-currency-input';
import { useDropzone } from 'react-dropzone';

export default function Deposit(props) {
    const { data, setData, post, processing, errors, reset, progress } = useForm({
        amount: '',
        description: '',
        check: '',
    });

    const [checkFile, setCheckFile] = useState(null);

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];

        setCheckFile(Object.assign(file, {
            preview: URL.createObjectURL(file)
        }));

        setData('check', file);
    };

    const {getRootProps, getInputProps, isDragActive} = useDropzone({ onDrop });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const onHandleAmountChange = (event, value) => {
      event.preventDefault();

      setData('amount', value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('customer.storeIncome'), {
            forceFormData: true,
        });
    };

    const renderHelperTextOrPhoto = () => {
        if (!checkFile) {
            return (<p>Drag 'n' drop your check photo, or click to select one</p>);
        }

        return (<img src={checkFile?.preview} />);
    };

    return (
        <Customer
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Bank | New Deposit" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 my-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-5">
                    <ValidationErrors errors={errors} />

                    <form onSubmit={submit} encType="multipart/form-data">
                        <div>
                            <Label forInput="amount" value="Amount" />

                            <div className="flex flex-col items-start">
                                <IntlCurrencyInput
                                    type="text"
                                    className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                    onChange={onHandleAmountChange}
                                />
                            </div>
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
                            <div {...getRootProps()}>
                                <input {...getInputProps()}
                                    multiple={false}
                                />

                                <div className="border rounded border-blue-500 p-5 flex items-center justify-center">
                                    {
                                        isDragActive ?
                                        <p>Drop the check photo here ...</p> :
                                        renderHelperTextOrPhoto()
                                    }
                                </div>
                            </div>

                            {progress && (
                                <progress value={progress.percentage} max="100">
                                    {progress.percentage}%
                                </progress>
                            )}
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
