import Head from "next/head";
import {AppProps} from "next/app";


const TwoFactorAuth = ({ Component, pageProps }: AppProps) => {  
  return(
    <>
      <Head>
        <title> Two Factor Auth </title>
      </Head>

      <Component { ...pageProps } />
    
    </>
  );
}

export default TwoFactorAuth