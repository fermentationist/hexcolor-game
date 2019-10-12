import React, {useState, useEffect} from "react";
import styled from "styled-components";

const Game = props => {
    const [state, setState] = useState({
        currentSolution: "",
        score: 0,
        currentChoices: []
    })
    useEffect(() => {
        console.log(randomHexColor())
        console.log(getChoices())
    })
    const randomHexColor = () => {
        const getRandom = () => {
            const rand = Math.floor(Math.random() * 256);
            return rand.toString(16);
        }
        const R = getRandom();
        const G = getRandom();
        const B = getRandom();
        console.log("#" + R + G + B)
        return R + G + B;
    }
    const getChoices = () => {
        const [R, G, B] = randomHexColor().match(/.{1,2}/g).map(hex => parseInt(hex, 16)); //convert string segments back to base 10 numbers
        console.log("TCL: getChoices -> R, G, B", R, G, B)
        const getCloseNumber = (n, maxDiff=50, minDiff=5, max=255, min=0) => {
            const diffMagnitude = Math.floor((Math.random() * (maxDiff - minDiff)) + minDiff);
            console.log("TCL: getCloseNumber -> diffMagnitude", diffMagnitude)
            const addOrSubtract = Math.random() > 0.5 ? -1 : 1;
            const diff = diffMagnitude * addOrSubtract;
            const result = n + diff;
            return result <= max && result >= min ? result : getCloseNumber(n);
        }
        console.log(getCloseNumber(100))
    }
    return null;
}

export default Game;