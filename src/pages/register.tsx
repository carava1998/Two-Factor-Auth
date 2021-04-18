import dynamic from "next/dynamic";
import Link from "next/link";

const RegisterFormWrapper = dynamic(()=>import("../components/Wrappers/RegisterFormWrapper"));

const RegisterPage = () => {

    return (
        <div className="flex relative font-dm">
            <div className="w-3/5 border-t-2 border-gray-300">
                <div className="min-h-screen flex justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
                    <RegisterFormWrapper>
                        <div className="pt-24 pb-20">
                            <h4 className="mt-6 text-left text-3xl leading-9 text-dark"> Iniciar registro </h4>
                            <p className="mt-2 text-left text-sm leading-5 text-black">
                                <Link href="/login">
                                    <a className="text-blueberry_two hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                                        Registrarse
                                    </a>
                                </Link>
                            </p>
                        </div>
                    </RegisterFormWrapper>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;