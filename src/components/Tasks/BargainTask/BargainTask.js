import React, { useState } from 'react';

import StickmanLoading from './StickmanLoading';
import ProductsMenu from './ProductsMenu';
import "../style.css";
import { keyframes } from 'styled-components';

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
                { productNumber: 1, isBargain: true, oldPrice: 180, newPrice: 145.0, discount: 0.70, numOfStars: 1, img: "https://via.placeholder.com/150" },
                { productNumber: 2, isBargain: false, oldPrice: 230, newPrice: 215.0, discount: 0.55, numOfStars: 6, img: "https://via.placeholder.com/150" },
                { productNumber: 3, isBargain: false, oldPrice: 500, newPrice: 405.0, discount: 0.55, numOfStars: 5, img: "https://via.placeholder.com/150" },
                { productNumber: 4, isBargain: true, oldPrice: 100, newPrice: 95.0, discount: 0.55, numOfStars: 4, img: "https://via.placeholder.com/150" },
                { productNumber: 5, isBargain: true, oldPrice: 80, newPrice: 45.0, discount: 0.55, numOfStars: 1, img: "https://via.placeholder.com/150" },
                { productNumber: 6, isBargain: false, oldPrice: 70, newPrice: 35.0, discount: 0.55, numOfStars: 2, img: "https://via.placeholder.com/150" },
                { productNumber: 7, isBargain: false, oldPrice: 1700, newPrice: 1445.0, discount: 0.55, numOfStars: 4, img: "https://via.placeholder.com/150" },
                { productNumber: 8, isBargain: false, oldPrice: 200, newPrice: 145.0, discount: 0.55, numOfStars: 6, img: "https://via.placeholder.com/150" },
                { productNumber: 9, isBargain: true, oldPrice: 100, newPrice: 55.0, discount: 0.55, numOfStars: 4, img: "https://via.placeholder.com/150" },
                { productNumber: 10, isBargain: false, oldPrice: 1100, newPrice: 845.0, discount: 0.55, numOfStars: 5, img: "https://via.placeholder.com/150" },
                { productNumber: 11, isBargain: false, oldPrice: 300, newPrice: 145.0, discount: 0.55, numOfStars: 4, img: "https://via.placeholder.com/150" },
                { productNumber: 12, isBargain: true, oldPrice: 60, newPrice: 45.0, discount: 0.55, numOfStars: 3, img: "https://via.placeholder.com/150" },
                { productNumber: 13, isBargain: false, oldPrice: 800, newPrice: 645.0, discount: 0.55, numOfStars: 2, img: "https://via.placeholder.com/150" },
                { productNumber: 14, isBargain: false, oldPrice: 180, newPrice: 145.0, discount: 0.55, numOfStars: 1, img: "https://via.placeholder.com/150" },
                { productNumber: 15, isBargain: true, oldPrice: 230, newPrice: 215.0, discount: 0.55, numOfStars: 6, img: "https://via.placeholder.com/150" }]
        }
    ];

    // When the last product in the store is displayed, the application should randomly select 5 previously shown products(not bargains) whenever the belt is moved again.

    const [selectedProducts, setSelectedProducts] = useState([])
    const [currentStoreIndex, setCurrentStoreIndex] = useState(0)
    const [showProducts, setShowProducts] = useState(true)
    const [bargainCounter, setBargainCounter] = useState(0) //isBargain TRUE
    const [productsSeenCounter, setProductsSeenCounter] = useState(1) //Initially, the user already see 5 products = productsSeenCounter * 5 = 1 * 5 = 5
    const [storesVisitedCounter, setStoresVisitedCounter] = useState(0)
    const [lastProductDisplayed, setLastProductDisplayed] = useState([]) //[5, 25] --> index 0: lastProduct# 5, index1: lastProduct#25
    const currentStore = list[currentStoreIndex]
    const onFirstItemVisible = () => {
        console.log("first item is visible");
    };

    const onLastItemVisible = () => {
        console.log("last item is visible");
    };

    const onShowNextProducts = ({ translate }) => {
        console.log(`onShowNextProducts`);
        setProductsSeenCounter(productsSeenCounter + 1)
    };

    const onProductSelected = key => {
        console.log(`onProductSelected: ${key}`);

        if (!selectedProducts.includes(parseInt(key))) {
            let selected = [...selectedProducts]
            selected.push(parseInt(key))
            setSelectedProducts(selected)

            if (currentStore.products[parseInt(key)].isBargain) {
                setBargainCounter(bargainCounter + 1)
            }

            console.log(bargainCounter)
        }
    };

    const onShowNextStore = () => {
        console.log("onGoStoreBtnClick")

        const lastProductNumber = currentStore.products[(productsSeenCounter * 5) - 1].productNumber
        lastProductDisplayed.push(lastProductNumber)

        setLastProductDisplayed(lastProductDisplayed)
        setShowProducts(false)
        setStoresVisitedCounter(storesVisitedCounter + 1)
        console.log(lastProductDisplayed)
    }

    const onLoadingFinished = () => {
        setShowProducts(true)
        setCurrentStoreIndex(currentStoreIndex + 1)
        setSelectedProducts([])
    }

    return (<>
        {`Store#:${currentStore.storeNumber}`}
        {showProducts ?
            <ProductsMenu
                products={currentStore.products}
                selected={selectedProducts}
                onFirstItemVisible={onFirstItemVisible}
                onLastItemVisible={onLastItemVisible}
                onSelect={onProductSelected}
                onUpdate={onShowNextProducts}
                onGoStoreBtnClick={onShowNextStore}
            /> :
            <StickmanLoading currentStore={currentStore} onLoadingFinished={onLoadingFinished} />
        }
    </>);
}



