export type Goal = {
    id: number,
    type: string,
    name: string,
    emoji: string,
    amountSaved: number,
    amountTarget: number,
    completed: boolean
}

export type DailySavingsBalance = {
    date: string,
    amount: number
}

export type SavingsData = {
    dailySavingsBalance: DailySavingsBalance[],
    savingsGoals: Goal[],
    completedGoals: Goal[]
}

export type Account = {
    name: string,
    balance: number,
    color: string
}

export type ViewKey = '1M' | '3M' | '6M' | '1Y' | 'YTD';
