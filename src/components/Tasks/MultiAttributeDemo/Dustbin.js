import React from 'react';
import { useDrop } from "react-dnd";
import {
    verticalRate1Image, verticalRate2Image, verticalRate3Image,
    verticalRate4Image, verticalRate5Image, verticalRate6Image
} from './verticalRateImage';

const style = {
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    backgroundColor: 'rgb(34, 34, 34)',
    height: '50vh',
    display: 'flex',
    flexDirection: 'column'
};
export function Dustbin({ accept, lastDroppedItem, onDrop }) {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept,
        drop: onDrop,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    });
    const isActive = isOver && canDrop;
    let backgroundColor = "#222";
    if (isActive) {
        backgroundColor = "darkgreen";
    } else if (canDrop) {
        backgroundColor = "darkkhaki";
    }
    return (
        <div ref={drop} role="Dustbin" style={{ ...style, backgroundColor }}>
            {/* {isActive
                ? "Release to drop"
                : `This dustbin accepts: ${accept.join(", ")}`} */}
            {lastDroppedItem.map(({rating}) => {
                return (<p><img src={ImageMapperRating(rating - 1)}></img></p>)
            })}
            {/* {<p>Last dropped: {JSON.stringify([...lastDroppedItem].reverse())}</p>} */}
        </div>
    );
}


function ImageMapperRating(rating) {
    switch (rating) {
        case 1: return verticalRate1Image;
        case 2: return verticalRate2Image;
        case 3: return verticalRate3Image;
        case 4: return verticalRate4Image;
        case 5: return verticalRate5Image;
        case 6: return verticalRate6Image;
    }
}
