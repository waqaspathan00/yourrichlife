import React from 'react';

interface ProgressBarProps {
    currentSaved: number;
    totalRequired: number;
}

export default function LinearProgressBar({currentSaved, totalRequired}: ProgressBarProps) {
    const percent = (currentSaved / totalRequired) * 100;

    return (
        <div className="flex flex-col items-center justify-center">
            {/*<span className={` text-blue-600`}>*/}
            {/*    {percent} %*/}
            {/*</span>*/}
            <div className="w-full bg-gray-300 rounded-full h-3 relative overflow-hidden">
                <div
                    className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-full h-full w-full absolute"
                    style={{
                        left: `${percent - 100}%`,
                        transition: "width 3s"
                    }}
                />
            </div>
        </div>
    );
};
