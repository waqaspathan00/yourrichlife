import React, {useState, useEffect} from "react"
import ProgressBar from "@/components/ProgressBar";

interface DisplayGoalsProps {
    savingsGoals: { name: string, imageUrl: string, amountSaved: number, amountTarget: number }[]
}

export default function DisplayGoals({savingsGoals}: DisplayGoalsProps) {
    if (savingsGoals.length === 0) {
        return (
            <div className={"flex flex-col w-full mt-8 items-center"}>
                <div className={"w-11/12 flex justify-between mb-2"}>
                    <h2 className={"text-xl"}>Goals</h2>
                    <div className={"space-x-4"}>
                        <button className={"border-b-blue-600 border-b-2"}>All</button>
                        <button className={"text-gray-500"}>Achieved</button>
                    </div>
                </div>
                <p className={"text-gray-500"}>No goals yet</p>
            </div>
        )
    }

    return (
        <ul className={"flex flex-col w-full mt-8 items-center"}>
            <div className={"w-11/12 flex justify-between mb-2"}>
                <h2 className={"text-xl"}>Goals</h2>
                <div className={"space-x-4"}>
                    <button className={"border-b-blue-600 border-b-2"}>All</button>
                    <button className={"text-gray-500"}>Achieved</button>
                </div>
            </div>
            <div className={"flex w-full justify-around"}>
                {savingsGoals.map((goal) => (
                    <GoalCard goal={goal}/>
                ))}
            </div>
        </ul>
    )
}

interface GoalCardProps {
    goal: { name: string, imageUrl: string, amountSaved: number, amountTarget: number }
}
const GoalCard = ({goal}: GoalCardProps) => {
    return (
        <li key={goal.name} className={" flex flex-col items-center justify-between w-1/2 p-4 bg-white rounded-xl"}>
            <img className={"rounded-lg w-full"} src={goal.imageUrl} alt={goal.name} width={100} height={100}/>
            <p>{goal.name}</p>
            <div className={"flex flex-col w-full"}>
                <div className={"my-2 overflow-hidden"}>
                    <ProgressBar currentSaved={goal.amountSaved} totalRequired={goal.amountTarget}/>
                </div>
                <div className={"flex justify-between"}>
                    <p className={""}>${goal.amountSaved}</p>
                    <p>${goal.amountTarget}</p>
                </div>
            </div>
        </li>
    )
}
