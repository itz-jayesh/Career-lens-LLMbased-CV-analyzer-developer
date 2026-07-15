import { createContext, useState, useContext, useEffect, type ReactNode } from "react";
import clearStorage from "../hooks/clearStorage.hook";
import getStorage from "../hooks/getStorage.hook";
import setStorage from "../hooks/setStorage.hook";
import API_Routes from "../constants/API_Route";
import axios from "axios";

type AuthContextType = {
    name: string;
    email: string;
    token: string;
    setAuth: (data: { name: string; email: string; token: string }) => void;
    clearAuth: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const Auth_Context = ({ children }: { children: ReactNode }) => {
    const [auth, setAuthState] = useState({
        name: "",
        email: "",
        token: "",
        // name: "Pranav Shilavane",
        // email: "pranavshilavane1@gmail.com",
        // token: "saddasd",
    });

    const setAuth = (data: { name: string; email: string; token: string }) => {
        setAuthState(data);
        localStorage.setItem("_APP_", JSON.stringify(data));
    };

    const clearAuth = () => {
        setAuthState({ name: "", email: "", token: "" });
        localStorage.removeItem("_APP_");
    };

    useEffect(() => {
        const checkLocalAuth = async () => {
            try {
                const stored = getStorage("_APP_");
                if (stored === null) {
                    clearStorage.clear();
                    return;
                }
                const { name, email, token } = stored;

                const res = await axios.post(API_Routes.verify, {
                    name, email, token
                }, { headers: { Authorization: `Bearer ${token}` } });

                if (res.data.success) {
                    setAuthState({ name: res.data.name, email: res.data.email, token: res.data.token });
                    setStorage("_APP_", { name: res.data.name, email: res.data.email, token: res.data.token });
                }
            } catch (error) {
                clearStorage.clear();
            }
        };

        checkLocalAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ ...auth, setAuth, clearAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};

export default Auth_Context;