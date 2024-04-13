import React, {useContext} from "react"
import {SavingsDataContext} from "@/lib/context/SavingsDataContext";
import {ModalOpenContext} from "@/lib/context/ModalOpenContext";
import {IoWarning} from "react-icons/io5";

export default function UndistributedFundsAlert() {
    const {undistributedFunds} = useContext(SavingsDataContext);
    const {setIsDistributeFundsModalOpen} = useContext(ModalOpenContext);

    const openModal = () => {
        setIsDistributeFundsModalOpen(true);
    }

    if (undistributedFunds === 0) {
        return <></>
    }

    return (
        <div className={"w-11/12 rounded-lg p-4 bg-white flex items-center justify-between "}>
            <div className={"flex items-center"}>
                <IoWarning className={"text-2xl mr-2 text-yellow-500"}/>
                <p>Undistributed funds: ${undistributedFunds}</p>
            </div>
            <button className={"bg-blue-600 px-4 py-2 text-white rounded-full"} onClick={() => openModal()}>
                Distribute
            </button>
        </div>
    )
}
