import React, { Component } from "react";
import Search from "../component/seach";
import Post from "../component/post";
import Nav from "../component/nav";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import Iconpicture from "../component/iconpicture";
import SuggectionBox from "../component/suggectionbox";
import SharePost from "../component/sharepost";
import Menupost from "../component/menupost";
import LoadingSpin from "../component/loadingspin.js";
import Boxcollection from "../component/boxcollection";
import ShareOption from "../component/shareoption";
import ShowLive from "../component/showlive";
import { GoPlus } from "react-icons/go";
import Report from "../component/report";
import DropOption from "../component/dropHome";
import Navtop from "../component/navtop";
import DeletePost from "../component/deletepost";
import Navbom from "../component/navbom";
import DropHomeUp from "../component/dropHomeUp";
let source;
source = axios.CancelToken.source();
class Home extends Component {
  state = {
    post: null,
    search: false,
    setting: false,
    shareoption: false,
    sharebox: false,
    drop: false,
    file: "",
    numberToLoad: 10,
    loading: false,
  };

  constructor(props) {
    super(props);
    source = axios.CancelToken.source();
  }
  handloption = (data) => {
    this.setState({
      drop: data,
    });
  };

  handlOpen = (data) => {
    this.setState({
      setting: data,
    });
  };

  handlOpenS = (data) => {
    this.setState({
      sharebox: data,
    });
    this.handleSetting(false, this.state.file);
  };

  handleSetting = (data, file) => {
    this.setState({
      shareoption: data,
      file: file,
    });
  };

  loadmore = (data) => {
    this.setState({
      numberToLoad: this.state.numberToLoad + 10,
    });
    this.getfeed(this.state.numberToLoad);
  };
  openSearch = (data) => {
    this.setState({
      search: data,
    });
  };

  getfeed = (data) => {
    this.setState({
      loading: true,
    });
    axios
      .get(`/api/Show-Feed/${this.props.user.userid}/${data}`, {
        withCredentials: true,
        cancelToken: source.token,
      })
      .then((res) => {
        if (res.data) {
          if (res.data.length > 0) {
            if (this.state.post !== null) {
              let list = [...this.state.post, ...res.data];
              this.setState({
                loading: false,
                post: list,
              });
            } else {
              let list = [...res.data];

              this.setState({
                loading: false,
                post: list,
              });
            }
          } else {
            if (this.state.post == null) {
              this.setState({
                loading: false,
                post: [],
              });
            } else {
              this.setState({
                loading: false,
              });
            }
          }
        }
      });
  };

  componentDidMount() {
    if (this.props.user.length > 0) {
    } else {
      this.getfeed(this.state.numberToLoad);
    }
  }

  componentWillUnmount = () => {
    if (source) {
      source.cancel("Landing Component got unmounted");
    }
  };

  render() {
    let user = this.props.user;
    return (
      <div className="conatiner">
        <Nav user={user} />
        <div id="app">
          <div id="body-tabs">
            <div id="home">
              <div id="head">
                <Link to={"/profile"} className="iconsnr">
                  <Iconpicture user={this.props.user.userid} />
                </Link>

                <div id="nt-mes">
                  <div
                    onClick={() => {
                      this.openSearch(true);
                    }}
                    className="serach-pro"
                  >
                    <i className="fas fa-search"></i>
                  </div>
                  <Link to="/message" id="notification">
                    <i className="far fa-envelope"></i>
                  </Link>
                </div>
              </div>
              <div className="big-wraper">
                <div className="wraper-po">
                  <div className="head-active">
                    <p>Home</p>
                    <div className="wjjijnnff">
                      <button
                        onClick={() => this.handloption(true)}
                        className="open-seachr"
                      >
                        <GoPlus />
                      </button>
                      <div
                        onClick={() => {
                          this.openSearch(true);
                        }}
                        className="open-seach"
                      >
                        <i className="fas fa-search"></i>
                      </div>
                    </div>
                    <DropOption
                      handloption={this.handloption}
                      drop={this.state.drop}
                    />
                  </div>
                  <ShowLive user={this.props.user} />
                  {this.state.post !== null ? (
                    this.state.post.length > 0 ? (
                      <Post
                        loading={this.state.loading}
                        loadmore={this.loadmore}
                        handleSetting={this.handleSetting}
                        handlOpen={this.handlOpen}
                        user={this.props.user}
                        openBoxCollection={this.props.openBoxCollection}
                        feed={this.state.post}
                      />
                    ) : (
                      <div className="sfhej">
                        <div className="jfjfrhrhrhhj">
                          <SuggectionBox />
                        </div>
                        <div className="ffkfkfkk">
                          <div className="wraperififoojfhr">
                            <div className="wraperjf-ffkfkr">
                              <div className="jrkjkr">
                                Welcome, {this.props.user.Username}
                              </div>
                              <p>
                                Share with your community your favorite workout
                                or fitness activity
                              </p>
                              <div className="wraper-thejr">
                                <Link className="dijroooeo" to={"/post"}>
                                  New Post
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="bixnknfkfjkjrjr">
                      <LoadingSpin />
                    </div>
                  )}
                </div>
              </div>
              <Search
                user={this.props.user}
                openSearch={this.openSearch}
                seach={this.state.search}
              />
            </div>

            <Navtop />

            <Navbom handloption={this.handloption} />
          </div>
        </div>
        <Boxcollection
          user={this.props.user}
          file={this.props.file}
          openBoxCollection={this.props.openBoxCollection}
          boxCollection={this.props.boxCollection}
        />
        <Menupost handlOpen={this.handlOpen} setting={this.state.setting} />
        {this.state.shareoption == true ? (
          <ShareOption
            handlOpenS={this.handlOpenS}
            handleSetting={this.handleSetting}
            shareoption={this.state.shareoption}
          />
        ) : (
          ""
        )}
        {this.state.sharebox == true ? (
          <SharePost
            user={this.props.user}
            file={this.state.file}
            handlOpenS={this.handlOpenS}
            sharebox={this.state.sharebox}
            kind={"post"}
          />
        ) : (
          ""
        )}
        <Report />
        <DeletePost />
        {this.state.drop == true ? (
          <DropHomeUp handloption={this.handloption} drop={this.state.drop} />
        ) : (
          ""
        )}

        <div>
          {/*	<div id="nav">
        <ul>
            <li><a href="index.html">Home</a></li>

            <li><a href="#">Menu 1</a>
                <ul>
                    <li><a href="#">Link 1</a></li>
                    <li><a href="#">Link 2</a></li>
                    <li><a href="#">Link 3</a></li>
                    <li><a href="#">Submenu</a>
                        <ul>
                            <li><a href="#">Link1</a></li>
                            <li><a href="#">Link2</a></li>
                    </ul>
                    </li>
                </ul>
            </li>
			
            <li><a href="#">Link 1</a></li>
            <li><a href="#">Menu 2</a>
                <ul>
                    <li><a href="#">Link1</a></li>
                    <li><a href="#">Submenu1</a>
                        <ul>
                            <li><a href="#">Link1</a></li>
                            <li><a href="#">Link2</a></li>
                    </ul>
                    </li>
                    <li><a href="#">Link2</a></li>
                </ul>
            </li>
            <li><a href="#">Link 2</a></li>
        </ul>
    </div>*/}
        </div>
      </div>
    );
  }
}

export default connect()(Home);
