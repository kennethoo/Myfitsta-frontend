import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import ApiUrl from "../url";
import { BiCheck } from "react-icons/bi";
import { BiArrowBack } from "react-icons/bi";
class NotificationAc extends Component {
  state = {
    notification: [
      {
        title: "Likes",
        detail: "These notifications notify you when someone likes your post.",
        data: ["From everyone", "From people I'am Following", "Off"],
      },

      {
        title: "Comment",
        detail:
          "These notifications notify you when someone comment on your post ",
        data: ["From everyone", "From people I'am Following", "Off"],
      },
      {
        title: "Follow Requests Accepted",
        detail:
          "These notifications notify you when someone wishes to follow you.",
        data: ["From everyone", "From people I'am Following", "Off"],
      },

      {
        title: "Message",
        detail:
          "These notifications notify you when someone new send you a message",
        data: ["From everyone", "From people I'am Following", "Off"],
      },

      {
        title: "The Number of Video Views",
        detail:
          "These notifications notify you when you have a certain number of view on your post",
        data: ["On", "off"],
      },

      {
        title: "Tagged you",
        detail:
          "These notifications notify you when you have a certain number of view on your post",
        data: ["From everyone", "From people I'am Following", "Off"],
      },

      {
        title: "Subscribers",
        detail:
          "These notifications notify you when you have new Subscribers on MyFitstapro",
        data: ["From everyone", "From people I'am Following", "Off"],
      },
    ],
  };
  goBack = () => {
    this.props.history.goBack();
  };

  componentDidMount = () => {};
  render() {
    return (
      <div className="wrrapeerr-uoirjr-cham">
        <div className="title-edit">
          <div className="before-edit">
            <div onClick={this.goBack} className="back-button">
              <BiArrowBack />
            </div>
            <p>Push Notification</p>
          </div>
        </div>

        {this.state.notification?.map((item) => {
          return (
            <div className="wraper-to-box-not" key={Math.random() * 100000000}>
              <div className="title-otsr">{item.title}</div>
              <div className="div-item-messanr">{item.detail}</div>
              <div className="eutuu-lisjtj">
                <div className="tismrtos-tisj">
                  {item.data.map((data) => {
                    return (
                      <div className="lisjr" key={Math.random() * 100000000}>
                        <p>{data}</p>
                        <div className="add-to-this-collection ">
                          <div className="savethat-ccolelti"></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
export default withRouter(NotificationAc);
