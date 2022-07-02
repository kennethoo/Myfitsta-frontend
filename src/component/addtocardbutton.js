import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ImCheckmark } from "react-icons/im";
import { connect } from "react-redux";
class AddTocardButton extends Component {
  state = {
    posted: [],
    card: [],
  };

  getCardInfo = () => {
    axios.get("/api/my-card", { withCredentials: true }).then((res) => {
      if (res.data.item) {
        let list = [...res.data.item];
        console.log(list);
        this.setState({
          card: list,
        });
      }
    });
  };

  addToCard = (id) => {
    let item = {
      programId: id,
      selected: true,
    };

    let option = {
      userid: this.props.users.userid,
      item: item,
    };

    axios.post("/api//add-a-program-to-my-card", option).then((res) => {
      this.getCardInfo();
    });
  };

  componentDidMount = () => {
    this.getCardInfo();
  };
  render() {
    return (
      <div className="box-theprocedt0-thecheckk">
        {this.state.card.some((i) => i.programId == this.props.id) ? (
          <button className="add-to-card">
            {" "}
            <ImCheckmark className="added" /> Added to card
          </button>
        ) : (
          <button
            onClick={() => {
              this.addToCard(this.props.id);
            }}
            className="add-to-card"
          >
            {" "}
            <AiOutlineShoppingCart className="sho-ico" /> Add to card
          </button>
        )}
      </div>
    );
  }
}

const mapstateToProps = (state) => {
  return {
    users: state.user,
  };
};
export default connect(mapstateToProps)(withRouter(AddTocardButton));
