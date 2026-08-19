import { createContext, useContext, useState } from "react";
import {
    login as loginRequest,
    logout as logoutRequest,
    isAuthenticated,
} from "../services/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [authenticated, setAuthenticated] = useState(isAuthenticated());

    const login = async (username, password) => {
        await loginRequest(username, password);
        setAuthenticated(true);
    };

    const logout = () => {
        logoutRequest();
        setAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                authenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}