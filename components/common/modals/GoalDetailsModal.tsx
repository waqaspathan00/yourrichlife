import {Goal} from "@/lib/types";
import Modal from "@/components/common/modals/Modal";
import ProgressBar from "@/components/ProgressBar";
import React from "react";

interface GoalDetailsModalProps {
    goal: Goal;
    handleDeleteGoal: (id: number) => void;
    isGoalDetailsModalOpen: boolean;
    setIsGoalDetailsModalOpen: (isGoalDetailsModalOpen: boolean) => void;
}

export default function GoalDetailsModal({goal, handleDeleteGoal, isGoalDetailsModalOpen, setIsGoalDetailsModalOpen}: GoalDetailsModalProps) {
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
                <button onClick={() => handleDeleteGoal(goal.id)}>Delete</button>
            </div>
        </Modal>
    )
}