import React, {useContext, useEffect, useState} from "react";
import CreateGoalModal from "@/components/common/modals/CreateGoalModal";
import DepositModal from "@/components/common/modals/DepositModal";
import Header from "@/components/Header";
import SavingsChart from "@/components/common/SavingsChart";
import {getSavingsData} from "@/lib/firebase";
import DepositButton from "@/components/DepositButton";
import WithdrawalButton from "@/components/common/WithdrawalButton";
import WithdrawalModal from "@/components/common/modals/WithdrawalModal";
import {DailySavingsBalance, ViewKey} from "@/lib/types";
import {
    calculateUndistributedFunds,
    getNumberOfDaysPassedInYear,
    setDataToLocalStorage,
    viewToDaysMap
} from "@/lib/utils";
import {SavingsDataContext} from "@/lib/context/SavingsDataContext";
import DistributeFundsModal from "@/components/common/modals/DistributeFundsModal";
import DisplayGoals from "@/components/DisplayGoals";
import toast from "react-hot-toast";


/**
 * this will be the home page of the application - "Saved Instead"
 * this application will be a savings tracking application to help users save money
 * the concept of it revolves around the idea of saving money instead of spending it, specifically on things that are not necessary/ impulse purchases
 *
 *  When the user adds a new savings transaction, the amount of that transaction will be distributed to the savings goals that the user has set up
 *  During this process, the user can identify a goal to prioritize and what percentage of the transaction should go to that goal
 *
 * for next time:
 * - add form validation logic to all modals
 * - add ability to read a csv file of savings data and transform it into the data array
 * - add a sign in screen
 * - make savings goals editable
 * - more toast notifications
 * - deploy to vercel
 * - make into PWA
 * - fix all build issues
 *
 * - add a circular progress bar to the savings goals
 * - plaid integration
 * - user should be able to deposit savings into different accounts
 *
 * daily fetch logic:
 * - start by fetching a property in local storage that contains the last day the user signed in
 * - if the last day the user signed in is not today:
 *   - fetch the data array from firebase
 *   - add a new element to the data array with the same value as the last element
 *   - save the data array to firebase
 *   - update the last day the user signed in in local storage
 * - if the last day the user signed in is today, do nothing
 *
 * - when the user signs in for the day, check if the last element in the array is the current day
 *
 * PRIORITIES:
 * - savings tracking logic: (in progress)
 *   - save the data array to firebase
 *   - the array will be updated every time a deposit or withdrawal is made
 *   - the array will be used to generate the chart
 *   - totalSaved will be the last element in the array
 *   - each time the user visits the application, check what day it is, and if the last element in the array is not the current day, add a new element to the array with the same value as the last element
 *   - if the last element in the array is the current day, do nothing
 *   - if the user makes a deposit or withdrawal, add a new element to the array with the same value as the last element
 *
 * @constructor
 */
export default function Home() {
    const {
        dailySavingsBalanceMasterData,
        setDailySavingsBalanceMasterData,
        setDailySavingsBalanceChartData,
        setTotalSaved,
        setUndistributedFunds,
        setSavingsGoals,
        setCompletedGoals
    } = useContext(SavingsDataContext);
    const [selectedView, setSelectedView] = useState<ViewKey>('3M'); // Default view


    useEffect(() => {
        const dateLastSignedIn = localStorage.getItem("dateLastSignedIn");
        const TODAY = new Date().toLocaleDateString();

        if (!dateLastSignedIn) {
            fetchDataFromDB();
            localStorage.setItem("dateLastSignedIn", TODAY);
            return
        }

        if (dateLastSignedIn === TODAY) {
            fetchDataFromLocalStorage();
            return
        }

        if (dateLastSignedIn !== TODAY) {
            fetchDataFromDB();
            localStorage.setItem("dateLastSignedIn", TODAY);
            return
        }
    }, [])

    const fetchDataFromDB = async () => {
        toast.success("Fetching data from database");
        const savingsDataObj = await getSavingsData();
        if (savingsDataObj) {
            const {
                dailySavingsBalance: fetchedDailySavingsBalance,
                savingsGoals: fetchedSavingsGoals,
                completedGoals: fetchedCompletedGoals
            } = savingsDataObj;
            const lastElement = fetchedDailySavingsBalance[fetchedDailySavingsBalance.length - 1];
            const currentSavingsAmount = lastElement.amount;
            const undistributedFunds = calculateUndistributedFunds(currentSavingsAmount, fetchedSavingsGoals);

            setDailySavingsBalanceMasterData(fetchedDailySavingsBalance);
            setTotalSaved(currentSavingsAmount)
            setUndistributedFunds(undistributedFunds);
            setSavingsGoals(fetchedSavingsGoals);
            setCompletedGoals(fetchedCompletedGoals);
            changeChartView(fetchedDailySavingsBalance, selectedView);

            setDataToLocalStorage(savingsDataObj);
        }
    }

    /**
     * this function is logically incomplete right now
     * current issues:
     * - local storage is not up to date after all interactions
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
        console.log({savingsData})
        const lastElement = fetchedDailySavingsBalance[fetchedDailySavingsBalance.length - 1];
        const currentSavingsAmount = lastElement.amount;
        const undistributedFunds = calculateUndistributedFunds(currentSavingsAmount, fetchedSavingsGoals);

        setDailySavingsBalanceMasterData(fetchedDailySavingsBalance);
        setTotalSaved(currentSavingsAmount)
        setUndistributedFunds(undistributedFunds);
        setSavingsGoals(fetchedSavingsGoals);
        setCompletedGoals(fetchedCompletedGoals);
        changeChartView(fetchedDailySavingsBalance, selectedView);
    }

    const changeChartView = (dailySavingsBalance: DailySavingsBalance[], view: ViewKey) => {
        const newData = transformData(dailySavingsBalance, view);
        setDailySavingsBalanceChartData(newData);
        setSelectedView(view);
    }

    const transformData = (data: any, view: ViewKey) => {
        if (view === 'YTD') {
            return data.slice(data.length - getNumberOfDaysPassedInYear());
        } else {
            const days = viewToDaysMap[view];
            return data.slice(data.length - days)
        }
    }

    return (
        <main className="flex flex-col items-center relative disable-scroll">
            <Header/>
            <SavingsChart selectedView={selectedView}
                          changeChartView={changeChartView}/>

            <div className={"flex w-11/12 my-4 space-x-4"}>
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
            <DepositModal/>
            <WithdrawalModal/>
            <CreateGoalModal/>
            <DistributeFundsModal/>
        </>
    )
}