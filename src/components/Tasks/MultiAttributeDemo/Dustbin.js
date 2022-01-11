import React from 'react';
import { useDrop } from "react-dnd";

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

            {<p>Last dropped: {JSON.stringify([...lastDroppedItem].reverse())}</p>}
        </div>
    );
}
