import React from "react";
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
import { Table2Data } from "@components/types/Table2Data";
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

type PropType = {
    data2: Table2Data[];
    metric: keyof Table2Data[][number];
    title: string;
};

export default function Graph({ data2, metric, title }: PropType) {
    const data = {
        labels: data2.map((_, i) => "C"+(i+1)), // X-axis labels
        datasets: [
            {
                label: title, // Label for the dataset
                data: data2.map((tableData) => tableData[`${metric}`]), // Y-axis values
                backgroundColor: "rgba(75, 192, 192, 0.6)", // Bar colors
                borderColor: "rgba(75, 192, 192, 1)", // Border color
                borderWidth: 1, // Border width
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
        },
        scales: {
            y: {
                beginAtZero: true, // Start Y-axis from 0
            },
        },
    } as const;

    return (
        <div style={{ width: "600px", marginLeft: "50px",marginTop:"50px" }}>
            <h2 className="text-lg font-semibold">{title} Graph</h2>
            <Bar data={data} options={options} />
        </div>
    );
}
