import React, {useState, useEffect} from "react"
import ProgressBar from "@/components/ProgressBar";
import Modal from "@/components/common/modals/Modal";
import {BsTriangleFill} from "react-icons/bs";
import {Goal} from "@/lib/types";

interface DisplayGoalsProps {
    savingsGoals: Goal[]
}

export default function DisplayGoals({savingsGoals}: DisplayGoalsProps) {
    const [displayNecessities, setDisplayNecessities] = useState(true);
    const [displayWants, setDisplayWants] = useState(true);

    const toggleGoalsDisplay = (type: string) => {
        if (type === 'necessities') {
            setDisplayNecessities(!displayNecessities);
        } else {
            setDisplayWants(!displayWants);
        }
    }


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
        <>
            <div className={"flex flex-col w-full mt-8 items-center"}>
                <h2 className={"text-3xl text-left w-11/12 font-bold"}>Goals</h2>

                <DisplayGoalsType goalDisplayType={"necessities"} displayGoals={displayNecessities} toggleGoalsDisplay={toggleGoalsDisplay} savingsGoals={savingsGoals}/>
                <DisplayGoalsType goalDisplayType={"wants"} displayGoals={displayWants} toggleGoalsDisplay={toggleGoalsDisplay} savingsGoals={savingsGoals}/>
            </div>
        </>
    )
}

interface DisplayGoalsTypeProps {
    goalDisplayType: string;
    displayGoals: boolean;
    toggleGoalsDisplay: (type: string) => void;
    savingsGoals: Goal[]
}
const DisplayGoalsType = ({goalDisplayType, displayGoals, toggleGoalsDisplay, savingsGoals}: DisplayGoalsTypeProps) => {
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
                <div className={"space-x-4"}>
                    <button className={"border-b-blue-600 border-b-2"}>All</button>
                    <button className={"text-gray-500"}>Achieved</button>
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
    goal: { name: string, imageUrl: string, amountSaved: number, amountTarget: number }
}

const GoalCard = ({goal}: GoalCardProps) => {
    const [isGoalDetailsModalOpen, setIsGoalDetailsModalOpen] = useState(false);

    return (
        <>
            <li key={goal.name}
                className={" flex flex-col items-center justify-between w-1/3 m-2 p-4 bg-white rounded-xl"}>
                {goal.imageUrl &&
                    <img className={"rounded-lg w-full"} src={goal.imageUrl} alt={goal.name} width={100}/>}
                <p className={"capitalize"}>{goal.name}</p>
                <div className={"flex flex-col w-full"}>
                    <div className={"my-2 overflow-hidden"}>
                        <ProgressBar currentSaved={goal.amountSaved} totalRequired={goal.amountTarget}/>
                    </div>
                    <div className={"flex justify-between"}>
                        <p className={""}>${goal.amountSaved}</p>
                        <p>${goal.amountTarget}</p>
                    </div>
                </div>
                <button onClick={() => setIsGoalDetailsModalOpen(true)}>View</button>
                <GoalDetailsModal goal={goal} isGoalDetailsModalOpen={isGoalDetailsModalOpen}
                                  setIsGoalDetailsModalOpen={setIsGoalDetailsModalOpen}/>
            </li>
        </>
    )
}

interface GoalDetailsModalProps {
    goal: { name: string, imageUrl: string, amountSaved: number, amountTarget: number };
    isGoalDetailsModalOpen: boolean;
    setIsGoalDetailsModalOpen: (isGoalDetailsModalOpen: boolean) => void;
}

const GoalDetailsModal = ({goal, isGoalDetailsModalOpen, setIsGoalDetailsModalOpen}: GoalDetailsModalProps) => {
    return (
        <Modal isModalOpen={isGoalDetailsModalOpen} setIsModalOpen={setIsGoalDetailsModalOpen}>
            <div className={"flex flex-col items-center"}>
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
                <button onClick={() => setIsGoalDetailsModalOpen(false)}>Close</button>
            </div>
        </Modal>
    )
}