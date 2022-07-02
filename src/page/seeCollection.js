import React, { Component } from "react";
import Nav from "../component/nav";
import axios from "axios";
import SharePost from "../component/sharepost";
import ShareOption from "../component/shareoption";
import LoadingSpin from "../component/loadingspin.js";
import { InView } from "react-intersection-observer";
import PostCollection from "../component/postcollection";
import Search from "../component/seach";
import Boxcollection from "../component/boxcollection";
import DeleteCollection from "../component/deleteCollection";
import EditCollection from "../component/editcollection";
import { withRouter } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Report from "../component/report";
let source;
source = axios.CancelToken.source();
class SeeCollection extends Component {
  state = {
    collection: {},
    search: false,
    deleteCollection: false,
    editCollection: false,
    shareoption: false,
    sharebox: false,
    file: "",
    loading: true,
    number: 10,
  };
  constructor(props) {
    super(props);
    source = axios.CancelToken.source();
  }
  optionchange = (one, two) => {
    this.setState({
      deleteCollection: one,
      editCollection: two,
    });
  };

  handlOpenS = (data) => {
    this.setState({
      sharebox: data,
    });
    this.handleSettingg(false, this.state.file);
  };

  handleSettingg = (data, file) => {
    this.setState({
      shareoption: data,
      file: file,
    });
  };

  openSearch = (data) => {
    this.setState({
      search: data,
    });
  };

  goBack = (e) => {
    this.props.history.goBack();
  };
  getInfo = () => {
    this.setState({
      loading: true,
    });
    axios
      .get(
        `/api/colcection/${this.props.match.params.id}/${this.state.number}`,
        { withCredentials: true, cancelToken: source.token }
      )
      .then((res) => {
        if (res.data.collectionName) {
          this.setState({
            loading: false,
            collection: res.data,
          });
        } else {
          this.goBack();
        }
      });
  };

  handleChange = (event) => {
    console.log(event);
  };

  checkLoad = (data) => {
    if (data == true) {
      if (this.props.loading == false) {
        this.setState(
          {
            number: this.state.number + 10,
          },
          () => {
            this.getInfo();
          }
        );
      } else {
      }
    }
  };
  componentDidMount = () => {
    this.getInfo();
  };

  componentWillUnmount = () => {
    if (source) {
      source.cancel("Landing Component got unmounted");
    }
  };
  render() {
    let media = this.state.collection.data?.map((item, index) => {
      if (this.state.collection.data.length == index + 1) {
        return (
          <InView>
            <PostCollection
              item={item.file}
              user={this.props.user}
              openBoxCollection={this.props.openBoxCollection}
              handleSetting={this.handleSettingg}
              key={item._id}
            />
          </InView>
        );
      } else {
        return (
          <PostCollection
            item={item.file}
            user={this.props.user}
            openBoxCollection={this.props.openBoxCollection}
            handleSetting={this.handleSettingg}
            key={item._id}
          />
        );
      }
    });

    return (
      <div className="conatiner">
        <Nav user={this.props.user} />

        <div id="app">
          <div id="body-tabs">
            <div className="wraprjt-cnfnjrbsr">
              <div className="notification">
                <div className="wrsojjsfjfjjeer">
                  <div className="title-cocc">
                    <div onClick={this.goBack} className="close-that">
                      <BiArrowBack />
                    </div>
                    <p className="col-tit">
                      {this.state.collection.collectionName}
                    </p>
                  </div>
                  <div className="hold-colletion-if-of-collection ">
                    <p className="info-about-colle">
                      {this.state.collection.collectionName
                        ? this.state.collection.data.length
                        : ""}{" "}
                      Workout
                    </p>
                  </div>

                  <div className="edit-or-delete-collection">
                    <button
                      onClick={() => {
                        this.optionchange(false, true);
                      }}
                    >
                      Edit Collection
                    </button>
                    <button
                      onClick={() => {
                        this.optionchange(true, false);
                      }}
                    >
                      Delete Collection
                    </button>
                  </div>

                  <div className="box-hold-all-collecn active">
                    {media}
                    {this.state.loading == true ? (
                      <div className="bixnknfkfjkjrjr">
                        <LoadingSpin />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>

              <Search
                user={this.props.user}
                openSearch={this.openSearch}
                seach={this.state.search}
              />
            </div>
            <Boxcollection
              user={this.props.user}
              file={this.props.file}
              openBoxCollection={this.props.openBoxCollection}
              boxCollection={this.props.boxCollection}
            />
            <ShareOption
              handlOpenS={this.handlOpenS}
              handleSetting={this.handleSettingg}
              shareoption={this.state.shareoption}
            />
            <SharePost
              user={this.props.user}
              file={this.state.file}
              handlOpenS={this.handlOpenS}
              sharebox={this.state.sharebox}
              kind={"post"}
            />
            {this.state.editCollection ? (
              this.state.collection.collectionName ? (
                <EditCollection
                  optionchange={this.optionchange}
                  editCollection={this.state.editCollection}
                  collection={this.state.collection}
                />
              ) : (
                ""
              )
            ) : (
              ""
            )}
            {this.state.deleteCollection ? (
              this.state.collection.collectionName ? (
                <DeleteCollection
                  optionchange={this.optionchange}
                  deleteCollection={this.state.deleteCollection}
                  collection={this.state.collection}
                />
              ) : (
                ""
              )
            ) : (
              ""
            )}

            <Report />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SeeCollection);
