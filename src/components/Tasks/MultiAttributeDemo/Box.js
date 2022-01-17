import React from 'react';

import { DragPreviewImage, useDrag } from "react-dnd";
import {
    verticalRate1Image, verticalRate2Image, verticalRate3Image,
    verticalRate4Image, verticalRate5Image, verticalRate6Image
} from './verticalRateImage';


export function Box({ name, type, index, showIndicator }) {
    const rating = index + 1

    const [{ opacity, isDragging }, drag, preview] = useDrag(
        () => ({
            type,
            item: { rating, name },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
                opacity: isDragging ? 0.4 : 1
            })
        }),
        [name, type]
    );
    return (
        <>
            <DragPreviewImage connect={preview} src={ImageMapperRating(index)} />
            <div ref={drag} role="Box" style={{ opacity, cursor: isDragging ? "none" : "default", border: showIndicator ? '1px solid green' : '' }}>
                {<strong>{name}</strong>}
            </div>
        </>
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
