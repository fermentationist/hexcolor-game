import React from "react";

const Header = props => {
    const headerStyle = {
        width: "100vw",
        height: "25vh",
        display: "flex",
        flexDirection: "column",
        alignText: "center",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "calc((3vw + 3vh)/2)",

    }
    return (
        <header className="header" style={headerStyle}>
            <h1>HEX COLOR GAME</h1>
            <h2>select the correct swatch</h2>
        </header>
    );
}

export default Header;