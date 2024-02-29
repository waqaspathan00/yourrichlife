import React, {useState, useEffect} from "react"

interface DepositButtonProps {
    openAddSavingsModal: () => void;
}

/**
 * This component is a button that allows the user to deposit money into their account
 * When clicked, it will open a modal that will allow the user to add a new transaction
 * tailwind styles: green background with rounded corners, pointer cursor when hovering.
 * also says +Deposit in white text
 *
 * @constructor
 */
export default function DepositButton({openAddSavingsModal}: DepositButtonProps) {
    return (
        <div className={"flex justify-center my-4 w-full"}>
            <button onClick={openAddSavingsModal} className="bg-green-400 w-11/12 rounded-lg p-4 text-lg cursor-pointer hover:bg-green-600 text-white">+ Deposit</button>
        </div>
    )
}
