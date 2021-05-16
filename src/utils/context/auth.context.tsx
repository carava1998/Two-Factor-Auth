import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import initFirebase from "../../firebase/client";
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/functions';
import nookies from 'nookies';

initFirebase();

const AuthContext = createContext<{
    user: any;
    email:string;
    setEmail:null|((ml:string)=>any);
    password:string;
    setPassword:null|((ml:string)=>any);
    setNumber:null|((ml:string)=>any);
    toggleGetCode:null|((ml:boolean)=>any);
    code:string;
}>({ user: null, email:"",setEmail:null,password:"",setPassword:null,setNumber:null,toggleGetCode:null,code:"" });

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {

    const auth = firebase.auth();
    const [user,setUser] = useState<any>();
    const [password,setPassword] = useState<string>("");
    const [email,setEmail] = useState<string>("");
    const [number,setNumber] = useState<string>("0");
    const [getCode, toggleGetCode] = useState<boolean>(false)
    const [code,setCode] = useState<string>("")

    useEffect(()=>{
        const code = generateCode()
        setCode(code);
        nookies.destroy(null, '__number');
        nookies.set(null, '__number', number, {});
        nookies.destroy(null, '__code');
        nookies.set(null, '__code', code, {});
    },[getCode])

    useEffect(() => {
        if (typeof window !== undefined) {
            (window as unknown as Record<string, unknown>).nookies = nookies;
        }

        return auth.onIdTokenChanged(async user => {
            if (!user) {
                setUser(null);
                nookies.destroy(null, '__session');
                nookies.set(null, '__session', '', {});
                return;
            }
            setUser(user);
            const token = await user.getIdToken();
            nookies.destroy(null, '__session');
            nookies.set(null, '__session', token, {});
        });
    }, []);

    useEffect(() => {
        const handle = setInterval(async () => {
            const user = auth.currentUser;
            if (user) {
                const token = await user.getIdToken();
                nookies.destroy(null, '__session');
                nookies.set(null, '__session', token, {});
                return
            }
            nookies.destroy(null, '__session');
            nookies.set(null, '__session', '', {});
            return;
        }, 10 * 60 * 1000);

        return clearInterval(handle);
    }, []);

    const generateCode = () => {
        return (`${12345678}`)
    }

    return (
        <AuthContext.Provider value={{ user,email,setEmail,password,setPassword,setNumber,toggleGetCode,code}}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
