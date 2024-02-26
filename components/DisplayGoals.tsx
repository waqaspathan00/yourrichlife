import React, {useState, useEffect} from "react"
import ProgressBar from "@/components/ProgressBar";

interface DisplayGoalsProps {
    savingsGoals: { name: string, imageUrl: string, amountSaved: number, amountTarget: number }[]
}

export default function DisplayGoals({savingsGoals}: DisplayGoalsProps) {
    return (
        <ul className={"flex flex-col w-full items-center"}>
            <div className={"w-11/12 flex justify-between mb-2"}>
                <h2 className={"text-xl"}>Goals</h2>
                <div className={"space-x-4"}>
                    <button className={"border-b-blue-600 border-b-2"}>All</button>
                    <button className={"text-gray-500"}>Achieved</button>
                </div>
            </div>
            <div className={"flex w-full justify-around"}>
                {savingsGoals.map((goal) => (
                    <li key={goal.name} className={"flex flex-col justify-between w-1/3 p-4 bg-white rounded-xl"}>
                        <img src={goal.imageUrl} alt={goal.name} width={100} height={100}/>
                        <p>{goal.name}</p>
                        <div>
                            <div className={"my-2 overflow-hidden"}>
                                <ProgressBar currentSaved={goal.amountSaved} totalRequired={goal.amountTarget}/>
                            </div>
                            <div className={"flex justify-between"}>
                                <p>${goal.amountSaved}</p>
                                <p>${goal.amountTarget}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </div>
        </ul>
    )
}
