export const randomHexColor = () => {
    const getRandom = () => {
        const rand = Math.floor(Math.random() * 256);
        const randomVal = rand.toString(16);
        return randomVal.length === 1 ? "0" + randomVal : randomVal;
    }
    const R = getRandom();
    const G = getRandom();
    const B = getRandom();
    console.log("#" + R + G + B)
    return R + G + B;
}
export const getFontColor = (bgHexColor, threshhold = 80) => {
    const [R, G, B] = hexToRGB(bgHexColor);
    console.log("TCL: getFontColor -> R, G, B", R, G, B)
    const adjustedAvgValue = (0.3 * R + 0.59 * G + .11 * B);
    console.log("TCL: getFontColor -> adjustedAvgValue", adjustedAvgValue)
    const avgValue = adjustedAvgValue //parseHex.reduce((sum,n) => sum + n)
        / 3
    // const largestDeviation = Math.max(...parseHex.map(val => val - avgValue));
    // console.log("TCL: getFontColor -> largestDeviation", largestDeviation)
    console.log("TCL: avgValue", avgValue)
    return adjustedAvgValue >= threshhold ? "#080808" : "#F8F8F8";
}
export const hexToRGB = hexColor => {
    return hexColor.match(/.{1,2}/g).map(hex => parseInt(hex, 16));
}
export const generateChoice = (hexColor, {maxVariance, minVariance}) => {
    const [R, G, B] = hexToRGB(hexColor) //split string into pairs and convert string segments back to base 10 numbers
    
    const getCloseNumber = (n, {maxVariance=50, minVariance=5, max=255, min=0}) => {
        let result 
        do {
            console.log("TCL: getCloseNumber -> result", result)
            let diffMagnitude = Math.floor((Math.random() * (maxVariance - minVariance)) + minVariance);
            console.log("TCL: getCloseNumber -> diffMagnitude", diffMagnitude)
            let addOrSubtract = Math.random() > 0.5 ? -1 : 1;
            let diff = diffMagnitude * addOrSubtract;
            console.log("TCL: getCloseNumber -> diff", diff)
            result = n + diff;
        } while (result > max || result < min);
        return result.toString(16);
    }
    return [getCloseNumber(R, {maxVariance, minVariance}), getCloseNumber(G, {maxVariance, minVariance}), getCloseNumber(B, {maxVariance, minVariance})].join("");
}

export const generateChoices = (solution, {numberOfChoices = 3, maxVariance, minVariance}) => {
    const choices = Array(numberOfChoices).fill("").map(() => generateChoice(solution, {maxVariance, minVariance}));
    
    const randomSlot = Math.floor(Math.random() * numberOfChoices);
    
    choices.splice(randomSlot, 0, solution);
    
    return choices;
}