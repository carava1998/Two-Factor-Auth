import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';


export const validateAuthCookie: GetServerSideProps = async (ctx) => {

    try {
        const cookies = parseCookies(ctx)
        const session = ({ cookies }.cookies.__session ? { cookies }.cookies.__session : "")
        if (!session){
          throw session
        };
        return { props: { } }
    } catch (err) {
        console.log("Eror")
        return {
            redirect: {
                permanent: false,
                destination: '/login'
            },
            props: { }
        }
    }
}