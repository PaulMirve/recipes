import { User } from "generated/graphql";
import { useRouter } from "next/dist/client/router";
import { createContext, FC, useState } from "react";

interface GlobalContextProps {
    user: User | null,
    setUser: (user: User) => void,
    logout: () => void
}

export const GlobalContext = createContext({} as GlobalContextProps);

export const GlobalContextProvider: FC = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const setCurrentUser = (user: User) => {
        setUser(user);
    }

    const logout = () => {
        localStorage.clear();
        setUser(null);
        router.push('/login');
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