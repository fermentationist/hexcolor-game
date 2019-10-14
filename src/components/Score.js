import React from "react";

const Score = props => {
    const scoreStyle = {
        display: "flex",
        backgroundColor: "lightgray",
        alignItems: "center",
        textAlign: "center",
        height: "auto",
        width: "auto",
        margin: "1vw",
        padding: "0.75em",
        borderRadius: "12px",
        border: "2px ridge darkgray",
        fontFamily: "Monaco",
        fontSize: "1.75em",
        boxShadow: "var(--inset-shadow)",
    }
    return (
        <section className="score" style={scoreStyle}>
            <h1>{props.score}</h1>
        </section>
    );
}

export default Score;
