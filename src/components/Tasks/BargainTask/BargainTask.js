import React, { useState, useEffect } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import {
    BARGAIN_CORRECT_SELECTED_ALERT_MESSAGE,
    BARGAIN_ERROR_SELECTED_ALERT_MESSAGE,
    BARGAIN_MISSED_SELECTED_ALERT_MESSAGE,
    STORES_NOT_AVAILABLE,
    MIDDLE_EXPERIMENT_ALERT,
    ONE_SECOND_MS
} from '../../../helpers/constants';
import { randomNumber } from '../../../helpers/utils';
import StickmanLoading from './StickmanLoading';
import ProductsMenu from './ProductsMenu';
import "../style.css";

const DEBUG = (process.env.REACT_APP_DEBUG_LOG === "true") ? true : false;

export default function BargainTask(props) {
    // const showFeedback = true
    const PRODUCTS_PER_ROW = 5
    const EXPERIMENT_DURATION_SECS = 1 * 60

    const testList = [{
        storeNumber: 1, bargainsNumber: 4, delay: 15, showFeedback: true, products: [
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
        storeNumber: 2, bargainsNumber: 15, delay: 15, showFeedback: false, products: [
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

    const setConditionalList = () => {
        if (props.typeTask.includes("TEST")) {
            return testList
        } else if (props.typeTask === "LONG-SHORT") {
            return props.data.storesLong
        } else if (props.typeTask === "SHORT-LONG") {
            return props.data.storesShort
        }
    }


    const [bargainCounter, setBargainCounter] = useState(0) //isBargain TRUE
    const [currentStoreIndex, setCurrentStoreIndex] = useState(0)
    const [currentProductListWithoutBargains, setCurrentProductListWithoutBargains] = useState([])
    const [delay, setDelay] = useState(ONE_SECOND_MS)
    const [lastProductDisplayed, setLastProductDisplayed] = useState([]) //[5, 25] --> index 0: lastProduct# 5, index1: lastProduct#25
    const [modalAlertConfig, setModalAlertConfig] = useState({ isVisible: false, text: "", title: "" })
    const [productsSeenCounter, setProductsSeenCounter] = useState(1) //Initially, the user already see 5 products = productsSeenCounter * 5 = 1 * 5 = 5 
    const [selectedProducts, setSelectedProducts] = useState([])

    const [showInstruction, setShowInstruction] = useState(false)
    const [showProducts, setShowProducts] = useState(true)
    const [storeLists, setStoreLists] = useState(setConditionalList())
    const [storesVisitedCounter, setStoresVisitedCounter] = useState(0)
    const [timer, setTimer] = useState({ counter: EXPERIMENT_DURATION_SECS })


    const [currentProducts, setCurrentProducts] = useState(storeLists[currentStoreIndex].products.slice(0, PRODUCTS_PER_ROW * 2))
    const [showFeedback, setShowFeedback] = useState(storeLists[currentStoreIndex].showFeedback)
    // USAMOS PRODUCTS_PER_ROW * 2 o simplement PRODUCTS_PER_ROW ??? Verificar donde USAMOS
    // En generateRandomProductList() generamos ahora PRODUCTS_PER_ROW.Deberia ser PRODUCTS_PER_ROW * 2?
    // VERIFICAR

    /**
     * MENU ITEM CALLBACKS
     */
    const onFirstItemVisible = () => {
        if (DEBUG) console.log("first item is visible");
    };

    const onLastItemVisible = () => {
        if (DEBUG) console.log("last item is visible");

        generateNewProductListToDisplay()
    };

    const onUpdate = translate => {
        //TODO verificar la funcion de productsSeenCounter
        if (DEBUG) console.log(`onShowNextProducts`);

        if (showFeedback) { checkMissedBargains() }

        showNextProducts()

    };

    const onSelect = key => {
        if (DEBUG) console.log(`onProductSelected: ${key}`);
        productSelected(key)
    };

    const onShowNextStore = () => {
        if (DEBUG) console.log("onGoStoreBtnClick")

        if (showFeedback) { checkMissedBargains() }

        displayNewStore()
    }

    /**
     * Helper Functions
     */

    const productSelected = key => {
        const productIndex = parseInt(key)

        if (!selectedProducts.includes(productIndex)) {
            const isBargain = storeLists[currentStoreIndex].products[productIndex].isBargain
            let selected = [...selectedProducts]

            selected.push(productIndex)

            setSelectedProducts(selected)

            //Check BARGAIN selection
            if (isBargain) {
                const newBargainCounter = bargainCounter + 1

                if (showFeedback) {
                    modalAlert("Great!", BARGAIN_CORRECT_SELECTED_ALERT_MESSAGE(newBargainCounter))
                }

                setBargainCounter(newBargainCounter)
            } else {
                if (showFeedback) {
                    modalAlert("Ups!", BARGAIN_ERROR_SELECTED_ALERT_MESSAGE)
                }
            }
        }
    }

    const displayNewStore = () => {
        if (storesVisitedCounter + 1 >= storeLists.length) {
            modalAlert("Ups!", STORES_NOT_AVAILABLE)
            return
        }

        const newStoresVisitedCounter = storesVisitedCounter + 1
        const lastProductNumber = storeLists[currentStoreIndex].products[(productsSeenCounter * PRODUCTS_PER_ROW) - 1].productNumber
        const newCurrentStoreIndex = currentStoreIndex + 1

        lastProductDisplayed.push(lastProductNumber)

        //Save results and clear state for a new store to show
        setLastProductDisplayed(lastProductDisplayed)
        setShowProducts(false)
        setStoresVisitedCounter(newStoresVisitedCounter)
        setProductsSeenCounter(1)
        setCurrentProducts(storeLists[newStoresVisitedCounter].products.slice(0, PRODUCTS_PER_ROW * 2))
        setShowFeedback(storeLists[newStoresVisitedCounter].showFeedback)
        setCurrentStoreIndex(newCurrentStoreIndex)
        setSelectedProducts([])
        setCurrentProductListWithoutBargains([])
    }

    const showNextProducts = () => {
        const newProductsSeenCounter = productsSeenCounter + 1

        setProductsSeenCounter(newProductsSeenCounter)
    }

    const generateNewProductListToDisplay = () => {
        const from = productsSeenCounter * PRODUCTS_PER_ROW
        const to = from + (PRODUCTS_PER_ROW * 2)
        const isNeededGenerateNewProducts = currentProducts.length === storeLists[currentStoreIndex].products.length

        let tmp = []

        if (!isNeededGenerateNewProducts) {
            tmp = storeLists[currentStoreIndex].products.slice(from, to)
        } else {
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
    }

    const generateRandomProductList = (filteredNotBargainList) => {
        let count = 0
        let newList = []
        let randomNumbersList = []

        //TODO what happened in case of an infinite loop here => there are not enough not bargain product lists
        while (count < PRODUCTS_PER_ROW) {
            const randomProduct = filteredNotBargainList[randomNumber(0, filteredNotBargainList.length - 1)]
            const randomProductNumber = randomProduct.productNumber

            if (!randomNumbersList.includes(randomProductNumber)) {
                randomNumbersList.push(randomProductNumber)
                newList.push(randomProduct)
                count += 1;
            }
        }

        return newList;
    }

    const checkMissedBargains = () => {
        const from = (productsSeenCounter - 1) * PRODUCTS_PER_ROW
        const to = from + PRODUCTS_PER_ROW
        const productListInThisIteration = storeLists[currentStoreIndex].products.slice(from, to)
        const bargainProductListInThisIteration = productListInThisIteration.filter(product => product.isBargain === true)

        let selectedBargainsCounter = 0

        for (let i = from; i <= to; i++) {
            if (selectedProducts.includes(i)) {
                const product = storeLists[currentStoreIndex].products[i]

                if (product.isBargain) {
                    selectedBargainsCounter += 1
                }
            }
        }

        if (selectedBargainsCounter !== bargainProductListInThisIteration.length) {
            modalAlert("Ups!", BARGAIN_MISSED_SELECTED_ALERT_MESSAGE)
        }
    }

    const onLoadingFinished = () => {
        setShowProducts(true)
    }

    const modalAlert = (title, text, isVisible = true) => {
        setModalAlertConfig({ isVisible: isVisible, text: text, title: title })
    }

    const onModalOpened = () => {
        console.log("Model onOpened")
    }

    const onModalClosed = () => {
        console.log("Model onClosed")
        modalAlert("", "", false)
    }

    const onPauseTest = () => {
        setDelay(ONE_SECOND_MS)
        setShowProducts(true)
        setShowInstruction(false)
    }

    const setNewStoreList = () => {
        const newListToDisplay = JSON.stringify(storeLists) === JSON.stringify(props.data.storesLong) ? props.data.storesShort : props.data.storesLong
        const newStoresVisitedCounter = storesVisitedCounter + 1

        setStoreLists(newListToDisplay) //we change the stores lists by Conditions (Long/short)
        setDelay(null)
        setShowInstruction(true)
        setShowProducts(false)

        setCurrentStoreIndex(0)
        setSelectedProducts([])
        setCurrentProductListWithoutBargains([])

        setStoresVisitedCounter(newStoresVisitedCounter)
        setProductsSeenCounter(1)
        setCurrentProducts(newListToDisplay[newStoresVisitedCounter].products.slice(0, PRODUCTS_PER_ROW * 2))
        setShowFeedback(newListToDisplay[newStoresVisitedCounter].showFeedback)
    }

    useEffect(() => {//component didmount
        let id = null
        function tick() {
            console.log(timer.counter)
            if (timer.counter === 0) {
                modalAlert("Ups!", "Timeout")

                timer.counter = -1

                clearInterval(id)
                //When timer 0, the experiment finishes
                props.action(true)
            } else if (timer.counter === (EXPERIMENT_DURATION_SECS / 2)) {
                // modalAlert("Info", "We reached the middle of the experiment")
                timer.counter -= 1;

                setNewStoreList()
            } else {
                timer.counter -= 1;//we dont use SetTimer here, to avoid re-render every second. Is it good?
            }
        }

        if (delay !== null) {
            id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);

    const displayBodyConfig = (showProducts, showInstruction) => {
        if (showProducts) {
            return (<div className="top-quarter"><ProductsMenu
                products={currentProducts}
                selected={selectedProducts}
                onFirstItemVisible={onFirstItemVisible}
                onLastItemVisible={onLastItemVisible}
                onSelect={onSelect}
                onUpdate={onUpdate}
                onGoStoreBtnClick={onShowNextStore} /></div>)
        } else if (showInstruction) {
            return (<div className="centered" style={{ textAlign: "center" }}>
                <h3>{MIDDLE_EXPERIMENT_ALERT}</h3>
                <br />
                <br />
                <Button color="secondary" size='sm' onClick={onPauseTest}>Continue</Button></div>)
        } else {
            return (<div className="centered">
                <StickmanLoading
                    currentStore={storeLists[currentStoreIndex]}
                    onLoadingFinished={onLoadingFinished} /></div>)
        }
    }

    return (<>
        { DEBUG ? `Store#:${storeLists[currentStoreIndex].storeNumber}` : ""}

        {modalAlertConfig.isVisible ?
            <ModalAlert
                title={modalAlertConfig.title}
                text={modalAlertConfig.text}
                onOpened={onModalOpened}
                onClosed={onModalClosed} /> : <></>}

        { displayBodyConfig(showProducts, showInstruction)}
    </>);
}

function ModalAlert(props) {
    const { text, title } = props;
    const [modal, setModal] = useState(true);

    const toggle = () => setModal(modal => !modal);

    return (
        <div>
            <Modal
                isOpen={modal}
                className="modal-alert"
                toggle={toggle}
                size='sm'
                keyboard={false}
                onOpened={props.onOpened}
                onClosed={props.onClosed}>
                <ModalHeader>{title}</ModalHeader>
                <ModalBody>{text}</ModalBody>
                <ModalFooter><Button color="secondary" size='sm' onClick={toggle}>Close</Button></ModalFooter>
            </Modal>
        </div>
    );
}