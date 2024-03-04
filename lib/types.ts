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

export type ChartView = "1M" | "3M" | "YTD" | "1Y" | "ALL"