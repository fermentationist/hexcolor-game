export const randomHexColor = () => {
    const getRandom = () => {
        const rand = Math.floor(Math.random() * 255);
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
    const weightedValue = (0.3 * R + 0.59 * G + .11 * B);
    return weightedValue >= threshhold ? "#080808" : "#F8F8F8";
}
export const hexToRGB = hexColor => {
    return hexColor.match(/.{1,2}/g).map(hex => parseInt(hex, 16));
}
export const generateChoice = (hexColor, {maxVariance, minVariance}) => {
    const [R, G, B] = hexToRGB(hexColor) //split string into pairs and convert string segments back to base 10 numbers
    
    const getCloseNumber = (n, {maxVariance=50, minVariance=5, max=255, min=0}) => {
        let result 
        do {
            let diffMagnitude = Math.floor((Math.random() * (maxVariance - minVariance)) + minVariance);
            let addOrSubtract = Math.random() > 0.5 ? -1 : 1;
            let diff = diffMagnitude * addOrSubtract;
            result = n + diff;
        } while (result > max || result < min);
        const hexString = result.toString(16);
        return hexString.length === 1 ? "0" + hexString : hexString;
    }
    return [getCloseNumber(R, {maxVariance, minVariance}), getCloseNumber(G, {maxVariance, minVariance}), getCloseNumber(B, {maxVariance, minVariance})].join("");
}

export const generateChoices = (solution, {numberOfChoices = 3, maxVariance, minVariance}) => {
    const choices = Array(numberOfChoices).fill("").map(() => generateChoice(solution, {maxVariance, minVariance}));
    
    const randomSlot = Math.floor(Math.random() * numberOfChoices);
    
    choices.splice(randomSlot, 0, solution);
    
    return choices;
}