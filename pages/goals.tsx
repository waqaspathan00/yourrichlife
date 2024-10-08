import React, {useContext, useEffect, useState} from "react";
import CreateGoalModal from "@/components/common/modals/CreateGoalModal";
import Header from "@/components/Header";
import SavingsChart from "@/components/common/SavingsChart";
import {getSavingsData} from "@/lib/firebase";
import DepositButton from "@/components/DepositButton";
import WithdrawalButton from "@/components/common/WithdrawalButton";
import WithdrawalModal from "@/components/common/modals/WithdrawalModal";
import {ViewKey} from "@/lib/types";
import {
    addNewDayToSavingsBalance,
    calculateUndistributedFunds,
    transformChartData
} from "@/lib/utils";
import {SavingsDataContext} from "@/lib/context/SavingsDataContext";
import DistributeFundsModal from "@/components/common/modals/DistributeFundsModal";
import DisplayGoals from "@/components/DisplayGoals";
import toast from "react-hot-toast";
import {AccountsDataContext} from "@/lib/context/AccountsDataContext";
import {UserContext} from "@/lib/context/UserContext";


/**
 * this will be the account page of the application - "Your Rich Life"
 * this application will be a savings tracking application to help users save money
 * it helps you by visualizing what you are working towards and how comfortably you can achieve your goals
 *
 *  When the user adds a new savings transaction, the amount of that transaction will be distributed to the savings goals that the user has set up
 *  During this process, the user can identify a goal to prioritize and what percentage of the transaction should go to that goal
 *
 * accounts feature:
 *   - user can deposit savings into different accounts
 *   - dailySavingsBalance will be the sum of all accounts
 *   - savings chart must summate the daily value of all accounts, then display the chart
 *   - user can distribute funds to goals from any account
 *   - user can withdraw from any account
 *
 * @constructor
 */
export default function GoalsPage() {
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
        setAccountsList,
    } = useContext(AccountsDataContext);
    const { user } = useContext(UserContext);
    const [selectedView, setSelectedView] = useState<ViewKey>('3M'); // Default view

    useEffect(() => {
        if (!dailySavingsBalanceMasterData.length) {
            const toastId = toast.loading("Getting your data");
            fetchDataFromDB();
            toast.dismiss(toastId);
        }
    }, [user])

    const fetchDataFromDB = async () => {
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

    /**
     * this function is logically incomplete right now
     * current issues:
     * - local storage is not up-to-date after all interactions
     *   - interaction types:
     *     - deposit
     *     - withdrawal
     *     - create goal
     *     - distribute funds
     *     - complete goal
     *     - change view
     */
    const fetchDataFromLocalStorage = () => {
        const unparsedSavingsData = localStorage.getItem("savingsData");
        if (!unparsedSavingsData) {
            fetchDataFromDB();
            toast.error("Why is there no data in local storage");
            return
        }
        const savingsData = JSON.parse(unparsedSavingsData);
        const {
            dailySavingsBalance: fetchedDailySavingsBalance,
            savingsGoals: fetchedSavingsGoals,
            completedGoals: fetchedCompletedGoals
        } = savingsData;
        const lastElement = fetchedDailySavingsBalance[fetchedDailySavingsBalance.length - 1];
        const currentSavingsAmount = lastElement.amount;
        const undistributedFunds = calculateUndistributedFunds(currentSavingsAmount, fetchedSavingsGoals);

        setDailySavingsBalanceMasterData(fetchedDailySavingsBalance);
        setTotalSaved(currentSavingsAmount)
        setUndistributedFunds(undistributedFunds);
        setSavingsGoals(fetchedSavingsGoals);
        setCompletedGoals(fetchedCompletedGoals);
        // changeChartView(fetchedDailySavingsBalance, selectedView);
    }

    return (
        <main className="flex flex-col items-center relative disable-scroll pb-16">
            <Header/>
            <SavingsChart selectedView={selectedView} setSelectedView={setSelectedView}/>

            <div className={"flex w-11/12 mt-44 mb-4 space-x-4"}>
                <WithdrawalButton/>
                <DepositButton/>
            </div>

            <DisplayGoals/>
            <DisplayModals/>
        </main>
    );
}

const DisplayModals = () => {
    return (
        <>
            <WithdrawalModal/>
            <CreateGoalModal/>
            <DistributeFundsModal/>
        </>
    )
}