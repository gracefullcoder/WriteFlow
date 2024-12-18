import { useState } from 'react'
import { SignupType } from '@vaibhavgupta11/writeflow_validation';
import LabelledInputs from './LabelledInputs';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';



function Auth({ type }: { type: "SignIn" | "SignUp" }) {
    const navigate = useNavigate();
    const [details, setDetails] = useState<SignupType>({
        name: "",
        email: "",
        password: ""
    });

    const signIn = async () => {
        console.log(import.meta.env.VITE_SERVER);
        const res = await axios.post(`${import.meta.env.VITE_SERVER}/user/signin`,details);
        localStorage.setItem("token", res.data.jwt);
        navigate("/blog`");
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='font-extrabold text-3xl'>Create an account</h1>
            {type == "SignIn" ? 
            <p className='mt-1 text-lg text-slate-500'>Don't have an account? <Link className='underline' to=  "/signup">"Sign Up"</Link></p>
            :
            <p className='mt-1 text-lg text-slate-500'>Already have an account? <Link className='underline' to= "/signin">Login</Link></p>
            }
            <div className='mt-4' aria-label='inputs'>
                {type == "SignUp" && <LabelledInputs label={"Username"} name={"name"} details={details} setDetails={setDetails} placeHolder='enter username' />}
                <LabelledInputs label={"Email"} name={"email"} details={details} setDetails={setDetails} placeHolder='enter email' />
                <LabelledInputs label={"Password"} name={"password"} details={details} setDetails={setDetails} placeHolder='enter password' />
            </div>

            <button className="mt-4 w-96 bg-black hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded" onClick={signIn}>{type}</button>
        </div>
    )
}

export default Auth