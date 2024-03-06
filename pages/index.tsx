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
    addNewDayToSavingsBalance,
    calculateUndistributedFunds,
    getNumberOfDaysPassedInYear,
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
 * - more toast notifications
 * - disable vertical scroll on page when interacting with chart
 * - add a loading spinner when fetching data from database
 * - add dark mode
 *
 * - make savings goals editable
 * - add a circular progress bar to the savings goals
 * - plaid integration
 * - user should be able to deposit savings into different accounts
 *
 * @constructor
 */
export default function Home() {
    const {
        setDailySavingsBalanceMasterData,
        setDailySavingsBalanceChartData,
        setTotalSaved,
        setUndistributedFunds,
        setSavingsGoals,
        setCompletedGoals
    } = useContext(SavingsDataContext);
    const [selectedView, setSelectedView] = useState<ViewKey>('3M'); // Default view


    useEffect(() => {
        fetchDataFromDB();
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
            const lastSavingsAmount = lastElement.amount;

            const undistributedFunds = calculateUndistributedFunds(lastSavingsAmount, fetchedSavingsGoals);
            addNewDayToSavingsBalance(fetchedDailySavingsBalance);

            setDailySavingsBalanceMasterData(fetchedDailySavingsBalance);
            setTotalSaved(lastSavingsAmount)
            setUndistributedFunds(undistributedFunds);
            setSavingsGoals(fetchedSavingsGoals);
            setCompletedGoals(fetchedCompletedGoals);
            changeChartView(fetchedDailySavingsBalance, selectedView);
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
        <main className="flex flex-col items-center relative disable-scroll pb-16">
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