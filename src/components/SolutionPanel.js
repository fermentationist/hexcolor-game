import React from "react";
import styled from "styled-components";
import withTooltip from "./withTooltip.js";

const SolutionPanel = props => {
    const StyledSection = styled.section`
        min-width: auto;
        width: auto;
        height: auto;
        background-color: lightgray;
        border-radius: 12px;
        border: 2px ridge darkgray;
        font-family: "Courier New";
        font-size: calc((4vw + 4vh)/2);
        padding: 0.5em;
        margin: 0.5em;
        box-shadow: var(--inset-shadow);
    `;
    const Solution = withTooltip(StyledSection)
    return (
        <Solution className="solution" tooltip="This six-digit hexidecimal code represents an RGB color">
            <h1>#{props.solution.toUpperCase()}</h1>
        </Solution>
    );
}

export default SolutionPanel;