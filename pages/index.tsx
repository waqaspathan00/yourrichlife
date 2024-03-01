import React, {useEffect, useState} from "react";
import CreateGoalModal from "@/components/common/modals/CreateGoalModal";
import DepositModal from "@/components/common/modals/DepositModal";
import Header from "@/components/Header";
import SavingsChart from "@/components/common/SavingsChart";
import DisplayGoals from "@/components/DisplayGoals";
import {getSavingsData, updateSavingsDoc} from "@/lib/firebase";
import DepositButton from "@/components/DepositButton";
import WithdrawalButton from "@/components/common/WithdrawalButton";
import WithdrawalModal from "@/components/common/modals/WithdrawalModal";


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
 * - add a withdrawal feature
 * - add a date to withdrawal/ deposit transactions
 * - add file image upload for savings goals
 *      - save the image to firebase storage
 * - add ability to read a csv file of savings data and transform it into the data array
 * - add a sign in screen
 * - add a remaining funds to be distributed to savings goals
 * - add a delete button to savings goals
 * - make savings goals editable
 * - add tooltip on hover to chart to show amount and date
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
 * - savings tracking logic:
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
    const [isCreateGoalModalOpen, setIsCreateGoalModalOpen] = useState(false);
    const [createGoalModalType, setCreateGoalModalType] = useState('');
    const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
    const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
    const [savingsGoals, setSavingsGoals] = useState(
        [
            // {
            //     "type": "necessities",
            //     "imageUrl": "https://pictures.dealer.com/generic--OEM_VIN_STOCK_PHOTOS/8184fecc2b4e3f725c098692df721e13.jpg?impolicy=downsize_bkpt&imdensity=1&w=520",
            //     "name": "Subaru Outback",
            //     "amountTarget": 1000,
            //     "amountSaved": 500
            // },
            // {
            //     "type": "wants",
            //     "imageUrl": "https://i.ebayimg.com/images/g/ExIAAOSwIyxhpCpv/s-l1200.webp",
            //     "name": "Wedding Suit",
            //     "amountTarget": 200,
            //     "amountSaved": 0
            // }
        ]
    );
    const [selectedView, setSelectedView] = useState('3M'); // Default view
    const [dailySavingsBalanceMasterData, setDailySavingsBalanceMasterData]: any = useState([]);
    const [dailySavingsBalanceChartData, setDailySavingsBalanceChartData] = useState([]);
    const [totalSaved, setTotalSaved] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const savingsData = await getSavingsData();
            if (savingsData) {
                const fetchedSavingsData = savingsData.dailySavingsBalance
                setDailySavingsBalanceMasterData(savingsData.dailySavingsBalance);
                setTotalSaved(fetchedSavingsData[fetchedSavingsData.length - 1].amount)
                setSavingsGoals(savingsData.savingsGoals);
                changeChartView(selectedView);
            }
        }

        fetchData();
    }, [])

    const generateId = () => {
        return Math.floor(Math.random() * 1000000);
    }

    const createSavingsGoal = (name: string, amount: number, imageUrl: string) => {
        const newGoal = {
            id: generateId(),
            type: createGoalModalType,
            imageUrl,
            name,
            amountTarget: amount,
            amountSaved: 0,
        };
        const newGoals = [...savingsGoals, newGoal];

        const newSavingsData = {
            savingsGoals: newGoals
        };
        updateSavingsDoc(newSavingsData)

        // @ts-ignore
        setSavingsGoals(newGoals);
        setIsCreateGoalModalOpen(false);
    }

    /**
     * when the user adds a new savings transaction:
     * - add the amount to the dailySavingsBalance array
     * - distribute to the savings goals that the user has set up
     */
    const addSavingsTransaction = async (savingsDate: Date, amount: string, priorityGoal: string, percentage: string) => {
        const newSavingsBalance = [...dailySavingsBalanceMasterData];
        const lastElement = newSavingsBalance[newSavingsBalance.length - 1];
        const formattedDate = savingsDate.toLocaleDateString();
        if (lastElement.date !== formattedDate) {
            newSavingsBalance.push({date: formattedDate, amount: lastElement.amount});
            if (newSavingsBalance.length > 365) {
                newSavingsBalance.shift();
            }
        } else {
            lastElement.amount += parseInt(amount);
        }

        const totalAmount = parseInt(amount);
        const priorityPercentage = parseInt(percentage) / 100;
        const priorityAmount = totalAmount * priorityPercentage;
        const remainingAmount = totalAmount - priorityAmount;

        const numNonPriorityGoals = savingsGoals.filter((goal: any) => goal.name !== priorityGoal).length;
        const amountPerGoal = remainingAmount / numNonPriorityGoals;
        const updatedSavingsGoals = savingsGoals.map((goal: any) => {
            if (goal.name === priorityGoal) {
                return {...goal, amountSaved: goal.amountSaved + priorityAmount};
            } else {
                return {...goal, amountSaved: goal.amountSaved + amountPerGoal};
            }
        });

        const newSavingsData = {
            dailySavingsBalance: newSavingsBalance,
            savingsGoals: updatedSavingsGoals
        };
        updateSavingsDoc(newSavingsData)
        setTotalSaved(newSavingsBalance[newSavingsBalance.length - 1].amount);
        setIsDepositModalOpen(false);
    };

    const changeChartView = (view: string) => {
        const newData = transformData(dailySavingsBalanceMasterData, view);
        setDailySavingsBalanceChartData(newData);
        setSelectedView(view);
    }

    const transformData = (data: any, view: string) => {
        if (view === '1M') {
            return data.slice(data.length - 30);
        } else if (view === '3M') {
            return data.slice(data.length - 90);
        } else if (view === '6M') {
            return data.slice(data.length - 180);
        } else if (view === '1Y') {
            return data.slice(data.length - 365);
        } else if (view === 'YTD') {
            return data.slice(data.length - 365);
        }
    }

    const openWithdrawalModal = () => {
        setIsWithdrawalModalOpen(true);
    }
    const openDepositModal = () => {
        setIsDepositModalOpen(true);
    }

    const openCreateGoalModal = (goalDisplayType: string) => {
        setIsCreateGoalModalOpen(true);
        setCreateGoalModalType(goalDisplayType)
    }

    return (
        <main className="flex flex-col items-center bg-gray-100 relative disable-scroll">
            <Header totalSaved={totalSaved}/>
            <SavingsChart dailySavingsBalance={dailySavingsBalanceChartData} selectedView={selectedView}
                          changeChartView={changeChartView}/>

            <div className={"flex w-11/12 my-4 space-x-4"}>
                <WithdrawalButton openWithdrawalModal={openWithdrawalModal}/>
                <DepositButton openDepositModal={openDepositModal}/>
            </div>

            <DisplayGoals openCreateGoalModal={openCreateGoalModal} savingsGoals={savingsGoals}/>

            <WithdrawalModal isWithdrawalModalOpen={isWithdrawalModalOpen}
                             setIsWithdrawalModalOpen={setIsWithdrawalModalOpen}/>
            <DepositModal addSavingsTransaction={addSavingsTransaction}
                          isDepositModalOpen={isDepositModalOpen}
                          setIsDepositModalOpen={setIsDepositModalOpen}
                          savingsGoals={savingsGoals}/>
            <CreateGoalModal createSavingsGoal={createSavingsGoal} createGoalModalType={createGoalModalType}
                             isCreateGoalModalOpen={isCreateGoalModalOpen}
                             setIsCreateGoalModalOpen={setIsCreateGoalModalOpen}/>
        </main>
    );
}
