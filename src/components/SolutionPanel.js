import React from "react";

const SolutionPanel = props => {
    const solutionStyle = {
        minWidth: "auto",
        width: "auto",
        backgroundColor: "lightgray",
        borderRadius: "12px",
        border: "2px ridge darkgray",
        fontFamily: "Courier New",
        fontSize: "3em",
        padding: "0.5em",
        margin: "2vw",
        boxShadow: "var(--inset-shadow)",
    }
    return (
        <section className="solution" style={solutionStyle}>
            <h1>#{props.solution.toUpperCase()}</h1>
        </section>
    );
}

export default SolutionPanel;