import React, { Component } from "react";
import "../style/ui.css";
import Nav from "../component/nav";
import SharePost from "../component/sharepost";
import ShareOption from "../component/shareoption";
import { Link, withRouter } from "react-router-dom";
import Rating from "../component/rating";
import axios from "axios";
import { GoPlus } from "react-icons/go";
import profile from "../profile.webp";
import Username from "../component/username";
import ApiUrl from "../url";
import LoadingSpin from "../component/loadingspin.js";
import Addprogram from "../component/addProgram";
import { BiArrowBack } from "react-icons/bi";
import SettingMyfiststapro from "../component/settingMyfitstapro";
import { connect } from "react-redux";
let source;
source = axios.CancelToken.source();
class Myfitstapro extends Component {
  state = {
    setting: false,
    open: false,
    program: null,
    shareoption: false,
    sharebox: false,
    file: this.props.user.userid,
  };
  constructor(props) {
    super(props);
    source = axios.CancelToken.source();
  }
  goBack = (e) => {
    this.props.history.goBack();
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

  handlOpen = (data) => {
    this.setState({
      open: data,
    });
  };

  getProgram = (e) => {
    axios
      .get(`${ApiUrl.Two}load-my-pwo/${this.props.user.userid}`, {
        cancelToken: source.token,
      })
      .then((res) => {
        this.setState({
          program: res.data.reverse(),
        });
      });
  };

  componentDidMount = (e) => {
    this.getProgram();
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
            <div className="wraper-it-baom">
              <div id="profile-box-mone-mak-seach-dude">
                <div className="title-of-prodf">
                  <div onClick={this.goBack} className="close-that">
                    <BiArrowBack />
                  </div>
                  <Username link={true} user={this.props.user.userid} />
                  <div className="jjjrrrdd">
                    <button
                      onClick={() => this.handlOpen(true)}
                      className="close-that"
                    >
                      {" "}
                      <GoPlus />
                    </button>
                  </div>
                </div>
                <SettingMyfiststapro
                  handlOpen={this.handlOpen}
                  handleSettingg={this.handleSettingg}
                  handleSetting={this.handleSetting}
                  setting={this.state.setting}
                  user={this.props.user}
                />
                <div className="barnner-propfde">
                  {this.props.pro.banner.length > 0 ? (
                    <img
                      className="pect-ppr"
                      src={`${ApiUrl.content}${this.props.pro.banner}`}
                      loading="lazy"
                    />
                  ) : (
                    ""
                  )}
                </div>

                <div className="cover-box-on">
                  <div className="imga-profile-descp eexr">
                    <div className="pro-img-box">
                      <div className="pro-img">
                        {this.props.pro.profileUrl.length > 0 ? (
                          <img
                            className="imag-pro"
                            src={`${ApiUrl.content}${this.props.pro.profileUrl}`}
                          />
                        ) : (
                          <img className="imag-pro" src={profile} />
                        )}
                      </div>

                      <div className="actine-edit">
                        <div className="name-action">
                          <div className="name-pr">
                            <p>{this.props.user.Username}</p>{" "}
                            {this.props.user.verified == true ? (
                              <p className="cheh">
                                <i className="fas fa-check"></i>
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <p className="name-prr">@{this.props.user.Username}</p>
                        <div className="bio-sub-desciption rjjr">
                          <div className="info-acct">
                            <div id="post-nu " className="al">
                              <div id="number-post" className="number-post">
                                {this.props.myfitstapro.numberOfProgram}
                              </div>
                              <p>program</p>
                            </div>
                            <div id="follower-nu" className="al">
                              <div
                                id="number-followers"
                                className="number-followers"
                              >
                                {this.props.myfitstapro.numberOfSubscriber}
                              </div>
                              <p>subscribers</p>
                            </div>
                          </div>
                        </div>
                        <div className="bio-info">
                          <p
                            dangerouslySetInnerHTML={{
                              __html: this.props.pro.bio,
                            }}
                          ></p>
                        </div>
                      </div>
                    </div>
                    <div className="bioo-info">
                      <div className="hol-thieinformation">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: this.props.pro.bio,
                          }}
                        ></p>
                      </div>
                      <div className="bioo-sub-desciption">
                        <div className="info-acct vbvb">
                          <div id="post-nu " className="al ll">
                            <div id="number-post" className="number-post">
                              {this.props.myfitstapro.numberOfProgram}
                            </div>
                            <p>program</p>
                          </div>
                          <div id="follower-nu" className="al ll">
                            <div
                              id="number-followers"
                              className="number-followers"
                            >
                              {this.props.myfitstapro.numberOfSubscriber}
                            </div>
                            <p>subscribers</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="wosjfijitjid">
                  {this.state.program != null ? (
                    this.state.program.length > 0 ? (
                      <div className="hold-your-work-program active">
                        {this.state.program.map((item) => {
                          return (
                            <div className="card-box-program" key={item._id}>
                              <div className="statqusre">
                                <div className="descplr-image-program-ui">
                                  <div className="hold-imf">
                                    <Link
                                      to={`/program/workout/${item.programId}`}
                                      className="link0-toorohran"
                                    ></Link>
                                    {item.file.length > 0 ? (
                                      item.fileKind.includes("image") ? (
                                        <img
                                          src={`${ApiUrl.content}${item.file}`}
                                        />
                                      ) : (
                                        <video>
                                          <source
                                            src={`${ApiUrl.content}${item.file}`}
                                          />
                                        </video>
                                      )
                                    ) : (
                                      <div className="wkffkfkjkf"></div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="waorornngrkrr">
                                <div className="title-of-workot">
                                  {item.title}
                                </div>
                                <Rating rating={item.rating} />

                                <div className="action-postf-desing">
                                  {item.programType == 0 ? (
                                    ""
                                  ) : (
                                    <div className="mmenu-act5">
                                      <span>${item.price}</span>
                                    </div>
                                  )}
                                </div>

                                {item.publish == true ? (
                                  <p className="publish">Publish</p>
                                ) : (
                                  <p className="draft">Draft</p>
                                )}
                              </div>
                            </div>
                          );
                        })}{" "}
                      </div>
                    ) : (
                      <div className="wraperififoojfhr">
                        <div className="wraperjf-ffkfkr">
                          <p>Create a Program</p>
                          <p>
                            {" "}
                            Create your program and publish it to the world
                          </p>
                          <div className="wraper-thejr">
                            <button
                              onClick={() => this.handlOpen(true)}
                              className="dijroooeo"
                              to={"/post"}
                            >
                              Add Program
                            </button>
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
            </div>
          </div>
        </div>
        <Addprogram
          type={this.props.myfitstapro.accountType}
          user={this.props.user}
          handlOpen={this.handlOpen}
          open={this.state.open}
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
          kind={"profilepro"}
        />
      </div>
    );
  }
}

const mapstateToProps = (state) => {
  return {
    pro: state.pro,
  };
};

export default connect(mapstateToProps)(withRouter(Myfitstapro));
