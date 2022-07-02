import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
class Shopbar extends Component {
  state = {
    card: [],
  };

  getCardInfo = () => {
    axios.get("/api/my-card", { withCredentials: true }).then((res) => {
      if (res.data.item) {
        let list = [...res.data.item];
        this.setState({
          card: list,
        });
      }
    });
  };

  componentDidMount = () => {
    this.getCardInfo();
  };
  render() {
    return (
      <div className="title-of-prodf">
        <div className="back-button">
          <BiArrowBack />
        </div>
        <p className="tti-rh">Workout profile</p>
        <div className="wure">
          <div className="back-button">
            <Link to={"/card"}>
              <AiOutlineShoppingCart className="shoiton" />
            </Link>
          </div>
          <p className="numberr-cardf">{this.state.card.length}</p>
          <div className="back-button">
            <i className="fas fa-ellipsis-v"></i>
          </div>
        </div>
      </div>
    );
  }
}

export default Shopbar;
