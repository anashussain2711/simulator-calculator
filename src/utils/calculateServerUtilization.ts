import { DataPointGannt } from "@components/types/DataPointGannt";

export const calculateServerUtilization = (
    serverCount: number,
    datasets: DataPointGannt[],
    simulationEndTime: number
): number => {
    // Initialize an array to track active time for each server
    const activeTimes = Array(serverCount).fill(0);

    // Iterate through datasets and accumulate active times for each server
    datasets.forEach((dataPoint) => {
        if (dataPoint.serverNo > 0) {
            activeTimes[dataPoint.serverNo - 1] += dataPoint.data[0];
        }
    });

    // Calculate utilization for each server
    const utilizations = activeTimes.map(
        (activeTime) => (activeTime / simulationEndTime) * 100
    );

    // Calculate total utilization
    const totalUtilization = activeTimes.reduce(
        (sum, activeTime) => sum + (activeTime / simulationEndTime) * 100,
        0
    );

    // Calculate average utilization
    const averageUtilization = totalUtilization / serverCount;

    return averageUtilization;
};
