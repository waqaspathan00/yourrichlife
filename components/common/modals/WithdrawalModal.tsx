import React, {useContext, useEffect, useState} from "react"
import Modal from "@/components/common/modals/Modal";
import {updateSavingsDoc} from "@/lib/firebase";
import {SavingsDataContext} from "@/lib/context/SavingsDataContext";
import {ModalOpenContext} from "@/lib/context/ModalOpenContext";
import SavingsAccountPicker from "@/components/common/SavingsAccountPicker";
import {AccountsDataContext} from "@/lib/context/AccountsDataContext";
import toast from "react-hot-toast";
import {UserContext} from "@/lib/context/UserContext";

export default function WithdrawalModal() {
    const {
        setUndistributedFunds
    } = useContext(SavingsDataContext);
    const {
        accountsList,
    } = useContext(AccountsDataContext);
    const { user } = useContext(UserContext);
    const {dailySavingsBalanceMasterData, totalSaved, setTotalSaved} = useContext(SavingsDataContext);
    const {isWithdrawalModalOpen, setIsWithdrawalModalOpen} = useContext(ModalOpenContext);
    const [withdrawalAmount, setWithdrawalAmount] = useState(0);
    const [accountName, setAccountName] = useState("None");

    useEffect(() => {
        setAccountName(accountsList[0]?.name)
    }, [accountsList]);

    const takeWithdrawal = (amount: number) => {
        if (withdrawalAmount <= 0) {
            toast.error("Please enter an amount to deposit");
            return;
        } else if (accountName === "None") {
            toast.error("Please select an account to deposit to");
            return;
        }

        const newSavingsBalance = [...dailySavingsBalanceMasterData];
        const lastElement = newSavingsBalance[newSavingsBalance.length - 1];
        lastElement.amount -= amount;
       const newSavingsData = {
            dailySavingsBalance: newSavingsBalance
        };

        updateSavingsDoc(user?.email, newSavingsData)
        setTotalSaved(newSavingsBalance[newSavingsBalance.length - 1].amount);
        setIsWithdrawalModalOpen(false);
    }

    const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (value > totalSaved){
            setWithdrawalAmount(totalSaved)
            return
        }
        setWithdrawalAmount(value)
    }

    const handleChangeAccount = (accountName: string) => {
        setAccountName(accountName);
    }

    return (
        <Modal isModalOpen={isWithdrawalModalOpen} setIsModalOpen={setIsWithdrawalModalOpen}>
            <h2 className={"text-center text-xl font-bold"}>Take Withdrawal</h2>
            <div className={"space-y-4"}>
                <div className={"flex flex-col"}>
                    <label htmlFor="amount">
                        Amount
                    </label>
                    <input className={"border-2 p-2 rounded-md"} type="number" id="amount" name="amount"
                           placeholder={"Amount"}
                           value={withdrawalAmount} onChange={handleChangeAmount}/>
                </div>
                <div className={"flex flex-col w-full"}>
                    <label htmlFor="account">
                        Account
                    </label>
                    <SavingsAccountPicker accountName={accountName} accountsList={accountsList}
                                          handleChangeAccount={handleChangeAccount}/>
                </div>
                <button className={"bg-blue-600 w-full rounded-full p-2 text-lg text-white"}
                        onClick={() => takeWithdrawal(withdrawalAmount)}
                        type="submit">
                    Withdraw
                </button>
            </div>
        </Modal>
    )
}