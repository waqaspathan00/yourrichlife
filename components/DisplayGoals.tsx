import React, {useState, useEffect} from "react"
import ProgressBar from "@/components/ProgressBar";
import {BsTriangleFill} from "react-icons/bs";
import {IoIosArrowForward} from "react-icons/io";
import {Goal} from "@/lib/types";
import GoalDetailsModal from "@/components/common/modals/GoalDetailsModal";
import {deleteGoal} from "@/lib/firebase";

interface DisplayGoalsProps {
    openCreateGoalModal: (e: any) => void;
    savingsGoals: Goal[],
    setSavingsGoals: (savingsGoals: Goal[]) => void
}

export default function DisplayGoals({openCreateGoalModal, savingsGoals, setSavingsGoals}: DisplayGoalsProps) {
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
        <div className={"flex flex-col w-full items-center"}>
            <h2 className={"text-3xl text-left w-11/12 font-bold"}>Goals</h2>

            <DisplayGoalsType goalDisplayType={"necessities"} displayGoals={displayNecessities}
                              toggleGoalsDisplay={toggleGoalsDisplay} savingsGoals={savingsGoals}
                              setSavingsGoals={setSavingsGoals}
                              openCreateGoalModal={openCreateGoalModal}/>
            <DisplayGoalsType goalDisplayType={"wants"} displayGoals={displayWants}
                              toggleGoalsDisplay={toggleGoalsDisplay} savingsGoals={savingsGoals}
                              setSavingsGoals={setSavingsGoals}
                              openCreateGoalModal={openCreateGoalModal}/>
        </div>
    )
}

interface DisplayGoalsTypeProps {
    goalDisplayType: string;
    displayGoals: boolean;
    toggleGoalsDisplay: (type: string) => void;
    savingsGoals: Goal[],
    setSavingsGoals: (savingsGoals: Goal[]) => void
    openCreateGoalModal: (goalDisplayType: string) => void;
}

const DisplayGoalsType = ({
                              goalDisplayType,
                              displayGoals,
                              toggleGoalsDisplay,
                              savingsGoals,
                              setSavingsGoals,
                              openCreateGoalModal
                          }: DisplayGoalsTypeProps) => {
    const goalDisplayText = goalDisplayType.charAt(0).toUpperCase() + goalDisplayType.slice(1);
    const filteredGoals = savingsGoals.filter((goal) => goal.type === goalDisplayType);


    const handleDeleteGoal = async (id: number) => {
        const updatedSavingsGoals = await deleteGoal(id)
        setSavingsGoals(updatedSavingsGoals);
    }

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
            <div className={"flex flex-col w-11/12"}>
                {displayGoals && (
                    filteredGoals.length === 0
                        ?
                        <p onClick={() => openCreateGoalModal(goalDisplayType)}
                           className={"text-gray-500 w-full text-center cursor-pointer border-dashed border-2 rounded-lg border-gray-300 p-4"}>
                            Add a goal here</p>
                        : filteredGoals.map((goal) => (
                            <GoalCard goal={goal} handleDeleteGoal={handleDeleteGoal}/>
                        ))
                )}
            </div>
        </>
    )
}

interface GoalCardProps {
    goal: Goal,
    handleDeleteGoal: (id: number) => void
}

const GoalCard = ({goal, handleDeleteGoal}: GoalCardProps) => {
    const [isGoalDetailsModalOpen, setIsGoalDetailsModalOpen] = useState(false);

    return (
        <>
            <li key={goal.name}
                onClick={() => setIsGoalDetailsModalOpen(true)}
                className={"flex flex-col w-full my-2 p-4 bg-white cursor-pointer rounded-xl"}>

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

                <GoalDetailsModal handleDeleteGoal={handleDeleteGoal} goal={goal}
                                  isGoalDetailsModalOpen={isGoalDetailsModalOpen}
                                  setIsGoalDetailsModalOpen={setIsGoalDetailsModalOpen}/>
            </li>
        </>
    )
}
