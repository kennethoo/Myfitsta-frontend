import React, { Component } from "react";
import axios from "axios";
import ApiUrl from "../url";
class ProfilePromessage extends Component {
  state = {
    icon: null,
    data: null,
    post: null,
    profile: null,
  };
  getprofilrhhhfhe = () => {
    axios
      .get(`/api/myfitstapro/${this.props.item.content}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.Username) {
          this.setState({
            profile: res.data,
          });
        } else {
        }
      });
  };

  componentDidMount = () => {
    this.getprofilrhhhfhe();
  };

  render() {
    return (
      <div className="wrspejrj-profilej">
        {this.state.profile !== null ? (
          <div className="rjrjr">
            <div className="header-post">
              <div className="icon0tjnnr">
                <img
                  src={`${ApiUrl.content}${this.state.profile.profileUrl}`}
                  loading="lazy"
                />
              </div>
              <div className="usernamerrjjr">{this.state.profile.Username}</div>
            </div>
            <div className="barjsjj">
              <div className="box-thjtjtjr">
                {this.state.profile.numberOfProgram} Program
              </div>
              <div className="box-thjtjtjr fjjr">
                {this.state.profile.numberOfSubscriber} Subscribers
              </div>
            </div>
            <div className="rjrrj=tearjr"></div>
            <div className="wrsprrkrjjrjjr"></div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default ProfilePromessage;
