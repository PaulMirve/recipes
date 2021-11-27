import { User } from "generated/graphql";
import { createContext, FC, useState } from "react";

interface GlobalContextProps {
    user: User | null,
    setUser: (user: User) => void,
    logout: () => void
}

export const GlobalContext = createContext({} as GlobalContextProps);

export const GlobalContextProvider: FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const setCurrentUser = (user: User) => {
        setUser(user);
    }

    const logout = () => {
        setUser(null);
        localStorage.setItem('token', '')
    }

    return (
        <GlobalContext.Provider value={{
            user,
            setUser: setCurrentUser,
            logout
        }}>
            {children}
        </GlobalContext.Provider>
    )
}