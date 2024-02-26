"use client"

// import {LinearProgress, Modal} from "@mui/material";
import React, {useState} from "react";
import StepLineChart from "@/components/StepLineChart";
import {IoAdd, IoClose} from "react-icons/io5";
import {FaFlag} from "react-icons/fa6";
import {MdOutlineAttachMoney} from "react-icons/md";
import Modal from "@/components/common/Modal";
import ProgressBar from "@/components/ProgressBar";

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

    const openCreateGoalModal = () => {
        setIsCreateGoalModalOpen(true);
        setShowAddButtons(false);
    }
    const openAddSavingsModal = () => {
        setIsAddSavingsModalOpen(true);
        setShowAddButtons(false);
    }

    const openAddButtonsPane = () => {
        setShowAddButtons(!showAddButtons);
    }

    const addSavingsGoal = (name: string, amount: string, imageUrl: string) => {
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
    }

    const handleCloseCreateGoalModal = () => setIsCreateGoalModalOpen(false);
    const handleCloseAddSavingsModal = () => setIsAddSavingsModalOpen(false);

    return (
        <main className="flex flex-col items-center bg-gray-100 h-screen relative">
            {/*<h1>Saved Instead</h1>*/}
            <div className={"bg-blue-600 w-11/12 mt-4 rounded-xl p-4"}>
                <p className={"text-gray-300"}>Total Amount Saved</p>
                <p className={"text-white text-2xl"}>${totalSaved}</p>
            </div>

            <div className={"w-11/12 mt-4"}>
                <StepLineChart data={data} view={selectedView}/>
                <div className={"flex w-full my-2"}>
                    <button
                        className={`${selectedView === "week" ? "text-white bg-blue-600" : "bg-gray-300"} w-full p-2 m-1 rounded-lg`}
                        onClick={() => changeChartView('week')}>Week
                    </button>
                    <button
                        className={`${selectedView === "month" ? "text-white bg-blue-600" : "bg-gray-300"} w-full p-2 m-1 rounded-lg`}
                        onClick={() => changeChartView('month')}>Month
                    </button>
                    <button
                        className={`${selectedView === "year" ? "text-white bg-blue-600" : "bg-gray-300"} w-full p-2 m-1 rounded-lg`}
                        onClick={() => changeChartView('year')}>Year
                    </button>
                </div>
            </div>

            <ul className={"flex flex-col w-full items-center"}>
                <div className={"w-11/12 flex justify-between mb-2"}>
                    <h2>Your goals:</h2>
                    <div className={"space-x-4"}>
                        <button className={"border-b-blue-600 border-b-2"}>All</button>
                        <button className={"text-gray-500"}>Achieved</button>
                    </div>
                </div>
                <div className={"flex w-full justify-around"}>
                    {savingsGoals.map((goal) => (
                        <li key={goal.name} className={"w-1/3 p-4 bg-white rounded-xl"}>
                            <img src={goal.imageUrl} alt={goal.name} width={100} height={100}/>
                            <p>{goal.name}</p>
                            <div className={"my-2 overflow-hidden"}>
                                <ProgressBar currentSaved={goal.amountSaved} totalRequired={goal.amountTarget}/>
                                {/*<LinearProgress variant="determinate"*/}
                                {/*                value={goal.amountSaved / goal.amountTarget * 100}/>*/}
                            </div>
                            <div className={"flex justify-between"}>
                                <p>${goal.amountSaved}</p>
                                <p>${goal.amountTarget}</p>
                            </div>
                        </li>
                    ))}
                </div>
            </ul>

            <button className={"bg-blue-600 rounded-full p-2 absolute bottom-4 right-4"}>
                {showAddButtons ?
                    <IoClose onClick={openAddButtonsPane} className={"text-white text-4xl "}/> :
                    <IoAdd onClick={openAddButtonsPane} className={"text-white text-4xl "}/>
                }
            </button>
            {showAddButtons && (
                <>
                    <div className={"absolute right-5 bottom-20 flex items-center space-x-2"}>
                        <p>Create Goal</p>
                        <button className={"bg-white rounded-full p-2"}
                                onClick={openCreateGoalModal}>
                            <FaFlag className={"text-blue-600 text-2xl "}/>
                        </button>
                    </div>
                    <div className={"absolute right-5 bottom-32 flex items-center space-x-2"}>
                        <p>Add Savings</p>
                        <button className={"bg-white rounded-full p-2"}
                                onClick={openAddSavingsModal}>
                            <MdOutlineAttachMoney className={"text-blue-600 text-2xl "}/>
                        </button>
                    </div>
                </>
            )}

            <CreateGoalModal createSavingsGoal={addSavingsGoal} isCreateGoalModalOpen={isCreateGoalModalOpen}
                             setIsCreateGoalModalOpen={setIsCreateGoalModalOpen}/>
            <AddTransactionModal addSavingsTransaction={addSavingsTransaction}
                                 isAddTransactionModalOpen={isAddSavingsModalOpen}
                                 setIsAddTransactionModalOpen={setIsAddSavingsModalOpen}
                                 savingsGoals={savingsGoals}/>
        </main>
    );
}

const CreateGoalModal = ({isCreateGoalModalOpen, setIsCreateGoalModalOpen, handleClose, createSavingsGoal}: any) => {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0);
    const [imageUrl, setImageUrl] = useState("");

    return (
        <Modal isModalOpen={isCreateGoalModalOpen} setIsModalOpen={setIsCreateGoalModalOpen}>
            <div className={"bg-white rounded-lg"}>
                <h2 className={"text-center text-xl font-bold mb-4"}>Create a new Savings Goal</h2>
                <div className={"space-y-4"}>
                    <div className={"flex flex-col"}>
                        <label htmlFor="name">
                            Name
                        </label>
                        <input className={"border-2 p-2 rounded-md"} type="number" id="amount" name="amount"
                               value={amount} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className={"flex flex-col"}>
                        <label htmlFor="amount">
                            Amount
                        </label>
                        <input className={"border-2 p-2 rounded-md"} type="number" id="amount" name="amount"
                               value={amount} onChange={(e) => setAmount(e.target.value)}/>
                    </div>
                    <div className={"flex flex-col"}>
                        <label htmlFor={"image"}>
                            Image url
                        </label>
                        <input className={"border-2 p-2 rounded-md"} type="text" id="image" name="image"
                               onChange={(e) => setImageUrl(e.target.value)}/>

                    </div>
                    <button className={"bg-blue-600 w-full rounded-full p-2 text-white"}
                            onClick={() => createSavingsGoal(name, amount, imageUrl)} type="submit">Create
                    </button>
                </div>
            </div>
        </Modal>
    )
}

const AddTransactionModal = ({
                                 isAddTransactionModalOpen,
                                 setIsAddTransactionModalOpen,
                                 addSavingsTransaction,
                                 savingsGoals
                             }: any) => {
    const [amount, setAmount] = useState(0);
    const [priorityGoal, setPriorityGoal] = useState("");
    const [percentage, setPercentage] = useState(0);

    return (
        <Modal isModalOpen={isAddTransactionModalOpen} setIsModalOpen={setIsAddTransactionModalOpen}>
            <h2 className={"text-center text-xl font-bold my-4"}>Add Savings</h2>
            <div className={"space-y-4"}>
                <div className={"flex flex-col"}>
                    <label htmlFor="amount">
                        Amount
                    </label>
                    <input className={"border-2 p-2 rounded-md"} type="number" id="amount" name="amount"
                           value={amount} onChange={(e) => setAmount(e.target.value)}/>
                </div>
                <div className={"flex flex-col"}>
                    <label htmlFor="goal">
                        Priority Goal
                    </label>
                    <select className={"border-2 p-2 rounded-md"} name="goal" id="goal" value={priorityGoal}
                            onChange={(e) => setPriorityGoal(e.target.value)}>
                        <option value={"none"}>None</option>
                        {savingsGoals.map((goal: any) => (
                            <option value={goal.name}>{goal.name}</option>
                        ))}
                    </select>
                </div>
                <div className={"flex flex-col"}>
                    <label htmlFor="percentage">
                        Percentage
                    </label>
                    <input className={"border-2 p-2 rounded-md"} type="number" id="percentage"
                           name="percentage" value={percentage} onChange={(e) => setPercentage(e.target.value)}/>
                </div>
                <button className={"bg-blue-600 w-full rounded-full p-2 text-white"}
                        onClick={() => addSavingsTransaction(amount, priorityGoal, percentage)} type="submit">
                    Add
                </button>
            </div>
        </Modal>
    )
}