import React, {useState, useContext} from "react"
import {SavingsDataContext} from "@/lib/context/SavingsDataContext";
import Modal from "@/components/common/modals/Modal";
import {ModalOpenContext} from "@/lib/context/ModalOpenContext";
import {updateSavingsDoc} from "@/lib/firebase";
import {distributeFundsToGoals} from "@/lib/utils";
import PriorityGoalPicker from "@/components/common/PriorityGoalPicker";
import toast from "react-hot-toast";
import {UserContext} from "@/lib/context/UserContext";

/**
 * in this modal the user will be able to distribute funds to their savings goals
 * these funds are currently undistributed based on the total amount saved and the amount saved to each goal
 * the user will be able to select a priority goal and a percentage of the total amount to distribute to that goal
 */
export default function DistributeFundsModal() {
    const {savingsGoals, setSavingsGoals, undistributedFunds, setUndistributedFunds, totalSaved} = useContext(SavingsDataContext);
    const { user } = useContext(UserContext);
    const {isDistributeFundsModalOpen, setIsDistributeFundsModalOpen} = useContext(ModalOpenContext);
    const [distributionAmount, setDistributionAmount] = useState(0);
    const [priorityGoal, setPriorityGoal] = useState("None");
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

        updateSavingsDoc(user?.email, newSavingsData)
        setSavingsGoals(updatedSavingsGoals);
        setUndistributedFunds(updatedUndistributedFunds);
        setIsDistributeFundsModalOpen(false);
    }

    const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (value < 0) {
            setDistributionAmount(0);
        } else if (value > totalSaved) {
            toast.error("You cannot distribute more than you have saved");
            setDistributionAmount(totalSaved);
        } else {
            setDistributionAmount(value);
        }
    }

    const handleChangePriorityGoal = (goal: string) => {
        setPriorityGoal(goal);
        if (percentageInt === 0) {
            setPercentageInt(100);
        } else if (goal === "None") {
            setPercentageInt(0);
        }
    }

    const handleChangePercentage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (value > 100) {
            setPercentageInt(100);
        } else if (value < 0) {
            setPercentageInt(0);
        } else {
            setPercentageInt(value);
        }
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
                           value={distributionAmount} onChange={handleChangeAmount}/>
                </div>
                <div className={"flex justify-between space-x-2"}>
                    <div className={"flex flex-col w-3/4"}>
                        <label htmlFor="goal">
                            Priority Goal
                        </label>
                        <PriorityGoalPicker savingsGoals={savingsGoals} priorityGoal={priorityGoal} handleChangePriorityGoal={handleChangePriorityGoal}/>
                    </div>
                    <div className={"flex flex-col w-1/4"}>
                        <label htmlFor="percentage">
                            Percentage
                        </label>
                        <input className={"border-2 p-2 rounded-md"} type="number" id="percentage"
                               name="percentage" value={percentageInt}
                               onChange={handleChangePercentage}/>
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
