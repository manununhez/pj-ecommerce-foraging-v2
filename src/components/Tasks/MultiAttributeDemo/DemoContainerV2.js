import React, { useState, useEffect, useCallback } from "react";

import { Table } from "reactstrap";

import { Dustbin } from "./DustbinV2";
import { ItemTypes, ItemTypesID } from "../../../helpers/constants";
import update from "immutability-helper";

export default function Container(props) {
    console.log(props)
    const [dustbins, setDustbins] = useState([
        { accepts: ItemTypes.PRODUCT_1, id: ItemTypesID.PRODUCT_ID_1, lastDroppedItem: [], droppedBoxNames: props.currentResult.p1 },
        { accepts: ItemTypes.PRODUCT_2, id: ItemTypesID.PRODUCT_ID_2, lastDroppedItem: [], droppedBoxNames: props.currentResult.p2 },
        { accepts: ItemTypes.PRODUCT_3, id: ItemTypesID.PRODUCT_ID_3, lastDroppedItem: [], droppedBoxNames: props.currentResult.p3 }
    ]);

    function isNotDroppedYet(droppedBoxName, rating) {
        return !droppedBoxName.includes(rating);
    }
    const handleDrop = useCallback(
        (index, item) => {
            console.log(item)
            const droppedBoxName = dustbins[index].droppedBoxNames
            console.log(dustbins[index].lastDroppedItem)
            const rating = item.rating - 1;

            if (isNotDroppedYet(droppedBoxName, rating)) {
                setDustbins(
                    update(dustbins, {
                        [index]: {
                            lastDroppedItem: {
                                $push: [rating]
                            },
                            droppedBoxNames: {
                                $push: [rating]
                            }
                        }
                    })
                );
            }

        },
        [dustbins]
    );

    useEffect(() => {
        props.action({
            isTaskCompleted: false,
            results: { p1: dustbins[0].droppedBoxNames, p2: dustbins[1].droppedBoxNames, p3: dustbins[2].droppedBoxNames }
        })
    }, [dustbins]);

    return (
        <Table borderless responsive style={{ textAlign: 'center', height: '600px' }}>
            <thead>
                <tr>
                    <th><h5>Product 1</h5></th>
                    <th><h5>Product 2</h5></th>
                    <th><h5>Product 3</h5></th>
                </tr>

            </thead>
            <tbody>
                <tr>
                    {dustbins.map(({ accepts, id, lastDroppedItem }, index) => (
                        <td id={id} style={{ height: '100%' }}>
                            <Dustbin
                                accept={accepts}
                                lastDroppedItem={lastDroppedItem}
                                onDrop={(item) => handleDrop(index, item)}
                                key={index}
                            />
                        </td>
                    ))}
                </tr>
            </tbody>
        </Table>
    );
}