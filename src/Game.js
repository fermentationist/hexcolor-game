import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Swatch from "./components/Swatch.js";
import {randomHexColor, generateChoices} from "./gameUtilities.js";
import Header from "./components/Header.js";
import Score from "./components/Score.js";
import SolutionPanel from "./components/SolutionPanel.js";
import Options from "./components/Options.js";

const Game = props => {
    const settings = localStorage.getItem("hexcolorGame.options");
    console.log("TCL: settings", settings)
    const {minVariance, maxVariance, numChoices, score} = settings ? JSON.parse(settings) : {};
    console.log("TCL: minVariance, maxVariance, numChoices, score", minVariance, maxVariance, numChoices, score);

    let guessesRemaining = 2;
    let gameOver = false;
    let roundScore = 0;

    const [state, setState] = useState({
        currentSolution: "",
        score: score || 0,
        currentChoices: [],
        numChoices: numChoices || 4,
        minVariance: minVariance || 10,
        maxVariance: maxVariance || 100,
        // gameOver: false,
        // guessesRemaining: 2
    })
    useEffect(() => { // runs once
        console.log("Game->useEffect->newRound()")
        newRound();
        
    }, []); // empty array prevents this hook from re-running

    // useEffect(() => { // runs every change?
    //     console.log("state:", state)
    // });
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
        console.log("TCL: newRound -> state", state)
        const randomColor = randomHexColor();
        const saved = JSON.parse(localStorage.getItem("hexcolorGame.options"));
        localStorage.setItem("hexcolorGame.options", JSON.stringify({
            ...saved,
            score: state.score + roundScore,
        }));
        setState({
            ...state,
            score: state.score + roundScore,
            currentSolution: randomColor,
            currentChoices: generateChoices(randomColor, {
                minVariance: state.minVariance,
                maxVariance: state.maxVariance,
                numChoices: state.numChoices,
            }),
            gameOver: false,
        });
        
        guessesRemaining = 2;
        gameOver = false;
        roundScore = 0;
    }
    const updateSettings = options => {
        console.log("updating settings...", options)
        setState({
            ...state,
            ...options
        })
        localStorage.setItem("hexcolorGame.options", JSON.stringify({
            ...options
        }))
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
                {state.currentChoices.map((color, index) => {
                    console.log("rendering swatches...")
                    return (
                        <Swatch key={index} solution={state.currentSolution} color={color} clickHandler={answerHandler}/>
                    )
                })}
            </section>
            <Options updateSettings={updateSettings} newRound={newRound}/>
        </main>
    );
}

export default Game;