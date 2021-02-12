import React, { useState } from 'react';
import { Button } from 'reactstrap';
import PropTypes from "prop-types";
import ScrollMenu from "react-horizontal-scrolling-menu";
import ReactStars from "react-rating-stars-component";

import StickmanLoading from './StickmanLoading';
import "./style.css"

export default function BargainTask(props) {

    let list = [
        { productNumber: 1, isBargain: false, oldPrice: 100, newPrice: 95.0, discount: 0.55, numOfStars: 4, img: "https://via.placeholder.com/150" },
        { productNumber: 2, isBargain: false, oldPrice: 80, newPrice: 45.0, discount: 0.50, numOfStars: 1, img: "https://via.placeholder.com/150" },
        { productNumber: 3, isBargain: false, oldPrice: 70, newPrice: 35.0, discount: 0.60, numOfStars: 2, img: "https://via.placeholder.com/150" },
        { productNumber: 4, isBargain: false, oldPrice: 1700, newPrice: 1445.0, discount: 0.70, numOfStars: 4, img: "https://via.placeholder.com/150" },
        { productNumber: 5, isBargain: false, oldPrice: 200, newPrice: 145.0, discount: 0.40, numOfStars: 6, img: "https://via.placeholder.com/150" },
        { productNumber: 6, isBargain: true, oldPrice: 100, newPrice: 55.0, discount: 0.25, numOfStars: 4, img: "https://via.placeholder.com/150" },
        { productNumber: 7, isBargain: false, oldPrice: 1100, newPrice: 845.0, discount: 0.55, numOfStars: 5, img: "https://via.placeholder.com/150" },
        { productNumber: 8, isBargain: false, oldPrice: 300, newPrice: 145.0, discount: 0.10, numOfStars: 4, img: "https://via.placeholder.com/150" },
        { productNumber: 9, isBargain: true, oldPrice: 60, newPrice: 45.0, discount: 0.85, numOfStars: 3, img: "https://via.placeholder.com/150" },
        { productNumber: 10, isBargain: false, oldPrice: 800, newPrice: 645.0, discount: 0.90, numOfStars: 2, img: "https://via.placeholder.com/150" },
        { productNumber: 11, isBargain: false, oldPrice: 180, newPrice: 145.0, discount: 0.70, numOfStars: 1, img: "https://via.placeholder.com/150" },
        { productNumber: 12, isBargain: false, oldPrice: 230, newPrice: 215.0, discount: 0.55, numOfStars: 6, img: "https://via.placeholder.com/150" },
        { productNumber: 13, isBargain: false, oldPrice: 500, newPrice: 405.0, discount: 0.55, numOfStars: 5, img: "https://via.placeholder.com/150" },
        { productNumber: 14, isBargain: false, oldPrice: 100, newPrice: 95.0, discount: 0.55, numOfStars: 4, img: "https://via.placeholder.com/150" },
        { productNumber: 15, isBargain: false, oldPrice: 80, newPrice: 45.0, discount: 0.55, numOfStars: 1, img: "https://via.placeholder.com/150" },
        { productNumber: 16, isBargain: false, oldPrice: 70, newPrice: 35.0, discount: 0.55, numOfStars: 2, img: "https://via.placeholder.com/150" },
        { productNumber: 17, isBargain: false, oldPrice: 1700, newPrice: 1445.0, discount: 0.55, numOfStars: 4, img: "https://via.placeholder.com/150" },
        { productNumber: 18, isBargain: false, oldPrice: 200, newPrice: 145.0, discount: 0.55, numOfStars: 6, img: "https://via.placeholder.com/150" },
        { productNumber: 19, isBargain: true, oldPrice: 100, newPrice: 55.0, discount: 0.55, numOfStars: 4, img: "https://via.placeholder.com/150" },
        { productNumber: 20, isBargain: false, oldPrice: 1100, newPrice: 845.0, discount: 0.55, numOfStars: 5, img: "https://via.placeholder.com/150" },
        { productNumber: 21, isBargain: false, oldPrice: 300, newPrice: 145.0, discount: 0.55, numOfStars: 4, img: "https://via.placeholder.com/150" },
        { productNumber: 22, isBargain: true, oldPrice: 60, newPrice: 45.0, discount: 0.55, numOfStars: 3, img: "https://via.placeholder.com/150" },
        { productNumber: 23, isBargain: false, oldPrice: 800, newPrice: 645.0, discount: 0.55, numOfStars: 2, img: "https://via.placeholder.com/150" },
        { productNumber: 24, isBargain: false, oldPrice: 180, newPrice: 145.0, discount: 0.55, numOfStars: 1, img: "https://via.placeholder.com/150" },
        { productNumber: 25, isBargain: false, oldPrice: 230, newPrice: 215.0, discount: 0.55, numOfStars: 6, img: "https://via.placeholder.com/150" },
        { productNumber: 26, isBargain: false, oldPrice: 500, newPrice: 405.0, discount: 0.55, numOfStars: 5, img: "https://via.placeholder.com/150" },
    ];

    const [selected, setSelected] = useState([]);
    const [currentStore, setCurrentStore] = useState({ storeNumber: 1, bargainsNumber: 10, delay: 15 })
    const menu = Menu(list, selected);

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

        if (!selected.includes(parseInt(key))) {
            const selectedList = [...selected]
            selectedList.push(parseInt(key))
            console.log(selectedList)
            setSelected(selectedList)
        }
    };

    const onGoStoreBtnClick = () => {
        console.log("onGoStoreBtnClick")
    }

    return (
        <>
            <div className="scroll-menu">
                <ScrollMenu
                    alignCenter={false}
                    arrowRight={ArrowRight}
                    clickWhenDrag={false}
                    data={menu}
                    scrollBy={5}
                    dragging={false}
                    leftArrowVisible={false}
                    hideArrows={true}
                    hideSingleArrow={true}
                    onFirstItemVisible={onFirstItemVisible}
                    onLastItemVisible={onLastItemVisible}
                    onSelect={onSelect}
                    onUpdate={onUpdate}
                    // ref={el => (this.menu = el)}
                    scrollToSelected={false}
                    // selected={selected}
                    transition={0.3}
                    translate={0}
                    wheel={false}
                />
            </div>

            <div className="text-center store-btn">
                <Button outline color="secondary" size="lg" onClick={() => onGoStoreBtnClick()}> Go to new store</Button > {' '}
            </div>

            <StickmanLoading currentStore={currentStore} />
        </>);


}

const RatingBar = (value) => {
    return (<ReactStars
        edit={false}
        size={10}
        count={6}
        value={value}
        half={false} />);
}

const MenuItem = (item, selected) => {
    const discountPercentage = (item.discount * 100).toFixed()

    return (
        <div key={item.productNumber}>
            <div className={`product-card card ${selected ? "active" : ""}`}>
                <div>
                    <h4 style={{ float: "left" }}>{discountPercentage}% OFF!!</h4>
                    <div style={{ float: "right" }}>{RatingBar(item.numOfStars)}</div>
                </div>
                <img className="responsive-images product-image"
                    src={item.img}
                    alt={item.productNumber} />
                <h4 className="strikethrough">{item.oldPrice}</h4>
                <h4>{item.newPrice}</h4>
            </div>
        </div>);
};

export const Menu = (list, selected) =>
    list.map(item => {
        const isSelected = selected.includes(item.productNumber)
        return MenuItem(item, isSelected);
    });

const Arrow = ({ text, className }) => {
    return <div className={className}>{text}</div>;
};
Arrow.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string
};

export const ArrowRight = Arrow({ text: "", className: "arrow-next" });
