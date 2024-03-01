import React, {useState, useEffect} from "react"
import {IoAdd} from "react-icons/io5";
import {FaFlag} from "react-icons/fa6";
import {MdOutlineAttachMoney} from "react-icons/md";

interface ButtonPaneProps {
    showAddButtons: boolean;
    setShowAddButtons: (show: boolean) => void;
    openModal: (modalType: string) => void;
}

export default function CreateButtonsPane({showAddButtons, setShowAddButtons, openModal}: ButtonPaneProps) {
    const [effect, setEffect] = useState(false);

    const toggleAddButtonsPane = () => {
        setEffect(true);
        setShowAddButtons(!showAddButtons);
    }

    return (
        <>
            <button className={"bg-blue-600 rounded-full p-2 absolute bottom-4 right-4"}>
                <IoAdd onAnimationEnd={() => setEffect(false)} onClick={toggleAddButtonsPane}
                       className={`${effect && "animate-rotate"} text-white text-4xl `}/>
            </button>
            {showAddButtons && (
                <>
                    <div className={"absolute right-5 bottom-20 flex items-center space-x-2"}>
                        <p>Create Goal</p>
                        <button className={"bg-white rounded-full p-2"}
                                onClick={() => openModal("goal")}>
                            <FaFlag className={"text-blue-600 text-2xl "}/>
                        </button>
                    </div>
                </>
            )}
        </>
    )
}

/**
 * add a toggle for results pane
 * - subscription is not working
 * - loading toast is not triggering and going away at correct times
 * add a mix of true false and multiple choice questions
 * add a game effect ot the background of answering questions
 *  - example: a shark eating a submarine, get away from the shark
 *  -
 * - look up gimkit and implement from there
 * - look up kahoot pro
 *
 * - in a group of 10 people:
 *  - one person gets a question on their screen
 *  - everyone else gets shown the answer choices
 *  - everyone else must yell out their answer choices
 *  - the person with the question must choose the answer that they think is correct
 *  -
 *
 */