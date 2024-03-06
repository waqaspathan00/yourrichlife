import React, {useState, useEffect, useContext} from "react"
import {SavingsDataContext} from "@/lib/context/SavingsDataContext";
import Modal from "@/components/common/modals/Modal";
import {ModalOpenContext} from "@/lib/context/ModalOpenContext";
import {updateSavingsDoc} from "@/lib/firebase";
import {Goal} from "@/lib/types";
import {distributeFundsToGoals} from "@/lib/utils";

/**
 * in this modal the user will be able to distribute funds to their savings goals
 * these funds are currently undistributed based on the total amount saved and the amount saved to each goal
 * the user will be able to select a priority goal and a percentage of the total amount to distribute to that goal
 */
export default function DistributeFundsModal() {
    const {savingsGoals, setSavingsGoals, undistributedFunds, setUndistributedFunds} = useContext(SavingsDataContext);
    const {isDistributeFundsModalOpen, setIsDistributeFundsModalOpen} = useContext(ModalOpenContext);
    const [distributionAmount, setDistributionAmount] = useState(0);
    const [priorityGoal, setPriorityGoal] = useState("");
    const [percentageInt, setPercentageInt] = useState(100);

    /**
     * totalAmountToDistribute will be the amount the user enters and will be decremented as we distribute to each goal
     */
    const handleDistributeFunds = () => {
        const {remainingFundsToDistribute, updatedSavingsGoals} = distributeFundsToGoals(distributionAmount, percentageInt, priorityGoal, savingsGoals);

        const newSavingsData = {
            savingsGoals: updatedSavingsGoals
        };

        const updatedUndistributedFunds = undistributedFunds - distributionAmount + remainingFundsToDistribute

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
                           value={distributionAmount} onChange={(e) => setDistributionAmount(parseInt(e.target.value))}/>
                </div>
                <div className={"flex justify-between space-x-2"}>
                    <div className={"flex flex-col w-3/4"}>
                        <label htmlFor="goal">
                            Priority Goal
                        </label>
                        <select className={"border-2 p-2 h-full rounded-md"} name="goal" id="goal" value={priorityGoal}
                                onChange={(e) => setPriorityGoal(e.target.value)}>
                            <option value={"none"}>None</option>
                            {savingsGoals.map((goal: Goal) => (
                                <option value={goal.name}>{goal.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className={"flex flex-col w-1/4"}>
                        <label htmlFor="percentage">
                            Percentage
                        </label>
                        <input className={"border-2 p-2 rounded-md"} type="number" id="percentage"
                               name="percentage" value={percentageInt}
                               onChange={(e) => setPercentageInt(parseInt(e.target.value))}/>
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
