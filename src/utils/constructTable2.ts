import { DataPointGannt } from "@components/types/DataPointGannt";
import { TableType } from "@components/types/Table1Data";
import { Table2Data } from "@components/types/Table2Data";

export const constructTable2 = (table: TableType, serverCount: number) => {
    const datasets: DataPointGannt[] = [];
    const xLabels: number[] = [];
    const table2Data: Table2Data[] = [];

    // Array to track the current time of each server
    const serverEndTimes = Array(serverCount).fill(0);

    for (let i = 0; i < table.service.length; i++) {
        const serviceTime = table.service[i];
        const arrivalTime = table.arrival[i];

        // Find the server with the earliest availability
        let selectedServer = 0;
        let earliestEndTime = serverEndTimes[0];

        for (let j = 1; j < serverCount; j++) {
            if (serverEndTimes[j] < earliestEndTime) {
                earliestEndTime = serverEndTimes[j];
                selectedServer = j;
            }
        }

        // Determine the start time based on the server's availability and arrival time
        const startTime = Math.max(arrivalTime, earliestEndTime);
        const endTime = startTime + serviceTime;

        // Update the server's current time
        serverEndTimes[selectedServer] = endTime;

        const data: Table2Data = {
            arrival: arrivalTime,
            start: startTime,
            end: endTime,
            turnAround: endTime - arrivalTime,
            wait: startTime - arrivalTime,
            service: serviceTime,
            interArrival: table?.interArrival[i] ? table?.interArrival[i] : 0,
        };

        // Add the task to the table2Data
        table2Data.push(data);

        // Add an idle dataset if the server was idle before serving this task
        if (arrivalTime > earliestEndTime) {
            datasets.push({
                label: `Idle (Server ${selectedServer + 1})`,
                data: [arrivalTime - earliestEndTime],
                backgroundColor: "transparent",
                borderWidth: 0,
                currentTime: earliestEndTime,
                serverNo: selectedServer + 1,
            });
        }

        // Add the task's dataset
        datasets.push({
            label: `C${i + 1}`,
            data: [serviceTime],
            barPercentage: 0.5,
            currentTime: startTime,
            serverNo: selectedServer + 1,
        });

        // Update xLabels with unique time points
        if (!xLabels.includes(startTime)) xLabels.push(startTime);
        if (!xLabels.includes(endTime)) xLabels.push(endTime);
    }

    console.log("---", table2Data);
    return table2Data;
};
