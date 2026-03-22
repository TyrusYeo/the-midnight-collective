export const calculateRandomTilt = () => {
    // ±3 degrees, biased away from zero so there's always a visible tilt
    const sign = Math.random() < 0.5 ? -1 : 1;
    const maxDeg = 5.6;
    const minDeg = 1.3;
    const randomDeg = minDeg + Math.floor(Math.random() * (maxDeg - minDeg + 1));
    
    return sign * randomDeg;
}