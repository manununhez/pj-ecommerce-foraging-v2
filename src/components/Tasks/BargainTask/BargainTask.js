import React, { useState } from 'react';

import StickmanLoading from './StickmanLoading';
import ProductsMenu from './ProductsMenu';
import "../style.css";

export default function BargainTask(props) {

    const list = [
        {
            storeNumber: 1, bargainsNumber: 10, delay: 15, products: [
                { productNumber: 1, isBargain: false, oldPrice: 100, newPrice: 95.0, discount: 0.55, numOfStars: 4, img: "https://via.placeholder.com/150" },
                { productNumber: 2, isBargain: false, oldPrice: 80, newPrice: 45.0, discount: 0.50, numOfStars: 1, img: "https://via.placeholder.com/150" },
                { productNumber: 3, isBargain: false, oldPrice: 70, newPrice: 35.0, discount: 0.60, numOfStars: 2, img: "https://via.placeholder.com/150" },
                { productNumber: 4, isBargain: false, oldPrice: 1700, newPrice: 1445.0, discount: 0.70, numOfStars: 4, img: "https://via.placeholder.com/150" },
                { productNumber: 5, isBargain: false, oldPrice: 200, newPrice: 145.0, discount: 0.40, numOfStars: 6, img: "https://via.placeholder.com/150" },
                { productNumber: 6, isBargain: true, oldPrice: 100, newPrice: 55.0, discount: 0.25, numOfStars: 4, img: "https://via.placeholder.com/150" },
                { productNumber: 7, isBargain: false, oldPrice: 1100, newPrice: 845.0, discount: 0.55, numOfStars: 5, img: "https://via.placeholder.com/150" },
                { productNumber: 8, isBargain: false, oldPrice: 300, newPrice: 145.0, discount: 0.10, numOfStars: 4, img: "https://via.placeholder.com/150" },
                { productNumber: 9, isBargain: true, oldPrice: 60, newPrice: 45.0, discount: 0.85, numOfStars: 3, img: "https://via.placeholder.com/150" },
                { productNumber: 10, isBargain: false, oldPrice: 800, newPrice: 645.0, discount: 0.90, numOfStars: 2, img: "https://via.placeholder.com/150" }]
        },
        {
            storeNumber: 2, bargainsNumber: 10, delay: 15, products: [
                { productNumber: 1, isBargain: false, oldPrice: 180, newPrice: 145.0, discount: 0.70, numOfStars: 1, img: "https://via.placeholder.com/150" },
                { productNumber: 2, isBargain: false, oldPrice: 230, newPrice: 215.0, discount: 0.55, numOfStars: 6, img: "https://via.placeholder.com/150" },
                { productNumber: 3, isBargain: false, oldPrice: 500, newPrice: 405.0, discount: 0.55, numOfStars: 5, img: "https://via.placeholder.com/150" },
                { productNumber: 4, isBargain: false, oldPrice: 100, newPrice: 95.0, discount: 0.55, numOfStars: 4, img: "https://via.placeholder.com/150" },
                { productNumber: 5, isBargain: false, oldPrice: 80, newPrice: 45.0, discount: 0.55, numOfStars: 1, img: "https://via.placeholder.com/150" },
                { productNumber: 6, isBargain: false, oldPrice: 70, newPrice: 35.0, discount: 0.55, numOfStars: 2, img: "https://via.placeholder.com/150" },
                { productNumber: 7, isBargain: false, oldPrice: 1700, newPrice: 1445.0, discount: 0.55, numOfStars: 4, img: "https://via.placeholder.com/150" },
                { productNumber: 8, isBargain: false, oldPrice: 200, newPrice: 145.0, discount: 0.55, numOfStars: 6, img: "https://via.placeholder.com/150" },
                { productNumber: 9, isBargain: true, oldPrice: 100, newPrice: 55.0, discount: 0.55, numOfStars: 4, img: "https://via.placeholder.com/150" },
                { productNumber: 10, isBargain: false, oldPrice: 1100, newPrice: 845.0, discount: 0.55, numOfStars: 5, img: "https://via.placeholder.com/150" },
                { productNumber: 11, isBargain: false, oldPrice: 300, newPrice: 145.0, discount: 0.55, numOfStars: 4, img: "https://via.placeholder.com/150" },
                { productNumber: 12, isBargain: true, oldPrice: 60, newPrice: 45.0, discount: 0.55, numOfStars: 3, img: "https://via.placeholder.com/150" },
                { productNumber: 13, isBargain: false, oldPrice: 800, newPrice: 645.0, discount: 0.55, numOfStars: 2, img: "https://via.placeholder.com/150" },
                { productNumber: 14, isBargain: false, oldPrice: 180, newPrice: 145.0, discount: 0.55, numOfStars: 1, img: "https://via.placeholder.com/150" },
                { productNumber: 15, isBargain: false, oldPrice: 230, newPrice: 215.0, discount: 0.55, numOfStars: 6, img: "https://via.placeholder.com/150" }]
        }
    ];

    // ##Bargain, product and store counters
    // For every user, a variable called a “bargain counter” should be maintained by the application.The bargain counter starts with the value of 0 and increases by 1 whenever a user chooses a bargain correctly.The application should also compute the number of products seen by a user and the number of stores visited by the user(see below).


    // When the last product in the store is displayed, the application should randomly select 5 previously shown products(not bargains) whenever the belt is moved again.

    // The number of the last product displayed on the belt should be maintained as a variable and stored when the user leaves the store.


    const [selectedProducts, setSelectedProducts] = useState([])
    const [currentStoreIndex, setCurrentStoreIndex] = useState(0)
    const [showProducts, setShowProducts] = useState(true)

    const onFirstItemVisible = () => {
        console.log("first item is visible");
    };

    const onLastItemVisible = () => {
        console.log("last item is visible");
    };

    const onUpdate = ({ translate }) => {
        console.log(`onUpdate: translate: ${translate}`);
    };

    const onSelect = key => {
        console.log(`onSelect: ${key}`);

        if (!selectedProducts.includes(parseInt(key))) {
            let selected = [...selectedProducts]
            selected.push(parseInt(key))
            setSelectedProducts(selected)
        }
    };

    const onGoStoreBtnClick = () => {
        console.log("onGoStoreBtnClick")
        setShowProducts(false)
    }

    const onLoadingFinished = () => {
        setShowProducts(true)
        setCurrentStoreIndex(currentStoreIndex + 1)
        setSelectedProducts([])
    }



    return (<>
        {`Store Number:${list[currentStoreIndex].storeNumber}`}
        {showProducts ?
            <ProductsMenu
                products={list[currentStoreIndex].products}
                selected={selectedProducts}
                onFirstItemVisible={onFirstItemVisible}
                onLastItemVisible={onLastItemVisible}
                onSelect={onSelect}
                onUpdate={onUpdate}
                onGoStoreBtnClick={onGoStoreBtnClick}
            /> :
            <StickmanLoading currentStore={list[currentStoreIndex]} onLoadingFinished={onLoadingFinished} />
        }
    </>);
}



