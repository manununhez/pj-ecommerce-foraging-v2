import React from 'react';
import styled, { keyframes } from "styled-components";

import "./style.css"

import loading from '../../assets/stickman-walking.gif';

export default function StickmanLoading(props) {
    const currentStore = props.currentStore
    const marginOffSet = 50

    const slideToRightAnimation = keyframes`
        0%{
            -webkit-transform:translateX(0);
            transform:translateX(0)
        }
        100%{
            -webkit-transform:translateX(${currentStore.delay * marginOffSet}px);
            transform:translateX(${currentStore.delay * marginOffSet}px)
        }
    `;

    // Here we create a component that will rotate everything we pass in over two seconds
    const SlideRightFadeOutImg = styled.img`
        -webkit-animation: ${slideToRightAnimation} ${currentStore.delay}s linear forwards infinite;
        animation: ${slideToRightAnimation} ${currentStore.delay}s linear forwards infinite;
        vertical-align: bottom;
        margin-left: -75px;
    `;

    const lineStyle = ({
        marginTop: "-10px",
        width: `${currentStore.delay * marginOffSet - 70}px`,
        borderBottom: "10px solid black",
        display: "inline-block"
    });

    const squareRightStyle = ({
        marginLeft: (currentStore.delay * marginOffSet - 70)
    });

    return (
        <div style={{ textAlign: "center" }}>
            <div style={{ verticalAlign: "bottom" }}>
                <div className="square stack-top" ></div>
                <SlideRightFadeOutImg
                    className="stack-bottom"
                    style={{ display: "inline-block" }}
                    onAnimationEnd={() => console.log("Animation END")}
                    src={loading}
                    alt="loading..."
                />
                <div className="square stack-top" style={squareRightStyle} ></div>
            </div>

            <div style={lineStyle}></div>
        </div>);
}