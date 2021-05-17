import firebase from "firebase";
import { GetServerSideProps } from "next";
import router from "next/router";
import { validateAuthCookie } from "../utils/helper/auth.helper";
import styles from '../styles/Home.module.scss';

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
    <div className="w-full h-screen bg-cover antialiased flex items-center" style={{backgroundImage:"url('https://i.pinimg.com/originals/4e/66/7a/4e667a25b4e8170e67e4c01c01b72aa0.jpg')"}}>
      <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
        <div id="profile" className="w-full lg:w-full rounded-lg lg:rounded-l-lg shadow-3xl bg-white opacity-75 mx-6 lg:mx-0">
          <div className="p-4 md:p-12 text-center lg:text-left flex flex-col">
            <p className="self-center text-3xl antialiased font-semibold"> Welcome to the Two-Factor Auth</p>
            <button onClick={logOut} style={{backgroundColor:"#d34315",borderColor:"#228f82"}} className={"self-center mt-4 py-2 rounded border-2 w-2/5 hover:bg-yellow-600" + styles.home__button}>Log Out </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;