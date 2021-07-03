import React from "react";

// reactstrap components
import {
  Nav, NavLink, NavItem
} from 'reactstrap';

// core components
import Navbar from "./Navbars/Navbar.js";

// index page sections
import MainMenu from "./Menu/Menu.js";
//Loader
import { css } from "@emotion/core";
import FadeLoader from "react-spinners/FadeLoader";

// CSS - Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default class BargainResult extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <main ref="main">
          <MainMenu />
        </main>
        <Nav vertical>
          <h5>Finished sessions</h5>
          <NavItem><NavLink href="https://api.swps-pjatk-experiment.pl/v3/bargains-result">Bargain results</NavLink></NavItem>
          <NavItem><NavLink href="https://api.swps-pjatk-experiment.pl/v3//bargains-result-per-store">Bargain results per store</NavLink></NavItem>
          <NavItem><NavLink href="https://api.swps-pjatk-experiment.pl/v3/survey-result">Survey results</NavLink></NavItem>
          <NavItem><NavLink href="https://api.swps-pjatk-experiment.pl/v3/demographic-result">Demographic results</NavLink></NavItem>
          <NavItem><NavLink href="https://api.swps-pjatk-experiment.pl/v3/memory-result">Memory task results</NavLink></NavItem>
        </Nav>
      </>
    );
  }
}