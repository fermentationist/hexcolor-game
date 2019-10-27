import React from "react";
import styled from "styled-components";

const Slider = React.forwardRef((props, ref) => {
    const StyledSlider = styled.input`
        appearance: none;
        background-color: darkgray;
        height: 3px;
        border-radius: 13px;
        outline: none;
        border: none;
        opacity: 0.333;
        margin: 2vh 2vw;
        &::-webkit-slider-runnable-track { 
            appearance: none;
            background-color: #808080;
            box-shadow: var(--inset-shadow);
        }
        &::-moz-range-track { 
            appearance: none;
            background-color: #808080;
            box-shadow: var(--inset-shadow);
        }
        &::-ms-track { 
            appearance: none;
            background-color: #808080;
            box-shadow: var(--inset-shadow);
        }
        &:hover {
            opacity: 1;
            transition: 666ms;
        }
    `;
    return (
            <StyledSlider 
                type="range" 
                className="slider" 
                ref={ref} 
                {...props} />
 
    );
});

export default Slider;