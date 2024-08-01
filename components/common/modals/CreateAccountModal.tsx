import React, {useContext, useState} from "react"
import Modal from "@/components/common/modals/Modal";
import {updateSavingsDoc} from "@/lib/firebase";
import {AccountsDataContext} from "@/lib/context/AccountsDataContext";
import toast from "react-hot-toast";
import {Account} from "@/lib/types";
import {UserContext} from "@/lib/context/UserContext";

/**
 * take input for:
 * - accounts name
 * - balance
 *
 * store accounts in:
 * - savingsData context
 * - firestore
 *   - under doc "wadia"
 *     - collection: accounts
 *     - field: accountNames
 *   - under collection "accounts"
 *   - each account will be a document with docId as the account name
 *     - each document will have a field "name"
 *     - each document will have a field "balance"
 *     - each document will have a field "dailySavingsBalance"
 *
 * @param isCreateAccountModalOpen
 * @param setIsCreateAccountModalOpen
 * @constructor
 */
export default function CreateAccountModal({isCreateAccountModalOpen, setIsCreateAccountModalOpen}: any) {
    // const {savingsGoals, setSavingsGoals, completedGoals, setCompletedGoals} = useContext(SavingsDataContext);
    const { user } = useContext(UserContext);
    const {accountsList, setAccountsList} = useContext(AccountsDataContext);
    const [name, setName] = useState("");
    const [balance, setBalance] = useState(0);
    const [color, setColor] = useState("blue");
    const colorChoices = ["bg-red-800", "bg-blue-800", "bg-green-800", "bg-yellow-600", "bg-purple-800", "bg-pink-700"]

    const handleCreateAccount = async () => {
        if (!name) {
            toast.error("Please fill in all fields");
            return;
        }

        const newAccount: Account = {
            name: name,
            balance: balance,
            color: color
        }

        const updatedAccountsList = [...accountsList, newAccount];
        setAccountsList(updatedAccountsList);
        setIsCreateAccountModalOpen(false);

        await updateSavingsDoc(user?.email, {accounts: updatedAccountsList});
    }

    return (
        <Modal isModalOpen={isCreateAccountModalOpen} setIsModalOpen={setIsCreateAccountModalOpen}>
            <div className={""}>
                <h1 className={"text-2xl text-center font-bold"}>Create Account</h1>

                <div className={"space-y-4"}>
                    <div className={"flex flex-col"}>
                        <label htmlFor="name">
                            Name
                        </label>
                        <input className={"border-2 p-2 rounded-md"} type="text" id="name" name="name"
                               value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className={"flex flex-col"}>
                        <label htmlFor="amount">
                            Current Balance
                        </label>
                        <input className={"border-2 p-2 rounded-md"} type="number" id="amount" name="amount"
                               value={balance} onChange={(e) => setBalance(parseInt(e.target.value))}/>
                    </div>
                    <div className={"flex flex-col"}>
                        <label htmlFor="color">
                            Color
                        </label>
                        <div className={"flex justify-between"}>
                            {colorChoices.map((choice) => (
                                <button onClick={() => setColor(choice)}
                                        className={`rounded-lg ${choice === color && "border-2 border-gray-500"}`} >
                                    <div className={`p-4 m-1 rounded-md ${choice} `}>

                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <button onClick={() => handleCreateAccount()}
                        className={"bg-blue-600 w-full text-white py-2 rounded-full mt-4"}>Create
                </button>
            </div>
        </Modal>
    )
}
