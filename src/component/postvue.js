import React, { Component } from "react";
import Mediafind from "../component/mediafind";

class PostVue extends Component {
  state = {
    posted: [],
    likeks: [],
  };

  render() {
    return (
      <div className="card-tharholdeverujks">
        <Mediafind filename={this.props.item.filename.toString()} />
      </div>
    );
  }
}
export default PostVue;
