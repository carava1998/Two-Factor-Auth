
import firebase from "firebase";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react"
import { useAuth } from "../utils/context/auth.context";
import { sendMessageCode } from "../utils/helper/message.helper";

export const getServerSideProps: GetServerSideProps = ctx => sendMessageCode(ctx);

const ConfirmCode = () =>{
  const router = useRouter()
  const { code,email,password, isRegister } = useAuth()
  const [number,setNumber] = useState<string>("0")

  const registerUser = async () =>{
    try {
      await firebase.auth().createUserWithEmailAndPassword(`${email}`, `${password}`);
      await router.push('/');
    } catch (err) {
        await router.push('/');
        console.error(err);
    }
  }

  const logInSubmit = async () => {
    try {
        await firebase.auth().signInWithEmailAndPassword(`${email}`, `${password}`);
        await router.push('/');
    } catch (err) {
        await router.push('/');
        console.error(err);
    }
};

  const validateCode = async () =>{
    if(number === code && !isRegister){
      logInSubmit()
    }
    else if (number === code && isRegister){
      registerUser()
    }else{
      await router.push("/login")
    }
  }

  return (
    <div className="font-sans antialiased text-gray-900 h-screen leading-normal tracking-wider bg-cover" style={{backgroundImage:"url('https://source.unsplash.com/1L71sPT5XKc')"}}>
      <div className="h-72 flex w-full justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-full w-3/12 mx-auto flex flex-col content-center h-full flex pt-32">
          <div
            className="bg-white px-8 rounded "
          >
            <div className="grid justify-items-center">
                <div className="text-3xl font-bold pt-8">Two Factor Auth</div>
                <div className="text-xl pt-4">{isRegister? "Registrar" : "Sign In"}</div>
            </div>
            <div className="pt-6 pb-12">
              <label>
                  Ingresa el codigo enviado
              </label>
              <input
                  className="flex flex-row appearance-none rounded-md relative block w-full px-3 py-2 mt-2 mb-8 border border-gray-300 text-gray-900 rounded-t-md "
                  name="code"
                  type="string"
                  placeholder="xxxxxxxx"
                  onChange={(event)=>{setNumber(event.target.value)}}
                  required
              />
              <div className="mt-6">
                <button
                    onClick={validateCode}
                    type="submit"
                    className="group relative w-full flex justify-center py-2 mb-4 px-4 border border-transparent text-sm leading-5 font-dm rounded-md text-white bg-yellow-700 hover:bg-yellow-600  transition duration-150 ease-in-out"
                    title="Ingresar a Two FActor Auth"
                >
                    Confirmar
                </button>
                <button
                    onClick={async ()=>{await router.push("/login")}}
                    type="submit"
                    className="group relative w-full mt-8 flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-dm rounded-md text-white bg-gray-700 hover:bg-gray-400 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-900 transition duration-150 ease-in-out"
                    title="Ingresar a Two FActor Auth"
                >
                    Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmCode;