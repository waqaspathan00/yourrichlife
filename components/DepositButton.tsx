import React, {useContext} from "react"
import {ModalOpenContext} from "@/lib/context/ModalOpenContext";

/**
 * This component is a button that allows the user to deposit money into their account
 * When clicked, it will open a modal that will allow the user to add a new transaction
 * tailwind styles: green background with rounded corners, pointer cursor when hovering.
 * also says +Deposit in white text
 *
 * @constructor
 */
export default function DepositButton() {
    const {setIsDepositModalOpen} = useContext(ModalOpenContext);

    const openDepositModal = () => {
        setIsDepositModalOpen(true);
    }

    return (
        <button onClick={openDepositModal}
                className="bg-gray-800 w-full rounded-lg p-4 text-lg cursor-pointer hover:bg-green-600 text-white">
            + Deposit</button>
    )
}
