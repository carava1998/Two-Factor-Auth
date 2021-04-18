import Head from "next/head";
import {AppProps} from "next/app";
import {AuthProvider} from "../utils/context/auth.context";


const TwoFactorAuth = ({ Component, pageProps }: AppProps) => {
  return(
    <>
      <Head>
        <title> Two Factor Auth </title>
      </Head>
      <AuthProvider>
        <Component { ...pageProps } />
      </AuthProvider>


    </>
  );
}

export default TwoFactorAuth