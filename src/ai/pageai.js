import React, { Component } from "react";
import Nav from "../component/nav";
class Pageai extends Component {
  render() {
    return (
      <div className="conatiner">
        <Nav user={this.props.user} />
        <div id="app">
          <div id="body-tabs">
            <div className="wraperr-box-page">
              <div className="tabss-br">
                <div>SQUAT</div>
                <div>0</div>
                <button>Begin</button>
              </div>
              <div className="wrapepror-br">
                <div className="wraperr-box-video"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Pageai;
