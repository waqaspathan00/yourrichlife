export type Goal = {
    id: number,
    type: string,
    name: string,
    imageUrl: string,
    amountSaved: number,
    amountTarget: number
}

export type DailySavingsBalance = {
    date: string,
    amount: number
}

export type ChartView = "1M" | "3M" | "YTD" | "1Y" | "ALL"