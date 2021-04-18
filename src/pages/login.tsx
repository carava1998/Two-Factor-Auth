import dynamic from 'next/dynamic';
import Link from 'next/link'
import { useEffect } from 'react';
const LoginForm = dynamic(() => import('../components/LoginForm'), );


const LoginPage = () => {

    useEffect(()=>{
        if (window !== undefined && window !== null){
            window?.history.replaceState(null, '', '/login')
        }
    }, [])

    return (
      <div className="flex relative font-dm">
        <div className="h-72 flex w-full justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-full w-2/12 mx-auto flex flex-col content-center h-full flex pt-32">
            <div className="pt-6 pb-20"></div>
            <LoginForm/>
          </div>
        </div>
      </div>
    );
}

export default LoginPage;
