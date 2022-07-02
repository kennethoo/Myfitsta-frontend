import React, { Component } from "react";
import Nav from "../component/nav";
import axios from "axios";
import TagggedPost from "../component/taggedPost";
import profile from "../profile.webp";
import { Link, withRouter } from "react-router-dom";
import logo from "../logo.png";
import ApiUrl from "../url";
import Boxcollection from "../component/boxcollection";
import LoadingSpin from "../component/loadingspin.js";
import { IoSettingsOutline } from "react-icons/io5";
import { BiArrowBack } from "react-icons/bi";
import PostVue from "../component/postvue";
let source;
source = axios.CancelToken.source();
class Profile extends Component {
  state = {
    posted: null,
    tagged: false,
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
    if (result == true) {
      return str;
    } else {
      let modifie = `${str}.com`;
      return modifie;
    }
  };

  chantabs = (data) => {
    this.setState({
      tagged: data,
    });
  };

  mypost = (e) => {
    axios
      .get(`/api/profile/${this.props.user.userid}`, {
        withCredentials: true,
        cancelToken: source.token,
      })
      .then((res) => {
        this.setState({
          posted: res.data.post.reverse(),
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

  goBack = (e) => {
    this.props.history.push("/home");
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
          <div id="body-tabss">
            <div className="wridjjr-acroutjrnj">
              <div id="account">
                <div id="box-acnt">
                  <div className="control-back">
                    <div className="wrieii">
                      <div onClick={this.goBack} className="close-that">
                        <BiArrowBack />
                      </div>
                      <p>Profile</p>
                    </div>

                    <Link to={"/setting"} className="setting">
                      {" "}
                      <IoSettingsOutline />
                    </Link>
                  </div>
                  <div className="barnner-propfde">
                    {this.props.user.banner.length > 0 ? (
                      <img
                        className="pect-ppr"
                        src={`${ApiUrl.content}${this.props.user.banner}`}
                        loading="lazy"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="cover-box-on">
                    <div className="imga-profile-descp">
                      <div className="pro-img-box">
                        <div className="pro-img">
                          {this.props.user.profile.length > 0 ? (
                            <img
                              className="pect-ppr"
                              src={`${ApiUrl.content}${this.props.user.profile}`}
                              loading="lazy"
                            />
                          ) : (
                            <img src={profile} loading="lazy" />
                          )}
                        </div>

                        <div className="actine-edit">
                          <div className="name-action">
                            <div className="name-pr">
                              {this.props.user.Username}
                              {this.props.user.verified == true ? (
                                <div className="verified">
                                  <i className="fas fa-check"></i>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="wrpw-it">
                              {this.props.user.canActivate == true ? (
                                <button className="edit-profile-activatge">
                                  <img src={logo} alt="logo" />
                                  <Link to="/setup"></Link>
                                </button>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <p className="name-prr">
                            @{this.props.user.Username}
                          </p>

                          <div className="bio-sub-desciption">
                            <div className="info-acct">
                              <div id="post-nu " className="al">
                                <div id="number-post" className="number-post">
                                  {this.nFormatter(this.props.user.postnumber)}
                                </div>
                                <p>Post</p>
                              </div>
                              <Link
                                to={`/user/${this.props.user.Username}/follower`}
                                id="follower-nu"
                                className="al"
                              >
                                <div
                                  id="number-followers"
                                  className="number-followers"
                                >
                                  {this.nFormatter(
                                    this.props.user.numberfollowers
                                  )}
                                </div>
                                <p>followers</p>
                              </Link>
                              <Link
                                to={`/user/${this.props.user.Username}/following`}
                                id="following-nu al"
                                className="al"
                              >
                                <div
                                  id="number-following"
                                  className="number-following"
                                >
                                  {this.nFormatter(
                                    this.props.user.numberfollowings
                                  )}
                                </div>
                                <p>following</p>
                              </Link>
                            </div>
                          </div>
                          <div className="bio-info">
                            <p
                              dangerouslySetInnerHTML={{
                                __html: this.props.user.bio,
                              }}
                            ></p>
                          </div>
                          <div className="fjejrejj">
                            {" "}
                            {this.props.user.website.length > 0 ? (
                              <a
                                href={`http://${this.validURL(
                                  this.props.user.website
                                )}/`}
                              >
                                {this.validURL(this.props.user.website)}
                              </a>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                      {this.props.user.bio.length > 0 ? (
                        <div className="bioo-info">
                          <p
                            dangerouslySetInnerHTML={{
                              __html: this.props.user.bio,
                            }}
                          ></p>
                        </div>
                      ) : (
                        ""
                      )}

                      <div className="proo-img-box">
                        <div className="actinee-edit">
                          <div className="bioo-sub-desciption">
                            <div className="info-acct">
                              <div id="post-nu " className="al">
                                <div id="number-post" className="number-post">
                                  {this.nFormatter(this.props.user.postnumber)}
                                </div>
                                <p>Post</p>
                              </div>
                              <Link
                                to={`/user/${this.props.user.Username}/follower`}
                                id="follower-nu"
                                className="al"
                              >
                                <div
                                  id="number-followers"
                                  className="number-followers"
                                >
                                  {this.nFormatter(
                                    this.props.user.numberfollowers
                                  )}
                                </div>
                                <p>Followers</p>
                              </Link>
                              <Link
                                to={`/user/${this.props.user.Username}/following`}
                                id="following-nu al"
                                className="al"
                              >
                                <div
                                  id="number-following"
                                  className="number-following"
                                >
                                  {this.nFormatter(
                                    this.props.user.numberfollowings
                                  )}
                                </div>
                                <p>following</p>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tabshhsh-fndnj">
                  <div
                    onClick={() => {
                      this.chantabs(false);
                    }}
                    className={`vbfhj-tabs ${
                      this.state.tagged == false ? "active" : ""
                    }`}
                  >
                    POST
                  </div>
                  <div
                    onClick={() => {
                      this.chantabs(true);
                    }}
                    className={`vbfhj-tabs ${
                      this.state.tagged == true ? "active" : ""
                    }`}
                  >
                    TAGGED
                  </div>
                </div>

                {this.state.posted !== null ? (
                  this.state.posted.length > 0 ? (
                    <div
                      className={`post-detail ${
                        this.state.tagged == false ? "active" : ""
                      }`}
                    >
                      {this.state.posted !== null ? (
                        this.state.posted.length > 0 ? (
                          this.state.posted?.map((item) => {
                            return <PostVue item={item} key={item._id} />;
                          })
                        ) : (
                          ""
                        )
                      ) : (
                        <div className="bixnknfkfjkjrjr">
                          <LoadingSpin />
                        </div>
                      )}
                    </div>
                  ) : this.state.tagged == false ? (
                    <div className="wraperififoojfhr">
                      <div className="wraperjf-ffkfkr">
                        <p>Create a new post</p>
                        <p>
                          Share with your community your best workout or fitness
                          activity
                        </p>
                        <div className="wraper-thejr">
                          <Link className="dijroooeo" to={"/post"}>
                            New Post
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
                <div
                  className={`tabgeedhs ${
                    this.state.tagged == true ? "active" : ""
                  }`}
                >
                  <TagggedPost
                    openBoxCollection={this.props.openBoxCollection}
                    user={this.props.user.userid}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Boxcollection
          user={this.props.user}
          file={this.props.file}
          openBoxCollection={this.props.openBoxCollection}
          boxCollection={this.props.boxCollection}
        />
      </div>
    );
  }
}

export default withRouter(Profile);
