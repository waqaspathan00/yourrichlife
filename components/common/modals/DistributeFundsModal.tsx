import React, {useState, useEffect, useContext} from "react"
import {SavingsDataContext} from "@/lib/context/SavingsDataContext";
import Modal from "@/components/common/modals/Modal";
import {ModalOpenContext} from "@/lib/context/ModalOpenContext";

export default function DistributeFundsModal() {
    const {savingsGoals} = useContext(SavingsDataContext);
    const {isDistributeFundsModalOpen, setIsDistributeFundsModalOpen} = useContext(ModalOpenContext);

    // TODO: implement the distribute funds functionality

    return (
        <Modal isModalOpen={isDistributeFundsModalOpen} setIsModalOpen={setIsDistributeFundsModalOpen}>
            <h2 className={"text-center text-xl font-bold"}>Distribute Funds</h2>
            <p className={"text-center text-gray-500"}>Allocate savings to your goals</p>
            <div className={"space-y-4"}>
                <div className={"flex flex-col"}>
                    <label htmlFor="amount">
                        Amount
                    </label>
                    <input className={"border-2 p-2 rounded-md"} type="number" id="amount" name="amount"
                           placeholder={"Amount"}
                           value={"amount"} onChange={(e) => (e.target.value)}/>
                </div>
                <div className={"flex flex-col"}>
                    <label htmlFor="goal">
                        Priority Goal
                    </label>
                    <select className={"border-2 p-2 h-full rounded-md"} name="goal" id="goal" value={""}
                            onChange={(e) => (e.target.value)}>
                        <option value={"none"}>None</option>
                        {savingsGoals.map((goal: any) => (
                            <option value={goal.name}>{goal.name}</option>
                        ))}
                    </select>
                </div>
                <button className={"bg-blue-600 w-full rounded-full text-lg p-2 text-white"}
                        onClick={() => {
                        }}
                        type="submit">
                    Distribute
                </button>
            </div>
        </Modal>
    )
}
