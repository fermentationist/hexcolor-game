import React from "react";
import styled from "styled-components";
import {hexToRGB, getFontColor} from "../gameUtilities.js";

const Swatch = props => {
    const swatchStyle = {
        backgroundColor: `#${props.color}`,
        height: "10vw",
        width: "10vw",
        border: "1px solid lightgray",
        borderRadius: "13px",
        margin: "2vw"
    }
    const onClick = event => {
        console.log("clicked")
        // event.preventDefault();
        event.stopPropagation();
        revealIdentity(event.currentTarget)
        console.log("TCL: event.currentTarget", event.currentTarget)
        props.onClick(event);
    }
    const revealIdentity = eventTarget => {
        console.log("this code should reveal the identity")
        eventTarget.children[0].style.visibility = "visible";// reveal the hex color code for the clicked swatch
        console.log("TCL: eventTarget.children[0]", eventTarget.children[0])
        getFontColor(props.color);
    }
    const StyledButton = styled.button`
        background-color: #${props.color};
        height: 10vw;
        width: 10vw;
        border: 2px solid lightgray;
        border-radius: 100%;
        margin: 2vw;
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
        font-size: 3em;
        font-weight: 600;
        color: ${getFontColor(props.color)};
        filter: invert(0.1);
        visibility: hidden; /* hides the hex color value for the swatch */
        border: ${props.color === props.solution ? "4px dashed green" : "none"};/* outlines the correct answer */
    `;
    return (
        <StyledButton className={`swatch-${props.color}`} value={props.color} onClick={onClick}>
            <StyledSpan>#{props.color.toUpperCase()}</StyledSpan>
        </StyledButton>
    );
}

export default Swatch;