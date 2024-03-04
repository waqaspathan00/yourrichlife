import React, {useContext} from "react"
import {ModalOpenContext} from "@/lib/context/ModalOpenContext";

export default function WithdrawalButton() {
    const {setIsWithdrawalModalOpen} = useContext(ModalOpenContext);

    const openWithdrawalModal = () => {
        setIsWithdrawalModalOpen(true);
    }

    return (
        <button onClick={openWithdrawalModal}
                className="bg-white w-full rounded-lg p-4 whitespace-no-wrap text-lg cursor-pointer hover:bg-red-500">
            - Withdraw</button>
    )
}
