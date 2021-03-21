import React from "react";

// reactstrap components
import {
  Table
} from 'reactstrap';

// core components
import Navbar from "./Navbars/Navbar.js";

// index page sections
import MainMenu from "./Menu/Menu.js";
//Loader
import { css } from "@emotion/core";
import FadeLoader from "react-spinners/FadeLoader";

import { fetchBargainsResult } from '../helpers/fetch.js';


// CSS - Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default class BargainResult extends React.Component {
  state = {
    results: [],
    loading: false
  }


  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;

    this.setState({ loading: true }); //Show Loading

    // this.verifyToken(this.props.location.search);

    fetchBargainsResult(this._onLoadCallBack.bind(this))
  }

  /**
   * Once versions have been loaded from the spreadsheet
   */
  _onLoadCallBack(data, error) {
    if (data) {
      console.log(data.results)
      this.setState({
        results: data.results,
        loading: false //Hide loading,
      })
    } else {
      this.setState({
        error: error
      })
    }
  }

  render() {
    const bargainsResult = this.state.results
    return (
      <>
        <Navbar />
        <main ref="main">
          <MainMenu />
        </main>
        <div style={{ position: "fixed", top: "35%", left: "48%" }}>
          <FadeLoader
            css={override}
            size={50}
            color={"#123abc"}
            loading={this.state.loading}
          />
        </div>
        {generateTableResults(bargainsResult)}
      </>
    );
  }
}

function generateTableResults(bargainsResult){

  return(
    <Table responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>userId</th>
          <th>#bargains taken</th>
          <th>#bargains shown</th>
          <th>#products seen</th>
          <th>#stores visited</th>
          <th>time looking a product in store (secs)</th>
          <th>average time looking a product in store</th>
          <th>average number of products seen in a store</th>
          <th>created_at</th>
        </tr>
      </thead>
      <tbody>
      {bargainsResult.map((item, i) =>
      <tr>
      <th scope="row">{i}</th>
      <td>{item.userId}</td>
      <td>{item.totalnumberofbargainstaken}</td>
      <td>{item.totalnumberofbargainsshown}</td>
      <td>{item.totalnumberofproductsseen}</td>
      <td>{item.totalnumberofstoresvisited}</td>
      <td>{item.totaltimelookingaproductinstoresecs}</td>
      <td>{item.averagetimelookingaproductinstore}</td>
      <td>{item.averagenumberofproductsseeninastore}</td>
      <td>{item.createdat}</td>
      </tr>)}
      </tbody>
    </Table>
  )
}