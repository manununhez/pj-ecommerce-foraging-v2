import React, { useState } from 'react';

import StickmanLoading from './StickmanLoading';
import ProductsMenu from './ProductsMenu';
import "../style.css";
import { randomNumber } from '../../../helpers/utils';

const DEBUG = (process.env.REACT_APP_DEBUG_LOG === "true") ? true : false;

export default function BargainTask(props) {
    const PRODUCTS_PER_ROW = 5

    const list = props.data.storesLong;

    const [selectedProducts, setSelectedProducts] = useState([])
    const [currentStoreIndex, setCurrentStoreIndex] = useState(0)
    const [showProducts, setShowProducts] = useState(true)
    const [bargainCounter, setBargainCounter] = useState(0) //isBargain TRUE
    const [productsSeenCounter, setProductsSeenCounter] = useState(1) //Initially, the user already see 5 products = productsSeenCounter * 5 = 1 * 5 = 5
    const [storesVisitedCounter, setStoresVisitedCounter] = useState(0)
    const [lastProductDisplayed, setLastProductDisplayed] = useState([]) //[5, 25] --> index 0: lastProduct# 5, index1: lastProduct#25
    const [storeLists, setStoreLists] = useState(list)
    const [currentProductListWithoutBargains, setCurrentProductListWithoutBargains] = useState(storeLists[currentStoreIndex].products.filter(item => item.isBargain === false))

    const onFirstItemVisible = () => {
        console.log("first item is visible");
    };

    const onLastItemVisible = () => {
        console.log("last item is visible");
    };

    const onShowNextProducts = ({ translate }) => {
        console.log(`onShowNextProducts`);

        const newProductsSeenCounter = productsSeenCounter + 1
        const isNeededGenerateNewProducts = ((newProductsSeenCounter) * PRODUCTS_PER_ROW) === storeLists[currentStoreIndex].products.length

        setProductsSeenCounter(newProductsSeenCounter)

        // Update menu belt products with new random generated products when we reached the end of the product list
        if (isNeededGenerateNewProducts) {
            console.log("New products!!")

            storeLists[currentStoreIndex].products = storeLists[currentStoreIndex].products.concat(generateRandomProductList())

            setStoreLists(storeLists)

            console.log(storeLists)
        }
    };

    const generateRandomProductList = () => {
        let count = 0
        let newList = []
        let randomNumbersList = []

        while (count < PRODUCTS_PER_ROW) {
            const randomProduct = currentProductListWithoutBargains[randomNumber(0, currentProductListWithoutBargains.length - 1)]

            if (!randomNumbersList.includes(randomProduct.productNumber)) {
                randomNumbersList.push(randomProduct.productNumber)
                newList.push(randomProduct)
                count++;
            }
        }

        return newList;

    }

    const onProductSelected = key => {
        console.log(`onProductSelected: ${key}`);

        if (!selectedProducts.includes(parseInt(key))) {
            const newBargainCounter = bargainCounter + 1

            let selected = [...selectedProducts]

            selected.push(parseInt(key))

            setSelectedProducts(selected)

            if (storeLists[currentStoreIndex].products[parseInt(key)].isBargain) {
                setBargainCounter(newBargainCounter)
            }

            console.log(bargainCounter)
        }
    };

    const onShowNextStore = () => {
        console.log("onGoStoreBtnClick")

        const newStoresVisitedCounter = storesVisitedCounter + 1
        const lastProductNumber = storeLists[currentStoreIndex].products[(productsSeenCounter * PRODUCTS_PER_ROW) - 1].productNumber

        lastProductDisplayed.push(lastProductNumber)

        setLastProductDisplayed(lastProductDisplayed)
        setShowProducts(false)
        setStoresVisitedCounter(newStoresVisitedCounter)

        console.log(lastProductDisplayed)
    }

    const onLoadingFinished = () => {
        const newCurrentStoreIndex = currentStoreIndex + 1
        console.log(storeLists[currentStoreIndex])
        console.log(newCurrentStoreIndex)
        const filteredNotBargainList = storeLists[newCurrentStoreIndex].products.filter(item => item.isBargain === false)
        console.log(filteredNotBargainList)
        setShowProducts(true)
        setCurrentStoreIndex(newCurrentStoreIndex)
        setSelectedProducts([])
        setCurrentProductListWithoutBargains(filteredNotBargainList)
    }

    return (<>
        { DEBUG ? `Store#:${storeLists[currentStoreIndex].storeNumber}` : ""}
        {showProducts ?
            <ProductsMenu
                products={storeLists[currentStoreIndex].products}
                selected={selectedProducts}
                onFirstItemVisible={onFirstItemVisible}
                onLastItemVisible={onLastItemVisible}
                onSelect={onProductSelected}
                onUpdate={onShowNextProducts}
                onGoStoreBtnClick={onShowNextStore}
            /> :
            <StickmanLoading currentStore={storeLists[currentStoreIndex]} onLoadingFinished={onLoadingFinished} />
        }
    </>);
}



