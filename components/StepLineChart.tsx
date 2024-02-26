import React, {useState} from 'react';
import {Line} from 'react-chartjs-2';
import 'chart.js/auto';

const StepLineChart = ({data, view}: any) => {

    // Generate labels based on the current view
    let labels;
    switch (view) {
        case 'week':
            labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            break;
        case 'month':
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
        case 'year':
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
                fill: false,
                stepped: true,
            },
        ],
    };

    // Configure chart options, including background color
    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
            x: {
                grid: {
                    drawOnChartArea: true, // Draw the grid lines on the chart area
                    color: function (context: any) {
                        if (context.tick && context.tick.major) {
                            return '#f00'; // Example to change grid line color, not necessary for background
                        } else {
                            return '#eaeaea'; // Example to change grid line color, not necessary for background
                        }
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
        // Set the background color
        backgroundColor: '#3B66FF', // Example background color
        elements: {
            line: {
                tension: 0 // Adds some curve to the line
            },
            point: {
                radius: 0.5 // Removes points from the line
            }
        },
        maintainAspectRatio: false, // Add this to control aspect ratio
    };

    return (
        <div className="p-4 bg-white shadow-lg rounded-lg">
            <Line data={chartData} options={options}/>
        </div>
    );
};

export default StepLineChart;
