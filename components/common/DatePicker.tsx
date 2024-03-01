import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerTailwind({savingsDate, setSavingsDate}: any) {
    const [isOpen, setIsOpen] = useState(false); // Manage open state
    const maxDate = new Date();

    return (
        <div className={"flex flex-col"}>
            <label htmlFor="date">
                Date
            </label>
            <DatePicker
                selected={savingsDate}
                onChange={(date) => setSavingsDate(date)}
                className="w-full px-4 py-2 border-2 rounded-md"
                onClickOutside={() => setIsOpen(false)}
                // onSelect={() => setIsOpen(false)}
                onInputClick={() => setIsOpen(true)}
                open={isOpen}
                maxDate={maxDate}
                name={"date"}
            />
        </div>
    );
};
