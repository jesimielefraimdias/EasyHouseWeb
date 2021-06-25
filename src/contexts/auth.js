import React, { createContext, useState, useEffect, useContext } from "react";
import axiosServer from "../services/axiosServer";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function checkLogged() {
            try {
                if (!!user === false) {

                    const res = await axiosServer.post("/isLoggedUserLevel");
                    setUser({
                        email: res.data.email,
                        cpf: res.data.cpf,
                        accessLevel: res.data.accessLevel,
                        loggedWith: res.data.loggedWith
                    });
                }
            } catch (e) {
                console.log("aqui", e);
                // await signOut();
            }
        }

        checkLogged();
    }, [user]);

    const signIn = async (email, password, tokenId) => {
        try {
            setLoading(true);
            const res = await axiosServer.post("/login", {
                email, password, tokenId
            });

            console.log(res.data, "aqui2");
            setUser(res.data);

            return {
                error: false,
                errorLogin: null,
            };
        } catch (e) {
            setUser(null);
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
            setUser(null);
        } catch (e) {
            console.log("Ocorreu um erro e já estamos trabalhando para resolver!");
        }
    }

    return (
        <AuthContext.Provider value={
            {
                loading,
                setLoading,
                isLogged: !!user,
                user,
                setUser,
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