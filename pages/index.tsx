import React, {useContext, useEffect, useState} from "react";
import CreateGoalModal from "@/components/common/modals/CreateGoalModal";
import DepositModal from "@/components/common/modals/DepositModal";
import Header from "@/components/Header";
import SavingsChart from "@/components/common/SavingsChart";
import DisplayGoals from "@/components/DisplayGoals";
import {getSavingsData, updateSavingsDoc} from "@/lib/firebase";
import DepositButton from "@/components/DepositButton";
import WithdrawalButton from "@/components/common/WithdrawalButton";
import WithdrawalModal from "@/components/common/modals/WithdrawalModal";
import {DailySavingsBalance, Goal} from "@/lib/types";
import {getNumberOfDaysPassedInYear, ViewKey, viewToDaysMap} from "@/lib/utils";
import {SavingsDataContext} from "@/lib/context/SavingsDataContext";


/**
 * this will be the home page of the application - "Saved Instead"
 * this application will be a savings tracking application to help users save money
 * the concept of it revolves around the idea of saving money instead of spending it, specifically on things that are not necessary/ impulse purchases
 *
 * on the homepage the user will see:
 *  - their total amount saved so far
 *  - a list of their savings goals
 *  - a button to add a new savings goal
 *  - a button to add a new savings transaction
 *
 *  When the user adds a new savings transaction, the amount of that transaction will be distributed to the savings goals that the user has set up
 *  During this process, the user can identify a goal to prioritize and what percentage of the transaction should go to that goal
 *
 * for next time:
 * - add file image upload for savings goals
 *      - save the image to firebase storage
 * - add ability to read a csv file of savings data and transform it into the data array
 * - add a sign in screen
 * - add a remaining funds to be distributed to savings goals
 * - add a delete button to savings goals
 * - make savings goals editable
 * - round out goal disbursement logic, and to the nearest dollar

 * - add a circular progress bar to the savings goals
 * - plaid integration
 * - user should be able to deposit savings into different accounts
 *
 * PRIORITIES:
 * - move state variables into a context
 *      - modal
 *      - savings goals
 *      - total saved
 *      - data array
 *      - selected view
 * - savings tracking logic: (in progress)
 *   - save the data array to firebase
 *   - the array will be updated every time a deposit or withdrawal is made
 *   - the array will be used to generate the chart
 *   - totalSaved will be the last element in the array
 *   - each time the user visits the application, check what day it is, and if the last element in the array is not the current day, add a new element to the array with the same value as the last element
 *   - if the last element in the array is the current day, do nothing
 *   - if the user makes a deposit or withdrawal, add a new element to the array with the same value as the last element
 *
 *
 * @constructor
 */
export default function Home() {
    const {
        dailySavingsBalanceMasterData,
        setDailySavingsBalanceMasterData,
        dailySavingsBalanceChartData,
        setDailySavingsBalanceChartData,
        totalSaved,
        setTotalSaved,
        savingsGoals,
        setSavingsGoals
    } = useContext(SavingsDataContext);
    const [selectedView, setSelectedView] = useState<ViewKey>('3M'); // Default view


    useEffect(() => {
        const fetchData = async () => {
            const savingsData = await getSavingsData();
            if (savingsData) {
                const fetchedSavingsData = savingsData.dailySavingsBalance
                setDailySavingsBalanceMasterData(savingsData.dailySavingsBalance);
                setTotalSaved(fetchedSavingsData[fetchedSavingsData.length - 1].amount)
                setSavingsGoals(savingsData.savingsGoals);
                changeChartView(selectedView);

                const newData = transformData(savingsData.dailySavingsBalance, selectedView);
                setDailySavingsBalanceChartData(newData);
                setSelectedView(selectedView);
            }
        }

        // if (dailySavingsBalanceMasterData.length === 0) {
        //     console.log('fetching data')
        fetchData();
        // }
    }, [])


    const changeChartView = (view: ViewKey) => {
        const newData = transformData(dailySavingsBalanceMasterData, view);
        setDailySavingsBalanceChartData(newData);
        setSelectedView(view);
    }

    const transformData = (data: any, view: ViewKey) => {
        if (view === 'YTD') {
            return data.slice(data.length - getNumberOfDaysPassedInYear());
        } else {
            const days = viewToDaysMap[view];
            return days ? data.slice(data.length - days) : data; // Fallback to returning original data if view is not recognized
        }
    }

    return (
        <main className="flex flex-col items-center relative disable-scroll">
            <Header/>
            <SavingsChart dailySavingsBalance={dailySavingsBalanceChartData} selectedView={selectedView}
                          changeChartView={changeChartView}/>

            <div className={"flex w-11/12 my-4 space-x-4"}>
                <WithdrawalButton/>
                <DepositButton/>
            </div>

            <DisplayGoals/>

            <WithdrawalModal/>
            <DepositModal/>
            <CreateGoalModal/>
        </main>
    );
}
