import React from "react";
import styled from "styled-components";
import {hexToRGB, getFontColor} from "../gameUtilities.js";
import withTooltip from "./withTooltip.js";

const Swatch = props => {
    const onClick = event => {
        console.log("clicked")
        // event.preventDefault();
        event.stopPropagation();
        revealIdentity(event.currentTarget);
        props.clickHandler(event);
    }
    const revealIdentity = eventTarget => {
        console.log("revealIdentity called.");
        eventTarget.children[0].style.visibility = "visible";// reveal the hex color code for the clicked swatch
    }
    const StyledButton = styled.button`
        background-color: #${props.color};
        height: 10vw;
        width: 10vw;
        min-height: 69px;
        min-width: 69px;
        border: 2px solid lightgray;
        border-radius: 100%;
        margin: 0 2vw;
        text-decoration: line-through;
        text-decoration-line: ${props.color !== props.solution ? "line-through" : "none"};
        text-decoration-color: red;
        
        &:hover {
            transform: scale(0.96);
            transition: 333ms;
        }
        box-shadow: var(--shadow);
    `;
    const StyledSpan = styled.span`
        font-family: "Courier New";
        font-size: calc((2.25vw + 2.25vh)/2);
        font-weight: 600;
        color: ${getFontColor(props.color)};
        /* filter: invert(0.1); */
        visibility: hidden; /* hides the hex color value for the swatch */
        border: ${props.color === props.solution ? "4px dashed green" : "none"};/* outlines the correct answer */
    `;
    const ButtonWithTooltip = withTooltip(StyledButton);
    return (
        <ButtonWithTooltip tooltip="click to guess..." className={`swatch-${props.color}`} value={props.color} onClick={onClick}>
            <StyledSpan>#{props.color.toUpperCase()}</StyledSpan>
        </ButtonWithTooltip>
    );
}

export default Swatch;