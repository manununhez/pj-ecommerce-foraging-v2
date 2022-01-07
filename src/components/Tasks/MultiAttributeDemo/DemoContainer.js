import React, { useState, useCallback } from "react";
import { Dustbin } from "./Dustbin";
import { Box } from "./Box";
import { ItemTypes } from "./ItemTypes";
import update from "immutability-helper";

export default function Container() {
    const [dustbins, setDustbins] = useState([
        { accepts: [ItemTypes.PRODUCT_1], lastDroppedItem: [] },
        { accepts: [ItemTypes.PRODUCT_2], lastDroppedItem: [] },
        { accepts: [ItemTypes.PRODUCT_3], lastDroppedItem: [] }
    ]);
    const [boxes] = useState([
        { name: "Attribute P1.1", type: ItemTypes.PRODUCT_1 },
        { name: "Attribute P2.1", type: ItemTypes.PRODUCT_2 },
        { name: "Attribute P3.1", type: ItemTypes.PRODUCT_3 },
        { name: "Attribute P1.2", type: ItemTypes.PRODUCT_1 },
        { name: "Attribute P2.2", type: ItemTypes.PRODUCT_2 },
        { name: "Attribute P3.2", type: ItemTypes.PRODUCT_3 }
    ]);
    const [droppedBoxNames, setDroppedBoxNames] = useState([]);
    function isDropped(boxName) {
        return droppedBoxNames.indexOf(boxName) > -1;
    }
    const handleDrop = useCallback(
        (index, item) => {
            const { name } = item;
            setDroppedBoxNames(
                update(droppedBoxNames, name ? { $push: [name] } : { $push: [] })
            );
            setDustbins(
                update(dustbins, {
                    [index]: {
                        lastDroppedItem: {
                            $push: [item]
                        }
                    }
                })
            );
        },
        [droppedBoxNames, dustbins]
    );
    return (
        <div>
            <div style={{ overflow: "hidden", clear: "both" }}>
                {dustbins.map(({ accepts, lastDroppedItem }, index) => (
                    <Dustbin
                        accept={accepts}
                        lastDroppedItem={lastDroppedItem}
                        onDrop={(item) => handleDrop(index, item)}
                        key={index}
                    />
                ))}
            </div>

            <div style={{ overflow: "hidden", clear: "both" }}>
                {boxes.map(({ name, type }, index) => (
                    <Box name={name} type={type} key={index} />
                ))}
            </div>
        </div>
    );
}
