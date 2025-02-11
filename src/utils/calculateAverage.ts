import { Table2Data } from "@components/types/Table2Data";

export function calculateAverage(data: Table2Data[], metric: keyof Table2Data): number {
    if (data.length === 0) {
        throw new Error("Data array is empty");
    }

    const sum = data.reduce((acc, item) => acc + item[metric], 0);
    return +(sum / data.length).toFixed(4);
}
