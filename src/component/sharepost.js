import React, { Component } from "react";
import axios from "axios";
import LoadingSpin from "./loadingspin";
import { BiCheck } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import Username from "../component/username";
import ApiUrl from "../url";
import IconProfile from "../component/iconpicture";
import { connect } from "react-redux";
let people = 0;
class SharePost extends Component {
  state = {
    selected: [],
    people: [],
    sharebox: false,
    loading: false,
  };

  loadPeople = () => {
    axios
      .get(`/api/my-conversation/${this.props.user.userid}`)
      .then((res) => {
        if (res.data !== "no") {
          this.setState({
            people: res.data,
          });
        }
      });
  };

  continue = () => {
    if (this.state.selected.length > 0) {
      this.addPeoppe();
    } else {
    }
  };

  addPeoppe = () => {
    let optionone = {
      id: this.state.selected[people].userid,
      user: this.props.user.userid,
      profileGroup: "",
      type: "inbox",
      members: [],
      name: "",
      conversationId: "",
    };
    let option = {
      UserId: this.props.user.userid,
      friend: this.state.selected[people].userid,
      message: {
        sender: this.props.user.userid,
        content: this.props.file,
        kind: this.props.kind,
      },
    };
    this.setState({
      loading: true,
    });
    axios
      .post(`/api/add/to/conversattion`, optionone, { withCredentials: true })
      .then((result) => {
        axios.post(`/api/new-message`, option).then((result) => {
          people++;

          if (people == this.state.selected.length) {
            people = 0;
            this.props.handlOpenS(false);
            this.setState({
              selected: [],
              people: [],
            });
          } else {
            this.addPeoppe();
          }
        });
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
        .get(`/api/profilename/${event.target.value}/10`, {
          withCredentials: true,
        })
        .then((res) => {
          let list = res.data.filter((item) => {
            return item.userid !== this.props.user.userid;
          });

          this.setState({
            people: list,
          });
        });
    } else {
      this.loadPeople();
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.sharebox !== this.state.sharebox) {
      if (this.state.sharebox == false) {
        this.loadPeople();
      }
      this.setState({ sharebox: this.props.sharebox });
    }
  }

  componentDidMount = () => {
    this.loadPeople();
  };

  render() {
    return (
      <div
        className={`overlay-that-holt-it  ${
          this.props.sharebox == true ? "active" : ""
        }`}
      >
        <div className="box-that-hold-the-shrare">
          <div className="title-of--thise-action">
            <button
              onClick={() => this.props.handlOpenS(false)}
              className="close-that"
            >
              <IoCloseSharp />
            </button>
            <p>Share Post</p>
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
              return (
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
              );
            })}
          </div>
          <div className="box-that-reajfjjjrjrnjf">
            {this.state.people?.map((item) => {
              return (
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
              );
            })}
          </div>

          <div className="rhhjiushhf">
            {this.state.loading == true ? (
              <button onClick={this.continue} className="add-shch active">
                <LoadingSpin />
              </button>
            ) : (
              <button onClick={this.continue} className="add-shch">
                SEND
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapstateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapstateToProps)(SharePost);
