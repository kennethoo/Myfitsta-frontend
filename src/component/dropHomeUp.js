import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";
class DropHomeUp extends Component {
  state = {
    open: false,
    title: "",
    description: "",
    file: null,
    button: false,
    preview: null,
  };

  render() {
    return (
      <div
        className={`boxmenuefnf rgrhhrhrhh  ${
          this.props.drop == false ? "" : "active"
        }`}
      >
        <div className="title-of--thise-action rhbrnr">
          <button
            onClick={() => this.props.handloption(false)}
            className="close-that"
          >
            <IoCloseSharp />
          </button>
          <p>Option</p>
        </div>
        <div className="wraprkrkrrrr">
          <Link to={"/post"} className="box-that-hold-the-setting">
            <div className="hold-thatiocom">
              <i className="far fa-plus-square"></i>
            </div>
            <button className="edit-the-program"> New Post</button>
          </Link>
          <Link to={"/live"} className="box-that-hold-the-setting">
            <div className="hold-thatiocom">
              <i className="fas fa-video"></i>
            </div>
            <button className="edit-the-program">Live Workout</button>
          </Link>
          <Link to={"/ai"} className="box-that-hold-the-setting">
            <div className="hold-thatiocom">
              <AiOutlineShoppingCart />
            </div>
            <button className="edit-the-program">New Ai</button>
          </Link>
          <Link to={"/card"} className="box-that-hold-the-setting">
            <div className="hold-thatiocom">
              <AiOutlineShoppingCart />
            </div>
            <button className="edit-the-program">Shoping Card</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default DropHomeUp;
