"use client";
import { ChartData } from "chart.js";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import autocolors from "chartjs-plugin-autocolors";
import { Bar } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
// import "./BarChar.css"
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    autocolors
);

export const BarChart = ({
    chartData,
    xMaxValue,
    xLabels,
    serverCount,
}: {
    chartData: ChartData<"bar", (number | [number, number] | null)[], unknown>;
    xMaxValue: number;
    xLabels: number[];
    serverCount: number;
}) => {
    return (
        <div className="chart-container w-full">
            <div
                className="chart-container"
                style={{
                    width: "90%", // Full width
                    // height: '250px', // Fixed height
                }}
            >
                <h2 style={{ textAlign: "center" }}>Gantt Chart</h2>
                <Bar
                    data={{
                        labels: Array.from(
                            { length: serverCount },
                            (_, i) => `Server ${i + 1}`
                        ),
                        datasets: chartData.datasets,
                    }}
                    options={{
                        indexAxis: "y",
                        scales: {
                            x: {
                                stacked: true,
                                min: 0,
                                max: xMaxValue, // Adjust max value based on your range
                                ticks: {
                                    stepSize: 1, // Set interval to 5
                                    callback: (value, index) => {
                                        // Your chosen positions
                                        if (xLabels.includes(value as number)) {
                                            return value; // Show the label
                                        }
                                        return ""; // Hide other labels
                                    },
                                },
                            },
                            y: {
                                stacked: true,
                            },
                        },
                        plugins: {
                            legend: {
                                display: true,
                                labels: {
                                    filter(item, data) {
                                        return !item.text.startsWith("Idle");
                                    },
                                },
                            },
                        },
                        // responsive: true,
                    }}
                />
            </div>
        </div>
    );
};
