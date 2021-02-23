import React, { useState } from 'react';

import StickmanLoading from './StickmanLoading';
import ProductsMenu from './ProductsMenu';
import "../style.css";
import {
    BARGAIN_CORRECT_SELECTED_ALERT_MESSAGE,
    BARGAIN_ERROR_SELECTED_ALERT_MESSAGE,
    BARGAIN_MISSED_SELECTED_ALERT_MESSAGE
} from '../../../helpers/constants';
import { randomNumber } from '../../../helpers/utils';

const DEBUG = (process.env.REACT_APP_DEBUG_LOG === "true") ? true : false;

export default function BargainTask(props) {

    const showFeedback = true
    const PRODUCTS_PER_ROW = 5

    // const list = props.data.storesLong
    const list = [{
        storeNumber: 1, bargainsNumber: 4, delay: 15, products: [
            { productNumber: 1, isBargain: false, oldPrice: 258, newPrice: 167.7, discount: 0.35, numOfStars: 5, img: "https://api.swps-pjatk-experiment.pl/v3/img/2picture.jpg" },
            { productNumber: 2, isBargain: true, oldPrice: 282, newPrice: 126.9, discount: 0.55, numOfStars: 3, img: "https://api.swps-pjatk-experiment.pl/v3/img/17picture.jpg" },
            { productNumber: 3, isBargain: false, oldPrice: 165, newPrice: 84.15, discount: 0.49, numOfStars: 1, img: "https://api.swps-pjatk-experiment.pl/v3/img/11picture.jpg" },
            { productNumber: 4, isBargain: false, oldPrice: 131, newPrice: 73.36, discount: 0.44, numOfStars: 2, img: "https://api.swps-pjatk-experiment.pl/v3/img/27picture.jpg" },
            { productNumber: 5, isBargain: false, oldPrice: 226, newPrice: 167.24, discount: 0.26, numOfStars: 4, img: "https://api.swps-pjatk-experiment.pl/v3/img/20picture.jpg" },
            { productNumber: 6, isBargain: true, oldPrice: 123, newPrice: 83.64, discount: 0.32, numOfStars: 5, img: "https://api.swps-pjatk-experiment.pl/v3/img/7picture.jpg" },
            { productNumber: 7, isBargain: false, oldPrice: 220, newPrice: 169.4, discount: 0.23, numOfStars: 3, img: "https://api.swps-pjatk-experiment.pl/v3/img/14picture.jpg" },
            { productNumber: 8, isBargain: false, oldPrice: 273, newPrice: 171.99, discount: 0.37, numOfStars: 4, img: "https://api.swps-pjatk-experiment.pl/v3/img/46jewelry_picture.jpg" },
            { productNumber: 9, isBargain: false, oldPrice: 209, newPrice: 137.94, discount: 0.34, numOfStars: 1, img: "https://api.swps-pjatk-experiment.pl/v3/img/16electron_picture.jpg" },
            { productNumber: 10, isBargain: false, oldPrice: 206, newPrice: 131.84, discount: 0.36, numOfStars: 1, img: "https://api.swps-pjatk-experiment.pl/v3/img/23electron_picture.jpg" }
        ]
    }, {
        storeNumber: 2, bargainsNumber: 15, delay: 15, products: [
            { productNumber: 1, isBargain: false, oldPrice: 269, newPrice: 201.75, discount: 0.25, numOfStars: 5, img: "https://api.swps-pjatk-experiment.pl/v3/img/62jewelry_picture.jpg" },
            { productNumber: 2, isBargain: false, oldPrice: 109, newPrice: 85.02, discount: 0.22, numOfStars: 4, img: "https://api.swps-pjatk-experiment.pl/v3/img/68jewelry_picture.jpg" },
            { productNumber: 3, isBargain: false, oldPrice: 127, newPrice: 85.09, discount: 0.33, numOfStars: 4, img: "https://api.swps-pjatk-experiment.pl/v3/img/8picture.jpg" },
            { productNumber: 4, isBargain: true, oldPrice: 282, newPrice: 126.9, discount: 0.55, numOfStars: 6, img: "https://api.swps-pjatk-experiment.pl/v3/img/40jewelry_picture.jpg" },
            { productNumber: 5, isBargain: false, oldPrice: 134, newPrice: 101.84, discount: 0.24, numOfStars: 6, img: "https://api.swps-pjatk-experiment.pl/v3/img/62jewelry_picture.jpg" },
            { productNumber: 6, isBargain: true, oldPrice: 176, newPrice: 126.72, discount: 0.60, numOfStars: 5, img: "https://api.swps-pjatk-experiment.pl/v3/img/21electron_picture.jpg" },
            { productNumber: 7, isBargain: true, oldPrice: 166, newPrice: 59.76, discount: 0.64, numOfStars: 6, img: "https://api.swps-pjatk-experiment.pl/v3/img/17electron_picture.jpg" },
            { productNumber: 8, isBargain: false, oldPrice: 169, newPrice: 87.88, discount: 0.48, numOfStars: 3, img: "https://api.swps-pjatk-experiment.pl/v3/img/39jewelry_picture.jpg" },
            { productNumber: 9, isBargain: false, oldPrice: 127, newPrice: 71.12, discount: 0.44, numOfStars: 4, img: "https://api.swps-pjatk-experiment.pl/v3/img/67jewelry_picture.jpg" },
            { productNumber: 10, isBargain: false, oldPrice: 226, newPrice: 122.04, discount: 0.46, numOfStars: 5, img: "https://api.swps-pjatk-experiment.pl/v3/img/70jewelry_picture.jpg" }
        ]
    }];

    const [selectedProducts, setSelectedProducts] = useState([])
    const [currentStoreIndex, setCurrentStoreIndex] = useState(0)
    const [showProducts, setShowProducts] = useState(true)
    const [bargainCounter, setBargainCounter] = useState(0) //isBargain TRUE
    const [productsSeenCounter, setProductsSeenCounter] = useState(1) //Initially, the user already see 5 products = productsSeenCounter * 5 = 1 * 5 = 5
    const [storesVisitedCounter, setStoresVisitedCounter] = useState(0)
    const [lastProductDisplayed, setLastProductDisplayed] = useState([]) //[5, 25] --> index 0: lastProduct# 5, index1: lastProduct#25
    const [storeLists, setStoreLists] = useState(list)
    const [currentProductListWithoutBargains, setCurrentProductListWithoutBargains] = useState([])
    const [currentProducts, setCurrentProducts] = useState(storeLists[currentStoreIndex].products.slice(0, PRODUCTS_PER_ROW * 2))

    // USAMOS PRODUCTS_PER_ROW * 2 o simplement PRODUCTS_PER_ROW ??? Verificar donde USAMOS
    // En generateRandomProductList() generamos ahora PRODUCTS_PER_ROW.Deberia ser PRODUCTS_PER_ROW * 2?
    // VERIFICAR

    const onFirstItemVisible = () => {
        if (DEBUG) console.log("first item is visible");
    };

    const onLastItemVisible = () => {
        if (DEBUG) console.log("last item is visible");

        const from = productsSeenCounter * PRODUCTS_PER_ROW
        const to = from + (PRODUCTS_PER_ROW * 2)
        const isNeededGenerateNewProducts = currentProducts.length === storeLists[currentStoreIndex].products.length
        let tmp = []

        if (DEBUG) console.log(currentProducts)
        if (DEBUG) console.log(storeLists[currentStoreIndex].products)

        if (!isNeededGenerateNewProducts) {
            if (DEBUG) console.log("Not needed new products")
            tmp = storeLists[currentStoreIndex].products.slice(from, to)
        } else {
            if (DEBUG) console.log("Needed new products")
            // Update menu belt products with new random generated products when we reached the end of the product list
            let filteredNotBargainList = currentProductListWithoutBargains

            if (currentProductListWithoutBargains.length === 0) {
                filteredNotBargainList = storeLists[currentStoreIndex].products.filter(item => item.isBargain === false)

                setCurrentProductListWithoutBargains(filteredNotBargainList)
            }

            tmp = generateRandomProductList(filteredNotBargainList)

            //we update the original list with the new generated products
            storeLists[currentStoreIndex].products = currentProducts.concat(tmp)
            setStoreLists(storeLists)
        }

        //update current product list
        setCurrentProducts(currentProducts.concat(tmp))
    };

    const onShowNextProducts = ({ translate }) => {
        //TODO verificar la funcion de productsSeenCounter
        if (DEBUG) console.log(`onShowNextProducts`);

        if (showFeedback) { checkMissedBargains() }

        const newProductsSeenCounter = productsSeenCounter + 1

        setProductsSeenCounter(newProductsSeenCounter)
    };

    const generateRandomProductList = (filteredNotBargainList) => {
        let count = 0
        let newList = []
        let randomNumbersList = []

        //TODO what happened in case of an infinite loop here => there are not enough not bargain product lists
        while (count < PRODUCTS_PER_ROW) {
            const randomProduct = filteredNotBargainList[randomNumber(0, filteredNotBargainList.length - 1)]

            if (!randomNumbersList.includes(randomProduct.productNumber)) {
                randomNumbersList.push(randomProduct.productNumber)
                newList.push(randomProduct)
                count++;
            }
        }

        return newList;
    }

    const onProductSelected = key => {
        if (DEBUG) console.log(`onProductSelected: ${key}`);
        const productIndex = parseInt(key)

        if (!selectedProducts.includes(productIndex)) {
            let selected = [...selectedProducts]

            selected.push(productIndex)

            setSelectedProducts(selected)

            //Check BARGAIN selection
            if (storeLists[currentStoreIndex].products[productIndex].isBargain) {
                const newBargainCounter = bargainCounter + 1

                if (showFeedback) {
                    alert(BARGAIN_CORRECT_SELECTED_ALERT_MESSAGE(newBargainCounter))
                }

                setBargainCounter(newBargainCounter)
                if (DEBUG) console.log(newBargainCounter)
            } else {
                if (showFeedback) {
                    alert(BARGAIN_ERROR_SELECTED_ALERT_MESSAGE)
                }
            }
        }
    };

    const onShowNextStore = () => {
        if (DEBUG) console.log("onGoStoreBtnClick")

        if (showFeedback) { checkMissedBargains() }

        if (storesVisitedCounter + 1 >= storeLists.length) {
            alert("No more stores available. Please wait.")
            return
        }

        const newStoresVisitedCounter = storesVisitedCounter + 1
        const lastProductNumber = storeLists[currentStoreIndex].products[(productsSeenCounter * PRODUCTS_PER_ROW) - 1].productNumber

        lastProductDisplayed.push(lastProductNumber)

        setLastProductDisplayed(lastProductDisplayed)
        setShowProducts(false)
        setStoresVisitedCounter(newStoresVisitedCounter)
        setProductsSeenCounter(1)
        setCurrentProducts(storeLists[newStoresVisitedCounter].products.slice(0, PRODUCTS_PER_ROW * 2))
    }

    const checkMissedBargains = () => {
        console.log("checkMissedBargains")

        const from = (productsSeenCounter - 1) * PRODUCTS_PER_ROW
        const to = from + PRODUCTS_PER_ROW

        const bargainProductListInThisIteration = storeLists[currentStoreIndex].products.slice(from, to).filter(product => product.isBargain === true)

        let selectedBargainsCounter = 0
        for (let i = from; i <= to; i++) {
            if (selectedProducts.includes(i)) {
                console.log(storeLists[currentStoreIndex].products[i])
                if (storeLists[currentStoreIndex].products[i].isBargain) {
                    selectedBargainsCounter++
                }
            }
        }

        if (selectedBargainsCounter !== bargainProductListInThisIteration.length) {
            alert(BARGAIN_MISSED_SELECTED_ALERT_MESSAGE)
        }
    }

    const onLoadingFinished = () => {
        const newCurrentStoreIndex = currentStoreIndex + 1

        setShowProducts(true)
        setCurrentStoreIndex(newCurrentStoreIndex)
        setSelectedProducts([])
        setCurrentProductListWithoutBargains([])
    }

    return (<>
        { DEBUG ? `Store#:${storeLists[currentStoreIndex].storeNumber}` : ""}
        {showProducts ?
            <ProductsMenu
                products={currentProducts}
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