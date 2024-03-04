import React, {useState} from "react";
import ProgressBar from "@/components/ProgressBar";
import GoalDetailsModal from "@/components/common/modals/GoalDetailsModal";
import {Goal} from "@/lib/types";
import CompleteGoalModal from "@/components/common/modals/CompleteGoalModal";

interface GoalCardProps {
    goal: Goal,
}

export default function GoalCard({goal}: GoalCardProps) {
    const [isGoalDetailsModalOpen, setIsGoalDetailsModalOpen] = useState(false);
    const [isCompleteGoalModalOpen, setIsCompleteGoalModalOpen] = useState(false);

    const openCompleteGoalModal = () => {
        setIsCompleteGoalModalOpen(true);
    }

    return (
        <>
            <li key={goal.name}
                className={"flex flex-col w-full my-2 p-4 bg-white cursor-pointer rounded-xl"}>

                <div className={"flex justify-between"}
                     onClick={() => setIsGoalDetailsModalOpen(true)}>
                    <div className={"flex items-center"}>
                        <div className={"text-2xl"}>{goal.emoji}</div>
                        <p className={"capitalize text-xl ml-4"}>{goal.name}</p>
                    </div>

                    <div className={"flex flex-col w-1/3 mt-4"}>
                        <div className={"overflow-hidden"}>
                            <ProgressBar currentSaved={goal.amountSaved} totalRequired={goal.amountTarget}/>
                        </div>
                        <div className={"flex justify-between"}>
                            <p className={""}>${goal.amountSaved}</p>
                            <p>${goal.amountTarget}</p>
                        </div>
                    </div>
                </div>

                {(!goal.completed && goal.amountSaved >= goal.amountTarget) && (
                    <button onClick={openCompleteGoalModal}
                            className={"bg-green-500 w-full rounded-full text-lg p-2 text-white mt-4"}>
                        Complete
                    </button>
                )}

                <CompleteGoalModal goal={goal}
                                   isCompleteGoalModalOpen={isCompleteGoalModalOpen}
                                   setIsCompleteGoalModalOpen={setIsCompleteGoalModalOpen}/>
                <GoalDetailsModal goal={goal}
                                  isGoalDetailsModalOpen={isGoalDetailsModalOpen}
                                  setIsGoalDetailsModalOpen={setIsGoalDetailsModalOpen}/>
            </li>
        </>
    )
}
