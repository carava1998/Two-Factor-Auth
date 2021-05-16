import firebase from "firebase";
import { GetServerSideProps } from "next";
import router from "next/router";
import { validateAuthCookie } from "../utils/helper/auth.helper";

export const getServerSideProps: GetServerSideProps = ctx => validateAuthCookie(ctx);

const Dashboard = () =>{

  const logOut = async() =>{
    const auth = firebase.auth();
    try{
      await auth.signOut();
      await router.push('/login')

    }catch{
      console.log("Error en el singout")
    }
  }


  return(
    <div>
      <p className="bg-gray-600">Hola</p>
      <button onClick={logOut}>LogOut </button>
    </div>
  )
}

export default Dashboard;