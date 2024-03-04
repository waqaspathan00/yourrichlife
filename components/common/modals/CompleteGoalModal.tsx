import React, {useContext} from "react"
import Modal from "@/components/common/modals/Modal";
import {completeGoal} from "@/lib/firebase";
import {SavingsDataContext} from "@/lib/context/SavingsDataContext";

export default function CompleteGoalModal({goal, isCompleteGoalModalOpen, setIsCompleteGoalModalOpen}: any) {
    const {savingsGoals, setSavingsGoals, completedGoals, setCompletedGoals} = useContext(SavingsDataContext);

    const handleCompleteGoal = async () => {
        const {savingsGoals: updatedSavingsGoals, completedGoals: updatedCompletedGoals} = await completeGoal(savingsGoals, completedGoals, goal.id);

        setSavingsGoals(updatedSavingsGoals);
        setCompletedGoals(updatedCompletedGoals);
        setIsCompleteGoalModalOpen(false);
    }

    return (
        <Modal isModalOpen={isCompleteGoalModalOpen} setIsModalOpen={setIsCompleteGoalModalOpen}>
            <div className={"flex flex-col items-center"}>
                <h1 className={"text-2xl font-bold"}>Complete Goal</h1>
                <p>Once you complete this goal, the amount will be subtracted from your total amount saved.</p>
                <p>Are you ready?</p>
                <button onClick={() => handleCompleteGoal()} className={"bg-green-500 text-white p-2 rounded-lg mt-4"}>Complete</button>
            </div>
        </Modal>
    )
}
