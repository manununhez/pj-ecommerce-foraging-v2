import React from "react";

// reactstrap components
import {
  Nav, NavLink, NavItem, Table
} from 'reactstrap';

// core components
import Navbar from "./Navbars/Navbar.js";

// index page sections
import MainMenu from "./Menu/Menu.js";
//Loader
import { css } from "@emotion/core";
import FadeLoader from "react-spinners/FadeLoader";

import { fetchUsers } from '../helpers/fetch.js';

// CSS - Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default class BargainResult extends React.Component {
  state = {
    users: [],
    usersPartial: [],
    loading: false
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;

    this.setState({ loading: true }); //Show Loading

    // this.verifyToken(this.props.location.search);

    fetchUsers(this._onLoadUsersCallBack.bind(this))
  }

  /**
 * Once users have been loaded from the spreadsheet
 */
  _onLoadUsersCallBack(data, error) {
    if (data) {
      this.setState({
        users: data.users,
        usersPartial: data.usersPartial,
        loading: false, //Hide loading
      })
      console.log(this.state)
    } else {
      this.setState({
        error: error
      })
    }
  }

  render() {
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
        {(this.state.users.length > 0) ?
          <><h5>Finished sessions</h5>
            {getTable(this.state.users, "c")}
            <br /><br />
          </> : <></>}

        {(this.state.usersPartial.length > 0) ?
          <><h5>Partial sessions</h5>
            {getTable(this.state.usersPartial, "p")}
            <br /><br />
          </> : <></>}
      </>
    );
  }
}

function getTable(users, resultsType) {
  return (<>
    <Nav vertical>
      <NavItem><NavLink href={"https://api.swps-pjatk-experiment.pl/v3/bargains-result/" + resultsType}>Bargain results (all users)</NavLink></NavItem>
      <NavItem><NavLink href={"https://api.swps-pjatk-experiment.pl/v3/bargains-result-per-store/" + resultsType}>Bargain results per store (all users)</NavLink></NavItem>
      <NavItem><NavLink href={"https://api.swps-pjatk-experiment.pl/v3/survey-result/" + resultsType}>Survey results (all users)</NavLink></NavItem>
      <NavItem><NavLink href={"https://api.swps-pjatk-experiment.pl/v3/demographic-result/" + resultsType}>Demographic results (all users)</NavLink></NavItem>
      <NavItem><NavLink href={"https://api.swps-pjatk-experiment.pl/v3/memory-result/" + resultsType}>Memory task results (all users)</NavLink></NavItem>
    </Nav>
    <br />
    <Table responsive bordered size="sm">
      <thead>
        <tr>
          <th className="align-middle" style={{ textAlign: 'center', padding: '7px' }}>Users</th>
          <th className="align-middle" style={{ textAlign: 'center', padding: '7px' }}>Timestamp</th>
          <th className="align-middle" style={{ textAlign: 'center', padding: '7px' }}>Bargain results</th>
          <th className="align-middle" style={{ textAlign: 'center', padding: '7px' }}>Bargain results per store</th>
          <th className="align-middle" style={{ textAlign: 'center', padding: '7px' }}>Survey results</th>
          <th className="align-middle" style={{ textAlign: 'center', padding: '7px' }}>Demographic results</th>
          <th className="align-middle" style={{ textAlign: 'center', padding: '7px' }}>Memory task results</th>
        </tr>
      </thead>
      <tbody>
        {getTableBody(users, resultsType)}
      </tbody>
    </Table>
  </>);
}

function getTableBody(users, resultsType) {
  let body = []
  for (let i = 0; i < users.length; i++) {
    body.push(
      <tr style={{ textAlign: '-webkit-center' }}>
        <td style={{ textAlign: "-moz-center" }}>
          {users[i].user_id}
        </td>
        <td style={{ textAlign: "-moz-center" }}>
          {users[i].created_at}
        </td>
        <td style={{ textAlign: "-moz-center" }}>
          <NavLink href={"https://api.swps-pjatk-experiment.pl/v3/bargains-result/" + resultsType + "/" + users[i].user_id}>Download</NavLink>
        </td>
        <td style={{ textAlign: "-moz-center" }}>
          <NavLink href={"https://api.swps-pjatk-experiment.pl/v3/bargains-result-per-store/" + resultsType + "/" + users[i].user_id}>Download</NavLink>
        </td>
        <td style={{ textAlign: "-moz-center" }}>
          <NavLink href={"https://api.swps-pjatk-experiment.pl/v3/survey-result/" + resultsType + "/" + users[i].user_id}>Download</NavLink>
        </td>
        <td style={{ textAlign: "-moz-center" }}>
          <NavLink href={"https://api.swps-pjatk-experiment.pl/v3/demographic-result/" + resultsType + "/" + users[i].user_id}>Download</NavLink>
        </td>
        <td style={{ textAlign: "-moz-center" }}>
          <NavLink href={"https://api.swps-pjatk-experiment.pl/v3/memory-result/" + resultsType + "/" + users[i].user_id}>Download</NavLink>
        </td>
      </tr>
    )
  }

  return body;
}