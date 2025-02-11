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

// Calculate traffic intensity (ρ) for G/G/1 system
export const calculateGGRho = (lambda: number, mu: number): string => {
    const rho = lambda / mu;
    return formatNumber(rho);
};

// Probability of zero customers (P0) for G/G/1
export const calculateGGP0 = (lambda: number, mu: number): string => {
    const rho = parseFloat(calculateGGRho(lambda, mu));

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

// Average number of customers in queue (Lq) for G/G/1
export const calculateGGLq = (
  lambda: number,
  mu: number,
  variance: number
): string => {
  const rho = parseFloat(calculateGGRho(lambda, mu));

  if (rho >= 1) {
    toast({
      title: "Invalid Inputs",
      description: "System is unstable (ρ >= 1). Reduce λ or increase μ.",
    });
    return '0.00'; // Return a fallback value if system is unstable
  }

  // G/G/1 Lq formula:
  const lq = (Math.pow(lambda, 2) * variance + Math.pow(rho, 2)) / (2 * (1 - rho));
  return formatNumber(lq);
};

// Average time in queue (Wq) for G/G/1
export const calculateGGWq = (
  lambda: number,
  mu: number,
  variance: number
): string => {
  const Lq = parseFloat(calculateGGLq(lambda, mu, variance));
  const wq = Lq / lambda;
  return formatNumber(wq);
};

// Average number of customers in system (Ls) for G/G/1
export const calculateGGLs = (
  lambda: number,
  mu: number,
  variance: number
): string => {
  const Lq = parseFloat(calculateGGLq(lambda, mu, variance));
  const ls = Lq + lambda / mu;
  return formatNumber(ls);
};

// Average time in system (Ws) for G/G/1
export const calculateGGWs = (
  lambda: number,
  mu: number,
  variance: number
): string => {
  const Ls = parseFloat(calculateGGLs(lambda, mu, variance));
  const ws = Ls / lambda;
  return formatNumber(ws);
};

// Helper function to calculate factorial (useful for extensions, not strictly needed for G/G/1)
const factorial = (num: number): number => {
  if (num === 0 || num === 1) return 1;
  return num * factorial(num - 1);
};
