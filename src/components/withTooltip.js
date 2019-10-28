import React, {useRef} from "react";
import styled from "styled-components";

const withTooltip = TargetComponent => {
    return React.forwardRef((props, forwardedRef) => {
        const tooltip = props.tooltip || null;
        // console.log("TCL: props", props)
        const backgroundColor = props.backgroundColor || "darkgray";
        const fontColor = props.fontColor || "#F8F8F8";
        const fontSize = props.fontSize || "1.5em";
        const font = props.font || "inherit";
        const tipRef = useRef(null);
        const Tooltip = styled.div`
            position: relative;
            pointer-events: none; /* deactivate pointer-effects so containing div doesn't activate tooltip */
            width: auto;
            height: min-content;
            padding-top: 0.35em;
            display: flex;
            flex-direction: column;
            align-items: center;
            &:before, &:after {
                visibility: hidden;
                filter: blur(0.25em);
                margin: 0;
                padding: 0;
            }
            &:before {
                position: relative;
                top: -0.25em;
                left: 0;
                margin: 0.5em;
                padding: 0.5em; 
                width: auto;
                height: 2em;
                border-radius: 0.75em;
                background-color: ${backgroundColor};
                color: ${fontColor};
                content: attr(data-tooltip);
                text-align: center;
                font-family: ${font};
                font-size: ${fontSize};
                line-height: 1em;
                z-index: 99;
                box-shadow: 2px 2px 10px rgba(40,40,40, 0.25);
            }
            /* triangle border hack to make "speech bubble"  */
            /* &:after {
                position: absolute;
                top: 36%;
                left: 47%;
                width: 0;
                border-top: 7px solid ${backgroundColor};
                border-right: 7px solid transparent;
                border-left: 7px solid transparent;
                content: "";
                font-size: 0;
                line-height: 0;
                margin-bottom: 0.5em;
                z-index: 99;
            } */
            @media (hover:hover){
                &, &:hover:before, &:hover:after {
                    visibility: visible;
                    filter: blur(0);
                    transition: 333ms;
                }
            }
        `;
        const pointerEventsStyle = {
            pointerEvents: "auto"
        };
        return (
            <React.Fragment>
                <Tooltip className="tooltip" data-tooltip={tooltip} ref={tipRef}>
                    <TargetComponent
                        {...props} 
                        style={pointerEventsStyle}
                        ref={forwardedRef}>
                        {props.children}
                    </TargetComponent>
                </Tooltip>
            </React.Fragment>
        );
    });
}

export default withTooltip;