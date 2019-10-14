import React from 'react';
import Game from "./Game.js";
// import './App.css';
import {createGlobalStyle} from "styled-components";

function App() {
    const GlobalStyle = createGlobalStyle`
        html {
            box-sizing: border-box;
            overflow-x: hidden;
            --shadow: 2px 2px 10px rgba(40,40,40, 0.75);
            --inset-shadow: inset 1px 1px 4px rgba(10,10,10, 0.65);
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
            font-size: 10px;
            color: #444;
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
