import React, {useState, useEffect} from "react"
import StepLineChart from "@/components/StepLineChart";

interface SavingsChartProps {
    data: number[];
    selectedView: string;
    changeChartView: (view: string) => void;
}
export default function SavingsChart({data, selectedView, changeChartView}: SavingsChartProps) {
    return (
        <div className={"w-11/12 mt-4"}>
            <StepLineChart data={data} view={selectedView}/>
            <div className={"flex w-full my-2"}>
                <button
                    className={`${selectedView === "week" ? "text-white bg-blue-600" : "bg-gray-300"} w-full p-2 m-1 rounded-lg`}
                    onClick={() => changeChartView('week')}>Week
                </button>
                <button
                    className={`${selectedView === "month" ? "text-white bg-blue-600" : "bg-gray-300"} w-full p-2 m-1 rounded-lg`}
                    onClick={() => changeChartView('month')}>Month
                </button>
                <button
                    className={`${selectedView === "year" ? "text-white bg-blue-600" : "bg-gray-300"} w-full p-2 m-1 rounded-lg`}
                    onClick={() => changeChartView('year')}>Year
                </button>
            </div>
        </div>
    )
}
