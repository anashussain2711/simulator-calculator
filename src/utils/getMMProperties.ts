import { toast } from "@components/hooks/use-toast";

// Helper function to format numbers to fixed decimals
const formatNumber = (num: number): string => {
    // Check if the number is in scientific notation (exponent form)
    if (Math.abs(num) < 1e-6 || Math.abs(num) > 1e6) {
        return num.toExponential(2); // Exponential form with 2 decimal places
    }
    // Regular fixed decimals with 2 places
    return num.toFixed(2);
};

export const calculateMMRho = (
    lambda: number,
    mu: number,
    servers: number
): string => {
    const rho = lambda / (servers * mu);
    return formatNumber(rho);
};

// Probability of zero customers (P0)
export const calculateMMP0 = (
    lambda: number,
    mu: number,
    servers: number
): string => {
    const rho = calculateMMRho(lambda, mu, servers);

    if (parseFloat(rho) >= 1 && servers === 1) {
        toast({
            title: "Invalid Inputs",
            description: "System is unstable (ρ >= 1). Reduce λ or increase μ.",
        });
        // Return a placeholder value if system is unstable
        return '0.00';
    }

    if (servers === 1) {
        // M/M/1 P0 formula
        const p0 = 1 - parseFloat(rho);
        return formatNumber(p0);
    }

    // M/M/c P0 formula
    const sumTerms = Array.from(
        { length: servers },
        (_, n) => Math.pow(lambda / mu, n) / factorial(n)
    ).reduce((sum, term) => sum + term, 0);

    const lastTerm =
        Math.pow(lambda / mu, servers) / (factorial(servers) * (1 - parseFloat(rho)));

    const p0 = 1 / (sumTerms + lastTerm);
    return formatNumber(p0);
};

// Average number of customers in queue (Lq)
export const calculateMMLq = (
    lambda: number,
    mu: number,
    servers: number
): string => {
    const rho = parseFloat(calculateMMRho(lambda, mu, servers));
    const P0 = parseFloat(calculateMMP0(lambda, mu, servers));

    if (servers === 1) {
        // M/M/1 Lq formula
        const lq = Math.pow(lambda, 2) / (mu * (mu - lambda));
        return formatNumber(lq);
    }

    // M/M/c Lq formula
    const lq = (P0 * Math.pow(lambda / mu, servers) * rho) /
        (factorial(servers) * Math.pow(1 - rho, 2));
    return formatNumber(lq);
};

// Average time in queue (Wq)
export const calculateMMWq = (
    lambda: number,
    mu: number,
    servers: number
): string => {
    const Lq = parseFloat(calculateMMLq(lambda, mu, servers));
    const wq = Lq / lambda;
    return formatNumber(wq);
};

// Average number of customers in system (Ls)
export const calculateMMLs = (
    lambda: number,
    mu: number,
    servers: number
): string => {
    const Lq = parseFloat(calculateMMLq(lambda, mu, servers));
    const ls = Lq + lambda / mu;
    return formatNumber(ls);
};

// Average time in system (Ws)
export const calculateMMWs = (
    lambda: number,
    mu: number,
    servers: number
): string => {
    const Ls = parseFloat(calculateMMLs(lambda, mu, servers));
    const ws = Ls / lambda;
    return formatNumber(ws);
};

// Helper function to calculate factorial
const factorial = (num: number): number => {
    if (num === 0 || num === 1) return 1;
    return num * factorial(num - 1);
};
