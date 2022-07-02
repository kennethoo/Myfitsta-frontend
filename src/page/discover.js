import React, { Component } from "react";
import { FaRegClone } from "react-icons/fa";
import axios from "axios";
import Username from "../component/username";
import LoadingSpin from "../component/loadingspin";
import IconProfile from "../component/iconpicture";
import { GoPlus } from "react-icons/go";
import LikeButton from "../component/likeButton";
import VideoPost from "../component/videopost";
import Nav from "../component/nav";
import ApiUrl from "../url";
import { BiArrowBack } from "react-icons/bi";
import Navtop from "../component/navtop";
import Navbom from "../component/navbom";
import Boxcollection from "../component/boxcollection";
import UpdateDiscover from "../component/updatediscover";
import "../style/discover.css";
import DropHomeUp from "../component/dropHomeUp";
import { InView } from "react-intersection-observer";
import { Link, withRouter } from "react-router-dom";
let source;
source = axios.CancelToken.source();
class Discover extends Component {
  state = {
    id: "",
    post: [],
    numberLoad: 10,
    loading: false,
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
  loadGalery = (number) => {
    this.setState({
      loading: true,
    });
    axios
      .get(
        `${ApiUrl.Three}discover-tags/${this.state.id.replace("#", "")}/${
          this.props.user.userid
        }/${number}`,
        { cancelToken: source.token }
      )
      .then((res) => {
        this.setState({
          loading: false,
        });
        let list = [];
        res.data.forEach((element) => {
          element.percentage = element.numberofcomments * element.numberlike;
          list.push(element);
        });
        let updated = list.sort((a, b) => {
          return parseInt(b.percentage) - parseInt(a.percentage);
        });
        this.setState({
          post: updated,
        });
      });
  };

  nFormatter = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num;
  };

  handleSeach = (e) => {
    if (e.target.value.length > 0) {
      this.setState({ id: e.target.value }, () => {
        this.loadGalery(this.state.numberLoad);
      });
    } else {
      this.setState({ id: "All kind" }, () => {
        this.loadGalery(this.state.numberLoad);
      });
    }
  };
  checkLoad = (data) => {
    if (data == true) {
      if (this.state.loading == false) {
        this.setState({
          numberLoad: this.state.numberLoad + 10,
        });
        this.loadGalery(this.state.numberLoad);
      }
    }
  };
  componentDidMount = () => {
    if (this.props.match.params.id) {
      this.setState(
        {
          id: this.props.match.params.id,
        },
        () => {
          this.loadGalery(this.state.numberLoad);
        }
      );
    } else {
      this.setState(
        {
          id: "All kind",
        },
        () => {
          this.loadGalery(this.state.numberLoad);
        }
      );
    }
  };
  componentDidUpdate(prevProps) {
    if (this.props.match.params.id) {
      if (this.state.id !== this.props.match.params.id) {
        this.setState({ id: this.props.match.params.id }, () => {
          this.loadGalery(this.state.numberLoad);
        });
      }
    }
  }
  goBack = (e) => {
    this.props.history.goBack();
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
            <div id="search">
              <div className="head-diss">
                <div onClick={this.goBack} className="close-that">
                  <BiArrowBack />
                </div>
                <p className="dirs">Discover</p>
              </div>
              <div className="head-dis">
                <p className="dis">Discover</p>
                <UpdateDiscover loadGalery={this.loadGalery} />
              </div>
              <div className="box-seach-result">
                <div className="reseult-sceach"></div>
              </div>
              <div className="wraperrrfnnf-efnv">
                {this.state.post.length > 0 ? (
                  <div className="contiantien-post">
                    {this.state.post?.map((item, index) => {
                      if (this.state.post.length == index + 1) {
                        return (
                          <div key={item._id} className="box-media-box">
                            {item.filename.split(",").length > 1 ? (
                              <div className="box-thjjsjjjr">
                                <FaRegClone />
                              </div>
                            ) : (
                              ""
                            )}
                            <div className="box-that-hold-the-media">
                              <div className="wraorjrkncnfrh">
                                {item.mediakind[0].includes("image") ? (
                                  <img
                                    src={`${ApiUrl.content}${
                                      item.filename.split(",")[0]
                                    }`}
                                    loading="lazy"
                                  />
                                ) : (
                                  <VideoPost
                                    src={item.filename.split(",")[0]}
                                  />
                                )}
                              </div>
                            </div>
                            <div className="info-about-the-person">
                              <div className="ifinsfkifkr">
                                <div className="icon-of-people">
                                  <IconProfile live={true} user={item.userId} />
                                </div>
                                <div className="particular-info-about-the-person">
                                  <Username user={item.userId} />
                                </div>
                              </div>

                              <div className="pjdjj">
                                <div className="wrp-actt">
                                  <LikeButton
                                    userid={this.props.user.userid}
                                    filename={item.filename}
                                    numberlike={item.numberlike}
                                  />
                                  <Link
                                    className="rjetrjjrj"
                                    to={`/comment/${item.filename}`}
                                  >
                                    <div className="icon">
                                      <i className="far fa-comment"></i>
                                    </div>
                                    <p>{item.numberofcomments}</p>
                                  </Link>
                                </div>
                              </div>
                            </div>
                            <Link
                              className="rj0ojrj-rjosl"
                              to={`/dis/${item.filename}`}
                            ></Link>
                            <button
                              onClick={() => {
                                this.props.openBoxCollection(
                                  true,
                                  item.filename
                                );
                              }}
                              className="alodjrr"
                            >
                              <GoPlus />
                            </button>
                            <InView
                              onChange={(inView, entry) =>
                                this.checkLoad(inView)
                              }
                            ></InView>
                          </div>
                        );
                      } else {
                        return (
                          <div className="box-media-box" key={item._id}>
                            {item.filename.split(",").length > 1 ? (
                              <div className="box-thjjsjjjr">
                                <FaRegClone />
                              </div>
                            ) : (
                              ""
                            )}
                            <div className="box-that-hold-the-media">
                              <div className="wraorjrkncnfrh">
                                {item.mediakind[0].includes("image") ? (
                                  <img
                                    src={`${ApiUrl.content}${
                                      item.filename.split(",")[0]
                                    }`}
                                    loading="lazy"
                                  />
                                ) : (
                                  <VideoPost
                                    src={item.filename.split(",")[0]}
                                  />
                                )}
                              </div>
                            </div>
                            <div className="info-about-the-person">
                              <div className="ifinsfkifkr">
                                <div className="icon-of-people">
                                  <IconProfile live={true} user={item.userId} />
                                </div>
                                <div className="particular-info-about-the-person">
                                  <Username user={item.userId} />
                                </div>
                              </div>

                              <div className="pjdjj">
                                <div className="wrp-actt">
                                  <LikeButton
                                    userid={this.props.user.userid}
                                    filename={item.filename}
                                    numberlike={item.numberlike}
                                  />
                                  <Link
                                    className="rjetrjjrj"
                                    to={`/comment/${item.filename}`}
                                  >
                                    <div className="icon">
                                      <i className="far fa-comment"></i>
                                    </div>
                                    <p>
                                      {this.nFormatter(item.numberofcomments)}
                                    </p>
                                  </Link>
                                </div>
                              </div>
                            </div>
                            <Link
                              className="rj0ojrj-rjosl"
                              to={`/dis/${item.filename}`}
                            ></Link>
                            <button
                              onClick={() => {
                                this.props.openBoxCollection(
                                  true,
                                  item.filename
                                );
                              }}
                              className="alodjrr"
                            >
                              <GoPlus />
                            </button>
                          </div>
                        );
                      }
                    })}
                  </div>
                ) : (
                  ""
                )}
                {this.state.loading == true ? (
                  <div className="bixnknfkfjkjrjr">
                    <LoadingSpin />
                  </div>
                ) : (
                  ""
                )}
                {/*    <div className="contiantien-postt">
                <div className="box-media-boxx"></div>
                <div className="box-media-boxx"></div>
                <div className="box-media-boxx"></div>
            </div>*/}
              </div>
            </div>
            <Navtop />
            <Navbom handloption={this.handloption} />
            <Boxcollection
              user={this.props.user}
              file={this.props.file}
              openBoxCollection={this.props.openBoxCollection}
              boxCollection={this.props.boxCollection}
            />
          </div>
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

export default withRouter(Discover);
