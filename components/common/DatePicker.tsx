import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerTailwind({startDate, setStartDate}: any) {
    const [isOpen, setIsOpen] = useState(false); // Manage open state
    const maxDate = new Date();

    return (
        <div className={"flex flex-col"}>
            <label htmlFor="date">
                Date
            </label>
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="w-full px-4 py-2 border-2 rounded-md"
                onClickOutside={() => setIsOpen(false)}
                // onSelect={() => setIsOpen(false)}
                onInputClick={() => setIsOpen(true)}
                open={isOpen}
                // open={false}
                maxDate={maxDate}
                name={"date"}
            />
        </div>
    );
};
