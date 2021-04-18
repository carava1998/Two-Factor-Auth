import {createContext, PropsWithChildren, useContext, useEffect} from "react";
import initFirebase from "../../firebase/client";
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/functions';

initFirebase();

const AuthContext = createContext<{

}>({ user: null });

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {

    const auth = firebase.auth();
    const functions = firebase.functions();

    useEffect(() => {
        const handle = setInterval(async () => {
            const user = auth.currentUser;
            if (user) {
                await user.getIdToken(true);
            }
        }, 10 * 60 * 1000);

        return clearInterval(handle);
    }, []);

    return (
        <AuthContext.Provider value={{ }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
