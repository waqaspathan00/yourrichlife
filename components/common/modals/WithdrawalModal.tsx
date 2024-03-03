import React, {useContext, useState} from "react"
import Modal from "@/components/common/modals/Modal";
import {updateSavingsDoc} from "@/lib/firebase";
import {SavingsDataContext} from "@/lib/context/SavingsDataContext";
import {ModalOpenContext} from "@/lib/context/ModalOpenContext";

export default function WithdrawalModal() {
    const {dailySavingsBalanceMasterData, setTotalSaved} = useContext(SavingsDataContext);
    const {isWithdrawalModalOpen, setIsWithdrawalModalOpen} = useContext(ModalOpenContext);
    const [amount, setAmount] = useState(0);


    const takeWithdrawal = (amount: number) => {
        const newSavingsBalance = [...dailySavingsBalanceMasterData];
        const lastElement = newSavingsBalance[newSavingsBalance.length - 1];
        lastElement.amount -= amount;
        const newSavingsData = {
            dailySavingsBalance: newSavingsBalance
        };
        updateSavingsDoc(newSavingsData)
        setTotalSaved(newSavingsBalance[newSavingsBalance.length - 1].amount);
        setIsWithdrawalModalOpen(false);
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
                           value={amount} onChange={(e) => setAmount(parseInt(e.target.value))}/>
                </div>
                <button className={"bg-blue-600 w-full rounded-full p-4 text-lg text-white"}
                    onClick={() => takeWithdrawal(amount)}
                        type="submit">
                    Withdraw
                </button>
            </div>
        </Modal>
    )
}