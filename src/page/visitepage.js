import React, { Component } from "react";
import ShareOption from "../component/shareoption";
import SharePost from "../component/sharepost";
import { withRouter, Link } from "react-router-dom";
import ButtonFollow from "../component/buttonFollow";
import Nav from "../component/nav";
import axios from "axios";
import Username from "../component/username";
import ApiUrl from "../url";
import LoadingSpin from "../component/loadingspin";
import profile from "../profile.webp";
import Boxcollection from "../component/boxcollection";
import TagggedPost from "../component/taggedPost";
import MessageButton from "../component/messageSomeone";
import PostVue from "../component/postvue";
import { BiArrowBack } from "react-icons/bi";
let source;
source = axios.CancelToken.source();
class Visitpage extends Component {
  state = {
    setting: false,
    profile: null,
    posted: null,
    follow: false,
    shareoption: false,
    file: "",
    sharebox: false,
    tagged: false,
  };

  constructor(props) {
    super(props);
    source = axios.CancelToken.source();
  }

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
  extractHostname = (url) => {
    var hostname;

    if (url.indexOf("//") > -1) {
      hostname = url.split("/")[2];
    } else {
      hostname = url.split("/")[0];
    }

    //find & remove port number
    hostname = hostname.split(":")[0];
    //find & remove "?"
    hostname = hostname.split("?")[0];

    return hostname;
  };

  chantabs = (data) => {
    this.setState({
      tagged: data,
    });
  };

  handleSettingg = (data) => {
    this.setState({
      shareoption: data,
    });
  };

  handlOpenS = (data) => {
    this.setState({
      sharebox: data,
    });
    this.handleSettingg(false);
  };
  handleSetting = (data) => {
    this.setState({
      setting: data,
    });
  };

  goBack = (e) => {
    this.props.history.goBack();
  };

  hispost = () => {
    axios
      .get(`/api/profile/${this.state.profile.userid}`, {
        withCredentials: true,
        cancelToken: source.token,
      })
      .then((res) => {
        if (res.data.post) {
          this.setState({
            posted: res.data.post.reverse(),
          });
        }
      });
  };
  getprofile = (e) => {
    axios
      .get(`/api/accountt/${this.props.match.params.id}`, {
        withCredentials: true,
        cancelToken: source.token,
      })
      .then((res) => {
        if (res.data.Username) {
          if (res.data.Username == this.props.user.Username) {
            this.props.history.push("/profile");
          } else {
            this.setState({
              profile: res.data,
              file: res.data.userid,
            });
            this.hispost();
          }
        } else {
          this.props.history.push("/home");
        }
      });
  };

  componentDidMount = () => {
    this.getprofile();
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
            {this.state.profile !== null ? (
              <div id="visit-pro">
                <div className="control-back">
                  <div className="njejkjrmmfsr">
                    <div className="wrieii">
                      <div onClick={this.goBack} className="close-that">
                        <BiArrowBack />
                      </div>
                      <div className="name-pr">
                        {this.state.profile.Username}
                        {this.state.profile.verified == true ? (
                          <div className="verified">
                            <i className="fas fa-check"></i>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    {/*<div className="name-actionn">
                  <SettingAccount  handleSettingg={this.handleSettingg} follow={this.state.follow} handleSetting={this.handleSetting} setting={this.state.setting}/>
       <button  onClick={()=>{this.handleSetting(true)}} className="mneuu-num-pro">
            <i className="fas fa-ellipsis-v"></i>
        </button>

        </div>*/}
                  </div>
                </div>

                <div className="tjjttpjt">
                  <div className="barnner-propfde">
                    {this.state.profile.banner ? (
                      this.state.profile.banner.length > 0 ? (
                        <img
                          className="pect-ppr"
                          src={`${ApiUrl.content}${this.state.profile.banner}`}
                          loading="lazy"
                        />
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="cover-box-on">
                    <div className="imga-profile-descp">
                      <div className="pro-img-box">
                        <div className="pro-img">
                          {this.state.profile.profile ? (
                            <img
                              className="pect-ppr"
                              src={`${ApiUrl.content}${this.state.profile.profile}`}
                              loading="lazy"
                            />
                          ) : (
                            <img src={profile} />
                          )}
                        </div>

                        <div className="actine-edit">
                          <div className="name-actionn">
                            <div className="name-prrr">
                              {this.state.profile.Username}
                              {this.state.profile.verified == true ? (
                                <div className="verified">
                                  <i className="fas fa-check"></i>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                            <button className="mneuu-num-pro"></button>
                          </div>

                          <p className="name-prr">
                            {this.state.profile.fullName}
                          </p>
                          <div className="bio-sub-desciption rjjr">
                            <div className="info-acct">
                              <div id="post-nu " className="al">
                                <div id="number-post" className="number-post">
                                  {this.nFormatter(
                                    this.state.profile.postnumber
                                  )}
                                </div>
                                <p>Post</p>
                              </div>
                              <Link
                                to={`/user/${this.state.profile.Username}/follower`}
                                id="follower-nu"
                                className="al"
                              >
                                <div
                                  id="number-followers"
                                  className="number-followers"
                                >
                                  {this.nFormatter(
                                    this.state.profile.numberfollowers
                                  )}
                                </div>
                                <p>Followers</p>
                              </Link>
                              <Link
                                to={`/user/${this.state.profile.Username}/following`}
                                id="following-nu al"
                                className="al"
                              >
                                <div
                                  id="number-following"
                                  className="number-following"
                                >
                                  {this.nFormatter(
                                    this.state.profile.numberfollowings
                                  )}
                                </div>
                                <p>following</p>
                              </Link>
                            </div>
                          </div>
                          <div className="action-follow-un-fo disps">
                            {this.state.profile.userid ? (
                              <MessageButton
                                friend={this.state.profile.userid}
                              />
                            ) : (
                              ""
                            )}
                            {this.state.profile.userid ? (
                              <ButtonFollow
                                friend={this.state.profile.userid}
                              />
                            ) : (
                              ""
                            )}

                            {this.state.profile.myfista == true ? (
                              <button className="flo">
                                <Link
                                  className="llx"
                                  to={`/myfitstapro/${this.state.profile.userid}`}
                                >
                                  PRO
                                </Link>
                              </button>
                            ) : (
                              ""
                            )}
                          </div>

                          <div className="bio-info">
                            {this.state.profile.bio ? (
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: this.state.profile.bio,
                                }}
                              ></p>
                            ) : (
                              ""
                            )}
                          </div>
                          {this.state.profile.bio ? (
                            <div className="fjejrejj">
                              {" "}
                              {this.state.profile.website.length > 0 ? (
                                <a href="this.state.profile.website">
                                  {this.extractHostname(
                                    this.state.profile.website
                                  )}
                                </a>
                              ) : (
                                ""
                              )}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="action-follow-un-fo mobioe">
                        <div className="wraeoieke">
                          {this.state.profile.userid ? (
                            <MessageButton friend={this.state.profile.userid} />
                          ) : (
                            ""
                          )}
                          {this.state.profile.userid ? (
                            <ButtonFollow
                              user={this.props.user.userid}
                              friend={this.state.profile.userid}
                            />
                          ) : (
                            ""
                          )}
                        </div>

                        {this.state.profile.myfista == true ? (
                          <button className="flo">
                            <Link
                              className="llx"
                              to={`/myfitstapro/${this.state.profile.userid}`}
                            >
                              PRO
                            </Link>
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="bioo-info">
                        {this.state.profile.bio ? (
                          <p
                            dangerouslySetInnerHTML={{
                              __html: this.state.profile.bio,
                            }}
                          ></p>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="proo-img-box">
                        <div className="actinee-edit">
                          <div className="bioo-sub-desciption">
                            <div className="info-acct">
                              <div id="post-nu " className="al">
                                <div id="number-post" className="number-post">
                                  {this.nFormatter(
                                    this.state.profile.postnumber
                                  )}
                                </div>
                                <p>Post</p>
                              </div>
                              <Link
                                to={`/user/${this.state.profile.Username}/follower`}
                                id="follower-nu"
                                className="al"
                              >
                                <div
                                  id="number-followers"
                                  className="number-followers"
                                >
                                  {this.nFormatter(
                                    this.state.profile.numberfollowers
                                  )}
                                </div>
                                <p>Followers</p>
                              </Link>
                              <Link
                                to={`/user/${this.state.profile.Username}/following`}
                                id="following-nu al"
                                className="al"
                              >
                                <div
                                  id="number-following"
                                  className="number-following"
                                >
                                  {this.nFormatter(
                                    this.state.profile.numberfollowings
                                  )}
                                </div>
                                <p>following</p>
                              </Link>
                            </div>
                          </div>

                          <div className="bio-info">
                            <p>Programer</p>
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
                      {this.state.posted !== null
                        ? this.state.posted.length > 0
                          ? this.state.posted?.map((item) => {
                              return <PostVue item={item} key={item._id} />;
                            })
                          : ""
                        : "loading..."}
                    </div>
                  ) : this.state.tagged == false ? (
                    <div className="wraperififoojfhr">
                      <div className="wraperjf-ffkfkr">
                        <p>No post</p>
                        <p>
                          All {this.state.profile.Username} post will be listed
                          here{" "}
                        </p>
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
                  {this.state.profile.userid ? (
                    <TagggedPost
                      openBoxCollection={this.props.openBoxCollection}
                      user={this.state.profile.userid}
                      tagged={this.state.tagged}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              <div id="visit-pro">
                <div className="bixnknfkfjkjrjr">
                  <LoadingSpin />
                </div>
              </div>
            )}
          </div>
        </div>
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
          kind={"profile"}
        />
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

export default withRouter(Visitpage);
