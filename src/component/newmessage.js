import React, { Component } from "react";
import axios from "axios";
import Username from "../component/username";
import IconProfile from "../component/iconpicture";
import { withRouter } from "react-router-dom";
import { BiCheck } from "react-icons/bi";
import ApiUrl from "../url";
import LoadingSpin from "./loadingspin";
import socket from "../socketConfig";
import { AiOutlineSearch } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { connect } from "react-redux";
let people = 0;
class Newmessage extends Component {
  state = {
    people: [],
    selected: [],
    loadding: false,
  };

  seachPeopplrrre = () => {
    if (this.props.user) {
      if (this.props.user.Username) {
        axios
          .get(
            `/api/Myfollowings/${this.props.user.userid}/myfitsta/10`
          )
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

  continue = () => {
    people = 0;
    if (this.state.selected.length > 0) {
      this.setState({
        loadding: true,
      });
      this.addPeoppe();
    } else {
    }
  };

  addPeoppe = () => {
    let option = {
      id: this.state.selected[people].userid,
      user: this.props.users.userid,
      profileGroup: "",
      type: "inbox",
      members: [],
      name: "",
      conversationId: "",
    };

    axios
      .post(`/api/add/to/conversattion`, option, { withCredentials: true })
      .then((result) => {
        people++;
        if (people == this.state.selected.length) {
          socket.emit("run-that-conversation", [this.props.users.userid]);
          this.props.handleopen(false);
          this.props.history.push(`/message/${this.state.selected[0].userid}`);
        } else {
          this.addPeoppe();
        }
      });
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
  componentDidMount = () => {
    this.seachPeopplrrre();
  };
  render() {
    return this.props.open == true ? (
      <div
        className={`overflow-it-newmesagee  ${
          this.props.open == true ? "active" : ""
        }`}
      >
        <div className="box-that-hold-the-shrare">
          <div className="title-of--thise-action">
            <button
              onClick={() => {
                this.props.handleopen(false);
              }}
              className="close-that"
            >
              {" "}
              <IoCloseSharp />
            </button>
            <p>New message</p>
          </div>
          <div className="screachfjjjoorjj">
            <div className="iconrjrnr">
              <AiOutlineSearch />
            </div>
            <input
              onChange={this.seachPeopple}
              className="class-inoputoe"
              placeholder="Seach..."
              type="text"
            />
          </div>
          <div className="hold-people-thst-hold-itj">
            {this.state.selected?.map((item) => {
              return item.userid !== this.props.users.userid ? (
                <div className="people-iconfjjnrn  " key={item.userid}>
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
              ) : (
                ""
              );
            })}
          </div>
          <div className="box-that-reajfjjjrjrnjf">
            {this.state.people?.map((item) => {
              return item.userid !== this.props.users.userid ? (
                <div
                  onClick={(e) => {
                    this.selectedpeople(e, { userid: item.userid });
                  }}
                  className={`list-peopkojr ${
                    this.state.selected.some((e) => e.userid === item.userid)
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
              ) : (
                ""
              );
            })}
          </div>

          <div className="rhhjiushhf">
            {this.state.loadding == true ? (
              <button className="add-shch active">
                <LoadingSpin />
              </button>
            ) : (
              <button onClick={this.continue} className="add-shch">
                CONTINUE
              </button>
            )}
          </div>
        </div>
      </div>
    ) : (
      ""
    );
  }
}
const mapstateToProps = (state) => {
  return {
    users: state.user,
  };
};
export default connect(mapstateToProps)(withRouter(Newmessage));
