import React, { Component } from "react";
import axios from "axios";
import IconProfile from "../component/iconpicture";
import Username from "../component/username";
import Mediafind from "../component/mediafind";

class PostMessage extends Component {
  state = {
    icon: null,
    data: null,
  };

  loadimgage = () => {
    axios
      .get(`/api/imageinfo/${this.props.item.content}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data) {
          this.setState({
            data: res.data,
          });
          document.querySelector(".box-hold-convertion").scrollTop =
            document.querySelector(".box-hold-convertion").scrollHeight;
        }
      });
  };

  componentDidMount = () => {
    this.loadimgage();
  };

  render() {
    return this.state.data !== null ? (
      <div className="box-that-boifnnf">
        <div className="hold-that-imghj-wraoerk-post">
          <div className="header-post">
            <div className="icon0tjnnr">
              <IconProfile user={this.props.item.sender} />
            </div>
            <div className="usernamerrjjr">
              <Username user={this.props.item.sender} />
            </div>
          </div>
          <div className="hold0-thatpost">
            <Mediafind filename={this.props.item.content} />
          </div>
        </div>
        <div className="hold-thjat-data"></div>
      </div>
    ) : (
      ""
    );
  }
}

export default PostMessage;
