import React from "react";

import { Container, Row } from "reactstrap";

import "./style.css";

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