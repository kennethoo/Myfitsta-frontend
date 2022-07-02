import React, { Component } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { BiCheck } from "react-icons/bi";
import { AiOutlineSearch, AiOutlineCamera } from "react-icons/ai";
import axios from "axios";
import ApiUrl from "../url";
import { withRouter } from "react-router-dom";
import Username from "../component/username";
import IconProfile from "../component/iconpicture";
import { BiArrowBack } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
class CreatGroupChat extends Component {
  state = {
    selected: [],
    next: false,
    imageGroup: null,
    name: "",
    profileGroup: "",
  };
  nextsilde = () => {
    if (this.state.selected.length > 0) {
      this.setState({
        next: !this.state.next,
      });
    }
  };

  savename = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  hanlePreview = (event) => {
    let file = event.target.files;
    if (file[0].type.includes("image")) {
      this.setState({
        imageGroup: file[0],
      });

      let formData = new FormData();
      formData.append("file", event.target.files[0]);
      axios
        .post(`${ApiUrl.Messaging}profilegroupe`, formData)
        .then((result) => {
          this.setState({
            profileGroup: result.data,
          });
        });
    }
  };

  seachPeopplrrre = () => {
    if (this.props.user) {
      if (this.props.user.Username) {
        axios
          .get(`${ApiUrl.Three}Myfollowings/${this.props.user.userid}/myfitsta`)
          .then((result) => {
            let list = [];
            if (result.data !== "no") {
              result.data.forEach((item) => {
                list.push({
                  userid: item.following,
                  _id: Math.random() * 10000000000,
                });
              });
              this.setState({
                people: list,
              });
            }
          });
      }
    }
  };

  selectedpeople = (e, data) => {
    let listp = [...this.state.selected];
    if (listp.filter((e) => e.userid === data.userid).length > 0) {
      let list = this.state.selected.filter((item) => {
        return item.userid !== data.userid;
      });
      this.setState({
        selected: list,
      });
    } else {
      let list = [...this.state.selected, data];
      this.setState({
        selected: list,
      });
    }
  };

  seachPeopple = (event) => {
    if (event.target.value.trim().length > 0) {
      axios
        .get(`/api/profilename/${event.target.value}`, {
          withCredentials: true,
        })
        .then((res) => {
          this.setState({
            people: res.data,
          });
        });
    } else {
      this.setState({
        people: [],
      });
    }
  };

  createGroup = () => {
    if (this.state.name.length > 2) {
      let option = {
        id: this.props.user.userid,
        user: this.props.user.userid,
        type: "group",
        members: this.state.selected,
        name: this.state.name,
        profileGroup: this.state.profileGroup,
        conversationId: uuidv4(),
      };

      axios
        .post(`/api/add/to/conversattion`, option, { withCredentials: true })
        .then((result) => {
          this.props.history.push(`/message/room/${result.data}`);
          this.props.handleGroupOpen();
        });
    }
  };

  componentDidMount = () => {
    let option = [{ userid: this.props.user.userid }];
    this.setState({
      selected: option,
    });
    // this.seachPeopplrrre()
  };

  render() {
    return (
      <div
        className={`gnjtjtjtjdt ${this.props.group == true ? "active" : ""}`}
      >
        <div
          className={`group-chat-box  ${
            this.state.next == true ? "active" : ""
          } `}
        >
          <div className="wrapeerjj">
            <div
              className={`boxjfjrtii ${
                this.state.next == false ? "active" : ""
              }`}
            >
              <div className="cresjfjf">
                <button
                  onClick={() => {
                    this.props.handleGroupOpen();
                  }}
                  className="close-that"
                >
                  {" "}
                  <IoCloseSharp />
                </button>
                <p>New Group</p>
              </div>
              <div className="screachfjjjoorjj">
                <div className="iconrjrnr">
                  <AiOutlineSearch />
                </div>
                <input
                  onChange={this.seachPeopple}
                  className="class-inoputoe"
                  placeholder="Seach Participants..."
                  type="text"
                />
              </div>

              <div className="wraper-otoor">
                <div className="wrajrkrsr">
                  <div className="hold-people-thst-hold-itj">
                    {this.state.selected?.map((item) => {
                      if (item.userid !== this.props.user.userid) {
                        return (
                          <div
                            className="people-iconfjjnrn  "
                            key={item.userid}
                          >
                            <div className="hold-the-icon">
                              <IconProfile user={item.userid} />
                            </div>
                            <Username user={item.userid} />
                            <div
                              onClick={(e) => {
                                this.selectedpeople(e, { userid: item.userid });
                              }}
                              className="hold-the-icon"
                            >
                              <IoCloseSharp />
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>

                <div className="box-that-reajfjjjrjrnjttf">
                  {this.state.people?.map((item) => {
                    return (
                      <div
                        onClick={(e) => {
                          this.selectedpeople(e, { userid: item.userid });
                        }}
                        className={`list-peopkojr ${
                          this.state.selected.some(
                            (e) => e.userid === item.userid
                          )
                            ? "active"
                            : ""
                        } `}
                        key={item._id}
                      >
                        <div className="inforisjjofjjr">
                          <IconProfile user={item.userid} />
                        </div>
                        <div className="ksiiriijr">
                          <Username user={item.userid} />
                        </div>
                        <div className="inforisjjorfjjr">
                          <p className="pinntjsjdjj">
                            <BiCheck />
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rhhjiushhf">
                <button onClick={this.nextsilde} className="add-shch">
                  CONTINUE
                </button>
              </div>
            </div>
            <div
              className={`fnjerfe ${this.state.next == true ? "active" : ""}`}
            >
              <div className="cresjfjf">
                <button onClick={this.nextsilde} className="close-that">
                  {" "}
                  <BiArrowBack />
                </button>
                <p>Details</p>
              </div>

              <div className="holf-the-info-fjr-ckf">
                <div className="wrsiiri">
                  <div className="fhehrh">
                    {this.state.imageGroup !== null ? (
                      <img src={URL.createObjectURL(this.state.imageGroup)} />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="fjj">
                    <div className="edit0butgjgtoor  ">
                      <button>
                        <label htmlFor="file-profile">
                          <AiOutlineCamera />
                        </label>
                      </button>
                      <input
                        onChange={this.hanlePreview}
                        id="file-profile"
                        type="file"
                        accept="image/x-png,image/gif,image/jpeg"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="hilf-the-detail">
                <div className="edit-box-profile">
                  <label htmlFor="title">Group Name</label>
                  <input
                    onChange={this.savename}
                    className="username-profile"
                    type="text"
                    placeholder="Add a name..."
                  />
                </div>

                <div className="rhhjiushhf">
                  <button onClick={this.createGroup} className="add-shch">
                    CREATE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CreatGroupChat);
