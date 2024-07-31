import React, {useState, useEffect, useContext} from "react"
import ProgressBar from "@/components/ProgressBar";
import {BsTriangleFill} from "react-icons/bs";
import {IoIosArrowForward} from "react-icons/io";
import {Goal} from "@/lib/types";
import GoalDetailsModal from "@/components/common/modals/GoalDetailsModal";
import {deleteGoal} from "@/lib/firebase";
import {ModalOpenContext} from "@/lib/context/ModalOpenContext";
import {SavingsDataContext} from "@/lib/context/SavingsDataContext";
import DisplayGoalsType from "@/components/DisplayGoals/DisplayGoalsType";
import UndistributedFundsAlert from "@/components/UndistributedFundsAlert";

export default function DisplayGoals() {
    const {setIsCreateGoalModalOpen, setCreateGoalModalType} = useContext(ModalOpenContext);
    const [displayGoalsShortTerm, setDisplayGoalsShortTerm] = useState(true);
    const [displayGoalsMediumTerm, setDisplayGoalsMediumTerm] = useState(true);
    const [displayGoalsLongTerm, setDisplayGoalsLongTerm] = useState(true);

    const toggleGoalsDisplay = (type: string) => {
        switch (type) {
            case 'ST':
                setDisplayGoalsShortTerm(!displayGoalsShortTerm);
                break;
            case 'MT':
                setDisplayGoalsMediumTerm(!displayGoalsMediumTerm);
                break;
            case 'LT':
                setDisplayGoalsLongTerm(!displayGoalsLongTerm);
                break;
            default:
                console.log('Invalid Term');
                break;
        }
    };

    const openCreateGoalModal = (goalDisplayType: string) => {
        setIsCreateGoalModalOpen(true);
        setCreateGoalModalType(goalDisplayType)
    }

    return (
        <div className={"flex flex-col w-full items-center"}>
            <h2 className={"text-2xl text-left w-11/12 font-bold"}>Goals</h2>
            <UndistributedFundsAlert/>

            <DisplayGoalsType goalDisplayType={"ST"} displayGoals={displayGoalsShortTerm}
                              toggleGoalsDisplay={toggleGoalsDisplay}
                              openCreateGoalModal={openCreateGoalModal}/>
            <DisplayGoalsType goalDisplayType={"MT"} displayGoals={displayGoalsMediumTerm}
                              toggleGoalsDisplay={toggleGoalsDisplay}
                              openCreateGoalModal={openCreateGoalModal}/>
            <DisplayGoalsType goalDisplayType={"LT"} displayGoals={displayGoalsLongTerm}
                              toggleGoalsDisplay={toggleGoalsDisplay}
                              openCreateGoalModal={openCreateGoalModal}/>
        </div>
    )
}
