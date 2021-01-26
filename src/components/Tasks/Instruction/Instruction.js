import React from "react";

import { Container, Row } from "reactstrap";


import "./Instruction.css";
import "../font.css"

class Instruction extends React.Component {
    render() {
        return (
            <Container fluid="md">
                <Row className="justify-content-md-center">
                    {this.props.text}
                </Row>
            </Container>
        )
    };
}

export default Instruction;