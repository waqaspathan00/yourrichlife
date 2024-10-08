import {Goal} from "@/lib/types";
import {BsTriangleFill} from "react-icons/bs";
import {IoIosArrowForward} from "react-icons/io";
import React, {useContext, useState} from "react";
import GoalCard from "@/components/DisplayGoals/GoalCard";
import {SavingsDataContext} from "@/lib/context/SavingsDataContext";

interface DisplayGoalsTypeProps {
    goalDisplayType: string;
    displayGoals: boolean;
    toggleGoalsDisplay: (type: string) => void;
    openCreateGoalModal: (goalDisplayType: string) => void;
}

export default function DisplayGoalsType({
                                             goalDisplayType,
                                             displayGoals,
                                             toggleGoalsDisplay,
                                             openCreateGoalModal
                                         }: DisplayGoalsTypeProps) {
    const {savingsGoals, completedGoals} = useContext(SavingsDataContext);
    const filteredSavingsGoals = savingsGoals.filter((goal) => goal.type === goalDisplayType);
    const filteredCompletedGoals = completedGoals.filter((goal) => goal.type === goalDisplayType);
    const [displayCompletedGoals, setDisplayCompletedGoals] = useState(false);

    function convertTerm(abbreviation: string) {
        switch (abbreviation) {
            case 'LT':
                return 'Long Term';
            case 'MT':
                return 'Medium Term';
            case 'ST':
                return 'Short Term';
            default:
                return 'Invalid Term';
        }
    }

    const toggleCompletedGoalsDisplay = () => {
        setDisplayCompletedGoals(!displayCompletedGoals);
    }

    return (
        <>
            <div className={"w-11/12 flex justify-between my-2"}>
                <div className={"flex items-center"} onClick={() => toggleGoalsDisplay(goalDisplayType)}>
                    <div
                        className={`${displayGoals ? "rotate-180" : "rotate-90"} text-xs cursor-pointer mr-4 text-gray-300`}>
                        <BsTriangleFill/>
                    </div>
                    <h3>
                        {convertTerm(goalDisplayType)}
                    </h3>
                </div>
                <div onClick={() => openCreateGoalModal(goalDisplayType)} className={"flex items-center text-blue-600"}>
                    <button className={""}>add</button>
                    <IoIosArrowForward className={"ml-1"}/>
                </div>
            </div>
            <div className={"flex flex-col w-11/12"}>
                {displayGoals && (
                    filteredSavingsGoals.length === 0
                        ?
                        <div onClick={() => openCreateGoalModal(goalDisplayType)}
                             className={"text-gray-500 w-full text-center cursor-pointer border-dashed border-2 rounded-lg border-gray-300 p-4"}
                        >
                            Add a goal here
                        </div>
                        : filteredSavingsGoals.map((goal) => (
                            <GoalCard goal={goal}/>
                        ))
                )}
                {displayGoals && (
                    completedGoals.length > 0 && (
                        <div className={"flex flex-col items-center"}>
                            <div className={"flex items-center"}
                                 onClick={() => toggleCompletedGoalsDisplay()}>
                                <div
                                    className={`${displayCompletedGoals ? "rotate-180" : "rotate-90"} text-xs cursor-pointer mr-4 text-gray-300`}>
                                    <BsTriangleFill/>
                                </div>
                                <h3 className={"text-lg"}>
                                    Completed
                                </h3>
                            </div>
                            {displayCompletedGoals && (
                                <div className={"flex flex-col w-full"}>
                                    {filteredCompletedGoals.length === 0
                                        ?
                                        <div className={"text-gray-500 w-full text-center"}>
                                            No completed goals yet
                                        </div>
                                        : completedGoals.map((goal) => (
                                            <GoalCard goal={goal}/>
                                        ))}
                                </div>
                            )}
                        </div>
                    )
                )}
            </div>
        </>
    )
}

