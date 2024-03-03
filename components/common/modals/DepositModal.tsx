import React, {useContext, useState} from "react"
import Modal from "@/components/common/modals/Modal";
import DatePickerTailwind from "@/components/common/DatePicker";
import {updateSavingsDoc} from "@/lib/firebase";
import {SavingsDataContext} from "@/lib/context/SavingsDataContext";
import {ModalOpenContext} from "@/lib/context/ModalOpenContext";

export default function DepositModal() {
    const {isDepositModalOpen, setIsDepositModalOpen} = useContext(ModalOpenContext)
    const {dailySavingsBalanceMasterData, setTotalSaved, savingsGoals} = useContext(SavingsDataContext);
    const [savingsDate, setSavingsDate] = useState(new Date());
    const [amount, setAmount] = useState("");
    const [priorityGoal, setPriorityGoal] = useState("");
    const [percentage, setPercentage] = useState("");

    /**
     * when the user adds a new savings transaction:
     * - add the amount to the dailySavingsBalance array
     * - distribute to the savings goals that the user has set up
     */
    const addSavingsTransaction = async (savingsDate: Date, amount: string, priorityGoal: string, percentage: string) => {
        const newSavingsBalance = [...dailySavingsBalanceMasterData];
        const lastElement = newSavingsBalance[newSavingsBalance.length - 1];
        const formattedDate = savingsDate.toLocaleDateString();
        if (lastElement.date !== formattedDate) {  // this logic is flawed right now
            newSavingsBalance.push({date: formattedDate, amount: lastElement.amount});
            if (newSavingsBalance.length > 365) {
                newSavingsBalance.shift();
            }
        } else {
            lastElement.amount += parseInt(amount);
        }

        const totalAmount = parseInt(amount);
        const priorityPercentage = parseInt(percentage) / 100;
        const priorityAmount = totalAmount * priorityPercentage;
        const remainingAmount = totalAmount - priorityAmount;

        const numNonPriorityGoals = savingsGoals.filter((goal: any) => goal.name !== priorityGoal).length;
        const amountPerGoal = remainingAmount / numNonPriorityGoals;
        const updatedSavingsGoals = savingsGoals.map((goal: any) => {
            if (goal.name === priorityGoal) {
                return {...goal, amountSaved: goal.amountSaved + priorityAmount};
            } else {
                return {...goal, amountSaved: goal.amountSaved + amountPerGoal};
            }
        });

        const newSavingsData = {
            dailySavingsBalance: newSavingsBalance,
            savingsGoals: updatedSavingsGoals
        };
        updateSavingsDoc(newSavingsData)
        setTotalSaved(newSavingsBalance[newSavingsBalance.length - 1].amount);
        setIsDepositModalOpen(false);
    };

    return (
        <Modal isModalOpen={isDepositModalOpen} setIsModalOpen={setIsDepositModalOpen}>
            <h2 className={"text-center text-xl font-bold"}>Add Savings</h2>
            <div className={"space-y-4"}>
                <DatePickerTailwind savingsDate={savingsDate} setSavingsDate={setSavingsDate}/>

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
                        onClick={() => addSavingsTransaction(savingsDate, amount, priorityGoal, percentage)}
                        type="submit">
                    Deposit
                </button>
            </div>
        </Modal>
    )
}