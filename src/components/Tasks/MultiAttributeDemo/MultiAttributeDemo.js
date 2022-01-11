import React from 'react';

// reactstrap components
import { Card, Button, Container, Row, Table, Alert, Modal, ModalHeader } from "reactstrap";

import ReactStars from "react-rating-stars-component";

// get our fontawesome imports
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faSmile, faFrown } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "./Box";
import { ItemTypes } from "./ItemTypes";

import DemoContainer from './DemoContainer'

import {
    FIRST_TASK_PROPERTIES_TOTAL, FIRST_RADIO_VALUE, SECOND_RADIO_VALUE, WHITE, BLACK,
    THIRD_RADIO_VALUE, TEXT_FOOTER, SHOW_FEEDBACK_TRUE, SPACE_KEY_CODE,
    EVENT_KEY_DOWN
} from '../../../helpers/constants';


const attributeLists = [{
    id: 31, showFeedback: "YES", showVisualStack: "YES", correctAnswer: 3, attributes: [
        { id: "A3", p1: 1, p2: 0, p3: 0, name: "Klasa energetyczna", valueP1: "A+", valueP2: "A+", valueP3: "A++" },
        { id: "A5", p1: 1, p2: 0, p3: 0, name: "Zużycie wody", valueP1: "40", valueP2: "50", valueP3: "50" },
        { id: "A4", p1: 0, p2: 1, p3: 1, name: "Poziom hałasu", valueP1: "50", valueP2: "45", valueP3: "45" },
        { id: "A6", p1: 1, p2: 1, p3: 0, name: "Program szybki", valueP1: "brak", valueP2: "jest", valueP3: "brak" },
        { id: "A2", p1: 1, p2: 1, p3: 1, name: "Pojemność bębna", valueP1: "10", valueP2: "10", valueP3: "10" },
        { id: "A1", p1: 1, p2: 0, p3: 1, name: "Maksymalne obroty", valueP1: "1400", valueP2: "1200", valueP3: "1400" },
    ]
},
{
    id: 32, showFeedback: "NO", showVisualStack: "NO", correctAnswer: 3, attributes: [
        { id: "A3", p1: 0, p2: 1, p3: 0, name: "Klasa energetyczna", valueP1: "A+", valueP2: "A+", valueP3: "A++" },
        { id: "A5", p1: 0, p2: 1, p3: 0, name: "Zużycie wody", valueP1: "40", valueP2: "50", valueP3: "50" },
        { id: "A4", p1: 0, p2: 1, p3: 1, name: "Poziom hałasu", valueP1: "50", valueP2: "45", valueP3: "45" },
        { id: "A6", p1: 1, p2: 1, p3: 0, name: "Program szybki", valueP1: "brak", valueP2: "jest", valueP3: "brak" },
        { id: "A2", p1: 1, p2: 1, p3: 1, name: "Pojemność bębna", valueP1: "10", valueP2: "10", valueP3: "10" },
        { id: "A1", p1: 1, p2: 0, p3: 1, name: "Maksymalne obroty", valueP1: "1400", valueP2: "1200", valueP3: "1400" },
    ]
}
];

class MultiAttributeDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: [],
            counter: 0
        }
        this.toogle = this._toggle.bind(this)
    }

    componentDidMount() {
        //for keyboard detection
        document.addEventListener(EVENT_KEY_DOWN, this.handleKeyDownEvent, false);

        // HTML prevent space bar from scrolling page
        window.addEventListener(EVENT_KEY_DOWN, function (e) {
            if (e.keyCode === SPACE_KEY_CODE && e.target === document.body) {
                e.preventDefault();
            }
        });
    }

    componentWillUnmount() {
        document.removeEventListener(EVENT_KEY_DOWN, this.handleKeyDownEvent, false);
    }

    handleKeyDownEvent = (event) => {
        if (event.keyCode === SPACE_KEY_CODE) {
            console.log("SPACE_KEY_CODE")
            console.log(this.state)
            const { selectedOption, counter } = this.state

            if (selectedOption.length === (counter + 1)) {
                this.setState({ counter: (counter + 1) })
            }
        }
    }

    _toggle(evt) {
        const { selectedOption, counter } = this.state

        let selectedValue = evt.target.value

        console.log(evt)

        if (selectedOption.length === 0 || selectedOption.length < (counter + 1)) {
            selectedOption.push(selectedValue)
        } else if (selectedOption.length === (counter + 1)) {
            selectedOption[counter] = selectedValue
        }

        // this.props.action(selectedValue);

        this.setState({ selectedOption: selectedOption },
            () => {
                console.log(this.state)
            })
    }

    _stackDisplay() {
        document.getElementById("cardStackVisual").style.display = "";
        document.getElementById("btnShowStack").style.display = "none";
    }


    render() {
        const { counter, selectedOption } = this.state
        const data = attributeLists[counter]
        const showFeedback = data.showFeedback
        const modalOpen = false
        const showError = false
        const textError = "TEXT ERROR"
        return (
            <Container key={"KEY_" + counter}>
                <Alert style={{ fontSize: "1.0rem" }} color="warning" isOpen={showError}>
                    <span className="alert-inner--text ml-1">
                        {textError}
                    </span>
                </Alert>
                <Modal returnFocusAfterClose={modalOpen} isOpen={modalOpen} style={{ position: "fixed", top: "40%", left: "45%", transform: "translate(-40%, -40%)" }}>
                    <ModalHeader style={{ padding: "4em" }}>
                        {/* if showsFeedback -- we take the first element of the showFeedback column attribute*/}
                        {(showFeedback === SHOW_FEEDBACK_TRUE)
                            ? <div style={{ textAlign: "center" }}>
                                <FontAwesomeIcon color="green" icon={faSmile} size="4x" />
                            </div>
                            : <></>
                        }
                        <br /><div><h4>{TEXT_FOOTER}</h4></div>
                    </ModalHeader>
                </Modal>
                <Row className="justify-content-center">
                    <Card body style={{ marginTop: "20px" }}>
                        <div>{getRatingStarBarTable(data)}</div>
                    </Card>
                    <Card body style={{ marginTop: "20px" }}>
                        <div>{getTable(selectedOption[counter - 1], data, this.toggle)}</div>
                        {(data.showVisualStack === "YES") ?
                            <Button id="btnShowStack" onClick={() => this._stackDisplay()}> Show me the levels</Button>
                            : <></>
                        }
                    </Card>
                    <Card id="cardStackVisual" body style={{ marginTop: "20px", display: 'none' }}>
                        {/* <div>{getTableVisualization(data)}</div> */}
                        <DemoContainer />
                    </Card>

                </Row>
            </Container>
        );
    }
}

function getTableVisualization(data) {
    return (<Table borderless responsive style={{ textAlign: 'center' }}>
        <thead>
            <tr>
                <th><h5>Product 1</h5></th>
                <th><h5>Product 2</h5></th>
                <th><h5>Product 3</h5></th>
            </tr>

        </thead>
        <tbody>
            {getTableVisualizationBody(data)}
        </tbody>
    </Table>)
}
/**
 * 
 * @param {*} data 
 * @param {*} counter 
 * @param {*} selectedValue 
 * @param {*} toggle 
 */
function getTable(selectedValue, data, toggle) {
    return (
        <Table responsive style={{ textAlign: 'center' }}>
            <thead>
                <tr>
                    <th>
                        <button color="primary" id={"btn_" + FIRST_RADIO_VALUE}
                            className={selectedValue === FIRST_RADIO_VALUE ? "btn btn-warning" : "btn btn-primary"} //Values from 1 to length
                            style={{ marginTop: "0px", marginBottom: "0px", fontSize: "0.9em" }}
                            onClick={toggle} value={FIRST_RADIO_VALUE}>
                            Product 1
                        </button>
                    </th>
                    <th>
                        <button color="primary" id={"btn_" + SECOND_RADIO_VALUE}
                            className={selectedValue === SECOND_RADIO_VALUE ? "btn btn-warning" : "btn btn-primary"} //Values from 1 to length style={{ marginTop: "0px", marginBottom: "0px", fontSize: "0.9em" }}
                            onClick={toggle} value={SECOND_RADIO_VALUE}>
                            Product 2
                        </button>
                    </th>
                    <th>
                        <button color="primary" id={"btn_" + THIRD_RADIO_VALUE}
                            className={selectedValue === THIRD_RADIO_VALUE ? "btn btn-warning" : "btn btn-primary"} //Values from 1 to length style={{ marginTop: "0px", marginBottom: "0px", fontSize: "0.9em" }}
                            onClick={toggle} value={THIRD_RADIO_VALUE}>
                            Product 3
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {getTableBody(data)}
            </tbody>
        </Table>
    );
}

/**
 * 
 * @param {*} data 
 * @param {*} counter 
 */
function getTableVisualizationBody(data) {
    return (<tr>
        <td style={{ verticalAlign: 'bottom' }}>
            <Table responsive borderless>
                <thead></thead>
                <tbody>
                    {getPropertiesTableVizualizationBodyProduct1(data)}
                </tbody>
            </Table>
        </td>
        <td style={{ verticalAlign: 'bottom' }}>
            <Table responsive borderless>
                <thead></thead>
                <tbody>
                    {getPropertiesTableVizualizationBodyProduct2(data)}
                </tbody>
            </Table>
        </td>
        <td style={{ verticalAlign: 'bottom' }}>
            <Table responsive borderless>
                <thead></thead>
                <tbody>
                    {getPropertiesTableVizualizationBodyProduct3(data)}
                </tbody>
            </Table>
        </td>
    </tr>
    );
}

function getPropertiesTableVizualizationBodyProduct1(data) {
    let children = []
    let attributes = FIRST_TASK_PROPERTIES_TOTAL
    for (let i = attributes - 1; i >= 0; i--) {
        if (data.attributes[i].p1 === 1) {
            children.push(
                <tr style={{ border: '1px solid black', textAlign: '-webkit-center', fontSize: '1.3em' }}>
                    {getPropertiesVerticalRating(FIRST_TASK_PROPERTIES_TOTAL - i)}
                </tr>);
        }
    }

    return children
}

function getPropertiesTableVizualizationBodyProduct2(data) {
    let children = []
    let attributes = FIRST_TASK_PROPERTIES_TOTAL
    for (let i = attributes - 1; i >= 0; i--) {
        if (data.attributes[i].p2 === 1) {
            children.push(
                <tr style={{ border: '1px solid black', textAlign: '-webkit-center', fontSize: '1.3em' }}>
                    {getPropertiesVerticalRating(FIRST_TASK_PROPERTIES_TOTAL - i)}
                </tr>);
        }
    }
    return children

}

function getPropertiesTableVizualizationBodyProduct3(data) {
    let children = []
    let attributes = FIRST_TASK_PROPERTIES_TOTAL
    for (let i = attributes - 1; i >= 0; i--) {
        if (data.attributes[i].p3 === 1) {
            children.push(
                <tr style={{ border: '1px solid black', textAlign: '-webkit-center', fontSize: '1.3em' }}>
                    {getPropertiesVerticalRating(FIRST_TASK_PROPERTIES_TOTAL - i)}
                </tr>
            );
        }
    }
    return children

}

function getPropertiesVerticalRating(value) {
    let children = []
    for (let i = 0; i < value; i++) {
        children.push(
            <tr>
                <td style={{ padding: '0' }}>
                    <FontAwesomeIcon icon={faPlus} />
                </td>
            </tr>
        )
    }
    return children
}

/**
 * 
 * @param {*} data 
 * @param {*} counter 
 */
function getTableBody(data) {
    let children = []
    let attributes = FIRST_TASK_PROPERTIES_TOTAL
    for (let i = 0; i < attributes; i++) {
        children.push(
            <tr key={i}>
                <td style={{ fontSize: '1.3em' }}>{boldStyle(data.attributes[i].p1, data.attributes[i].valueP1, ItemTypes.PRODUCT_1, i)}</td>
                <td style={{ fontSize: '1.3em' }}>{boldStyle(data.attributes[i].p2, data.attributes[i].valueP2, ItemTypes.PRODUCT_2, i)}</td>
                <td style={{ fontSize: '1.3em' }}>{boldStyle(data.attributes[i].p3, data.attributes[i].valueP3, ItemTypes.PRODUCT_3, i)}</td>
            </tr>
        );
    }

    return children;
}

/**
 * 
 * @param {*} isBold 
 * @param {*} data 
 */
function boldStyle(isBold, data, type, index) {
    if (isBold === 1) //true, bold
        return (<Box name={data} type={type} key={index} isBold={true} index={index} />);
    else return (<Box name={data} type={type} key={index} isBold={false} index={index} />);
}

/**
 * 
 * @param {*} data 
 * @param {*} counter 
 */
function getPropertiesTableBody(data) {
    let children = []
    let rating = 6; //6 stars
    for (let i = 0; i < 6; i++) {
        children.push(
            <tr key={i}>
                <td style={{ textAlign: 'left', fontSize: '1.0em', padding: '1.0em', verticalAlign: 'middle' }}>{data.attributes[i].name}</td>
                <td style={{ border: '1px solid black', padding: '0' }} className="align-middle">{RatingBar(rating)}</td>
            </tr>
        );
        rating--;
    }

    return children;
}

/**
 * 
 * @param {*} value 
 */
function RatingBar(value) {
    return (<ReactStars
        edit={false}
        size={20}
        count={value}
        value={value}
        color={WHITE}
        activeColor={BLACK}
        emptyIcon={<FontAwesomeIcon icon={faPlus} style={{ marginLeft: "5px" }} />}
        filledIcon={<FontAwesomeIcon icon={faPlus} style={{ marginLeft: "5px" }} />}
    />
    );
}

/**
 * 
 * @param {*} data 
 * @param {*} counter 
 */
function getRatingStarBarTable(data) {
    return (
        <Table responsive borderless style={{ borderCollapse: 'separate' }}>
            <thead>
                <tr>
                    <th><h5>Feature</h5></th>
                    <th><h5>Importance</h5></th>
                </tr>
            </thead>
            <tbody>
                {getPropertiesTableBody(data)}
            </tbody>
        </Table>
    );
}

export default MultiAttributeDemo;