import React from "react";
import styled from "styled-components";

const ReloadButton = props => {
    const StyledButton = styled.button`
        appearance: none;
        height: 3.5vw;
        width: 3.5vw;
        min-height: 48px;
        min-width: 48px;
        border-radius: 100%;
        border: none;
        background-color: gray;
        color: darkgray;
        font-size: 3em;
        font-weight: 800;
        box-shadow: var(--inset-shadow);
        text-align: center;
        /* text-justify: center; */
        &:hover {
            background-color: #8FD08E;
            transition: 666ms;
            color: green;
        }
        &:active {
            background-color: green;
            color: lightgray;
            transition: 0ms;
        }
    `
    return (
        <StyledButton className="next-button" {...props}>
            >
        </StyledButton>
    );
}

export default ReloadButton;