import React, { Component } from "react";
import { MdModeEdit } from "react-icons/md";
import { connect } from "react-redux";
import axios from "axios";
import LoadingSpin from "../component/loadingspin.js";
import Editable from "../component/editable";
import profile from "../profile.webp";
import { AiFillDelete } from "react-icons/ai";
import ApiUrl from "../url";
class Account extends Component {
  state = {
    previewBanner: null,
    previewsIcon: null,
    bio: "",
    data: null,
  };

  handleChangebanner = (event) => {
    let file = event.target.files;
    if (file[0].type.includes("image")) {
      this.setState({
        previewBanner: null,
      });

      let formData = new FormData();
      formData.append("file", event.target.files[0]);
      formData.append("Userid", this.props.user.userid);
      axios.post(`/api/bannerimagepro`, formData).then((result) => {
        this.setState({
          previewBanner: result.data.banner,
        });
      });
    }
  };

  handleUpdate = () => {
    let option = {
      userid: this.props.user.userid,
      bio: this.state.bio,
    };

    axios
      .post(`/api/update-my-info-for-myprofilepro`, option)
      .then((result) => {
        console.log(result.data);
      });
  };

  handleBio = (event) => {
    this.setState({
      bio: event.target.innerHTML,
    });
  };
  handleRemove = (data) => {
    if (data == 1) {
      this.setState({
        previewsIcon: null,
      });
      let option = {
        userid: this.props.user.userid,
      };
      axios.post(`/api/remove-profileprop`, option).then((result) => {
        this.setState({
          previewsIcon: result.data.profile,
        });
      });
    } else {
      this.setState({
        previewBanner: null,
      });
      let option = {
        userid: this.props.user.userid,
      };
      axios.post(`/api/remove-bannerpro`, option).then((result) => {
        this.setState({
          previewBanner: "",
        });
      });
    }
  };

  handleChangeIncon = (event) => {
    console.log("fkfoffo");
    let file = event.target.files;
    if (file[0].type.includes("image")) {
      this.setState({
        previewsIcon: null,
      });
      let formData = new FormData();
      formData.append("file", event.target.files[0]);
      formData.append("Userid", this.props.user.userid);
      axios.post(`/api/profileimagepro`, formData).then((result) => {
        console.log(result);
        this.setState({
          previewsIcon: result.data.profileUrl,
        });
      });
    }
  };

  getData = () => {
    axios
      .get("/api/check-myfitstapro", { withCredentials: true })
      .then((res) => {
        if (res.data._id) {
          this.setState({
            data: res.data,
            bio: res.data.bio,
            previewBanner: res.data.banner,
            previewsIcon: res.data.profileUrl,
          });
        }
      });
  };

  componentDidMount = () => {
    this.getData();
  };

  render() {
    return this.state.data !== null ? (
      <div className="edit">
        {/* <div className="handdlkekke">
			 <button className="active">Activate</button>
		 </div>*/}
        <div className="box-tht0-holt-banner up ">
          {this.state.previewBanner !== null ? (
            this.state.previewBanner.length > 0 ? (
              <div className="edit0buttoor  ">
                <button
                  onClick={() => {
                    this.handleRemove(2);
                  }}
                >
                  <AiFillDelete />
                </button>
              </div>
            ) : (
              <div className="edit0buttoor">
                <button>
                  <label htmlFor="file-profile">
                    <MdModeEdit />
                  </label>
                </button>
                <input
                  onChange={this.handleChangebanner}
                  id="file-profile"
                  type="file"
                  accept="image/x-png,image/gif,image/jpeg"
                />
              </div>
            )
          ) : (
            ""
          )}
          <div className="holf-the-iconf banner">
            {this.state.previewBanner !== null ? (
              this.state.previewBanner.length > 0 ? (
                <img
                  src={`${ApiUrl.content}${this.state.previewBanner}`}
                  loading="lazy"
                />
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="box-edit-one">
          <div className="profile-edit-img">
            {this.state.previewsIcon !== null ? (
              this.state.previewsIcon.length > 0 ? (
                <div className="edit0buttoor center ">
                  <button
                    onClick={() => {
                      this.handleRemove(1);
                    }}
                  >
                    <AiFillDelete />
                  </button>
                </div>
              ) : (
                <div className="edit0buttoor center ">
                  <button>
                    <label htmlFor="file-profilee">
                      <MdModeEdit />
                    </label>
                  </button>
                  <input
                    onChange={this.handleChangeIncon}
                    id="file-profilee"
                    type="file"
                    accept="image/x-png,image/gif,image/jpeg"
                  />
                </div>
              )
            ) : (
              ""
            )}

            <div className="holf-the-iconf">
              {this.state.previewsIcon !== null ? (
                this.state.previewsIcon.length > 0 ? (
                  <img
                    src={`${ApiUrl.content}${this.state.previewsIcon}`}
                    loading="lazy"
                  />
                ) : (
                  <img src={profile} loading="lazy" />
                )
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="box-edit-two">
            <p>{this.props.user.Username}</p>
            <p>{this.props.user.fullName}</p>
          </div>
        </div>

        <div className="form">
          <div className="edit-box-profile">
            <p>Bio</p>

            <div className="watpr-contnr-mem edit-forr">
              <div className="wrappe-mmeshe-bio">
                <Editable handleBio={this.handleBio} html={this.state.bio} />
              </div>
            </div>
          </div>
        </div>
        <div className="save-option">
          <button onClick={this.handleUpdate} className="update-profile">
            Save change
          </button>
        </div>
      </div>
    ) : (
      <div className="bixnknfkfjkjrjr">
        <LoadingSpin />
      </div>
    );
  }
}
const mapstateToProps = (state) => {
  return {
    user: state.user,
    pro: state.pro,
  };
};
export default connect(mapstateToProps)(Account);
