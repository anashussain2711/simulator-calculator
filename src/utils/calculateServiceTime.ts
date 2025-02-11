export const calculateServiceTimeMM = (meu: number): number => {
    return -meu * Math.log(Math.random());
};

export const calculateServiceTimeMG = (a: number, b: number): number => {
    return a + (b - a) * Math.random();
};
