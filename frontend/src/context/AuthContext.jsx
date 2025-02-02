import { createContext, useEffect, useState } from "react";
import { getAdminToken, removeAdminToken } from "../services/admin";
import { useNavigate } from "react-router-dom";
import { getUser, verifyToken } from "../services/auth";
import Loading from "../pages/loading";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [loadingAuth, setLoadingAuth] = useState(true);
    const [admin, setAdmin] = useState(null);
    const [isLogged, setIsLogged] = useState(false);
    const navigate = useNavigate();

    const resetAuth = () => {
        setAdmin(null);
        setIsLogged(false);
        removeAdminToken();
        setLoadingAuth(false);
        navigate('/acesso_restrito');
    }

    useEffect(() => {
        const tokenAdmin = getAdminToken();

        if (!tokenAdmin) {
            resetAuth();
            return;
        }

        const handleAuth = async () => {

            const verify = await verifyToken();
            if (!verify) {
                console.log(getAdminToken());

                resetAuth();
            }
            try {
                const response = await getUser();
                setAdmin(response.data.user);
            } catch {}

            setIsLogged(true);
            setLoadingAuth(false);
        }

        handleAuth();

    }, [navigate]);

    if (loadingAuth) {
        return (<Loading/>)
    }

    return (
        <AuthContext.Provider value={{ admin, isLogged }}>
            {children}
        </AuthContext.Provider>
    )
}
