import React, {useState, useContext} from "react"
import Modal from "@/components/common/modals/Modal";
import {updateSavingsDoc} from "@/lib/firebase";
import {generateId} from "@/lib/utils";
import {ModalOpenContext} from "@/lib/context/ModalOpenContext";
import {SavingsDataContext} from "@/lib/context/SavingsDataContext";
import EmojiPickerModal from "@/components/common/modals/EmojiPickerModal";
import toast from "react-hot-toast";

export default function CreateGoalModal() {
    const {isCreateGoalModalOpen, setIsCreateGoalModalOpen, createGoalModalType, setIsEmojiPickerModalOpen} = useContext(ModalOpenContext);
    const {savingsGoals, setSavingsGoals} = useContext(SavingsDataContext);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0);
    const [emoji, setEmoji] = useState("💰")

    const goalModalTypeText = createGoalModalType === "necessities" ? "Necessity" : "Want";

    const createSavingsGoal = (name: string, amount: number, emoji: string) => {
        if (!name || !amount || !emoji) {
            toast.error("Please fill in all fields");
            return;
        }

        const newGoal = {
            id: generateId(),
            type: createGoalModalType,
            name,
            emoji,
            amountTarget: amount,
            amountSaved: 0,
        };
        const newGoals = [...savingsGoals, newGoal];

        const newSavingsData = {
            savingsGoals: newGoals
        };
        updateSavingsDoc(newSavingsData)

        // @ts-ignore
        setSavingsGoals(newGoals);
        setIsCreateGoalModalOpen(false);

        setName("");
        setAmount(0);
    }

    const openModal = () => {
        setIsEmojiPickerModalOpen(true);
    }

    return (
        <Modal isModalOpen={isCreateGoalModalOpen} setIsModalOpen={setIsCreateGoalModalOpen}>
            <div className={"bg-white rounded-lg"}>
                <h2 className={"text-center text-xl font-bold mb-4"}>Create {goalModalTypeText} Goal</h2>
                <div className={"space-y-4"}>
                    <button className={"text-2xl text-center w-full"} onClick={openModal}>{emoji}</button>
                    <div className={"flex flex-col"}>
                        <label htmlFor="name">
                            Name
                        </label>
                        <input className={"border-2 p-2 rounded-md"} type="text" id="name" name="name"
                               value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className={"flex flex-col"}>
                        <label htmlFor="amount">
                            Target Amount
                        </label>
                        <input className={"border-2 p-2 rounded-md"} type="number" id="amount" name="amount"
                               value={amount} onChange={(e) => setAmount(parseInt(e.target.value))}/>
                    </div>
                    <button className={"bg-blue-600 w-full rounded-full p-2 text-white"}
                            onClick={() => createSavingsGoal(name, amount, emoji)} type="submit">Create
                    </button>
                </div>
            </div>

            <EmojiPickerModal emoji={emoji} setEmoji={setEmoji}/>
        </Modal>
    )
}
