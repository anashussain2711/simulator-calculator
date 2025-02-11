"use client";

import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Select from "react-select";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Title,
} from "chart.js";
import { Label } from "@components/components/ui/label";
import { Input } from "@components/components/ui/input";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title);

type TableRow = {
    interArrival: number;
    arrival: number;
    serviceTime: number;
    start: number;
    end: number;
    turnaround: number;
    wait: number;
    responseTime: number;
    priority: number;
};

type GanttDataset = {
    label: string;
    data: number[];
    backgroundColor: string;
    currentTime: number;
    serverNo: number;
};

export default function SimulationPage(): JSX.Element {
    const [tableData, setTableData] = useState<TableRow[]>([]);
    const [ganttData, setGanttData] = useState<GanttDataset[]>([]);
    const [meu, setMeu] = useState("5.45");
    const [serverCount, setServerCount] = useState<number>(2);
    const [priorities, setPriorities] = useState<number[]>([1, 2]);

    useEffect(() => {
        simulate();
    }, [serverCount, priorities]);

    function generateServiceTime(mu: number): number {
        const U = Math.random(); // Generate a random number between 0 and 1
        return -Math.log(U) / mu; // Apply the formula
    }

    const constructInterArrivals = (cpLookUp: number[]): number[] => {
        const interArrivalTimes: number[] = [];
        for (let i = 0; i < cpLookUp.length; i++) {
            const randomNum = Math.random();
            for (let j = 0; j < cpLookUp.length - 1; j++) {
                const lowerBound = cpLookUp[j];
                const upperBound = cpLookUp[j + 1];
                if (randomNum >= lowerBound && randomNum <= upperBound) {
                    interArrivalTimes.push(j);
                    break;
                }
            }
        }
        return interArrivalTimes;
    };

    const simulate = (): void => {
        const cpLookUp = [0, 0.2, 0.5, 0.8, 1]; // Cumulative probabilities for interarrival times
        const interArrivalTimes = constructInterArrivals(cpLookUp); // Dynamically generate interarrival times
        const priorityLevels: number[] = [1, 2, 1, 2, 1];

        let arrivals: number[] = [];
        let gantt: GanttDataset[] = [];
        let servers: number[] = Array(serverCount).fill(0); // Track when servers are free
        let table: TableRow[] = [];

        for (let i = 0; i < interArrivalTimes.length; i++) {
            const arrival = (arrivals[i - 1] || 0) + interArrivalTimes[i];
            const serviceTime = Math.ceil(generateServiceTime(+meu)); // Generate service time dynamically
            arrivals.push(arrival);

            // Find the first available server (lowest index if multiple are free)
            const serverIndex = servers.reduce(
                (minIndex, serverTime, index) =>
                    servers[minIndex] > serverTime ? index : minIndex,
                0
            );

            const start = Math.max(arrival, servers[serverIndex]);
            const end = start + serviceTime;

            servers[serverIndex] = end; // Update server's next free time

            // Add task to Gantt chart
            const data = {
                label: `Task ${i + 1} (P${priorityLevels[i]})`,
                data: Array(serverCount).fill(0),
                backgroundColor: priorityLevels[i] === 1 ? "blue" : "orange",
                borderColor: "black", // Thin border color
                borderWidth: 1, // Border width
                currentTime: start,
                serverNo: serverIndex + 1,
            };
            data.data[serverIndex] = serviceTime;
            gantt.push(data);

            // Add row to table
            table.push({
                interArrival: interArrivalTimes[i],
                arrival,
                serviceTime,
                start,
                end,
                turnaround: end - arrival,
                wait: start - arrival,
                responseTime: end - arrival,
                priority: priorityLevels[i],
            });
        }

        setTableData(table);
        setGanttData(gantt);
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4 text-center">
                M/M/S Priority Simulation
            </h1>

            <div className="flex justify-between items-center mb-6">
                <label className="block text-sm font-medium text-gray-700">
                    Server Count:
                </label>
                <input
                    type="number"
                    value={serverCount}
                    onChange={(e) => setServerCount(parseInt(e.target.value))}
                    className="border rounded p-2 w-16"
                />
            </div>

            <div>
                <Label htmlFor="email">Meu</Label>
                <Input
                    type="number"
                    value={meu}
                    onChange={(e) => setMeu(e.target.value)}
                />
            </div>

            <Bar
                data={{
                    labels: Array.from(
                        { length: serverCount },
                        (_, i) => `Server ${i + 1}`
                    ),
                    datasets: ganttData.map((d) => ({
                        label: d.label,
                        data: d.data,
                        backgroundColor: d.backgroundColor,
                        borderWidth: 1, // Thin border
                        borderColor: "#FFFFFF", // Black border color
                    })),
                }}
                options={{
                    indexAxis: "y",
                    scales: {
                        x: { stacked: true },
                        y: { stacked: true },
                    },
                }}
            />

            <h2 className="text-xl font-semibold mt-8">Simulation Table</h2>
            <table className="table-auto border-collapse border border-gray-500 w-full mt-4">
                <thead>
                    <tr>
                        <th className="border border-gray-400 px-4 py-2">
                            InterArrival
                        </th>
                        <th className="border border-gray-400 px-4 py-2">
                            Arrival
                        </th>
                        <th className="border border-gray-400 px-4 py-2">
                            Service Time
                        </th>
                        <th className="border border-gray-400 px-4 py-2">
                            Start
                        </th>
                        <th className="border border-gray-400 px-4 py-2">
                            End
                        </th>
                        <th className="border border-gray-400 px-4 py-2">
                            Turnaround
                        </th>
                        <th className="border border-gray-400 px-4 py-2">
                            Wait
                        </th>
                        <th className="border border-gray-400 px-4 py-2">
                            Response Time
                        </th>
                        <th className="border border-gray-400 px-4 py-2">
                            Priority
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, i) => (
                        <tr key={i}>
                            <td className="border border-gray-400 px-4 py-2">
                                {row.interArrival}
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                {row.arrival}
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                {row.serviceTime}
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                {row.start}
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                {row.end}
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                {row.turnaround}
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                {row.wait}
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                {row.responseTime}
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                {row.priority}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
