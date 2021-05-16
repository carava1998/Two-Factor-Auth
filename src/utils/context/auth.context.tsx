import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import initFirebase from "../../firebase/client";
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/functions';
import nookies from 'nookies';

initFirebase();

const AuthContext = createContext<{
    user: any;
}>({ user: null });

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {

    const auth = firebase.auth();
    const [user,setUser] = useState<any>()


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

    return (
        <AuthContext.Provider value={{ user }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
