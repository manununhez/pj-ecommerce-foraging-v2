import React from 'react';

import { DragPreviewImage, useDrag } from "react-dnd";
import { verticalRate4Image } from './verticalRate4Image';

const style = {
    border: "1px dashed gray",
    backgroundColor: "white",
    padding: "0.5rem 1rem",
    marginRight: "1.5rem",
    marginBottom: "1.5rem",
    cursor: "move",
    float: "left"
};

export function Box({ name, type, isDropped }) {
    const [{ opacity, isDragging }, drag, preview] = useDrag(
        () => ({
            type,
            item: { name },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
                opacity: isDragging ? 0.4 : 1
            })
        }),
        [name, type]
    );
    return (
        <>
            <DragPreviewImage connect={preview} src={verticalRate4Image} />
            <div ref={drag} role="Box" style={{ ...style, opacity, cursor: isDragging ? "none" : "default" }}>
                {isDropped ? <s>{name}</s> : name}
            </div>
        </>
    );
}
