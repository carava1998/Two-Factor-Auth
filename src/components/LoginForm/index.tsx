import {FormEvent, useEffect, useState} from "react";

import {useRouter} from "next/router";
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/functions';

const LoginForm = () => {

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [password,setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [hide, setHide] = useState<boolean>(true);
    const [remember, serRemember] = useState<boolean>(true)

    const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (loading) {return}
        setLoading(true)

        try {
            await firebase.auth().signInWithEmailAndPassword(`${email}`, `${password}`);
            setLoading(false)
            await router.push('/');
        } catch (err) {
            console.error(err);
            setLoading(false)
        }
    };

    return (
        <form
            className="-mt-10   "
            onSubmit={handleSubmit}
            noValidate
        >
            <label>
                Email
            </label>
            <input
                className="flex flex-row appearance-none rounded-md relative block w-full px-3 py-2 mt-2 mb-8 border border-gray-300 text-gray-900 rounded-t-md "
                name="email"
                type="email"
                placeholder="Ingresa email"
                value={email?email:""}
                onChange={(event)=>{setEmail(event.target.value)}}
                required
            />

            <label>
                Contraseña
                <div className=" flex flex-row relative items-center">
                    <input
                        className={" appearance-none rounded-md relative block w-full px-3 py-2  mt-2 mb-2 border border-gray-300 text-gray-900 rounded-t-md outline-none"}
                        name="Password"
                        placeholder="Ingresa contraseña"
                        onChange={(event)=>{setPassword(event.target.value)}}
                        type={ hide ? 'password' : 'text' }
                        value={password?password:""}
                        required
                    />

                </div>
            </label>
            <input
                name="CheckBox"
                type="checkbox"
                checked={remember}
                onChange={(e)=>{
                    console.log(e.target.value)
                    serRemember(!remember)
                }}/> Recordar mi usuario
            <div className="mt-6">
                <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-dm rounded-md text-white bg-indigo-700 hover:bg-indigo-400 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-900 transition duration-150 ease-in-out"
                    title="Ingresar a Leadsales"
                >
                  Hola
                </button>
            </div>


        </form>
    );
}

export default LoginForm;
