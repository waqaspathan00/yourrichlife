import React, {useState} from "react"
import Modal from "@/components/common/modals/Modal";

export default function WithdrawalModal({
                                            takeWithdrawal,
                                            isWithdrawalModalOpen,
                                            setIsWithdrawalModalOpen,
                                        }: any) {
    const [amount, setAmount] = useState(0);

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