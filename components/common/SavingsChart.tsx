import React, {useState, useEffect} from "react"
import StepLineChart from "@/components/StepLineChart";

interface SavingsChartProps {
    dailySavingsBalance: number[];
    selectedView: string;
    changeChartView: (view: string) => void;
}

export default function SavingsChart({dailySavingsBalance, selectedView, changeChartView}: SavingsChartProps) {

    return (
        <div className={"w-11/12 bg-white rounded-lg mt-4 p-4 shadow-lg"}>
            <StepLineChart dailySavingsBalance={dailySavingsBalance} view={selectedView}/>
            <div className={"flex w-full rounded-lg"}>
                <ChangeChartViewButton view={"1M"} selectedView={selectedView} changeChartView={changeChartView}/>
                <ChangeChartViewButton view={"3M"} selectedView={selectedView} changeChartView={changeChartView}/>
                <ChangeChartViewButton view={"YTD"} selectedView={selectedView} changeChartView={changeChartView}/>
                <ChangeChartViewButton view={"6M"} selectedView={selectedView} changeChartView={changeChartView}/>
                <ChangeChartViewButton view={"1Y"} selectedView={selectedView} changeChartView={changeChartView}/>
            </div>
        </div>
    )
}

const ChangeChartViewButton = ({selectedView, changeChartView, view}: {
    selectedView: string,
    changeChartView: (view: string) => void,
    view: string
}) => {
    return (
        <button
            className={`${selectedView === view ? "text-white bg-gray-400" : "text-gray-400 "} font-bold transition-all w-full p-2 mx-1 rounded-full`}
            onClick={() => changeChartView(view)}>{view}
        </button>
    )
}