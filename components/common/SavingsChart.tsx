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
            <div className={"flex w-full my-2 bg-white rounded-lg"}>
                <button
                    className={`${selectedView === "1M" ? "text-white bg-blue-600" : "text-gray-400"} font-bold transition-all w-full p-2 m-1 rounded-full`}
                    onClick={() => changeChartView('1M')}>1M
                </button>
                <button
                    className={`${selectedView === "3M" ? "text-white bg-blue-600" : "text-gray-400"} font-bold transition-all w-full p-2 m-1 rounded-full`}
                    onClick={() => changeChartView('3M')}>3M
                </button>
                <button
                    className={`${selectedView === "1Y" ? "text-white bg-blue-600" : "text-gray-400"} font-bold transition-all w-full p-2 m-1 rounded-full`}
                    onClick={() => changeChartView('1Y')}>1Y
                </button>
            </div>
        </div>
    )
}
