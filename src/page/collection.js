import React, { Component } from "react";
import Nav from "../component/nav";
import axios from "axios";
import { IoCloseSharp } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import LoadingSpin from "../component/loadingspin";
import { Link, withRouter } from "react-router-dom";
import Navbom from "../component/navbom";
import ApiUrl from "../url";
import DropHomeUp from "../component/dropHomeUp";
import Unlocked from "../component/unlocked";
let source;
source = axios.CancelToken.source();
class Collection extends Component {
  state = {
    collection: null,
    mycollection: true,
    myprograms: false,
    saved: false,
    boxCollection: false,
    create: true,
    newCollection: "",
    add: false,
    drop: false,
  };
  handloption = (data) => {
    this.setState({
      drop: data,
    });
  };

  constructor(props) {
    super(props);
    source = axios.CancelToken.source();
  }
  createCollection = () => {
    if (this.state.newCollection.length > 0) {
      let detail = {
        userId: this.props.user.userid,
        collectionName: this.state.newCollection,
      };

      axios
        .post("/api/CreateCollection", detail, { cancelToken: source.token })
        .then((res) => {
          if (res.data.collectionName) {
            this.controlcollection(false);
            this.mypost();
          } else {
          }
        });
    }
  };

  hangleNewCollection = (event) => {
    this.setState({
      newCollection: event.target.value,
    });
  };

  controlcollection = (box) => {
    this.setState({
      boxCollection: box,
    });
  };

  changetabs = (one, two, three) => {
    this.setState({
      mycollection: one,
      myprograms: two,
      saved: three,
    });
  };

  mypost = (e) => {
    axios
      .get(`/api/myCollection/${this.props.user.userid}`, {
        withCredentials: true,
        cancelToken: source.token,
      })
      .then((res) => {
        if (res.data.length > 0) {
          this.setState({
            collection: res.data,
          });
        } else {
          this.setState({
            collection: "no",
          });
        }
      });
  };

  componentDidMount = () => {
    this.mypost();
  };

  componentWillUnmount = () => {
    if (source) {
      source.cancel("Landing Component got unmounted");
    }
  };

  render() {
    return (
      <div className="conatiner">
        <Nav user={this.props.user} />
        <div id="app">
          <div id="body-tabs">
            <div className="wraper-collection ">
              <div className="title-coc">
                <p className="col-tit">Collection</p>
                {this.props.location.pathname == "/collection/program" ? (
                  ""
                ) : (
                  <div
                    onClick={() => {
                      this.controlcollection(true);
                    }}
                    className="close-that"
                  >
                    <GoPlus />
                  </div>
                )}
              </div>
              <div className="wraprrutt">
                <div className="tabhdjrsbf">
                  <Link
                    to={"/collection"}
                    className={`vbfhj-tabs ${
                      this.props.location.pathname == "/collection"
                        ? "active"
                        : ""
                    } `}
                  >
                    MY COLLECTIONS
                  </Link>
                  <Link
                    to={"/collection/program"}
                    className={`vbfhj-tabs ${
                      this.props.location.pathname == "/collection/program"
                        ? "active"
                        : ""
                    } `}
                  >
                    MY PROGRAMS
                  </Link>
                </div>
              </div>

              {this.state.collection !== null ? (
                this.state.collection !== "no" ? (
                  <div
                    className={`box-hold-all-collection ${
                      this.props.location.pathname == "/collection"
                        ? "active"
                        : ""
                    } `}
                  >
                    {this.state.collection !== null
                      ? this.state.collection !== "no"
                        ? this.state.collection.map((item) => {
                            return (
                              <div className="card-contain-info" key={item._id}>
                                <div className="bold-media">
                                  <div className="box-media-show">
                                    {item.data[0] ? (
                                      item.data[0].fileKind.includes(
                                        "image"
                                      ) ? (
                                        <img
                                          src={`${ApiUrl.content}${
                                            item.data[0].file.split(",")[0]
                                          }`}
                                        />
                                      ) : (
                                        <video>
                                          <source
                                            src={`${ApiUrl.content}${
                                              item.data[0].file.split(",")[0]
                                            }`}
                                          />
                                        </video>
                                      )
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <div className="box-media-show">
                                    {item.data[1] ? (
                                      item.data[1].fileKind.includes(
                                        "image"
                                      ) ? (
                                        <img
                                          src={`${ApiUrl.content}${
                                            item.data[1].file.split(",")[0]
                                          }`}
                                        />
                                      ) : (
                                        <video>
                                          <source
                                            src={`${ApiUrl.content}${
                                              item.data[1].file.split(",")[0]
                                            }`}
                                          />
                                        </video>
                                      )
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <div className="box-media-show">
                                    {item.data[2] ? (
                                      item.data[2].fileKind.includes(
                                        "image"
                                      ) ? (
                                        <img
                                          src={`${ApiUrl.content}${
                                            item.data[2].file.split(",")[0]
                                          }`}
                                        />
                                      ) : (
                                        <video>
                                          <source
                                            src={`${ApiUrl.content}${
                                              item.data[2].file.split(",")[0]
                                            }`}
                                          />
                                        </video>
                                      )
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <div className="box-media-show">
                                    {item.data[3] ? (
                                      item.data[3].fileKind.includes(
                                        "image"
                                      ) ? (
                                        <img
                                          src={`${ApiUrl.content}${
                                            item.data[3].file.split(",")[0]
                                          }`}
                                        />
                                      ) : (
                                        <video>
                                          <source
                                            src={`${ApiUrl.content}${
                                              item.data[3].file.split(",")[0]
                                            }`}
                                          />
                                        </video>
                                      )
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                                <Link
                                  className="linkToCol"
                                  to={`collection/${item._id}`}
                                ></Link>
                                <div className="info-about-media">
                                  <p className="title-of-coll">
                                    {item.collectionName}
                                  </p>
                                  <p>{item.data.length} workout</p>
                                </div>
                              </div>
                            );
                          })
                        : ""
                      : ""}
                  </div>
                ) : (
                  <div
                    className={`box-hold-all-collection ${
                      this.props.location.pathname == "/collection"
                        ? "active"
                        : ""
                    } `}
                  >
                    <div className="card-contain-info">
                      <div className="bold-media">
                        <div className="box-media-show"></div>
                        <div className="box-media-show"></div>
                        <div className="box-media-show"></div>
                        <div className="box-media-show"></div>
                      </div>
                      <div className="info-about-media"></div>
                    </div>{" "}
                  </div>
                )
              ) : (
                <div className="bixnknfkfjkjrjr">
                  <LoadingSpin />
                </div>
              )}

              {this.props.location.pathname == "/collection/program" ? (
                <div
                  className={`prihrrrnnf-myrnrnr ${
                    this.props.location.pathname == "/collection/program"
                      ? "active"
                      : ""
                  } `}
                >
                  <Unlocked user={this.props.user} />
                </div>
              ) : (
                ""
              )}
            </div>
            <Navbom handloption={this.handloption} />
          </div>
          {this.state.boxCollection == true ? (
            <div
              className={`collection-overlay  ${
                this.state.boxCollection == false ? "" : "active"
              }`}
            >
              <div className="box-hold-collection">
                <div
                  className={`add-tocollection-box ${
                    this.state.create == false ? "" : "active"
                  }`}
                >
                  <div className="Create-a-new-list-title">
                    <div
                      onClick={() => this.controlcollection(false)}
                      className="close-that"
                    >
                      <IoCloseSharp />
                    </div>

                    <p>New Collection</p>
                  </div>
                  <div className="input-to-name-of-new-collection">
                    <div className="edit-box-profile">
                      <label htmlFor="username">Collection Name</label>
                      <input
                        onChange={this.hangleNewCollection}
                        className="input-fornew-collection"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="add-collection-tolist">
                    <button onClick={this.createCollection}>CREATE</button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        {this.state.drop == true ? (
          <DropHomeUp handloption={this.handloption} drop={this.state.drop} />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default withRouter(Collection);
