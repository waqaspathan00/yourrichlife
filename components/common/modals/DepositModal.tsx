import React, {useContext, useState} from "react"
import Modal from "@/components/common/modals/Modal";
import {updateSavingsDoc} from "@/lib/firebase";
import {SavingsDataContext} from "@/lib/context/SavingsDataContext";
import {ModalOpenContext} from "@/lib/context/ModalOpenContext";
import {calculateUndistributedFunds, distributeFundsToGoals} from "@/lib/utils";
import PriorityGoalPicker from "@/components/common/PriorityGoalPicker";
import toast from "react-hot-toast";
import {AccountsDataContext} from "@/lib/context/AccountsDataContext";
import SavingsAccountPicker from "@/components/common/SavingsAccountPicker";

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
    const {
        accountsList,
        setAccountsList
    } = useContext(AccountsDataContext);
    const [savingsDate, setSavingsDate] = useState(new Date());  // remove this field, no longer asking for it
    const [depositAmount, setDepositAmount] = useState(0);
    const [priorityGoal, setPriorityGoal] = useState("None");
    const [percentageInt, setPercentageInt] = useState(0);
    const [accountName, setAccountName] = useState("None");

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
        // const updatedUndistributedFunds = undistributedFunds - depositAmount + remainingFundsToDistribute
        const updatedUndistributedFunds = calculateUndistributedFunds(lastSavingsAmount, updatedSavingsGoals);

        if (accountName !== "None") {
            const updatedAccountsList = accountsList.map((account) => {
                if (account.name === accountName) {
                    account.balance += depositAmount;
                }
                return account;
            });
            setAccountsList(updatedAccountsList);
        }

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

    const handleChangeAccount = (accountName: string) => {
        setAccountName(accountName);
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
                <div className={"flex flex-col w-full"}>
                    <label htmlFor="account">
                        Account
                    </label>
                    <SavingsAccountPicker accountName={accountName} accountsList={accountsList}
                                          handleChangeAccount={handleChangeAccount}/>
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