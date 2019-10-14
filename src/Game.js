import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Swatch from "./components/Swatch.js";
import {randomHexColor, generateChoices} from "./gameUtilities.js";
import Header from "./components/Header.js";
import Score from "./components/Score.js";
import SolutionPanel from "./components/SolutionPanel.js";
import Options from "./components/Options.js";
import uniqueKey from "./uniqueKey.js";

const Game = props => {
    const settings = window.localStorage.getItem("hexcolorGame.options");
    console.log("TCL: settings", settings)
    const {minVariance, maxVariance, numChoices} = settings ? JSON.parse(settings) : {};
    console.log("TCL: minVariance, maxVariance, numChoices", minVariance, maxVariance, numChoices)
    const [state, setGameState] = useState({
        currentSolution: "",
        score: 0,
        currentChoices: [],
        numChoices: numChoices || 4,
        minVariance: minVariance || 10,
        maxVariance: maxVariance || 100,
        gameOver: false,
        guessesRemaining: 2
    })
    useEffect(() => { // runs once
        newRound();
    }, []); // empty array prevents this hook from re-running

    useEffect(() => { // runs every change?
        console.log("state:", state)
    });
    const newRound = () => {
        const randomColor = randomHexColor();

        setGameState({
            ...state,
            currentSolution: randomColor,
            currentChoices: generateChoices(randomColor, {
                
                minVariance: state.minVariance,
                maxVariance: state.maxVariance,
                numChoices: state.numChoices,
                gameOver: false,
            }),
        });
    }
    const updateSettings = options => {
        console.log("updating settings...")
        setGameState({
            ...state,
            ...options
        })
        window.localStorage.setItem("hexcolorGame.options", JSON.stringify({
            ...options
        }))
    }
    const answerHandler = event => {
        event.stopPropagation();
        if (! state.guessesRemaining) {
            setGameState({
                ...state,
                gameOver: true,
            });
            return;
        }
        const color = event.currentTarget.value;
        console.log("TCL: color", color)
        console.log(state.currentSolution)
        if (state.currentSolution === color && ! state.gameOver){
            setGameState({
                ...state,
                score: state.score + state.guessesRemaining,
                gameOver: true
            })
            console.log("winner winner chicken dinner")
            console.log(`${state.guessesRemaining} points!`)
        } else {
            console.log("WRONG!");
            return;
        }
    }
    const swatchBoxStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    }
    const mainStyle = {
        display: "grid",
        gridTemplateRows: "auto",
    }
    const boardStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }
    return (
        <main style={mainStyle}>
            <Header />
            <div className="board" style={boardStyle}>
                <SolutionPanel solution={state.currentSolution}/>
                <Score score={state.score}/>
            </div>
            <section className="swatches" style={swatchBoxStyle} >
                {state.currentChoices.map(color => {
                    return (
                        <Swatch key={uniqueKey()} solution={state.currentSolution} color={color} onClick={answerHandler}/>
                    )
                })}
            </section>
            <Options updateSettings={updateSettings} newRound={newRound}/>
        </main>
    );
}

export default Game;