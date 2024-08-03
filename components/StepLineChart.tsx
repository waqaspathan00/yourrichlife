import React, {useContext, useEffect, useRef} from 'react';
import 'chart.js/auto';
import {Line} from 'react-chartjs-2';
import {getNumberOfDaysPassedInYear, viewToDaysMap} from "@/lib/utils";
import {SavingsDataContext} from "@/lib/context/SavingsDataContext";
import {ViewKey} from "@/lib/types";

interface StepLineChartProps {
    view: ViewKey;
}

const StepLineChart = ({view}: StepLineChartProps) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const {dailySavingsBalanceChartData} = useContext(SavingsDataContext);
    const dailyAmounts = dailySavingsBalanceChartData.map((day) => day.amount);

    useEffect(() => {
        const chartElement = chartRef.current;

        const handleMouseEnter = () => {
            document.body.style.overflowY = 'hidden';
        };

        const handleMouseLeave = () => {
            document.body.style.overflowY = 'auto';
        };

        if (chartElement) {
            chartElement.addEventListener('mouseenter', handleMouseEnter);
            chartElement.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (chartElement) {
                chartElement.removeEventListener('mouseenter', handleMouseEnter);
                chartElement.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    // this block of code can be optimized
    let labels;
    if (view === 'YTD') {
        labels = dailySavingsBalanceChartData.slice(dailySavingsBalanceChartData.length - getNumberOfDaysPassedInYear()).map((day) => day.date);
    } else {
        const dayCount = viewToDaysMap[view];
        labels = dailySavingsBalanceChartData.slice(dailySavingsBalanceChartData.length - dayCount).map((day) => day.date);
    }

    const chartData: any = {
        labels: labels,
        datasets: [
            {
                label: 'Step Line Data',
                data: dailyAmounts,
                borderColor: '#3B66FF',
                borderWidth: 2,
                fill: true,
                stepped: false,
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
                displayColors: false,
                callbacks: {
                    title: function (tooltipItem: any) {
                        return tooltipItem[0].label;
                    },
                    label: function (context: any) {
                        let label = '';

                        if (context.parsed.y !== null) {
                            label += "$" + context.parsed.y;
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
                tension: 0, // Adds some curve to the line
                // display: true
            },
            point: {
                radius: 0.0
            }
        },
        maintainAspectRatio: false, // Add this to control aspect ratio
    };

    return (
        <div ref={chartRef}>
            {/* @ts-ignore */}
            <Line data={chartData} options={options}/>
        </div>
    );
};

export default StepLineChart;
