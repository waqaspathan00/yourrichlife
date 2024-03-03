import React, {useState, useEffect, useContext} from "react"
import {SavingsDataContext} from "@/lib/context/SavingsDataContext";
import Modal from "@/components/common/modals/Modal";
import {ModalOpenContext} from "@/lib/context/ModalOpenContext";
import {updateSavingsDoc} from "@/lib/firebase";

export default function DistributeFundsModal() {
    const {savingsGoals, setSavingsGoals, undistributedFunds, setUndistributedFunds} = useContext(SavingsDataContext);
    const {isDistributeFundsModalOpen, setIsDistributeFundsModalOpen} = useContext(ModalOpenContext);
    const [amount, setAmount] = useState("");
    const [priorityGoal, setPriorityGoal] = useState("");
    const [percentage, setPercentage] = useState("");

    const handleDistributeFunds = () => {
        const totalAmountToDistribute = parseInt(amount);
        const priorityPercentage = parseInt(percentage) / 100;
        const priorityAmountToDistribute = totalAmountToDistribute * priorityPercentage;
        const remainingAmountToDistribute = totalAmountToDistribute - priorityAmountToDistribute;

        const numNonPriorityGoals = savingsGoals.filter((goal: any) => goal.name !== priorityGoal).length;
        const amountPerGoal = remainingAmountToDistribute / numNonPriorityGoals;
        const updatedSavingsGoals = savingsGoals.map((goal: any) => {
            if (goal.name === priorityGoal) {
                return {...goal, amountSaved: goal.amountSaved + priorityAmountToDistribute};
            } else {
                return {...goal, amountSaved: goal.amountSaved + amountPerGoal};
            }
        });

        const newSavingsData = {
            savingsGoals: updatedSavingsGoals
        };

        const updatedUndistributedFunds = undistributedFunds - totalAmountToDistribute;

        updateSavingsDoc(newSavingsData)
        setSavingsGoals(updatedSavingsGoals);
        setUndistributedFunds(updatedUndistributedFunds);
        setIsDistributeFundsModalOpen(false);
    }

    return (
        <Modal isModalOpen={isDistributeFundsModalOpen} setIsModalOpen={setIsDistributeFundsModalOpen}>
            <h2 className={"text-center text-xl font-bold"}>Distribute Funds</h2>
            <p className={"text-center text-gray-500"}>Allocate savings to your goals</p>
            <div className={"space-y-4"}>
                <div className={"flex flex-col"}>
                    <label htmlFor="amount">
                        Amount
                    </label>
                    <input className={"border-2 p-2 rounded-md"} type="number" id="amount" name="amount"
                           placeholder={"Amount"}
                           value={amount} onChange={(e) => setAmount(e.target.value)}/>
                </div>
                <div className={"flex justify-between space-x-2"}>
                    <div className={"flex flex-col w-3/4"}>
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
                    <div className={"flex flex-col w-1/4"}>
                        <label htmlFor="percentage">
                            Percentage
                        </label>
                        <input className={"border-2 p-2 rounded-md"} type="number" id="percentage"
                               name="percentage" value={percentage}
                               onChange={(e) => setPercentage(e.target.value)}/>
                    </div>
                </div>
                <button className={"bg-blue-600 w-full rounded-full text-lg p-2 text-white"}
                        onClick={() => handleDistributeFunds()}
                        type="submit">
                    Distribute
                </button>
            </div>
        </Modal>
    )
}
