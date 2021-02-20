import React, { useState } from 'react';

import StickmanLoading from './StickmanLoading';
import ProductsMenu from './ProductsMenu';
import "../style.css";
import { randomNumber } from '../../../helpers/utils';

export default function BargainDemoTask(props) {
    const PRODUCTS_PER_ROW = 5

    const list = [{
        storeNumber: 1, bargainsNumber: 4, delay: 15, products: [
            { productNumber: 1, isBargain: false, oldPrice: "258", newPrice: 167, discount: 0.35, numOfStars: 5, img: "https://api.swps-pjatk-experiment.pl/v3/img/2picture.jpg" },
            { productNumber: 2, isBargain: false, oldPrice: "131", newPrice: 94, discount: 0.28, numOfStars: 6, img: "https://api.swps-pjatk-experiment.pl/v3/img/17picture.jpg" },
            { productNumber: 3, isBargain: false, oldPrice: "165", newPrice: 84, discount: 0.49, numOfStars: 1, img: "https://api.swps-pjatk-experiment.pl/v3/img/11picture.jpg" },
            { productNumber: 4, isBargain: false, oldPrice: "131", newPrice: 73, discount: 0.44, numOfStars: 2, img: "https://api.swps-pjatk-experiment.pl/v3/img/27picture.jpg" },
            { productNumber: 5, isBargain: false, oldPrice: "226", newPrice: 167, discount: 0.26, numOfStars: 4, img: "https://api.swps-pjatk-experiment.pl/v3/img/20picture.jpg" },
            { productNumber: 6, isBargain: false, oldPrice: "123", newPrice: 83, discount: 0.32, numOfStars: 5, img: "https://api.swps-pjatk-experiment.pl/v3/img/7picture.jpg" },
            { productNumber: 7, isBargain: false, oldPrice: "220", newPrice: 169, discount: 0.23, numOfStars: 3, img: "https://api.swps-pjatk-experiment.pl/v3/img/14picture.jpg" },
            { productNumber: 8, isBargain: false, oldPrice: "273", newPrice: 171, discount: 0.37, numOfStars: 4, img: "https://api.swps-pjatk-experiment.pl/v3/img/46jewelry_picture.jpg" },
            { productNumber: 9, isBargain: false, oldPrice: "209", newPrice: 137, discount: 0.34, numOfStars: 1, img: "https://api.swps-pjatk-experiment.pl/v3/img/16electron_picture.jpg" },
            { productNumber: 10, isBargain: false, oldPrice: "206", newPrice: 131, discount: 0.36, numOfStars: 1, img: "https://api.swps-pjatk-experiment.pl/v3/img/23electron_picture.jpg" },
            { productNumber: 11, isBargain: false, oldPrice: "270", newPrice: 156, discount: 0.42, numOfStars: 4, img: "https://api.swps-pjatk-experiment.pl/v3/img/12picture.jpg" },
            { productNumber: 12, isBargain: false, oldPrice: "299", newPrice: 188, discount: 0.37, numOfStars: 6, img: "https://api.swps-pjatk-experiment.pl/v3/img/73jewelry_picture.jpg" },
            { productNumber: 13, isBargain: false, oldPrice: "270", newPrice: 194, discount: 0.28, numOfStars: 3, img: "https://api.swps-pjatk-experiment.pl/v3/img/8picture.jpg" },
            { productNumber: 14, isBargain: false, oldPrice: "298", newPrice: 196, discount: 0.34, numOfStars: 1, img: "https://api.swps-pjatk-experiment.pl/v3/img/7electron_picture.jpg" },
            { productNumber: 15, isBargain: true, oldPrice: "100", newPrice: 45, discount: 0.55, numOfStars: 4, img: "https://api.swps-pjatk-experiment.pl/v3/img/45jewelry_picture.jpg" },
            { productNumber: 16, isBargain: false, oldPrice: "298", newPrice: 199, discount: 0.33, numOfStars: 1, img: "https://api.swps-pjatk-experiment.pl/v3/img/19picture.jpg" },
            { productNumber: 17, isBargain: true, oldPrice: "113", newPrice: 36, discount: 0.68, numOfStars: 5, img: "https://api.swps-pjatk-experiment.pl/v3/img/71jewelry_picture.jpg" },
            { productNumber: 18, isBargain: false, oldPrice: "280", newPrice: 159, discount: 0.43, numOfStars: 2, img: "https://api.swps-pjatk-experiment.pl/v3/img/73jewelry_picture.jpg" },
            { productNumber: 19, isBargain: false, oldPrice: "109", newPrice: 64, discount: 0.41, numOfStars: 5, img: "https://api.swps-pjatk-experiment.pl/v3/img/25electron_picture.jpg" }]
    }, {
        storeNumber: 2, bargainsNumber: 15, delay: 15, products: [
            { productNumber: 1, isBargain: false, oldPrice: "269", newPrice: 201, discount: 0.25, numOfStars: 5, img: "https://api.swps-pjatk-experiment.pl/v3/img/62jewelry_picture.jpg" },
            { productNumber: 2, isBargain: false, oldPrice: "109", newPrice: 85, discount: 0.22, numOfStars: 4, img: "https://api.swps-pjatk-experiment.pl/v3/img/68jewelry_picture.jpg" },
            { productNumber: 3, isBargain: false, oldPrice: "127", newPrice: 85, discount: 0.33, numOfStars: 4, img: "https://api.swps-pjatk-experiment.pl/v3/img/8picture.jpg" },
            { productNumber: 4, isBargain: true, oldPrice: "282", newPrice: 126, discount: 0.55, numOfStars: 6, img: "https://api.swps-pjatk-experiment.pl/v3/img/40jewelry_picture.jpg" },
            { productNumber: 5, isBargain: false, oldPrice: "134", newPrice: 101, discount: 0.24, numOfStars: 6, img: "https://api.swps-pjatk-experiment.pl/v3/img/62jewelry_picture.jpg" },
            { productNumber: 6, isBargain: false, oldPrice: "176", newPrice: 126, discount: 0.28, numOfStars: 5, img: "https://api.swps-pjatk-experiment.pl/v3/img/21electron_picture.jpg" },
            { productNumber: 7, isBargain: true, oldPrice: "166", newPrice: 59, discount: 0.64, numOfStars: 6, img: "https://api.swps-pjatk-experiment.pl/v3/img/17electron_picture.jpg" },
            { productNumber: 8, isBargain: false, oldPrice: "169", newPrice: 87, discount: 0.48, numOfStars: 3, img: "https://api.swps-pjatk-experiment.pl/v3/img/39jewelry_picture.jpg" },
            { productNumber: 9, isBargain: false, oldPrice: "127", newPrice: 71, discount: 0.44, numOfStars: 4, img: "https://api.swps-pjatk-experiment.pl/v3/img/67jewelry_picture.jpg" },
            { productNumber: 10, isBargain: false, oldPrice: "226", newPrice: 122, discount: 0.46, numOfStars: 5, img: "https://api.swps-pjatk-experiment.pl/v3/img/70jewelry_picture.jpg" },
            { productNumber: 11, isBargain: false, oldPrice: "144", newPrice: 83, discount: 0.42, numOfStars: 3, img: "https://api.swps-pjatk-experiment.pl/v3/img/4electron_picture.jpg" },
            { productNumber: 12, isBargain: true, oldPrice: "199", newPrice: 73, discount: 0.63, numOfStars: 5, img: "https://api.swps-pjatk-experiment.pl/v3/img/49jewelry_picture.jpg" },
            { productNumber: 13, isBargain: false, oldPrice: "203", newPrice: 109, discount: 0.46, numOfStars: 4, img: "https://api.swps-pjatk-experiment.pl/v3/img/2picture.jpg" },
            { productNumber: 14, isBargain: true, oldPrice: "112", newPrice: 50, discount: 0.55, numOfStars: 4, img: "https://api.swps-pjatk-experiment.pl/v3/img/24electron_picture.jpg" },
            { productNumber: 15, isBargain: false, oldPrice: "109", newPrice: 69, discount: 0.36, numOfStars: 1, img: "https://api.swps-pjatk-experiment.pl/v3/img/28jewelry_picture.jpg" },
            { productNumber: 16, isBargain: true, oldPrice: "179", newPrice: 89, discount: 0.5, numOfStars: 4, img: "https://api.swps-pjatk-experiment.pl/v3/img/26electron_picture.jpg" },
            { productNumber: 17, isBargain: false, oldPrice: "203", newPrice: 125, discount: 0.38, numOfStars: 2, img: "https://api.swps-pjatk-experiment.pl/v3/img/12picture.jpg" },
            { productNumber: 18, isBargain: false, oldPrice: "212", newPrice: 133, discount: 0.37, numOfStars: 4, img: "https://api.swps-pjatk-experiment.pl/v3/img/3picture.jpg" },
            { productNumber: 19, isBargain: false, oldPrice: "249", newPrice: 184, discount: 0.26, numOfStars: 4, img: "https://api.swps-pjatk-experiment.pl/v3/img/27picture.jpg" }]
    }];

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

        setShowProducts(true)
        setCurrentStoreIndex(newCurrentStoreIndex)
        setSelectedProducts([])
        setCurrentProductListWithoutBargains(storeLists[newCurrentStoreIndex].products.filter(item => item.isBargain === false))
    }

    return (<>
        {`Store#:${storeLists[currentStoreIndex].storeNumber}`}
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



