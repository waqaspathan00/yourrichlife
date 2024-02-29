import React, {useState, useEffect} from "react"
import Modal from "@/components/common/modals/Modal";

export default function AddSavingsTransactionModal({
                                                       isAddTransactionModalOpen,
                                                       setIsAddTransactionModalOpen,
                                                       addSavingsTransaction,
                                                       savingsGoals
                                                   }: any) {
    const [amount, setAmount] = useState(0);
    const [priorityGoal, setPriorityGoal] = useState("");
    const [percentage, setPercentage] = useState(0);

    return (
        <Modal isModalOpen={isAddTransactionModalOpen} setIsModalOpen={setIsAddTransactionModalOpen}>
            <h2 className={"text-center text-xl font-bold"}>Add Savings</h2>
            <div className={"space-y-4"}>
                <div className={"flex flex-col"}>
                    <label htmlFor="amount">
                        Amount
                    </label>
                    <input className={"border-2 p-2 rounded-md"} type="number" id="amount" name="amount" placeholder={"Amount"}
                           value={amount} onChange={(e) => setAmount(parseInt(e.target.value))}/>
                </div>
                <div className={"flex justify-between space-x-2"}>
                    <div className={"flex flex-col w-1/2"}>
                        <label htmlFor="goal">
                            Priority Goal
                        </label>
                        <select className={"border-2 p-2 h-full rounded-md"} name="goal" id="goal" value={priorityGoal}
                                onChange={(e) => setPriorityGoal(e.target.value)}>
                            <option value={"none"}>None</option>
                            {savingsGoals.map((goal: any) => (
                                <option value={goal.name}>{goal.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className={"flex flex-col w-1/2"}>
                        <label htmlFor="percentage">
                            Percentage
                        </label>
                        <input className={"border-2 p-2 rounded-md"} type="number" id="percentage"
                               name="percentage" value={percentage}
                               onChange={(e) => setPercentage(parseInt(e.target.value))}/>
                    </div>
                </div>
                <button className={"bg-blue-600 w-full rounded-full p-2 text-white"}
                        onClick={() => addSavingsTransaction(amount, priorityGoal, percentage)} type="submit">
                    Add
                </button>
            </div>
        </Modal>
    )
}