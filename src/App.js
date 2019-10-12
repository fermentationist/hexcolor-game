import React from 'react';
import Game from "./Game.js";
import './App.css';
import styled, {createGlobalStyle} from "styled-components";

function App() {
    const GlobalStyle = createGlobalStyle`
        html {
            box-sizing: border-box;
            overflow-x: hidden;
        }
        *, *:before, *:after {
            box-sizing: inherit;
            scroll-behavior: smooth;
            margin: 0;
            padding: 0;
            outline: none;
        }
        body {
            background-color: #808080;
            font-family: futura;
            color: ivory;
        }
    `;
    return (
        <div className="App">
            <GlobalStyle />
            <Game />
        </div>
    );
}

export default App;
