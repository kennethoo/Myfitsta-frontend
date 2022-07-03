import React, { Component } from "react";
import axios from "axios";
import ApiUrl from "../url";
import { Link } from "react-router-dom";
import Username from "../component/username";
import IconProfile from "../component/iconpicture";
import socket from "../socketConfig";
export default class ShowLive extends Component {
  state = {
    online: [],
    open: false,
  };

  getOnline = () => {
    axios
      .get(`/api/open-live-room/${this.props.user.userid}`)
      .then((res) => {
        if (res.data !== "") {
          this.setState({
            open: true,
            online: res.data.account.reverse(),
          });
        } else {
          this.setState({
            open: false,
            online: [],
          });
        }
      });
  };

  componentWillUnmount = () => {
    socket.off("new-live-user");
  };

  componentDidMount = () => {
    socket.on("new-live-user", (data) => {
      this.getOnline();
    });
    this.getOnline();
  };

  render() {
    return (
      <div
        className={`liv-workot-streaming  ${
          this.state.open == true ? "active" : ""
        }`}
      >
        <div className="titeehwhle">Live Streaming</div>
        <div className="holfk-fnnfnf">
          {this.state.online?.map((item) => {
            return (
              <div className="box-room-container" key={item._id}>
                <div className="hold-img-link">
                  <IconProfile live={true} user={item.broadcasterId} />
                </div>
                <div className="broad-caster-name">
                  <Username user={item.broadcasterId} />
                </div>
                <Link className="linkfnjfkr" to={`/live/${item.roomId}`}></Link>
              </div>
            );
          })}

          {/*<div className="box-room-container" key={"6147885ad533ae82e52fe9c9"}>
				<div className="hold-img-link">
				<IconProfile  user={"6147885ad533ae82e52fe9c9"} />
				</div>
				<div className="broad-caster-name"><Username user={"6147885ad533ae82e52fe9c9"} /></div>
                <Link className="linkfnjfkr" to={`/live/${"44i4i44ii4i4i4"}`}></Link>
			</div>*/}
        </div>
      </div>
    );
  }
}
