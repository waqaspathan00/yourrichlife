import React, {useState} from 'react';
import 'chart.js/auto';
import {Line} from 'react-chartjs-2';
import {getNumberOfDaysPassedInYear} from "@/lib/utils";
import {DailySavingsBalance} from "@/lib/types";

interface StepLineChartProps {
    dailySavingsBalance: DailySavingsBalance[];
    view: string;
}
const StepLineChart = ({dailySavingsBalance, view}: StepLineChartProps) => {

    let labels;
    if (view === "1M") {
        labels = Array.from({length: 30}, (_, i) => i + 1);
    } else if (view === "3M") {
        labels = Array.from({length: 90}, (_, i) => i + 1);
    } else if (view === "6M") {
        labels = Array.from({length: 180}, (_, i) => i + 1);
    } else if (view === "1Y") {
        labels = Array.from({length: 365}, (_, i) => i + 1);
    } else if (view === "YTD") {
        // create a variable representing the number of days that have passed in the year so far
        const daysPassed = getNumberOfDaysPassedInYear()
        labels = Array.from({length: daysPassed}, (_, i) => i + 1);
    }


    const chartData: any = {
        labels: labels,
        datasets: [
            {
                label: 'Step Line Data',
                data: dailySavingsBalance,
                borderColor: '#3B66FF',
                borderWidth: 2,
                fill: true,
                stepped: true,
                // stepped: false,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value: number) {
                        return '$' + value.toString();
                    }
                }
            },
            x: {
                display: false
            }
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
            tooltip: {
                // backgroundColor: '#3B66FF',
                enabled: true,
                intersect: false,
                callbacks: {
                    title: function (tooltipItem: any) {
                        return 'Day ' + tooltipItem[0].label;
                    },
                    label: function (context: any) {
                        let label = '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.x + " - " + context.parsed.y;
                        }
                        return label;
                    }
                }
            }
        },
        backgroundColor: ({chart}: any) => {
            const bg = chart.ctx.createLinearGradient(0, 0, 0, 140);
            bg.addColorStop(0, "#3B66FF");
            bg.addColorStop(1, "white");
            return bg;
        },
        elements: {
            line: {
                tension: 1, // Adds some curve to the line
                // display: true
            },
            point: {
                radius: 0.1
            }
        },
        maintainAspectRatio: false, // Add this to control aspect ratio
    };

    return (
        <div>
            {/* @ts-ignore */}
            <Line data={chartData} options={options}/>
        </div>
    );
};

export default StepLineChart;
