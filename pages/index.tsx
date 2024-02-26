import React, {useState} from "react";
import CreateGoalModal from "@/components/common/modals/CreateGoalModal";
import AddSavingsTransactionModal from "@/components/common/modals/AddSavingsTransactionModal";
import Header from "@/components/Header";
import SavingsChart from "@/components/common/SavingsChart";
import DisplayGoals from "@/components/DisplayGoals";
import CreateButtonsPane from "@/components/CreateButtonsPane";


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
 * - when user creates a goal, save it to local storage
 * - when user inputs savings, distribute the amount to the goals based on the percentage
 * - also track user savings in the chart
 *
 *
 * @constructor
 */
export default function Home() {
    const [isCreateGoalModalOpen, setIsCreateGoalModalOpen] = useState(false);
    const [isAddSavingsModalOpen, setIsAddSavingsModalOpen] = useState(false);
    const [savingsGoals, setSavingsGoals] = useState(
        [
            {
                "imageUrl": "https://pictures.dealer.com/generic--OEM_VIN_STOCK_PHOTOS/8184fecc2b4e3f725c098692df721e13.jpg?impolicy=downsize_bkpt&imdensity=1&w=520",
                "name": "Subaru Outback",
                "amountTarget": 1000,
                "amountSaved": 500
            },
            {
                "imageUrl": "https://i.ebayimg.com/images/g/ExIAAOSwIyxhpCpv/s-l1200.webp",
                "name": "Wedding Suit",
                "amountTarget": 200,
                "amountSaved": 0
            }
        ]
    );
    const [totalSaved, setTotalSaved] = useState(500);
    const [selectedView, setSelectedView] = useState('week'); // Default view
    const [data, setData] = useState([10, 20, 15, 30, 40, 35]); // Example data array
    const [showAddButtons, setShowAddButtons] = useState(false);

    const addSavingsGoal = (name: string, amount: number, imageUrl: string) => {
        const newGoals = [...savingsGoals, {imageUrl, name, amountTarget: amount, amountSaved: 0}];
        setSavingsGoals(newGoals);
        setIsCreateGoalModalOpen(false);
    }

    const addSavingsTransaction = (amount: string, priorityGoal: string, percentage: string) => {
        const newTotalSaved = totalSaved + parseInt(amount);
        setTotalSaved(newTotalSaved);
        setIsAddSavingsModalOpen(false);
    };

    const changeChartView = (view: string) => {
        let newData = generateData(view);
        setData(newData);
        setSelectedView(view);
    }

    const openModal = (modalType: string) => {
        if (modalType === 'goal') {
            setIsCreateGoalModalOpen(true);
        } else if (modalType === 'transaction') {
            setIsAddSavingsModalOpen(true);
        }
        setShowAddButtons(false);
    }

    const generateData = (view: string) => {
        if (view === 'week') {
            // return Array.from({length: 7}, () => Math.floor(Math.random() * 100));
            return [1000, 1050, 1100, 1200, 1300, 1350, 1450];
        } else if (view === 'month') {
            // return Array.from({length: 30}, () => Math.floor(Math.random() * 100));
            return [1000, 1020, 1040, 1060, 1090, 1070,
                1110, 1150, 1170, 1200, 1230, 1210,
                1260, 1300, 1330, 1360, 1400, 1380,
                1430, 1460, 1500, 1530, 1570, 1600,
                1640, 1670, 1710, 1750, 1730, 1780];
        } else if (view === 'year') {
            // return Array.from({length: 12}, () => Math.floor(Math.random() * 100));
            return [1000, 1200, 1400, 1350,
                1600, 1850, 1800,
                2050, 2300, 2550, 2800,
                3050];
        }
        return []
    }

    return (
        <main className="flex flex-col items-center bg-gray-100 h-screen relative">
            <Header totalSaved={totalSaved}/>
            <SavingsChart data={data} selectedView={selectedView} changeChartView={changeChartView}/>
            <DisplayGoals savingsGoals={savingsGoals}/>

            <CreateButtonsPane showAddButtons={showAddButtons} setShowAddButtons={setShowAddButtons} openModal={openModal}/>
            <CreateGoalModal createSavingsGoal={addSavingsGoal} isCreateGoalModalOpen={isCreateGoalModalOpen}
                             setIsCreateGoalModalOpen={setIsCreateGoalModalOpen}/>
            <AddSavingsTransactionModal addSavingsTransaction={addSavingsTransaction}
                                        isAddTransactionModalOpen={isAddSavingsModalOpen}
                                        setIsAddTransactionModalOpen={setIsAddSavingsModalOpen}
                                        savingsGoals={savingsGoals}/>
        </main>
    );
}
