import { useRouter } from "next/router";
import { useState } from "react"
import { useAuth } from "../../utils/context/auth.context";

type PhoneNumberProps = {
  back:(nv:boolean)=>any
  current:(nv:boolean)=>any
  setNumber:(nmb:string)=>any
}

const PhoneNumberPicker = ({back,current,setNumber}:PhoneNumberProps) =>{

  const router = useRouter();
  const {toggleGetCode} = useAuth()

  const getCode =() => {
    toggleGetCode?toggleGetCode(true):()=>{};
    setTimeout(async()=>{
      await router.push('/confirmCode');
      current(false)
    },1000)
  }

  return (
    <div className="pt-6 pb-12">
      <label>
          Numero de telefono
      </label>
      <input
          className="flex flex-row appearance-none rounded-md relative block w-full px-3 py-2 mt-2 mb-8 border border-gray-300 text-gray-900 rounded-t-md "
          name="number"
          type="string"
          placeholder="000-000-00-00"
          onChange={(event)=>{setNumber(event.target.value)}}
          required
      />
      <div className="mt-6 flex flex-row justify-between">
          <button
              onClick={()=>{back(true);current(false)}}
              type="submit"
              className="group relative w-5/12 flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-dm rounded-md text-white bg-indigo-700 hover:bg-indigo-400 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-900 transition duration-150 ease-in-out"
              title="Ingresar a Leadsales"
          >
              Atras
              <svg xmlns="http://www.w3.org/2000/svg" className=" ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
          </button>
          <button
              onClick={getCode}
              type="submit"
              className="group relative w-5/12 flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-dm rounded-md text-white bg-indigo-700 hover:bg-indigo-400 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-900 transition duration-150 ease-in-out"
              title="Ingresar a Leadsales"
          >
              Siguiente
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
          </button>
      </div>
    </div>
  )
}

export default PhoneNumberPicker;