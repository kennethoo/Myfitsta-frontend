import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import LastMessage from "../component/lastmessage";
import IconProfile from "../component/iconpicture";
import Username from "../component/username";

class Convercard extends Component {
  componentDidMount = () => {};

  render() {
    return (
      <div
        className={`box-hold-friend-totalkwith ${
          this.props.item.userid == this.props.match.params.id ? "active" : ""
        }`}
        key={this.props.data}
      >
        <Link
          to={`/message/${this.props.item.userid}`}
          className="redirec-toconver"
        ></Link>
        <div className="profie-img">
          <IconProfile live={true} user={this.props.item.userid} />
        </div>
        <div className="info-about-conversation">
          <div className="name-of-fiend">
            <Username user={this.props.item.userid} />
            <p className="daytn"></p>
          </div>
          <div className="last-conversation">
            <LastMessage item={this.props.item} />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Convercard);
