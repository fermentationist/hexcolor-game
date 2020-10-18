import React from "react";
import withTooltip from "./withTooltip";
import styled from "styled-components";

const Score = props => {
    const StyledSection = styled.section`
        display: flex;
        background-color: lightgray;
        align-items: center;
        text-align: center;
        height: auto;
        width: auto;
        margin: 1vw;
        padding: 0.75em;
        border-radius: 12px;
        border: 2px ridge darkgray;
        font-family: Monaco;
        font-size: 1.75em;
        box-shadow: var(--inset-shadow);
    `;
    const ScoreWithTooltip = withTooltip(StyledSection);
    return (
        <ScoreWithTooltip className="score" tooltip="score">
            <h1>{props.score}</h1>
        </ScoreWithTooltip>
    );
}

export default Score;
