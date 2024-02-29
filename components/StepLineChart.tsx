import React, {useState} from 'react';
import 'chart.js/auto';
import {Line} from 'react-chartjs-2';

const StepLineChart = ({data, view}: any) => {

    let labels =Array.from({length: 365}, (_, i) => i + 1);

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

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
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
