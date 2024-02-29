import React, {useState, useEffect} from "react"
import Modal from "@/components/common/modals/Modal";

export default function CreateGoalModal({createGoalModalType, isCreateGoalModalOpen, setIsCreateGoalModalOpen, createSavingsGoal}: any){
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0);
    const [imageUrl, setImageUrl] = useState("");
    const goalModalTypeText = createGoalModalType === "necessities" ? "Necessity" : "Want";

    return (
        <Modal isModalOpen={isCreateGoalModalOpen} setIsModalOpen={setIsCreateGoalModalOpen}>
            <div className={"bg-white rounded-lg"}>
                <h2 className={"text-center text-xl font-bold mb-4"}>{goalModalTypeText} Goal</h2>
                <div className={"space-y-4"}>
                    <div className={"flex flex-col"}>
                        <label htmlFor="name">
                            Name
                        </label>
                        <input className={"border-2 p-2 rounded-md"} type="text" id="name" name="name"
                               value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className={"flex flex-col"}>
                        <label htmlFor="amount">
                            Amount
                        </label>
                        <input className={"border-2 p-2 rounded-md"} type="number" id="amount" name="amount"
                               value={amount} onChange={(e) => setAmount(parseInt(e.target.value))}/>
                    </div>
                    <div className={"flex flex-col"}>
                        <label htmlFor={"image"}>
                            Image url
                        </label>
                        <input className={"border-2 p-2 rounded-md"} type="text" id="image" name="image"
                               onChange={(e) => setImageUrl(e.target.value)}/>

                    </div>
                    <button className={"bg-blue-600 w-full rounded-full p-2 text-white"}
                            onClick={() => createSavingsGoal(name, amount, imageUrl)} type="submit">Create
                    </button>
                </div>
            </div>
        </Modal>
    )
}
