import React, {useState, useEffect} from "react"
import ProgressBar from "@/components/ProgressBar";
import Modal from "@/components/common/modals/Modal";
import {BsTriangleFill} from "react-icons/bs";
import {IoIosArrowForward} from "react-icons/io";
import {Goal} from "@/lib/types";
import GoalDetailsModal from "@/components/common/modals/GoalDetailsModal";

interface DisplayGoalsProps {
    openCreateGoalModal: (e: any) => void;
    savingsGoals: Goal[]
}

export default function DisplayGoals({openCreateGoalModal, savingsGoals}: DisplayGoalsProps) {
    const [displayNecessities, setDisplayNecessities] = useState(true);
    const [displayWants, setDisplayWants] = useState(true);

    const toggleGoalsDisplay = (type: string) => {
        if (type === 'necessities') {
            setDisplayNecessities(!displayNecessities);
        } else {
            setDisplayWants(!displayWants);
        }
    }

    return (
        <>
            <div className={"flex flex-col w-full items-center"}>
                <h2 className={"text-3xl text-left w-11/12 font-bold"}>Goals</h2>

                {savingsGoals.length === 0
                    ? <p className={"text-gray-500"}>No goals yet</p>
                    : (
                        <>
                            <DisplayGoalsType goalDisplayType={"necessities"} displayGoals={displayNecessities}
                                              toggleGoalsDisplay={toggleGoalsDisplay} savingsGoals={savingsGoals}
                                              openCreateGoalModal={openCreateGoalModal}/>
                            <DisplayGoalsType goalDisplayType={"wants"} displayGoals={displayWants}
                                              toggleGoalsDisplay={toggleGoalsDisplay} savingsGoals={savingsGoals}
                                              openCreateGoalModal={openCreateGoalModal}/>
                        </>
                    )
                }

            </div>
        </>
    )
}

interface DisplayGoalsTypeProps {
    goalDisplayType: string;
    displayGoals: boolean;
    toggleGoalsDisplay: (type: string) => void;
    savingsGoals: Goal[],
    openCreateGoalModal: (goalDisplayType: string) => void;
}

const DisplayGoalsType = ({
                              goalDisplayType,
                              displayGoals,
                              toggleGoalsDisplay,
                              savingsGoals,
                              openCreateGoalModal
                          }: DisplayGoalsTypeProps) => {
    const goalDisplayText = goalDisplayType.charAt(0).toUpperCase() + goalDisplayType.slice(1);

    return (
        <>
            <div className={"w-11/12 flex justify-between my-2"}>
                <div className={"flex items-center"} onClick={() => toggleGoalsDisplay(goalDisplayType)}>
                    <div
                        className={`${displayGoals ? "rotate-180" : "rotate-90"} text-xs cursor-pointer mr-4 text-gray-300`}>
                        <BsTriangleFill/>
                    </div>
                    <h3 className={"text-lg"}>
                        {goalDisplayText}
                    </h3>
                </div>
                <div onClick={() => openCreateGoalModal(goalDisplayType)} className={"flex items-center text-blue-600"}>
                    <button className={"text-lg "}>add</button>
                    <IoIosArrowForward className={"ml-1"}/>
                </div>
            </div>
            <div className={"flex w-full justify-around flex-wrap"}>
                {displayGoals && savingsGoals.filter((goal => goal.type === goalDisplayType)).map((goal) => (
                    <GoalCard goal={goal}/>
                ))}
            </div>
        </>
    )
}

interface GoalCardProps {
    goal: Goal
}

const GoalCard = ({goal}: GoalCardProps) => {
    const [isGoalDetailsModalOpen, setIsGoalDetailsModalOpen] = useState(false);

    return (
        <>
            <li key={goal.name}
                onClick={() => setIsGoalDetailsModalOpen(true)}
                className={"flex flex-col w-full m-2 p-4 bg-white cursor-pointer rounded-xl"}>

                <div className={"flex items-center"}>
                    {goal.imageUrl &&
                        <img className={"rounded-full w-16 h-16"} src={goal.imageUrl} alt={goal.name} width={100}/>}

                    <p className={"capitalize text-xl ml-4"}>{goal.name}</p>
                </div>

                <div className={"flex flex-col w-full mt-4"}>
                    <div className={"overflow-hidden"}>
                        <ProgressBar currentSaved={goal.amountSaved} totalRequired={goal.amountTarget}/>
                    </div>
                    <div className={"flex justify-between"}>
                        <p className={""}>${goal.amountSaved}</p>
                        <p>${goal.amountTarget}</p>
                    </div>
                </div>

                {/*<button onClick={() => setIsGoalDetailsModalOpen(true)}>View</button>*/}
                <GoalDetailsModal goal={goal} isGoalDetailsModalOpen={isGoalDetailsModalOpen}
                                  setIsGoalDetailsModalOpen={setIsGoalDetailsModalOpen}/>
            </li>
        </>
    )
}
