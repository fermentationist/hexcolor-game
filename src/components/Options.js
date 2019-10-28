import React, {useState, useEffect, useRef} from "react";
import Slider from "./Slider.js";
import Button from "./ReloadButton.js";
import withTooltip from "./withTooltip.js";
import styled from "styled-components";

const ReloadButton = withTooltip(Button);
const SliderWithTooltip = withTooltip(Slider);
const Options = props => {
    const [state, setState] = useState({
        minVariance: 20,
        maxVariance: 100,
        numChoices: 4,
    })
    let minRef = useRef(null);
    let maxRef = useRef(null);
    useEffect(() => {
        minRef.current.value = state.minVariance;
        console.log("minRef")
    });
    useEffect(() => {
        maxRef.current.value = state.maxVariance;
        console.log("maxRef")
    });
    useEffect(() => {
        props.updateSettings(state)
    }, [state]);
    const optionsStyle = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        alignText: "center",
        fontSize: "10px"
    };
    const StyledOptionSlider = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0;
        h3{
            padding: 1.5em;
            margin-bottom: 1.5em;
        }
    `;
    const settingsStyle = {
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
    }
    const minChangeHandler = event => {
        event.stopPropagation();
        const slider = event.currentTarget;
        setState({
            ...state,
            minVariance: parseInt(slider.value),
            maxVariance: Math.max(slider.value, state.maxVariance) + 5,
                });
    }
    const maxChangeHandler = event => {
        event.stopPropagation();
        const slider = event.currentTarget;
        setState({
            ...state,
            maxVariance: Math.max(parseInt(slider.value), state.minVariance + 5)
                });
    }
    return (
        <section className="settings" style={settingsStyle}>
            <div className="next-button" style={{height: "auto"}}>  
                <ReloadButton tooltip="next round" onClick={props.newRound}/>
            </div>
            <div className="options" style={optionsStyle}>
                <StyledOptionSlider className="min-variance-option">
                    <SliderWithTooltip 
                        min="5" 
                        max="220" 
                        step="1" 
                        tooltip={state.minVariance}
                        defaultValue={state.minVarInitial} 
                        onMouseUp={minChangeHandler} 
                        ref={minRef}/>
                    <h3>minimum variance</h3>
                </StyledOptionSlider>
                <StyledOptionSlider className="max-variance-option">
                    <SliderWithTooltip 
                        min="5" 
                        max="220" 
                        step="1" 
                        tooltip={state.maxVariance}
                        defaultValue={state.maxVariance} 
                        onMouseUp={maxChangeHandler} 
                        ref={maxRef}/>
                    <h3>maximum variance</h3>
                </StyledOptionSlider>
            </div>
        </section>
    );
}

export default Options;