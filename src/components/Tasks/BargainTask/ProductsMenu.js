import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from "prop-types";
import ScrollMenu from "react-horizontal-scrolling-menu";
import ReactStars from "react-rating-stars-component";

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
            <Button outline color="secondary" size="lg" onClick={props.onGoStoreBtnClick}> Go to new store</Button > {' '}
        </div>
    </div>
    )
};

const RatingBar = (value) => {
    return (<ReactStars
        edit={false}
        size={10}
        count={6}
        value={value}
        half={false} />);
}

const Menu = (list, selected) =>
    list.map(item => {
        const isSelected = selected.includes(item.productNumber)

        return MenuItem(item, isSelected);
    });

const MenuItem = (item, isSelected) => {
    const discountPercentage = (item.discount * 100).toFixed()
    console.log(`${item.productNumber}: ${isSelected}`)
    return (
        <div key={item.productNumber}>
            <div className="card product-card"
                style={{ backgroundColor: isSelected ? "grey" : "white" }}>
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

const Arrow = ({ text, className }) => {
    return <div className={className}>{text}</div>;
};

Arrow.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string
};