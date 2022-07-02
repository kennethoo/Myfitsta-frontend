import React, { Component } from "react";
import { Link } from "react-router-dom";
class LiveEnd extends Component {
  state = {
    ending: false,
  };
  render() {
    return (
      <div className="liveendrrr">
        <div className="card-tolanch-the-live">
          <div className="title-of--thise-action rhbrnr">
            <p className="ejjjtb">Live Ended</p>
          </div>
          <div className="wraprkrkrrrr">
            <Link to={"/home"} className="box-that-hold-the-setting">
              <div className="hold-thatiocom">
                <i className="fas fa-home"></i>
              </div>
              <button className="edit-the-program"> Home</button>
            </Link>
            <Link to={"/live"} className="box-that-hold-the-setting">
              <div className="hold-thatiocom">
                <i className="fas fa-video"></i>
              </div>
              <button className="edit-the-program">Create Live Workout</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default LiveEnd;
