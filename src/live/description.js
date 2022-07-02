import React, { Component } from "react";
import LoadingSpin from "../component/loadingspin.js";
import Editable from "../component/editable";
class Description extends Component {
  render() {
    return (
      <div className="wroriir">
        <div className="holft-thiose-rinfjkr">
          <div className="edit-box-profile">
            <p>Title</p>
            <input
              onChange={this.props.haandleTitle}
              className="fullname-profile"
              type="text"
              name="username"
              placeholder="Title of the live..."
            />
          </div>
          <div className="edit-box-profile">
            <p>Description</p>
            <div className="wrappe-mmeshe-bio">
              <div
                onKeyUp={this.props.haandledescription}
                contentEditable="true"
                data-placeholder="Add a description of your live..."
                className="hold-edit-bio rjjrjrsn"
              ></div>
            </div>
          </div>
          <div className="control-thecancel-the-live">
            {this.props.loadingCreateLive ? (
              <button className="go-for-live active">
                <LoadingSpin />
              </button>
            ) : (
              <button onClick={this.props.live} className="go-for-live">
                <i className="fas fa-video"></i>
                <p>Live</p>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Description;
