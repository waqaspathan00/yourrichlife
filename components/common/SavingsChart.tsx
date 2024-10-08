import React, {useContext} from "react"
import StepLineChart from "@/components/StepLineChart";
import {DailySavingsBalance, ViewKey} from "@/lib/types";
import {SavingsDataContext} from "@/lib/context/SavingsDataContext";
import {transformChartData} from "@/lib/utils";

interface SavingsChartProps {
    selectedView: ViewKey;
    setSelectedView: (view: ViewKey) => void;
    // changeChartView: (dailySavingsBalance: DailySavingsBalance[], view: ViewKey) => void;
}

export default function SavingsChart({selectedView, setSelectedView}: SavingsChartProps) {
    const {setDailySavingsBalanceChartData} = useContext(SavingsDataContext);

    const changeChartView = (dailySavingsBalance: DailySavingsBalance[], view: ViewKey) => {
        const newData = transformChartData(dailySavingsBalance, view);
        setDailySavingsBalanceChartData(newData);
        setSelectedView(view);
    }

    return (
        <div className={"w-11/12 absolute top-28 bg-white rounded-lg mt-4 p-4 shadow-lg"}>
            <StepLineChart view={selectedView}/>
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
    selectedView: ViewKey,
    changeChartView: (dailySavingsBalance: DailySavingsBalance[], view: ViewKey) => void;
    view: ViewKey
}) => {
    const {dailySavingsBalanceMasterData} = useContext(SavingsDataContext);

    return (
        <button
            className={`${selectedView === view ? "text-white bg-gray-400" : "text-gray-400 "} font-bold transition-all w-full p-2 mx-1 rounded-full`}
            onClick={() => changeChartView(dailySavingsBalanceMasterData, view)}>{view}
        </button>
    )
}