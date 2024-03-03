import React, {createContext, ReactNode, useState} from "react";
import {DailySavingsBalance, Goal} from "@/lib/types";

interface SavingsDataContextProps {
    dailySavingsBalanceMasterData: DailySavingsBalance[];
    setDailySavingsBalanceMasterData: (data: DailySavingsBalance[]) => void;
    dailySavingsBalanceChartData: DailySavingsBalance[];
    setDailySavingsBalanceChartData: (data: DailySavingsBalance[]) => void;
    totalSaved: number;
    setTotalSaved: (total: number) => void;
    undistributedFunds: number;
    setUndistributedFunds: (funds: number) => void;
    savingsGoals: Goal[];
    setSavingsGoals: (goals: Goal[]) => void;
}

export const SavingsDataContext = createContext<SavingsDataContextProps>({
    dailySavingsBalanceMasterData: [],
    setDailySavingsBalanceMasterData: () => {
    },
    dailySavingsBalanceChartData: [],
    setDailySavingsBalanceChartData: () => {
    },
    totalSaved: 0,
    setTotalSaved: () => {
    },
    undistributedFunds: 0,
    setUndistributedFunds: () => {

    },
    savingsGoals: [],
    setSavingsGoals: () => {
    },
})

interface SavingsDataProviderProps {
    children: ReactNode;
}

export const SavingsDataProvider = ({children}: SavingsDataProviderProps) => {
    const [dailySavingsBalanceMasterData, setDailySavingsBalanceMasterData] = useState<DailySavingsBalance[]>([]);
    const [dailySavingsBalanceChartData, setDailySavingsBalanceChartData] = useState<DailySavingsBalance[]>([]);
    const [totalSaved, setTotalSaved] = useState(0);
    const [undistributedFunds, setUndistributedFunds] = useState(0);
    const [savingsGoals, setSavingsGoals] = useState<Goal[]>([]);

    return (
        <SavingsDataContext.Provider value={{
            dailySavingsBalanceMasterData,
            setDailySavingsBalanceMasterData,
            dailySavingsBalanceChartData,
            setDailySavingsBalanceChartData,
            totalSaved,
            setTotalSaved,
            undistributedFunds,
            setUndistributedFunds,
            savingsGoals,
            setSavingsGoals
        }}>
            {children}
        </SavingsDataContext.Provider>
    )
}