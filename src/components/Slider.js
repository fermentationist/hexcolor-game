import React from "react";
import styled from "styled-components";

const Slider = React.forwardRef((props, ref) => {
// console.log("TCL: props", props)
// console.log("TCL: ref", ref)
    const Slider = styled.input`
        appearance: none;
        background-color: darkgray;
        height: 3px;
        border-radius: 13px;
        outline: none;
        border: none;
        opacity: 0.333;
        margin: 2vh 2vw;
        
        &:hover {
            opacity: 1;
            transition: 666ms;
        }
    `
    return (
            <Slider type="range" className="slider" ref={ref} {...props} />
 
    );
});

export default Slider;