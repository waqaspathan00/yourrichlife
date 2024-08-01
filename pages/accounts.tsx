import React, {useContext, useEffect, useState} from "react"
import Header from "@/components/Header";
import SavingsChart from "@/components/common/SavingsChart";
import WithdrawalButton from "@/components/common/WithdrawalButton";
import DepositButton from "@/components/DepositButton";
import {Account, ViewKey} from "@/lib/types";
import CreateAccountModal from "@/components/common/modals/CreateAccountModal";
import {IoIosArrowForward} from "react-icons/io";
import toast from "react-hot-toast";
import {getAccountsData, getSavingsData} from "@/lib/firebase";
import {addNewDayToSavingsBalance, calculateUndistributedFunds, transformChartData} from "@/lib/utils";
import {SavingsDataContext} from "@/lib/context/SavingsDataContext";
import {AccountsDataContext} from "@/lib/context/AccountsDataContext";
import {UserContext} from "@/lib/context/UserContext";


export default function AccountsPage() {
    const {
        dailySavingsBalanceMasterData,
        setDailySavingsBalanceMasterData,
        setDailySavingsBalanceChartData,
        setTotalSaved,
        setUndistributedFunds,
        setSavingsGoals,
        setCompletedGoals
    } = useContext(SavingsDataContext);
    const {
        accountsList,
        setAccountsList,
    } = useContext(AccountsDataContext);
    const { user } = useContext(UserContext);
    const [selectedView, setSelectedView] = useState<ViewKey>('3M'); // Default view
    const [isCreateAccountModalOpen, setIsCreateAccountModalOpen] = useState(false);

    useEffect(() => {
        if (!dailySavingsBalanceMasterData.length){
            fetchDataFromDB();
        }
    }, [])

    const fetchDataFromDB = async () => {
        toast.success("Fetching data from database");
        const savingsDataObj = await getSavingsData(user?.email);
        if (savingsDataObj) {
            const {
                dailySavingsBalance: fetchedDailySavingsBalance,
                savingsGoals: fetchedSavingsGoals,
                completedGoals: fetchedCompletedGoals,
                accounts: fetchedAccounts
            } = savingsDataObj;
            const lastElement = fetchedDailySavingsBalance[fetchedDailySavingsBalance.length - 1];
            const lastSavingsAmount = lastElement.amount;

            const updatedUndistributedFunds = calculateUndistributedFunds(lastSavingsAmount, fetchedSavingsGoals);
            addNewDayToSavingsBalance(fetchedDailySavingsBalance, user?.email);

            setDailySavingsBalanceMasterData(fetchedDailySavingsBalance);
            setTotalSaved(lastSavingsAmount)
            setUndistributedFunds(updatedUndistributedFunds);
            setSavingsGoals(fetchedSavingsGoals);
            setCompletedGoals(fetchedCompletedGoals);
            setAccountsList(fetchedAccounts);

            const newData = transformChartData(fetchedDailySavingsBalance, selectedView);
            setDailySavingsBalanceChartData(newData);
        }
    }

    const openCreateAccountModal = () => {
        setIsCreateAccountModalOpen(true);
    }

    return (
        <main className="flex flex-col items-center relative disable-scroll pb-16">
            <Header/>
            <SavingsChart selectedView={selectedView} setSelectedView={setSelectedView}/>

            <div className={"flex w-11/12 mt-44 mb-4 space-x-4"}>
                <WithdrawalButton/>
                <DepositButton/>
            </div>

            <DisplayAccounts openCreateAccountModal={openCreateAccountModal}/>
            <DisplayModals isCreateAccountModalOpen={isCreateAccountModalOpen}
                           setIsCreateAccountModalOpen={setIsCreateAccountModalOpen}/>
        </main>
    )
}

const DisplayAccounts = ({openCreateAccountModal}: any) => {
    const {accountsList} = useContext(AccountsDataContext);

    return (

        <div className={"flex flex-col w-full items-center"}>
            <div className={"w-11/12 flex justify-between my-2"}>

                <h2 className={"text-2xl text-left w-11/12 font-bold"}>Accounts</h2>

                <div onClick={() => openCreateAccountModal()} className={"flex items-center text-blue-600"}>
                    <button className={""}>add</button>
                    <IoIosArrowForward className={"ml-1"}/>
                </div>
            </div>

            {accountsList.length === 0 && (
                <div onClick={() => openCreateAccountModal()}
                     className={"text-gray-500 w-11/12 text-center cursor-pointer border-dashed border-2 rounded-lg border-gray-300 p-4"}
                >
                    Add an account here
                </div>
            )}

            {accountsList.map((account: Account) => (
                <div className={"flex items-center w-full justify-between p-4"}>
                    <div className={`${account.color} text-white w-48 h-16 p-2 rounded-l-lg flex justify-center items-center`}>
                        <h3 className={"capitalize text-sm"}>{account.name}</h3>
                    </div>
                    <div className={"flex items-center text-sm justify-center rounded-r-lg bg-white w-full h-16"}>
                        <h3>Current Balance: ${account.balance}</h3>
                    </div>
                </div>
            ))}

        </div>
    )
}

const DisplayModals = ({isCreateAccountModalOpen, setIsCreateAccountModalOpen}: any) => {
    return (
        <>
            <CreateAccountModal isCreateAccountModalOpen={isCreateAccountModalOpen}
                                setIsCreateAccountModalOpen={setIsCreateAccountModalOpen}/>
        </>
    )
}