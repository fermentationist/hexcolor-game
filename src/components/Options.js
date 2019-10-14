import React, {useState, useEffect, useRef} from "react";
import Slider from "./Slider.js";
import ReloadButton from "./ReloadButton.js";

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
        fontSize: "12px"
    };
    const sliderOptionStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "0",
        padding: "0",
    };
    const settingsStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
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
            <div className="next-button">  
                <ReloadButton onClick={props.newRound}/>
            </div>
            <div className="options" style={optionsStyle}>
                <div className="min-variance-option" style={sliderOptionStyle}>
                    <Slider min="5" max="220" step="1" defaultValue={state.minVarInitial} onMouseUp={minChangeHandler} ref={minRef}/>
                    <h3>minimum variance</h3>
                </div>
                <div className="max-variance-option" style={sliderOptionStyle}>
                    <Slider min="5" max="220" step="1" defaultValue={state.maxVariance} onMouseUp={maxChangeHandler} ref={maxRef}/>
                    <h3>maximum variance</h3>
                </div>
            </div>
        </section>
    );
}

export default Options;