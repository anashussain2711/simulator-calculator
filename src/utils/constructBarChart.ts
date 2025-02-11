import { DataPointGannt } from "@components/types/DataPointGannt";
import { TableType } from "@components/types/Table1Data";

const selectServer = (serverCount: number, datasets: DataPointGannt[]) => {
    // Create an array to store the total processing time for each server
    const serverQueueTimes = Array(serverCount).fill(0);

    // Calculate the total time for each server based on current datasets
    datasets.forEach((dataPoint) => {
        if (dataPoint.serverNo > 0) {
            serverQueueTimes[dataPoint.serverNo - 1] += dataPoint.data[0];
        }
    });

    // Find the server with the shortest queue time
    let selectedServer = 0;
    let minQueueTime = serverQueueTimes[0];
    for (let i = 1; i < serverCount; i++) {
        if (serverQueueTimes[i] < minQueueTime) {
            minQueueTime = serverQueueTimes[i];
            selectedServer = i;
        }
    }

    return selectedServer + 1; // Server numbers are 1-based
};

export const constructBarChart = (table: TableType, serverCount: number) => {
    const datasets: DataPointGannt[] = [];
    const xLabels: number[] = [];

    // Array to track the current time for each server
    const serverEndTimes = Array(serverCount).fill(0);

    for (let i = 0; i < table.arrival.length; i++) {
        const arrivalTime = table.arrival[i];
        const serviceTime = table.service[i];

        // Find the server with the earliest availability
        let selectedServer = 0;
        let earliestEndTime = serverEndTimes[0];

        for (let j = 1; j < serverCount; j++) {
            if (serverEndTimes[j] < earliestEndTime) {
                earliestEndTime = serverEndTimes[j];
                selectedServer = j;
            }
        }

        const startTime = Math.max(arrivalTime, earliestEndTime);
        const endTime = startTime + serviceTime;

        // Update the selected server's end time
        serverEndTimes[selectedServer] = endTime;

        // Add an idle time dataset if the server was idle before the arrival
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

        const obj = {
            label: "C" + (i + 1).toString(),
            data: Array(serverCount).fill(0),
            barPercentage: 0.5,
            currentTime: startTime,
            serverNo: selectedServer + 1,
        };
        obj.data[selectedServer] = serviceTime;

        datasets.push(obj); // Update xLabels

        if (!xLabels.includes(startTime)) xLabels.push(startTime);
        if (!xLabels.includes(endTime)) xLabels.push(endTime);
    }

    const xMaxValue = Math.max(...serverEndTimes); // Maximum time for chart
    console.log("kkk",datasets)

    return { datasets, xMaxValue, xLabels };
};
