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
import {UserContext} from "@/lib/context/UserContext";

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
    const { user } = useContext(UserContext);
    const {setIsEmojiPickerModalOpen} = useContext(ModalOpenContext);
    const {savingsGoals, setSavingsGoals, completedGoals, setCompletedGoals} = useContext(SavingsDataContext);
    const [name, setName] = useState(goal.name);
    const [amountTarget, setAmountTarget] = React.useState<number>(goal.amountTarget);
    const [emoji, setEmoji] = useState(goal.emoji);

    useEffect(() => {
        if (name === goal.name) {
            return;
        }
        updateName(name);
    }, [name]);

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
            const updatedCompletedGoals = await deleteGoal(completedGoals, id, "completed", user?.email)
            setCompletedGoals(updatedCompletedGoals);
        } else {
            const updatedSavingsGoals = await deleteGoal(savingsGoals, id, "savings", user?.email)
            setSavingsGoals(updatedSavingsGoals);
        }
    }

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleChangeAmountTarget = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "$" || e.target.value === "") {
            setAmountTarget(0);
            return
        }

        const value = e.target.value.replace("$", "");
        setAmountTarget(parseInt(value));
    }

    const updateName = useCallback(
        debounce(async (name) => {
            if (goal.completed) {
                const updatedCompletedGoals = updateGoals(completedGoals, goal.id, "name", name);
                setCompletedGoals(updatedCompletedGoals);
                updateSavingsDoc(user?.email, {completedGoals: updatedCompletedGoals});
                toast.success("Goal name updated");
            } else {
                const updatedSavingsGoals = updateGoals(savingsGoals, goal.id, "name", name);
                setSavingsGoals(updatedSavingsGoals);
                updateSavingsDoc(user?.email, {savingsGoals: updatedSavingsGoals});
                toast.success("Goal name updated");
            }
        }, 1000),
        []
    );

    const updateAmountTarget = useCallback(
        debounce(async (amountTarget) => {
            if (goal.completed) {
                const updatedCompletedGoals = updateGoals(completedGoals, goal.id, "amountTarget", amountTarget);
                setCompletedGoals(updatedCompletedGoals);
                updateSavingsDoc(user?.email, {completedGoals: updatedCompletedGoals});
                toast.success("Goal amount target updated");
            } else {
                const updatedSavingsGoals = updateGoals(savingsGoals, goal.id, "amountTarget", amountTarget);
                setSavingsGoals(updatedSavingsGoals);
                updateSavingsDoc(user?.email, {savingsGoals: updatedSavingsGoals});
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
                    <input className={"ml-4"} value={name} onChange={(e) => handleChangeName(e)} />
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