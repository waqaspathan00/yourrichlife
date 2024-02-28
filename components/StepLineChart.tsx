import React, {useState} from 'react';
import 'chart.js/auto';
import {Line} from 'react-chartjs-2';

const StepLineChart = ({data, view}: any) => {

    // Generate labels based on the current view
    let labels;
    switch (view) {
        case '1M':
            labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            break;
        case '3M':
            const month = new Date().getMonth();
            let days;
            if (month === 1) {
                days = 28;
            } else if ([3, 5, 8, 10].includes(month)) {
                days = 30;
            } else {
                days = 31;
            }
            labels = Array.from({length: days}, (_, i) => i);
            break;
        case '1Y':
            labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            break;
        default:
            labels = Array.from({length: 30}, (_, i) => i + 1); // Default to month view
    }


    const chartData: any = {
        labels: labels,
        datasets: [
            {
                label: 'Step Line Data',
                data: data,
                borderColor: '#3B66FF',
                borderWidth: 2,
                fill: true,
                stepped: true,
                // stepped: false,
            },
        ],
    };

    // Configure chart options, including background color
    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value: number) {
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
            }
        },
        // Set the background color
        // backgroundColor: 'black', // Example background color,
        backgroundColor: ({chart}: any) => {
            const bg = chart.ctx.createLinearGradient(0, 0, 0, 140);
            // More config for your gradient
            bg.addColorStop(0, "#3B66FF");
            bg.addColorStop(1, "white");
            return bg;
        },
        elements: {
            line: {
                tension: 0.5, // Adds some curve to the line
                // display: true
            },
            point: {
                radius: 1 // Removes points from the line
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
