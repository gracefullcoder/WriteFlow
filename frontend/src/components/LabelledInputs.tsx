import React from 'react';
import { SignupType } from '@vaibhavgupta11/writeflow_validation';

interface Inputs {
    label: string;
    placeHolder: string;
    name: string;
    details: SignupType;
    setDetails: (update: (prev: SignupType) => SignupType) => void;
}

function LabelledInputs({ label, placeHolder, name, details, setDetails }: Inputs) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div>
            <label htmlFor={name} className='pt-6 block text-lg font-semibold'>{label}</label>
            <input
                id={name}
                name={name}
                type= {name == "password" ? "password" : "text"}
                value={details[name as keyof SignupType] || ''}
                onChange={handleChange}
                placeholder={placeHolder}
                className='rounded border-slate-300 border-2 p-2 w-96'
            />
        </div>
    );
}

export default LabelledInputs;
