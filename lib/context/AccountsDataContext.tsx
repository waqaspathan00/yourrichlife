import React, {createContext, ReactNode, useState} from "react";
import {Account, DailySavingsBalance, Goal} from "@/lib/types";

interface AccountsDataContextProps {
    accountsList: Account[];
    setAccountsList: (data: Account[]) => void;
}

export const AccountsDataContext = createContext<AccountsDataContextProps>({
    accountsList: [],
    setAccountsList: () => {
    }
})

interface AccountsDataProviderProps {
    children: ReactNode;
}

export const AccountsDataProvider = ({children}: AccountsDataProviderProps) => {
    const [accountsList, setAccountsList] = useState<Account[]>([]);

    return (
        <AccountsDataContext.Provider value={{
            accountsList,
            setAccountsList
        }}>
            {children}
        </AccountsDataContext.Provider>
    )
}