import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerTailwind({savingsDate, setSavingsDate}: any) {
    const [isOpen, setIsOpen] = useState(false); // Manage open state
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 364);
    const maxDate = new Date();

    return (
        <div className={"flex justify-center w-full [&>*]:z-30"}>
            <DatePicker
                selected={savingsDate}
                onChange={(date) => setSavingsDate(date)}
                className="flex py-2 text-center border-b-2"
                onClickOutside={() => setIsOpen(false)}
                // onSelect={() => setIsOpen(false)}
                onInputClick={() => setIsOpen(true)}
                open={isOpen}
                minDate={minDate}
                maxDate={maxDate}
                name={"date"}
            />
        </div>
    );
};
