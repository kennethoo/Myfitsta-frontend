import React, { Component } from "react";
import { IoCloseSharp } from "react-icons/io5";
import LoadingSpin from "../component/loadingspin";

class EndLive extends Component {
  state = {
    ending: false,
  };
  endLive = (data) => {
    this.setState({
      ending: true,
    });
    this.props.handleEnlive(true);
  };
  render() {
    return (
      <div className={`overlay-workoiut-live-box active`}>
        <div className="card-tolanch-the-live">
          <div className="title-of--thise-action rhbrnr">
            <button
              onClick={() => {
                this.props.openBoxEndlive(false);
              }}
              className="close-that"
            >
              <IoCloseSharp />
            </button>
            <p>End Live</p>
          </div>
          <p className="rteisjr">Are you sure you want to end the Live?</p>
          <div className="yes-no">
            {this.state.ending ? (
              <button className="active">
                <LoadingSpin />
              </button>
            ) : (
              <button
                onClick={() => {
                  this.endLive();
                }}
              >
                End Live
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default EndLive;
