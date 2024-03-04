import {Goal} from "@/lib/types";
import Modal from "@/components/common/modals/Modal";
import ProgressBar from "@/components/ProgressBar";
import React, {useContext} from "react";
import {deleteGoal} from "@/lib/firebase";
import {SavingsDataContext} from "@/lib/context/SavingsDataContext";

interface GoalDetailsModalProps {
    goal: Goal;
    isGoalDetailsModalOpen: boolean;
    setIsGoalDetailsModalOpen: (isGoalDetailsModalOpen: boolean) => void;
}

export default function GoalDetailsModal({
                                             goal,
                                             isGoalDetailsModalOpen,
                                             setIsGoalDetailsModalOpen
                                         }: GoalDetailsModalProps) {
    const {savingsGoals, setSavingsGoals, completedGoals, setCompletedGoals} = useContext(SavingsDataContext);

    const handleDeleteGoal = async (id: number) => {
        if (goal.completed) {
            const updatedCompletedGoals = await deleteGoal(completedGoals, id)
            setCompletedGoals(updatedCompletedGoals);
        } else {
            const updatedSavingsGoals = await deleteGoal(savingsGoals, id)
            setSavingsGoals(updatedSavingsGoals);
        }
    }

    return (
        <Modal isModalOpen={isGoalDetailsModalOpen} setIsModalOpen={setIsGoalDetailsModalOpen}>
            <div className={"flex flex-col items-center"}>
                <div className={"flex items-center"}>
                    <div className={"text-2xl"}>{goal.emoji}</div>
                    <p className={"capitalize text-xl ml-4"}>{goal.name}</p>
                </div>
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