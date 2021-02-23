import React, { useState } from 'react';
import Tour from "reactour";

import StickmanLoading from './StickmanLoading';
import ProductsMenu from './ProductsMenu';

import "../style.css";

const DEBUG = (process.env.REACT_APP_DEBUG_LOG === "true") ? true : false;

export default function BargainDemoTask(props) {

    const currentStoreIndex = 0

    const storeLists = [{
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
            { productNumber: 10, isBargain: false, oldPrice: 206, newPrice: 131.84, discount: 0.36, numOfStars: 1, img: "https://api.swps-pjatk-experiment.pl/v3/img/23electron_picture.jpg" },
            // { productNumber: 11, isBargain: false, oldPrice: 270, newPrice: 156.6, discount: 0.42, numOfStars: 4, img: "https://api.swps-pjatk-experiment.pl/v3/img/12picture.jpg" },
            // { productNumber: 12, isBargain: false, oldPrice: 299, newPrice: 188.37, discount: 0.37, numOfStars: 6, img: "https://api.swps-pjatk-experiment.pl/v3/img/73jewelry_picture.jpg" },
            // { productNumber: 13, isBargain: false, oldPrice: 270, newPrice: 194.4, discount: 0.28, numOfStars: 3, img: "https://api.swps-pjatk-experiment.pl/v3/img/8picture.jpg" },
            // { productNumber: 14, isBargain: false, oldPrice: 298, newPrice: 196.68, discount: 0.34, numOfStars: 1, img: "https://api.swps-pjatk-experiment.pl/v3/img/7electron_picture.jpg" },
            // { productNumber: 15, isBargain: true, oldPrice: 100, newPrice: 45, discount: 0.55, numOfStars: 4, img: "https://api.swps-pjatk-experiment.pl/v3/img/45jewelry_picture.jpg" },
            // { productNumber: 16, isBargain: false, oldPrice: 298, newPrice: 199.66, discount: 0.33, numOfStars: 1, img: "https://api.swps-pjatk-experiment.pl/v3/img/19picture.jpg" },
            // { productNumber: 17, isBargain: true, oldPrice: 113, newPrice: 36.16, discount: 0.68, numOfStars: 5, img: "https://api.swps-pjatk-experiment.pl/v3/img/71jewelry_picture.jpg" },
            // { productNumber: 18, isBargain: false, oldPrice: 280, newPrice: 159.6, discount: 0.43, numOfStars: 2, img: "https://api.swps-pjatk-experiment.pl/v3/img/73jewelry_picture.jpg" },
            // { productNumber: 19, isBargain: false, oldPrice: 109, newPrice: 64.31, discount: 0.41, numOfStars: 5, img: "https://api.swps-pjatk-experiment.pl/v3/img/25electron_picture.jpg" }
        ]
    }];
    // }, {
    //     storeNumber: 2, bargainsNumber: 15, delay: 15, products: [
    //         { productNumber: 1, isBargain: false, oldPrice: 269, newPrice: 201.75, discount: 0.25, numOfStars: 5, img: "https://api.swps-pjatk-experiment.pl/v3/img/62jewelry_picture.jpg" },
    //         { productNumber: 2, isBargain: false, oldPrice: 109, newPrice: 85.02, discount: 0.22, numOfStars: 4, img: "https://api.swps-pjatk-experiment.pl/v3/img/68jewelry_picture.jpg" },
    //         { productNumber: 3, isBargain: false, oldPrice: 127, newPrice: 85.09, discount: 0.33, numOfStars: 4, img: "https://api.swps-pjatk-experiment.pl/v3/img/8picture.jpg" },
    //         { productNumber: 4, isBargain: true, oldPrice: 282, newPrice: 126.9, discount: 0.55, numOfStars: 6, img: "https://api.swps-pjatk-experiment.pl/v3/img/40jewelry_picture.jpg" },
    //         { productNumber: 5, isBargain: false, oldPrice: 134, newPrice: 101.84, discount: 0.24, numOfStars: 6, img: "https://api.swps-pjatk-experiment.pl/v3/img/62jewelry_picture.jpg" },
    //         { productNumber: 6, isBargain: true, oldPrice: 176, newPrice: 126.72, discount: 0.60, numOfStars: 5, img: "https://api.swps-pjatk-experiment.pl/v3/img/21electron_picture.jpg" },
    //         { productNumber: 7, isBargain: true, oldPrice: 166, newPrice: 59.76, discount: 0.64, numOfStars: 6, img: "https://api.swps-pjatk-experiment.pl/v3/img/17electron_picture.jpg" },
    //         { productNumber: 8, isBargain: false, oldPrice: 169, newPrice: 87.88, discount: 0.48, numOfStars: 3, img: "https://api.swps-pjatk-experiment.pl/v3/img/39jewelry_picture.jpg" },
    //         { productNumber: 9, isBargain: false, oldPrice: 127, newPrice: 71.12, discount: 0.44, numOfStars: 4, img: "https://api.swps-pjatk-experiment.pl/v3/img/67jewelry_picture.jpg" },
    //         { productNumber: 10, isBargain: false, oldPrice: 226, newPrice: 122.04, discount: 0.46, numOfStars: 5, img: "https://api.swps-pjatk-experiment.pl/v3/img/70jewelry_picture.jpg" },
    //         // { productNumber: 11, isBargain: false, oldPrice: 144, newPrice: 83.52, discount: 0.42, numOfStars: 3, img: "https://api.swps-pjatk-experiment.pl/v3/img/4electron_picture.jpg" },
    //         // { productNumber: 12, isBargain: true, oldPrice: 199, newPrice: 73.63, discount: 0.63, numOfStars: 5, img: "https://api.swps-pjatk-experiment.pl/v3/img/49jewelry_picture.jpg" },
    //         // { productNumber: 13, isBargain: false, oldPrice: 203, newPrice: 109.62, discount: 0.46, numOfStars: 4, img: "https://api.swps-pjatk-experiment.pl/v3/img/2picture.jpg" },
    //         // { productNumber: 14, isBargain: true, oldPrice: 112, newPrice: 50.4, discount: 0.55, numOfStars: 4, img: "https://api.swps-pjatk-experiment.pl/v3/img/24electron_picture.jpg" },
    //         // { productNumber: 15, isBargain: false, oldPrice: 109, newPrice: 69.76, discount: 0.36, numOfStars: 1, img: "https://api.swps-pjatk-experiment.pl/v3/img/28jewelry_picture.jpg" },
    //         // { productNumber: 16, isBargain: true, oldPrice: 179, newPrice: 89.5, discount: 0.5, numOfStars: 4, img: "https://api.swps-pjatk-experiment.pl/v3/img/26electron_picture.jpg" },
    //         // { productNumber: 17, isBargain: false, oldPrice: 203, newPrice: 125.86, discount: 0.38, numOfStars: 2, img: "https://api.swps-pjatk-experiment.pl/v3/img/12picture.jpg" },
    //         // { productNumber: 18, isBargain: false, oldPrice: 212, newPrice: 133.56, discount: 0.37, numOfStars: 4, img: "https://api.swps-pjatk-experiment.pl/v3/img/3picture.jpg" },
    //         // { productNumber: 19, isBargain: false, oldPrice: 249, newPrice: 184.26, discount: 0.26, numOfStars: 4, img: "https://api.swps-pjatk-experiment.pl/v3/img/27picture.jpg" }
    //     ]
    // }];

    const [isTourOpen, setIsTourOpen] = useState(true)
    const [selectedProducts, setSelectedProducts] = useState([])
    const [showProducts, setShowProducts] = useState(true)
    const [storesVisitedCounter, setStoresVisitedCounter] = useState(0)
    const [tourConfigProduct, setTourConfigProduct] = useState({
        productBargainIndex: 3,
        productIndex: 1,
        productBargainText: "This is a bargain...",
        productText: "To select a bargain item, left-click on it."
    })

    const onFirstItemVisible = () => {
        if (DEBUG) console.log("first item is visible");
    };

    const onLastItemVisible = () => {
        if (DEBUG) console.log("last item is visible");
    };

    const onShowNextProducts = ({ translate }) => {
        if (DEBUG) console.log(`onShowNextProducts`);
        setTourConfigProduct(
            {
                productBargainIndex: 5,
                productIndex: 7,
                productBargainText: "This is another bargain...",
                productText: "To select a bargain item, left-click on it."
            })

        if (DEBUG) console.log(tourConfig)
    };

    const onProductSelected = key => {
        if (DEBUG) console.log(`onProductSelected: ${key}`);

        if (!selectedProducts.includes(parseInt(key))) {
            let selected = [...selectedProducts]

            selected.push(parseInt(key))

            setSelectedProducts(selected)
        }
    };

    const onShowNextStore = () => {
        if (DEBUG) console.log("onGoStoreBtnClick")

        const newStoresVisitedCounter = storesVisitedCounter + 1

        setIsTourOpen(false)
        setShowProducts(false)
        setStoresVisitedCounter(newStoresVisitedCounter)
    }

    const onLoadingFinished = () => {
        setSelectedProducts([])

        props.action(true)
    }

    const tourConfig = [
        {
            selector: `[data-tut="reactour__"]`,
            content: 'Init tour',
            stepInteraction: false
        },
        {
            selector: `[data-tut="reactour__product_${tourConfigProduct.productIndex}"]`,
            content: tourConfigProduct.productText
        },
        {
            selector: `[data-tut="reactour__product_${tourConfigProduct.productBargainIndex}"]`,
            content: tourConfigProduct.productBargainText,
            stepInteraction: false
        },
        {
            selector: `[data-tut="reactour__bargain_details_${tourConfigProduct.productBargainIndex}"]`,
            content: "...a bargain: discount >= 50% or number of stars >= 4",
            stepInteraction: false
        },
        {
            selector: '[data-tut="reactour__more_products"]',
            content: `Click here if you want to move the belt and see more products.`,
        },
        {
            selector: '[data-tut="reactour__button"]',
            content: `Click here if you want to go to another store.`,
        }]

    const accentColor = "#5cb7b7";

    return (<>
        {DEBUG ? `Store#:${storeLists[currentStoreIndex].storeNumber}` : ""}

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
            <div className="centered">
                <StickmanLoading
                    currentStore={storeLists[currentStoreIndex]}
                    onLoadingFinished={onLoadingFinished} /></div>
        }
        <Tour
            steps={tourConfig}
            isOpen={isTourOpen}
            maskClassName="mask"
            className="helper"
            rounded={5}
            disableKeyboardNavigation={true}
            accentColor={accentColor}
            closeWithMask={false}
            showCloseButton={false}
            showNumber={false}
            showNavigation={false}
            onRequestClose={() => setIsTourOpen(false)}
        />
    </>);
}