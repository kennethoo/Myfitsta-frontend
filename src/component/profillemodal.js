import React, { Component } from "react";
import axios from "axios";
import MessageButton from "../component/messageSomeone";
import ButtonFollow from "../component/buttonFollow";
import { Link } from "react-router-dom";
import IconProfile from "../component/iconpicture";
class ProfileModal extends Component {
  state = {
    profile: {},
  };

  loadProfile = () => {
    this.setState({
      profile: {},
    });
    axios
      .get(`/api/profile/${this.props.user}`, { withCredentials: true })
      .then((res) => {
        if (res.data.Username) {
          this.setState({
            //profile:res.data
          });
        }
      });
  };
  componentDidUpdate = (prevProps) => {};
  componentDidMount = () => {};

  render() {
    return this.props.profile.useriid ? (
      <div className="box-that-hold-theprofile-ui-desios">
        <div className="box-wraper-thebox-of-cnsjf">
          <div className="wraper-the-icob">
            <IconProfile user={this.props.user} />
          </div>
          <div className="wraper-the-infrofjjsjnnnsn">
            <div className="name-p">{this.props.profile.Username}</div>
            <div className="info-acctt">
              <div className="all">
                <div className="number-post">
                  {this.props.profile.postnumber}
                </div>
                <p>Post</p>
              </div>
              <div className="all">
                <Link to={`user/${this.props.profile.Username}/follower`}>
                  {this.props.profile.numberfollowers} Followers
                </Link>
              </div>
              <div className="all">
                <Link to={`user/${this.props.profile.Username}/following`}>
                  {this.props.profile.numberfollowings} Following
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="wroarr-homfhjfj">
          <MessageButton friend={this.props.profile.userid} />
          <ButtonFollow friend={this.props.profile.userid} />
        </div>
        <div className="holf-the-bio">
          <p dangerouslySetInnerHTML={{ __html: this.props.profile.bio }}></p>
        </div>
      </div>
    ) : (
      ""
    );
  }
}
export default ProfileModal;
