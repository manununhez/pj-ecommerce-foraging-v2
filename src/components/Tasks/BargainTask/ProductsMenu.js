import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from "prop-types";
import ScrollMenu from "react-horizontal-scrolling-menu";
import ReactStars from "react-rating-stars-component";

const DEBUG = (process.env.REACT_APP_DEBUG_LOG === "true") ? true : false;

export default function ProductsMenu(props) {

    const menu = Menu(props.products, props.selected)
    const ArrowRight = Arrow({ text: "", className: "arrow-next" });

    return (<div>
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
                onFirstItemVisible={props.onFirstItemVisible}
                onLastItemVisible={props.onLastItemVisible}
                onSelect={props.onSelect}
                onUpdate={props.onUpdate}
                // ref={el => (this.menu = el)}
                scrollToSelected={false}
                // selected={selected}
                transition={0.3}
                translate={0}
                wheel={false}
            />
        </div>

        <div className="text-center store-btn">
            <Button data-tut="reactour__button" outline color="secondary" size="lg" onClick={props.onGoStoreBtnClick}> Go to new store</Button > {' '}
        </div>
    </div>
    )
};

const RatingBar = (value) => {
    return (<ReactStars
        edit={false}
        size={13}
        count={6}
        value={value}
        half={false} />);
}

const Menu = (list, selected) =>
    list.map((item, index) => {
        if (DEBUG) console.log(`Index: ${index}`)
        const isSelected = selected.includes(index)

        return MenuItem(item, index, isSelected);
    });

const MenuItem = (item, productIndex, isSelected) => {
    const discountPercentage = (item.discount * 100).toFixed()
    if (DEBUG) console.log(`${item.productNumber}: ${isSelected}`)
    return (
        <div key={productIndex} data-tut={"reactour__product_" + productIndex}>
            <ProductItem
                productIndex={productIndex}
                item={item}
                isSelected={isSelected}
                discountPercentage={discountPercentage} />
        </div>
    );
};

function ProductItem(props) {
    const productIndex = props.productIndex
    const item = props.item
    const isSelected = props.isSelected
    const discountPercentage = props.discountPercentage

    return (
        <div className="card product-card"
            style={{ backgroundColor: isSelected ? "grey" : ((item.isBargain && DEBUG) ? "#e6ffcc" : "white") }}>
            {DEBUG ? <div>product#:{item.productNumber} bargain:{item.isBargain ? "T" : "F"}</div> : <></>}
            <div data-tut={"reactour__bargain_details_" + productIndex}>
                <h5>{discountPercentage}% OFF!!</h5>
            </div>
            <img className="responsive-images product-image"
                src={item.img}
                alt={item.productNumber} />
            <div style={{ position: "relative" }}>
                <div>
                    <h5 className="strikethrough">{item.oldPrice}</h5>
                    <h5>{item.newPrice}</h5>
                </div>
                <div style={{ bottom: 0, right: 0, position: "absolute", marginBottom: "10px" }}>{RatingBar(item.numOfStars)}</div>
            </div>
        </div>
    )
}

const Arrow = ({ text, className }) => {
    return <div data-tut="reactour__more_products" className={className}>{text}</div>;
};

Arrow.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string
};