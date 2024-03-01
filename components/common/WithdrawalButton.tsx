import React from "react"

interface WithdrawalButtonProps {
    openWithdrawalModal: () => void;
}

export default function WithdrawalButton({openWithdrawalModal}: WithdrawalButtonProps) {
    return (
        <button onClick={openWithdrawalModal}
                className="bg-red-300 w-full rounded-lg p-4 whitespace-no-wrap text-lg cursor-pointer hover:bg-red-500 text-white">
            - Withdrawal</button>
    )
}
