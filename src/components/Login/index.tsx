import {FormEvent, useEffect, useState} from "react";
import 'firebase/auth';
import 'firebase/functions';
import PhoneNumberPicker from "../PhoneNumberPicker";
import { useAuth } from "../../utils/context/auth.context";
import { useRouter } from "next/router";

const Login = () => {

    const {email, setEmail,password,setPassword,setNumber, isRegister} = useAuth();
    const [hide, setHide] = useState<boolean>(true);
    const [remember, serRemember] = useState<boolean>(true)
    const [showLogIn, toggleShowLogIn] = useState<boolean>(true)
    const [showNumberPicker, toggleNumberPicker] = useState<boolean>(false)

    const renderLogIn = () =>{
        const router = useRouter()

        return(
            <div className="pb-12">
                <label>
                    Email
                </label>
                <input
                    className="flex flex-row appearance-none rounded-md relative block w-full px-3 py-2 mt-2 mb-8 border border-gray-300 text-gray-900 rounded-t-md "
                    name="email"
                    type="email"
                    placeholder="Ingresa email"
                    value={email?email:""}
                    onChange={(event)=>{setEmail?setEmail(event.target.value):()=>{}}}
                    required
                />

                <label>
                    Contraseña
                    <div className=" flex flex-row relative items-center">
                        <input
                            className={" appearance-none rounded-md relative block w-full px-3 py-2  mt-2 mb-2 border border-gray-300 text-gray-900 rounded-t-md outline-none"}
                            name="Password"
                            placeholder="Ingresa contraseña"
                            onChange={(event)=>{setPassword? setPassword(event.target.value):()=>{}}}
                            type={ hide ? 'password' : 'text' }
                            value={password?password:""}
                            required
                        />

                    </div>
                </label>
                <div className="mt-6">
                    {!isRegister && <button
                        onClick={()=>{router.push('/register')}}
                        type="submit"
                        className="group relative w-full flex justify-center py-2 mb-4 px-4 border border-transparent text-sm leading-5 font-dm rounded-md text-white bg-yellow-700 hover:bg-yellow-600  transition duration-150 ease-in-out"
                        title="Registarse"
                    >
                        Registrarse
                    </button>}
                    {isRegister && <button
                        onClick={()=>{router.push('/login')}}
                        type="submit"
                        className="group relative w-full flex justify-center py-2 mb-4 px-4 border border-transparent text-sm leading-5 font-dm rounded-md text-white bg-yellow-700 hover:bg-yellow-600  transition duration-150 ease-in-out"
                        title="Registarse"
                    >
                        Log In
                    </button>}

                    <button
                        onClick={()=>{toggleShowLogIn(false);toggleNumberPicker(true)}}
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-dm rounded-md text-white bg-yellow-700 hover:bg-yellow-600 transition duration-150 ease-in-out"
                        title="Ingresar a Leadsales"
                    >
                        {isRegister?"Registrarse": "Log In"}
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div
            className="bg-white px-8 rounded "
        >
            <div className="grid justify-items-center">
                <div className="text-3xl font-bold pt-8">Two Factor Auth</div>
                <div className="text-xl pt-4">{isRegister? "Registrarse": "Sign In"}</div>
            </div>
            {showLogIn && renderLogIn()}
            {showNumberPicker && <PhoneNumberPicker back={toggleShowLogIn} current={toggleNumberPicker} setNumber={setNumber?setNumber:()=>{}}/>}
        </div>
    );
}

export default Login;
