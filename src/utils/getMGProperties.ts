import { toast } from "@components/hooks/use-toast";

// Helper function to format numbers to fixed decimals or exponential notation
const formatNumber = (num: number): string => {
    // Check if the number is in scientific notation (exponent form)
    if (Math.abs(num) < 1e-6 || Math.abs(num) > 1e6) {
        return num.toExponential(2); // Exponential form with 2 decimal places
    }
    // Regular fixed decimals with 2 places
    return num.toFixed(2);
};

export const calculateMGRho = (lambda: number, mu: number): string => {
    const rho = lambda / mu;
    return formatNumber(rho);
};

// Probability of zero customers (P0) for M/G/1
export const calculateMGP0 = (lambda: number, mu: number): string => {
    const rho = parseFloat(calculateMGRho(lambda, mu));

    if (rho >= 1) {
        toast({
            title: "Invalid Inputs",
            description: "System is unstable (ρ >= 1). Reduce λ or increase μ.",
        });
        return '0.00'; // Return a fallback value if system is unstable
    }

    const p0 = 1 - rho;
    return formatNumber(p0);
};

// Average number of customers in queue (Lq) for M/G/1
export const calculateMGLq = (
    lambda: number,
    mu: number,
    variance: number
): string => {
    const rho = parseFloat(calculateMGRho(lambda, mu));

    if (rho >= 1) {
        toast({
            title: "Invalid Inputs",
            description: "System is unstable (ρ >= 1). Reduce λ or increase μ.",
        });
        return '0.00'; // Return a fallback value if system is unstable
    }

    // M/G/1 Lq formula:
    const lq = (Math.pow(lambda, 2) * variance + Math.pow(rho, 2)) / (2 * (1 - rho));
    return formatNumber(lq);
};

// Average time in queue (Wq) for M/G/1
export const calculateMGWq = (
    lambda: number,
    mu: number,
    variance: number
): string => {
    const Lq = parseFloat(calculateMGLq(lambda, mu, variance));
    const wq = Lq / lambda;
    return formatNumber(wq);
};

// Average number of customers in system (Ls)
export const calculateMGLs = (
    lambda: number,
    mu: number,
    variance: number
): string => {
    const Lq = parseFloat(calculateMGLq(lambda, mu, variance));
    const ls = Lq + lambda / mu;
    return formatNumber(ls);
};

// Average time in system (Ws)
export const calculateMGWs = (
    lambda: number,
    mu: number,
    variance: number
): string => {
    const Ls = parseFloat(calculateMGLs(lambda, mu, variance));
    const ws = Ls / lambda;
    return formatNumber(ws);
};

// Generic helper for factorial (not strictly needed here but useful for extensions)
const factorial = (num: number): number => {
    if (num === 0 || num === 1) return 1;
    return num * factorial(num - 1);
};
