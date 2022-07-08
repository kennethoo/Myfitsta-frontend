import React, { Component } from "react";
import axios from "axios";
import Subinfo from "../component/subinfo";
import { InView } from "react-intersection-observer";
import LoadingSpin from "./loadingspin";
import Interest from "../component/sugestionInterest";
import { IoCloseSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import Username from "../component/username";
import IconProfile from "../component/iconpicture";
class Search extends Component {
  state = {
    people: null,
    loading: true,
    tabs: false,
    loadPeople: 5,
    query: "",
  };
  swicthTab = (data) => {
    this.setState({
      tabs: data,
    });
  };
  addToRecent = (data) => {
    let option = {
      User: this.props.user.userid,
      name: data,
    };
    axios
      .post("/api/add-profile-seach", option)
      .then((res) => {
        return;
      })
      .catch((err) => {
        return;
      });
  };
  removerecent = (e, data) => {
    let target = e.currentTarget;
    let option = {
      User: this.props.user.userid,
      userid: data,
    };
    axios.post("/api/removeRecentprofile", option).then((res) => {
      let list = this.state.people.filter((item) => {
        return item.userid != data;
      });
      this.setState({
        people: list,
      });
    });
  };

  loadMore = (data) => {
    if (data === true) {
      this.setState(
        {
          loadPeople: this.state.loadPeople + 5,
        },
        () => {
          if (this.state.query.length > 0) {
            this.filerLoad(this.state.query);
          }
        }
      );
    }
  };
  filerLoad = (data) => {
    if (data.trim().length > 0) {
      this.setState({
        loadPeople: 5,
        query: data.trim(),
      });
      axios
        .get(`/api/profilename/${data}/${this.state.loadPeople}`, {
          withCredentials: true,
        })
        .then((res) => {
          this.setState({
            people: res.data,
          });
        })
        .catch((err) => {
          return;
        });
    } else {
      this.setState(
        {
          query: "",
          people: [],
        },
        () => {
          this.recent();
        }
      );
    }
  };
  filterbar = (event) => {
    if (event.target.value.trim().length > 0) {
      this.setState({
        query: event.target.value.trim(),
      });
      axios
        .get(
          `/api/profilename/${event.target.value}/${this.state.loadPeople}`,
          { withCredentials: true }
        )
        .then((res) => {
          this.setState({
            people: res.data,
          });
        })
        .catch((err) => {
          return;
        });
    } else {
      this.setState(
        {
          query: "",
          people: [],
        },
        () => {
          this.recent();
        }
      );
    }
  };
  recent = (e) => {
    axios
      .get(`/api/recentSeach/${this.props.user.userid}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data) {
          if (res.data.UserIDSave) {
            this.setState({
              people: res.data.UserIDSave.reverse(),
              loading: false,
            });
          } else {
            this.setState({
              people: [],
              loading: false,
            });
          }
        }
      })
      .catch((err) => {
        return;
      });
  };

  componentDidMount = () => {
    this.recent();
  };

  render() {
    return (
      <div
        className={`profile-session font-link  ${
          this.props.seach == false ? "" : "active"
        }`}
      >
        <div className={`box-find ${this.state.tabs == true ? "active" : ""}`}>
          <p>
            <i className="fas fa-search"></i>
          </p>
          <input
            onKeyUp={this.filterbar}
            className="seach-prp"
            type="text"
            name="profile"
            placeholder="Search..."
          />
          <div className="close-seaceh">
            <button
              onClick={() => {
                this.props.openSearch(false);
              }}
            >
              <IoCloseSharp />
            </button>
          </div>
        </div>
        <div
          className={`box-profile-session ${
            this.state.tabs == false ? "active" : ""
          }`}
        >
          {this.state.people !== null ? (
            this.state.people.length > 0 ? (
              this.state.people.map((item, index) => {
                if (this.state.people.length == index + 1) {
                  return (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="profile-tofind"
                      key={item._id}
                    >
                      <InView
                        onChange={(inView) => this.loadMore(inView)}
                        className="profile-tofindt"
                      >
                        <div className="image-pr">
                          <IconProfile live={true} user={item.userid} />
                        </div>
                        <div className="inf-or">
                          <div className="bfjirtnj"></div>
                          <div onClick={() => this.addToRecent(item.userid)}>
                            <Username link={true} user={item.userid} />
                           {/* <Subinfo user={item.userid} />*/}
                          </div>
                        </div>
                        <div
                          onClick={(e) => {
                            this.removerecent(e, item.userid);
                          }}
                          className="delc-pro"
                        >
                          <IoCloseSharp />
                        </div>
                      </InView>
                    </motion.div>
                  );
                } else {
                  return (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="profile-tofind"
                      key={item._id}
                    >
                      <div className="image-pr">
                        <IconProfile live={true} user={item.userid} />
                      </div>
                      <div className="inf-or">
                        <div className="bfjirtnj"></div>
                        <div onClick={() => this.addToRecent(item.userid)}>
                          <Username link={true} user={item.userid} />
                          {/*<Subinfo user={item.userid} />*/}
                        </div>
                      </div>
                      <div
                        onClick={(e) => {
                          this.removerecent(e, item.userid);
                        }}
                        className="delc-pro"
                      >
                        <IoCloseSharp />
                      </div>
                    </motion.div>
                  );
                }
              })
            ) : (
              <div className="wraperififoojfhr">
                <div className="wraperjf-ffkfkr">
                  <p>SEARCH ACCOUNT</p>
                  <p>Search and look for any account</p>
                </div>
              </div>
            )
          ) : (
            ""
          )}
          {this.state.loading ? (
            <div className="bixnknfkfjkjrjr">
              <LoadingSpin />
            </div>
          ) : (
            ""
          )}
        </div>
        <Interest tabs={this.state.tabs} />
      </div>
    );
  }
}

export default Search;
