import React, { Component } from "react";
import Nav from "../component/nav";
import axios from "axios";
import "braintree-web";
import { withRouter } from "react-router-dom";
let source;
source = axios.CancelToken.source();
class Checkout extends Component {
  instance;
  state = {
    item: null,
  };
  constructor(props) {
    super(props);
    source = axios.CancelToken.source();
  }
  componentDidMount() {}

  render() {
    return (
      <div className="conatiner" ref={this.container}>
        <Nav user={this.props.user} />
        <div id="app">
          <div id="body-tabs">
            <div className="holdt-he-checkut-info"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Checkout);
