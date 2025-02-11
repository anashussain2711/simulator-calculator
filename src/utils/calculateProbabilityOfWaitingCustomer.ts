type Table2Data = {
    start: number;
    end: number;
    arrival: number;
    turnAround: number;
    wait: number;
}[];

export function calculateWaitingCustomerProbability(data: Table2Data): string {
    if (data.length === 0) {
        throw new Error("Data array is empty");
    }

    const waitingCustomers = data.filter(item => item.wait > 0).length;
    const totalCustomers = data.length;

    return (waitingCustomers / totalCustomers).toFixed(3);
}