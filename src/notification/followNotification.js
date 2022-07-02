import React, { Component } from "react";
import axios from "axios";
import IconProfile from "../component/iconpicture";
import Username from "../component/username";
import ButtonFollow from "../component/buttonFollow";
class FollowNotification extends Component {
  state = {
    username: null,
    media: null,
  };

  getmedia = () => {
    axios
      .get(`/api/imageinfo/${this.props.item.media}`, { withCredentials: true })
      .then((res) => {
        if (res.data.filename) {
          this.setState({
            media: res.data,
          });
        } else {
        }
      });
  };
  componentDidMount = () => {
    //this.getmedia()
  };
  render() {
    return (
      <div className="div-hold-hold-thenotification">
        <div className="wjsjrhrnnff ">
          <div className="icon-of-thedube">
            {this.props.item ? (
              <IconProfile user={this.props.item.notifiyiId} />
            ) : (
              ""
            )}
          </div>
          <div className="messahrhrn-nott">
            <div className="ejwjjr"></div>{" "}
            {this.props.item ? (
              <Username link={true} user={this.props.item.notifiyiId} />
            ) : (
              ""
            )}
            <div className="bmhjn"> Sarted following you</div>
          </div>

          <div className="div-that-wraper-the-imga3-btotnjrn">
            <ButtonFollow friend={this.props.item.notifiyiId} />
          </div>
        </div>

        {/*<div className="itjejmsmf">
            <button><i className="fas fa-ellipsis-v"></i></button>
        </div>*/}
      </div>
    );
  }
}

export default FollowNotification;
