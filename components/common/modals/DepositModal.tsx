import React, {useContext, useState} from "react"
import Modal from "@/components/common/modals/Modal";
import {updateSavingsDoc} from "@/lib/firebase";
import {SavingsDataContext} from "@/lib/context/SavingsDataContext";
import {ModalOpenContext} from "@/lib/context/ModalOpenContext";
import {calculateUndistributedFunds, distributeFundsToGoals} from "@/lib/utils";
import PriorityGoalPicker from "@/components/common/PriorityGoalPicker";
import toast from "react-hot-toast";

export default function DepositModal() {
    const {isDepositModalOpen, setIsDepositModalOpen} = useContext(ModalOpenContext)
    const {
        dailySavingsBalanceMasterData,
        setTotalSaved,
        savingsGoals,
        setSavingsGoals,
        undistributedFunds,
        setUndistributedFunds
    } = useContext(SavingsDataContext);
    const [savingsDate, setSavingsDate] = useState(new Date());  // remove this field, no longer asking for it
    const [depositAmount, setDepositAmount] = useState(0);
    const [priorityGoal, setPriorityGoal] = useState("None");
    const [percentageInt, setPercentageInt] = useState(0);

    /**
     * when the user adds a new savings transaction:
     * - add the amount to the dailySavingsBalance array, first check the date entered by the user
     *   - if the date of the last element in the array is today AND the user entered todays date, add the amount to the last element
     *   - if the user entered a date that is not today, update the correct element in the array with the new amount
     *   - if the array has more than 365 elements, remove the first element
     * - update the totalSaved state with the new total amount saved
     * - distribute to the savings goals that the user has set up
     *
     * - this logic is still flawed:
     *   - we should be adding a new row when the user signs in for the day
     *   - if we update a savings value from the past that means we are changing history and have to update all future values
     */
    const addSavingsTransaction = async () => {
        const newSavingsBalance = [...dailySavingsBalanceMasterData];
        const lastElement = newSavingsBalance[newSavingsBalance.length - 1];
        const lastElementDate = new Date(lastElement.date).toLocaleDateString()
        const lastSavingsAmount = lastElement.amount;
        const enteredDate = savingsDate.toLocaleDateString();
        const TODAY = new Date().toLocaleDateString();
        if (lastElementDate === TODAY && enteredDate === TODAY) {
            newSavingsBalance[newSavingsBalance.length - 1].amount += depositAmount;
        } else {
            const index = newSavingsBalance.findIndex((element) => element.date === enteredDate);
            newSavingsBalance[index].amount += depositAmount;
        }

        const {
            remainingFundsToDistribute,
            updatedSavingsGoals
        } = distributeFundsToGoals(depositAmount, percentageInt, priorityGoal, savingsGoals);
        const updatedUndistributedFunds = undistributedFunds - depositAmount + remainingFundsToDistribute
        // const updatedUndistributedFunds = calculateUndistributedFunds(lastSavingsAmount, updatedSavingsGoals);

        const newSavingsData = {
            dailySavingsBalance: newSavingsBalance,
            savingsGoals: updatedSavingsGoals
        };

        updateSavingsDoc(newSavingsData)

        setTotalSaved(newSavingsBalance[newSavingsBalance.length - 1].amount);
        setSavingsGoals(updatedSavingsGoals);
        setUndistributedFunds(updatedUndistributedFunds);
        setIsDepositModalOpen(false);
    };

    const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (value < 0) {
            setDepositAmount(0);
        } else {
            setDepositAmount(value);
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
        <Modal isModalOpen={isDepositModalOpen} setIsModalOpen={setIsDepositModalOpen}>
            <h2 className={"text-center text-xl font-bold"}>Add Savings</h2>
            <div className={"space-y-4"}>
                {/*<DatePickerTailwind savingsDate={savingsDate} setSavingsDate={setSavingsDate}/>*/}

                <div className={"flex flex-col"}>
                    <label htmlFor="amount">
                        Amount
                    </label>
                    <input className={"border-2 p-2 rounded-md"} type="number" id="amount" name="amount"
                           placeholder={"Amount"}
                           value={depositAmount} onChange={handleChangeAmount}/>
                </div>
                <div className={"flex justify-between space-x-2"}>
                    <div className={"flex flex-col w-3/4"}>
                        <label htmlFor="goal">
                            Priority Goal
                        </label>
                        <PriorityGoalPicker savingsGoals={savingsGoals} priorityGoal={priorityGoal}
                                            handleChangePriorityGoal={handleChangePriorityGoal}/>
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
                        onClick={addSavingsTransaction}
                        type="submit">
                    Deposit
                </button>
            </div>
        </Modal>
    )
}