import React, { useCallback } from "react";

import { Table } from "reactstrap";

import { Dustbin } from "./DustbinV2";
import { ItemTypes, ItemTypesID } from "../../../helpers/constants";

export default function Container(props) {
    const dustbins = [
        { accepts: ItemTypes.PRODUCT_1, id: ItemTypesID.PRODUCT_ID_1, droppedBoxNames: props.currentResult.p1 },
        { accepts: ItemTypes.PRODUCT_2, id: ItemTypesID.PRODUCT_ID_2, droppedBoxNames: props.currentResult.p2 },
        { accepts: ItemTypes.PRODUCT_3, id: ItemTypesID.PRODUCT_ID_3, droppedBoxNames: props.currentResult.p3 }
    ];

    function isNotDroppedYet(droppedBoxName, rating) {
        return !droppedBoxName.includes(rating);
    }
    const handleDrop = useCallback(
        (index, item) => {
            const droppedBoxName = dustbins[index].droppedBoxNames
            const rating = item.rating - 1;

            if (isNotDroppedYet(droppedBoxName, rating)) {
                dustbins[index].droppedBoxNames.push(rating)

                props.action({
                    results: { p1: dustbins[0].droppedBoxNames, p2: dustbins[1].droppedBoxNames, p3: dustbins[2].droppedBoxNames }
                })
            }

        },
        [dustbins]
    );

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
                    {dustbins.map(({ accepts, id, droppedBoxNames }, index) => (
                        <td id={id} style={{ height: '100%' }}>
                            <Dustbin
                                accept={accepts}
                                lastDroppedItem={droppedBoxNames}
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