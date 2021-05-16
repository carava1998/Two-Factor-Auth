import dynamic from 'next/dynamic';
import Link from 'next/link'
import { useEffect } from 'react';
const Login = dynamic(() => import('../components/Login'), );


const LoginPage = () => {

    useEffect(()=>{
        if (window !== undefined && window !== null){
            window?.history.replaceState(null, '', '/login')
        }
    }, [])

    return (
      <div className="font-sans antialiased text-gray-900 h-screen leading-normal tracking-wider bg-cover" style={{backgroundImage:"url('https://source.unsplash.com/1L71sPT5XKc')"}}>
        <div className="h-72 flex w-full justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-full w-3/12 mx-auto flex flex-col content-center h-full flex pt-32">
            <Login/>
          </div>
        </div>
      </div>
    );
}

export default LoginPage;
