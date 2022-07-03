import React, { Component } from "react";
import axios from "axios";
import { MdModeEdit } from "react-icons/md";
import { withRouter } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import profile from "../profile.webp";
import LoadingSpin from "../component/loadingspin";
import { AiFillDelete } from "react-icons/ai";
import Editable from "../component/editable";
import ApiUrl from "../url";
let source;
source = axios.CancelToken.source();
class Edit extends Component {
  state = {
    previewsIcon: null,
    previewBanner: null,
    UpdateButton: false,
    email: "",
    fullName: "",
    username: "",
    website: "",
    bio: "",
    loading: false,
    usernameTaken: "",
    websitemessage: "",
    loading: false,
  };
  constructor(props) {
    super(props);
    source = axios.CancelToken.source();
  }

  validURL = (str) => {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator

    let result = !!pattern.test(str);
    return result;
  };
  goBack = (e) => {
    this.props.history.goBack();
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
      axios.post(`/api/bannerimage`, formData).then((result) => {
        this.setState({
          previewBanner: result.data.banner,
        });
      });
    }
  };

  handleRemove = (data) => {
    if (data == 1) {
      this.setState({
        previewsIcon: null,
      });
      let option = {
        userid: this.props.user.userid,
      };
      axios.post(`/api/remove-profile`, option).then((result) => {
        console.log(result);
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
      axios.post(`/api/remove-banner`, option).then((result) => {
        this.setState({
          previewBanner: "",
        });
      });
    }
  };

  handleChangeIncon = (event) => {
    let file = event.target.files;
    if (file[0].type.includes("image")) {
      this.setState({
        previewsIcon: null,
      });

      let formData = new FormData();
      formData.append("file", event.target.files[0]);
      formData.append("Userid", this.props.user.userid);

      axios.post(`/api/profileimage`, formData).then((result) => {
        this.setState({
          previewsIcon: result.data.profile,
        });
      });
    }
  };

  handleChange = (event) => {
    if (event.target.name == "fullName") {
      this.setState({
        fullName: event.target.value,
        UpdateButton: true,
      });
    }

    if (event.target.name == "username") {
      this.setState({
        username: event.target.value,
        UpdateButton: true,
      });
    }

    if (event.target.name == "website") {
      this.setState({
        website: event.target.value,
        UpdateButton: true,
      });
    }

    /*if(event.target.name=="email"){
			this.setState({
				email:event.target.value
			})
		}
*/
  };

  handleBio = (event) => {
    this.setState({
      bio: event.target.innerHTML,
      UpdateButton: true,
    });
  };

  handleUpdate = () => {
    this.setState({
      loading: true,
    });
    if (this.state.username !== this.props.user.Username) {
      let option = {
        username: this.state.username,
        email: this.props.user.email,
      };
      axios.post(`/api/update-username`, option).then((data) => {
        if (data.data.succes == true) {
          window.location.reload();
        } else {
          this.setState({
            usernameTaken: "Sorry this username is taken",
            loading: false,
          });
        }
      });
    } else {
      if (
        this.state.fullName !== this.props.user.fullName ||
        this.state.bio !== this.props.user.bio ||
        this.state.website !== this.props.user.website
      ) {
        if (
          this.state.website !== this.props.user.website &&
          this.state.website.length > 0
        ) {
          if (this.validURL(this.state.website)) {
            let option = {
              userid: this.props.user.userid,
              fullName: this.state.fullName,
              website: this.state.website,
              bio: this.state.bio,
            };
            axios
              .post(`/api/update-my-info-for-myprofile`, option)
              .then((result) => {
                window.location.reload();
              });
          } else {
            this.setState({
              websitemessage: "Invalid url",
              loading: false,
            });
          }
        } else {
          let option = {
            userid: this.props.user.userid,
            fullName: this.state.fullName,
            website: this.state.website,
            bio: this.state.bio,
          };
          axios
            .post(`/api/update-my-info-for-myprofile`, option)
            .then((result) => {
              window.location.reload();
            });
        }
      } else {
        this.setState({
          loading: false,
        });
      }
    }
  };
  componentDidMount = () => {
    this.setState({
      email: this.props.user.email,
      fullName: this.props.user.fullName,
      username: this.props.user.Username,
      website: this.props.user.website,
      bio: this.props.user.bio,
      previewBanner: this.props.user.banner,
      previewsIcon: this.props.user.profile,
    });
  };

  componentWillUnmount = () => {
    if (source) {
      source.cancel("Landing Component got unmounted");
    }
  };
  render() {
    return (
      <div className="box-profile-eidt">
        <div className="box-generelfunction-edit">
          <div className="tabs-edit-naviagation">
            <div className="title-edit">
              <div className="before-edit">
                <div onClick={this.goBack} className="close-that">
                  <BiArrowBack />
                </div>
                <p>Edit Profile</p>
              </div>
            </div>
            <div className="edit">
              <div className="box-tht0-holt-banner">
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
                    <div className="edit0buttoor  ">
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
                  <p>Full name</p>

                  <input
                    onChange={this.handleChange}
                    className="fullname-profile"
                    type="text"
                    name="fullName"
                    placeholder={this.props.user.fullName}
                    value={this.state.fullName}
                  />
                </div>

                <div className="edit-box-profile">
                  <label htmlFor="username">Username</label>
                  <input
                    onChange={this.handleChange}
                    className="username-profile"
                    type="text"
                    name="username"
                    placeholder={this.props.user.Username}
                    value={this.state.username}
                  />
                </div>
                <p className="messsage" id="message-password">
                  {this.state.usernameTaken}
                </p>
                <div className="edit-box-profile">
                  <p>Email</p>
                  <input
                    onChange={this.handleChange}
                    className="email-profile"
                    type="text"
                    name="email"
                    placeholder={this.props.user.email}
                    value={this.state.email}
                  />
                </div>

                <div className="edit-box-profile">
                  <p>Bio</p>

                  <div className="watpr-contnr-mem edit-forr">
                    <div className="wrappe-mmeshe-bio">
                      <Editable
                        handleBio={this.handleBio}
                        html={this.props.user.bio}
                      />
                    </div>
                  </div>
                </div>
                <div className="edit-box-profile">
                  <label htmlFor="Website">Website</label>
                  <input
                    onChange={this.handleChange}
                    className="website-profile"
                    type="text"
                    name="website"
                    placeholder={this.props.user.website}
                    value={this.state.website}
                  />
                </div>
                <p className="messsage" id="message-password">
                  {this.state.websitemessage}
                </p>
              </div>
              <div className="save-option">
                {this.state.loading ? (
                  <button className={`update-profile active`}>
                    <LoadingSpin />
                  </button>
                ) : (
                  <button
                    onClick={this.handleUpdate}
                    className={`update-profile`}
                  >
                    Save change
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Edit);
