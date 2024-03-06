import {Goal} from "@/lib/types";
import Modal from "@/components/common/modals/Modal";
import ProgressBar from "@/components/ProgressBar";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {deleteGoal, updateSavingsDoc} from "@/lib/firebase";
import {SavingsDataContext} from "@/lib/context/SavingsDataContext";
import debounce from "lodash.debounce"
import toast from "react-hot-toast";
import {updateGoals} from "@/lib/utils";
import {ModalOpenContext} from "@/lib/context/ModalOpenContext";
import EmojiPickerModal from "@/components/common/modals/EmojiPickerModal";
import { SlOptionsVertical } from "react-icons/sl";
import { MdDelete } from "react-icons/md";

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
    const {setIsEmojiPickerModalOpen} = useContext(ModalOpenContext);
    const {savingsGoals, setSavingsGoals, completedGoals, setCompletedGoals} = useContext(SavingsDataContext);
    const [amountTarget, setAmountTarget] = React.useState<number>(goal.amountTarget);
    const [emoji, setEmoji] = useState(goal.emoji);

    useEffect(() => {
        if (amountTarget === goal.amountTarget) {
            return;
        }
        updateAmountTarget(amountTarget);
    }, [amountTarget]);

    useEffect(() => {
        if (emoji === goal.emoji) {
            return;
        }
        updateEmoji(emoji);
    }, [emoji]);

    const handleDeleteGoal = async (id: number) => {
        if (goal.completed) {
            const updatedCompletedGoals = await deleteGoal(completedGoals, id, "completed")
            setCompletedGoals(updatedCompletedGoals);
        } else {
            const updatedSavingsGoals = await deleteGoal(savingsGoals, id, "savings")
            setSavingsGoals(updatedSavingsGoals);
        }
    }

    const handleChangeAmountTarget = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "$" || e.target.value === "") {
            setAmountTarget(0);
            return
        }

        const value = e.target.value.replace("$", "");
        setAmountTarget(parseInt(value));
    }

    const updateAmountTarget = useCallback(
        debounce(async (amountTarget) => {
            if (goal.completed) {
                const updatedCompletedGoals = updateGoals(completedGoals, goal.id, "amountTarget", amountTarget);
                setCompletedGoals(updatedCompletedGoals);
                updateSavingsDoc({completedGoals: updatedCompletedGoals});
                toast.success("Goal amount target updated");
            } else {
                const updatedSavingsGoals = updateGoals(savingsGoals, goal.id, "amountTarget", amountTarget);
                setSavingsGoals(updatedSavingsGoals);
                updateSavingsDoc({savingsGoals: updatedSavingsGoals});
                toast.success("Goal amount target updated");
            }
        }, 1000),
        []
    );

    const updateEmoji = useCallback(
        debounce(async (emoji) => {
            if (goal.completed) {
                const updatedCompletedGoals = updateGoals(completedGoals, goal.id, "emoji", emoji);
                setCompletedGoals(updatedCompletedGoals);
                toast.success("Goal emoji updated");
            } else {
                const updatedSavingsGoals = updateGoals(savingsGoals, goal.id, "emoji", emoji);
                setSavingsGoals(updatedSavingsGoals);
                toast.success("Goal emoji updated");
            }
        }, 1000),
        []
    );

    const openEmojiModal = () => {
        setIsEmojiPickerModalOpen(true);
    }

    return (
        <Modal isModalOpen={isGoalDetailsModalOpen} setIsModalOpen={setIsGoalDetailsModalOpen}>
            {/*<button className={"absolute top-5 left-4"}>*/}
            {/*    <SlOptionsVertical size={20}/>*/}
            {/*</button>*/}
            <button className={"absolute top-4 left-4 text-red-500"} onClick={() => handleDeleteGoal(goal.id)}>
                <MdDelete size={24}/>
            </button>

            <div className={"flex flex-col items-center mt-4"}>
                <div className={"flex justify-center w-full items-center"}>
                    <button className={"text-2xl"} onClick={openEmojiModal}>{emoji}</button>
                    <p className={"capitalize ml-4"}>{goal.name}</p>
                </div>
                <div className={"flex flex-col w-full"}>
                    <div className={"my-2 overflow-hidden"}>
                        <ProgressBar currentSaved={goal.amountSaved} totalRequired={goal.amountTarget}/>
                    </div>
                    <div className={"flex justify-between"}>
                        <p className={""}>${goal.amountSaved}</p>
                        <input className={"w-1/4 text-right"} value={`$${amountTarget}`}
                               onChange={(e) => handleChangeAmountTarget(e)}/>
                    </div>
                </div>
            </div>

            <EmojiPickerModal emoji={emoji} setEmoji={setEmoji}/>
        </Modal>
    )
}