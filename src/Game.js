import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Swatch from "./components/Swatch.js";
import {randomHexColor, generateChoices} from "./gameUtilities.js";
import Header from "./components/Header.js";
import Score from "./components/Score.js";
import SolutionPanel from "./components/SolutionPanel.js";
import Options from "./components/Options.js";

const Game = props => {

    let guessesRemaining = 2;
    let gameOver = false;
    let roundScore = 0;

    const [state, setState] = useState({
        currentSolution: "",
        score: 0,
        currentChoices: [],
        numChoices: 3,
        minVariance: 20,
        maxVariance: 100,
        // gameOver: false,
        // guessesRemaining: 2
    })
    useEffect(() => { // runs once
        newRound();
    }, []); // empty array prevents this hook from re-running
    const clear = () => {
        console.log("roundScore:", roundScore);
        setState({
            ...state,
            currentSolution: "",
            currentChoices: [],
            score: roundScore,
        });
    }
    const newRound = () => {
        clear();
        const randomColor = randomHexColor();
        setState({
            ...state,
            score: state.score + roundScore,
            currentSolution: randomColor,
            currentChoices: generateChoices(randomColor, {
                minVariance: state.minVariance,
                maxVariance: state.maxVariance,
                numChoices: state.numChoices,
            }),
        });
        
        guessesRemaining = state.numChoices - 1;
        gameOver = false;
        roundScore = 0;
    }
    const updateSettings = options => {
        console.log("updating settings...", options)
        setState({
            ...state,
            ...options
        })
    }
    const answerHandler = event => {
        event.stopPropagation();
        event.preventDefault();
        if (! guessesRemaining) {
            gameOver = true;
            console.log("game over")
            return;
        }
        const color = event.currentTarget.value;
        console.log(state.currentSolution)
        if (state.currentSolution === color && ! gameOver){
            gameOver = true;
            // setState({
            //     ...state,
            //     score: state.score + guessesRemaining,
            // })
            roundScore += guessesRemaining;
            console.log("winner winner chicken dinner");
            console.log(`${guessesRemaining} points!`);
            guessesRemaining = 0;
        } else {
            console.log("WRONG!");
            guessesRemaining --;
            return;
        }
    }

    const StyledSwatchSection = styled.section`
        width: 100vw;
        display: flex;
        flex-direction: row;
        justify-content: center;
        @media (max-width: 540px) {
            justify-content: space-around;
        }
    `;

    const mainStyle = {
        display: "grid",
        gridTemplateRows: "auto",
        height: "100vh",
    }
    const boardStyle = {
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "2vh",
    }
    return (
        <main style={mainStyle}>
            <Header />
            <div className="board" style={boardStyle}>
                <SolutionPanel solution={state.currentSolution}/>
                <Score score={state.score}/>
            </div>
            <StyledSwatchSection className="swatches" >
                {state.currentChoices.map((color, index) => {
                    return (
                        <Swatch key={index} solution={state.currentSolution} color={color} clickHandler={answerHandler}/>
                    )
                })}
            </StyledSwatchSection>
            <Options updateSettings={updateSettings} newRound={newRound}/>
        </main>
    );
}

export default Game;