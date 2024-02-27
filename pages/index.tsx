import React, {useEffect, useState} from "react";
import CreateGoalModal from "@/components/common/modals/CreateGoalModal";
import AddSavingsTransactionModal from "@/components/common/modals/AddSavingsTransactionModal";
import Header from "@/components/Header";
import SavingsChart from "@/components/common/SavingsChart";
import DisplayGoals from "@/components/DisplayGoals";
import CreateButtonsPane from "@/components/CreateButtonsPane";
import {db} from "@/lib/firebase";
import {doc, getDoc, updateDoc} from "@firebase/firestore";


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
 * - there are dupe savings goals being created right now when adding a new transaction
 * - add an id to each goal to track it
 * - move firebase calls into a separate file
 * - add a view button to goals to see more details about the goal and to edit and delete it
 * - add horizontal spacing to goals
 * - add proper savings tracking over time logic
 *
 *
 * @constructor
 */
export default function Home() {
    const [isCreateGoalModalOpen, setIsCreateGoalModalOpen] = useState(false);
    const [isAddSavingsModalOpen, setIsAddSavingsModalOpen] = useState(false);
    const [savingsGoals, setSavingsGoals] = useState(
        [
            // {
            //     "imageUrl": "https://pictures.dealer.com/generic--OEM_VIN_STOCK_PHOTOS/8184fecc2b4e3f725c098692df721e13.jpg?impolicy=downsize_bkpt&imdensity=1&w=520",
            //     "name": "Subaru Outback",
            //     "amountTarget": 1000,
            //     "amountSaved": 500
            // },
            // {
            //     "imageUrl": "https://i.ebayimg.com/images/g/ExIAAOSwIyxhpCpv/s-l1200.webp",
            //     "name": "Wedding Suit",
            //     "amountTarget": 200,
            //     "amountSaved": 0
            // }
        ]
    );
    const [totalSaved, setTotalSaved] = useState(0);
    const [selectedView, setSelectedView] = useState('week'); // Default view
    const [data, setData] = useState([10, 20, 15, 30, 40, 35]); // Example data array
    const [showAddButtons, setShowAddButtons] = useState(false);

    useEffect(() => {
        // fetch existing data from firestore db under collection "savings" and document "wadia"
        const fetchData = async () => {
            const savingsDocRef = doc(db, "savings", "wadia");
            const savingsDoc = await getDoc(savingsDocRef);
            const savingsData = savingsDoc.data();
            setTotalSaved(savingsData?.totalSaved ? savingsData.totalSaved : 0);
            setSavingsGoals(savingsData?.savingsGoals ? savingsData.savingsGoals : []);
        }
        fetchData();
    })

    const addSavingsGoal = (name: string, amount: number, imageUrl: string) => {
        const newGoal = {imageUrl, name, amountTarget: amount, amountSaved: 0};
        const newGoals = [...savingsGoals, newGoal];

        try {
            const savingsDocRef = doc(db, "savings", "wadia");
            updateDoc(savingsDocRef, {
                savingsGoals: newGoals
            });
        } catch (err) {
            console.log(err);
            throw new Error("Error saving data to DB");
        }

        // @ts-ignore
        setSavingsGoals(newGoals);
        setIsCreateGoalModalOpen(false);
    }

    const addSavingsTransaction = async (amount: string, priorityGoal: string, percentage: string) => {
        const newTotalSaved = totalSaved + parseInt(amount);
        // contribute percentage amount to priority goal
        // distribute the rest of the amount to the other goals
        const newGoals = savingsGoals.map((goal: any) => {
            if (goal.name === priorityGoal) {
                return {
                    ...goal,
                    amountSaved: goal.amountSaved + (parseInt(amount) * (parseInt(percentage) / 100))
                }
            }
            return goal;
        })
        const remainingAmount = parseInt(amount) - (parseInt(amount) * (parseInt(percentage) / 100));
        const nonPriorityGoals = newGoals.filter((goal: any) => goal.name !== priorityGoal);
        const numNonPriorityGoals = nonPriorityGoals.length;
        const amountPerGoal = remainingAmount / numNonPriorityGoals;
        const updatedNonPriorityGoals = nonPriorityGoals.map((goal: any) => {
            return {
                ...goal,
                amountSaved: goal.amountSaved + amountPerGoal
            }
        });

        try {
            const savingsDocRef = doc(db, "savings", "wadia");
            await updateDoc(savingsDocRef, {
                totalSaved: newTotalSaved,
                savingsGoals: [...newGoals, ...updatedNonPriorityGoals]
            });
        } catch (err) {
            console.log(err);
            throw new Error("Error saving data to DB");
        }
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
        } else if (modalType === 'savings') {
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

            <CreateButtonsPane showAddButtons={showAddButtons} setShowAddButtons={setShowAddButtons}
                               openModal={openModal}/>
            <CreateGoalModal createSavingsGoal={addSavingsGoal} isCreateGoalModalOpen={isCreateGoalModalOpen}
                             setIsCreateGoalModalOpen={setIsCreateGoalModalOpen}/>
            <AddSavingsTransactionModal addSavingsTransaction={addSavingsTransaction}
                                        isAddTransactionModalOpen={isAddSavingsModalOpen}
                                        setIsAddTransactionModalOpen={setIsAddSavingsModalOpen}
                                        savingsGoals={savingsGoals}/>
        </main>
    );
}
