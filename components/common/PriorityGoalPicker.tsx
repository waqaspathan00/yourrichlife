import React, {useState, useEffect, Fragment} from "react"
import {Listbox, Transition} from "@headlessui/react";
import {IoIosArrowDown} from "react-icons/io";
import {Goal} from "@/lib/types";

interface PriorityGoalPickerProps {
    savingsGoals: Goal[],
    priorityGoal: string,
    setPriorityGoal: (goal: string) => void
}

export default function PriorityGoalPicker({savingsGoals, priorityGoal, setPriorityGoal}: PriorityGoalPickerProps) {
    return (
        <Listbox value={priorityGoal} onChange={setPriorityGoal}>
            <div className="">
                <Listbox.Button
                    className="relative w-full cursor-pointer rounded-lg border-2 bg-white py-2 pl-3 pr-10 text-left ">
                    <span className="block truncate">None</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <IoIosArrowDown className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options
                        className="absolute mt-1 overflow-auto rounded-lg bg-white text-base shadow-lg focus:outline-none sm:text-sm">
                        {savingsGoals.map((goal: Goal) => (
                            <Listbox.Option value={goal.name}>
                                {({active}) => (
                                    <div
                                        className={`${
                                            active ? "bg-lightblue" : "text-gray-900"
                                        } relative cursor-pointer select-none px-4 py-2`}
                                    >
                                        <span>{goal.name}</span>
                                    </div>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    )
}
