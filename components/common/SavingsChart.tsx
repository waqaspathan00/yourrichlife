import React, {useState, useEffect} from "react"
import StepLineChart from "@/components/StepLineChart";

interface SavingsChartProps {
    data: number[];
    selectedView: string;
    changeChartView: (view: string) => void;
}

export default function SavingsChart({data, selectedView, changeChartView}: SavingsChartProps) {

    return (
        <div className={"w-11/12 bg-white rounded-lg mt-4 p-4 shadow-lg"}>
            <StepLineChart data={data} view={selectedView}/>
            <div className={"flex w-full rounded-lg"}>
                <ChangeChartViewButton view={"1M"} selectedView={selectedView} changeChartView={changeChartView}/>
                <ChangeChartViewButton view={"3M"} selectedView={selectedView} changeChartView={changeChartView}/>
                <ChangeChartViewButton view={"YTD"} selectedView={selectedView} changeChartView={changeChartView}/>
                <ChangeChartViewButton view={"1Y"} selectedView={selectedView} changeChartView={changeChartView}/>
                <ChangeChartViewButton view={"ALL"} selectedView={selectedView} changeChartView={changeChartView}/>
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
            className={`${selectedView === view ? "text-white bg-blue-600" : "text-gray-400 "} font-bold transition-all w-full p-2 mx-1 rounded-full`}
            onClick={() => changeChartView(view)}>{view}
        </button>
    )
}