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
        if(getCode){
            const code = generateCode(3)
            console.log(code)
            setCode(code);
            nookies.destroy(null, '__number');
            nookies.set(null, '__number', number, {});
            nookies.destroy(null, '__code');
            nookies.set(null, '__code', code, {});
            toggleGetCode(false);
        }
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

    const alternatePieces = (p1:string,p2:string) => {
        var result = "";
        var length1 = p1.length;
        var length2 = p2.length;
        var limit = Math.min(length1,length2);
        if(limit == length1) {
            for(let i=0 ; i<limit ; i+=1){
                result += p2.charAt(i);
                result += p1.charAt(i);
            }
            result += p2.substring(limit);
        }
        else {
            for(let i=0 ; i<limit ; i+=1){
                result += p1.charAt(i);
                result += p2.charAt(i);
            }
            result += p1.substring(limit);
        }
        return result;
    }

    const generateHash = (text:string)=>{
        var hash = 0;
        if(text.length == 0)
            return "0";
        else {
            for(let i=0 ; i<text.length ; i+=1){
                var ASCII = text.charCodeAt(i);
                hash = ((hash << 7) - hash) + ASCII;
                hash &= hash;
            }
        }
        return Math.abs(hash).toString();
    }

    const generateRandomString = (num:number) => {
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXZabcdefghijklmnopqrstuvwxyz0123456789";
        var result = "";
        for(let i=0 ; i<num ; i+=1) result += chars.charAt(Math.floor(Math.random()*62));
        return result;
    }

    const generateCode = (num:number) => {
        let rand:string = "";
        let hash:string = "";
        let SMSCode:string = "";
        rand = generateRandomString(num);
        hash = generateHash(rand);
        SMSCode = alternatePieces(rand,hash);
        return SMSCode;
    }

    return (
        <AuthContext.Provider value={{ user,email,setEmail,password,setPassword,setNumber,toggleGetCode,code}}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
