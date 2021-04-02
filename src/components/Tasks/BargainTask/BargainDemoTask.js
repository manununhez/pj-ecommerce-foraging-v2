import React, { useState } from 'react';
import Tour from "reactour";

import StickmanLoading from './StickmanLoading';
import ProductsMenu from './ProductsMenu';

import {
    TOUR_BARGAIN,
    TOUR_BARGAIN2,
    TOUR_BARGAIN_SELECTION,
    TOUR_INIT,
    TOUR_TEXT_ANOTHER_STORE,
    TOUR_TEXT_MORE_PRODUCTS,
    accentColor
} from '../../../helpers/constants';

import "../style.css";

const DEBUG = (process.env.REACT_APP_DEBUG_LOG === "true") ? true : false;

export default function BargainDemoTask(props) {

    const currentStoreIndex = 0

    const storeLists = [{
        storeNumber: 1, bargainsNumber: 4, delay: 15, showFeedback: false, products: [
            { productNumber: 1, isBargain: false, oldPrice: 227, newPrice: 140.74, discount: 0.38, numOfStars: 5, img: "https://api.swps-pjatk-experiment.pl/v3/img/12picture.jpg" },
            { productNumber: 2, isBargain: true, oldPrice: 113, newPrice: 36.16, discount: 0.68, numOfStars: 5, img: "https://api.swps-pjatk-experiment.pl/v3/img/71jewelry_picture.jpg" },
            { productNumber: 3, isBargain: false, oldPrice: 125, newPrice: 63.75, discount: 0.49, numOfStars: 5, img: "https://api.swps-pjatk-experiment.pl/v3/img/31jewelry_picture.jpg" },
            { productNumber: 4, isBargain: false, oldPrice: 113, newPrice: 82.49, discount: 0.27, numOfStars: 5, img: "https://api.swps-pjatk-experiment.pl/v3/img/39jewelry_picture.jpg" },
            { productNumber: 5, isBargain: false, oldPrice: 257, newPrice: 131.07, discount: 0.49, numOfStars: 3, img: "https://api.swps-pjatk-experiment.pl/v3/img/3electron_picture.jpg" },
            { productNumber: 6, isBargain: true, oldPrice: 142, newPrice: 36.92, discount: 0.74, numOfStars: 4, img: "https://api.swps-pjatk-experiment.pl/v3/img/50jewelry_picture.jpg" },
            { productNumber: 7, isBargain: false, oldPrice: 266, newPrice: 135.66, discount: 0.49, numOfStars: 2, img: "https://api.swps-pjatk-experiment.pl/v3/img/28jewelry_picture.jpg" },
            { productNumber: 8, isBargain: false, oldPrice: 188, newPrice: 142.88, discount: 0.24, numOfStars: 3, img: "https://api.swps-pjatk-experiment.pl/v3/img/46jewelry_picture.jpg" },
            { productNumber: 9, isBargain: false, oldPrice: 275, newPrice: 206.25, discount: 0.25, numOfStars: 6, img: "https://api.swps-pjatk-experiment.pl/v3/img/20electron_picture.jpg" },
            { productNumber: 10, isBargain: false, oldPrice: 275, newPrice: 176, discount: 0.36, numOfStars: 2, img: "https://api.swps-pjatk-experiment.pl/v3/img/6picture.jpg" }
        ]
    }];

    const [isTourOpen, setIsTourOpen] = useState(true)
    const [selectedProducts, setSelectedProducts] = useState([])
    const [showProducts, setShowProducts] = useState(true)
    const [storesVisitedCounter, setStoresVisitedCounter] = useState(0)
    const [tourConfigProduct, setTourConfigProduct] = useState({
        productBargainIndex: 1,
        productIndex: 0,
        productBargainText: TOUR_BARGAIN,
        productText: TOUR_BARGAIN_SELECTION
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
                productBargainText: TOUR_BARGAIN2,
                productText: TOUR_BARGAIN_SELECTION
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

        props.action({ isTaskCompleted: true, results: [] })
    }

    const tourConfig = [
        {
            selector: `[data-tut="reactour__"]`,
            content: TOUR_INIT,
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
            selector: '[data-tut="reactour__more_products"]',
            content: TOUR_TEXT_MORE_PRODUCTS
        },
        {
            selector: '[data-tut="reactour__button"]',
            content: TOUR_TEXT_ANOTHER_STORE
        }]

    return (<>
        {DEBUG ? `Store#:${storeLists[currentStoreIndex].storeNumber}` : ""}

        {showProducts ?
            <div /*className="top-quarter"*/>
                <ProductsMenu
                    products={storeLists[currentStoreIndex].products}
                    selected={selectedProducts}
                    onFirstItemVisible={onFirstItemVisible}
                    onLastItemVisible={onLastItemVisible}
                    onSelect={onProductSelected}
                    onUpdate={onShowNextProducts}
                    onGoStoreBtnClick={onShowNextStore}
                    bargainsTaken={0}
                /></div> :
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