import { createContext, ReactNode } from "react";
import { useUserData } from "../hooks/userData";
import { User } from "@firebase/auth";

interface UserContextProps {
    user: User | null;
}

export const UserContext = createContext<UserContextProps>({ user: null });

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const userData = useUserData();

    return <UserContext.Provider value={userData}>{children}</UserContext.Provider>;
};
