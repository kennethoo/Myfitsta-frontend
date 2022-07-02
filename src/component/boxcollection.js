import React, { Component } from "react";
import ApiUrl from "../url";
import axios from "axios";
import { connect } from "react-redux";
import { BiCheck, BiArrowBack } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
import "../style/collection.css";
class Boxcollection extends Component {
  state = {
    create: false,
    add: true,
    open: false,
    list: null,
    listWokout: [],
    newCollection: "",
    message: "",
  };

  createCollection = () => {
    if (this.state.newCollection.length > 0) {
      let detail = {
        userId: this.props.user.userid,
        collectionName: this.state.newCollection,
      };

      axios.post("/api/CreateCollection", detail).then((res) => {
        if (res.data.collectionName) {
          this.controlcollection(true, false);
          this.getCollection();
        } else {
          this.setState({
            message: "This collection already exists",
          });
        }
      });
    }
  };

  hangleNewCollection = (event) => {
    this.setState({
      newCollection: event.target.value,
    });
  };

  controlcollection = (add, create) => {
    this.setState({
      add: add,
      create: create,
    });
  };

  removeToCollection = (data) => {
    let option = {
      id: this.props.user.userid,
      collectionName: data,
      file: this.props.file,
    };
    axios
      .post(`${ApiUrl.Three}delete/WorkoiutCollection`, option)
      .then((res) => {
        this.getCollection();
      });
  };

  addtoCollection = (data) => {
    console.log(data);
    let option = {
      userId: this.props.user.userid,
      collectionName: data,
      workout: this.props.file,
    };
    axios.post("/api/add-to-thiscollection", option).then((res) => {
      console.log(res);
      this.getCollection();
    });
  };

  getCollection = (e) => {
    axios.get(`/api/myCollection/${this.props.user.userid}`).then((res) => {
      if (res.data) {
        this.setState({
          list: res.data,
        });
      }
    });
  };

  componentDidUpdate(prevState) {
    if (prevState.file !== this.props.file) {
      if (this.props.file.length > 0) {
        this.getCollection();
      }
    }
  }

  componentDidMount = () => {
    if (this.props.listCollection.length > 0) {
    } else {
    }
  };

  render() {
    return (
      <div
        className={`collection-overlay  ${
          this.props.boxCollection == false ? "" : "active"
        }`}
      >
        <div className="box-hold-collection">
          <div
            className={`box-collection-user ${
              this.state.add == false ? "" : "active"
            }`}
          >
            <div className="collection-title">
              <button
                onClick={() => {
                  this.props.openBoxCollection(false, "");
                }}
                className="close-that"
              >
                <IoCloseSharp />
              </button>
              <p>Collection</p>
            </div>
            <div className="hold-my-collection">
              {this.state.list !== null ? (
                this.state.list.length > 0 ? (
                  this.state.list.map((item) => {
                    return (
                      <div
                        onClick={() => {
                          item.data.some((d) => this.props.file === d.file)
                            ? this.removeToCollection(item.collectionName)
                            : this.addtoCollection(item.collectionName);
                        }}
                        className="hold-collection-desi"
                        key={item._id}
                      >
                        <div
                          className={`add-to-this-collection ${
                            item.data.some((d) => this.props.file === d.file)
                              ? "active"
                              : ""
                          }`}
                        >
                          {item.data.some((d) => this.props.file === d.file) ? (
                            <div className="savethat-ccolelti checkthat-coell">
                              <BiCheck />
                            </div>
                          ) : (
                            <div className="savethat-ccolelti"></div>
                          )}
                        </div>

                        <div className="detail-about-collection">
                          <p className="col-titl">{item.collectionName}</p>
                          <p className="col-titl">{item.data.length} workout</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="hold-collection-desi">
                    <div className={`add-to-this-collectrnion `}>
                      <i className="fas fa-plus"></i>
                    </div>

                    <div className="detail-about-collection">
                      <p className="col-titrjrjl">Create a collection</p>
                    </div>
                  </div>
                )
              ) : (
                ""
              )}
            </div>

            <div className="add-collection">
              <button
                onClick={() => this.controlcollection(false, true)}
                className="add-this-col"
              >
                <i className="fas fa-plus ad"></i>NEW COLLECTION
              </button>
            </div>
          </div>
          {this.state.create == false ? (
            ""
          ) : (
            <div
              className={`add-tocollection-box ${
                this.state.create == false ? "" : "active"
              }`}
            >
              <div className="Create-a-new-list-title abrb">
                <div className="wrieii">
                  <div
                    onClick={() => this.controlcollection(true, false)}
                    className="close-that"
                  >
                    <BiArrowBack />
                  </div>
                  <p>New Collection</p>
                </div>
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
                <p className="messsage" id="message-Username">
                  {this.state.message}
                </p>
              </div>
              <div className="add-collection-tolist">
                <button onClick={this.createCollection}>CREATE</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapstateToProps = (state) => {
  return {
    listCollection: state.listCollection,
  };
};
export default connect(mapstateToProps)(Boxcollection);
