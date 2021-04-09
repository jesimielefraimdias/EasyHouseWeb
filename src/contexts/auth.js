import React, { createContext, useState, useEffect, useContext } from "react";
import axiosServer from "../services/axiosServer";
import { useHistory } from "react-router-dom";


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [isLogged, setIsLogged] = useState(false);
    const [userAcessLevel, setUserAcessLevel] = useState("");

    useEffect(() => {
        async function checkLogged() {
            try {
                const res = await axiosServer.post("/isLogged");
                console.log(res.data.accessLevel);
                setIsLogged(true);
                setUserAcessLevel(res.data.accessLevel);
            } catch (e) {
                // try {
                //     await axiosServer.post("/isLoggedOperatorLevel");
                //     setIsLogged(true);
                //     setUserAcessLevel("O");
                // } catch (e) {
                //     try {
                //         await axiosServer.post("/isLoggedUserLevel");
                //         setIsLogged(true);
                //         setUserAcessLevel("U");
                //     } catch (e) {
                setIsLogged(false);
            }
            //     }
            // }
        }

        checkLogged();
    }, [isLogged]);

    const signIn = async (email, password, tokenId) => {
        try {
            setLoading(true);
            const res = await axiosServer.post("/loginDashboard", {
                email, password, tokenId
            });
            console.log("aqui");
            setIsLogged(true);

            return { error: false, errorLogin: null };
        } catch (e) {
            setIsLogged(false);
            const data = e.response.data;

            return { error: true, errorLogin: data.erroLogin };
        } finally {
            setLoading(false);
        }
    }

    const signOut = async () => {
        try {
            setLoading(true);
            await axiosServer.get("/logout");
            setIsLogged(false);
        } catch (e) {
            console.log("Ocorreu um erro e já estamos trabalhando para resolver!");
        }
    }

    return (
        <AuthContext.Provider value={
            {
                loading,
                isLogged,
                userAcessLevel,
                signIn,
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>

    );
}

export function useUser() {
    const context = useContext(AuthContext);

    return context;
}