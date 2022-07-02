import React, { Component } from "react";
import "../style/ui.css";
import _ from "lodash";
import profile from "../profile.webp";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import Username from "../component/username";
import ApiUrl from "../url";
import LoadingSpin from "../component/loadingspin.js";
import { BiArrowBack } from "react-icons/bi";
import Rating from "../component/rating";
import Subscribe from "../component/subscription";
import MessageButton from "../component/messageSomeone";
import SettingMyfiststapro from "../component/settingMyfitstapro";
let source;
source = axios.CancelToken.source();
class Myfitstapr extends Component {
  state = {
    setting: false,
    subscribe: false,
    profile: {},
    subscribeCheck: null,
    plan: [],
    subscribeBox: false,
    program: null,
    card: [],
  };

  constructor(props) {
    super(props);
    source = axios.CancelToken.source();
  }
  goBack = (e) => {
    this.props.history.goBack();
  };

  subscribe = () => {
    let order = ["Silver", "Platinium", "Gold"];
    let sorted = _.sortBy(this.state.profile.plan, function (obj) {
      return _.indexOf(order, obj.planChoose);
    });
    this.setState({
      plan: sorted,
      subscribeBox: true,
    });
  };

  closesubscribe = () => {
    this.setState({
      subscribeBox: false,
    });
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
      .get(
        `${ApiUrl.Two}load-my-active-pwo/${this.state.profile.userid}/to/${this.props.user.userid}`,
        { cancelToken: source.token }
      )
      .then((res) => {
        if (res.data !== "no") {
          this.setState({
            program: res.data,
          });
        }
      });
  };

  checkSubscription = () => {
    axios
      .get(`/api/checkSubscriotion/account/${this.state.profile.userid}`, {
        withCredentials: true,
        cancelToken: source.token,
      })
      .then((res) => {
        if (res.data.subScriber) {
          this.setState({
            subscribeCheck: true,
          });
          this.getProgram();
        } else {
          this.setState({
            subscribeCheck: false,
          });
          this.setState({
            subscribe: true,
          });
        }
      });
  };

  getData = () => {
    axios
      .get(`/api/myfitsta/account/${this.props.match.params.id}`, {
        withCredentials: true,
        cancelToken: source.token,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.userid) {
          if (res.data.userid == this.props.user.userid) {
            this.props.history.push("/myfitstapro");
          } else {
            this.setState({
              profile: res.data,
            });
            this.checkSubscription();
          }
        } else {
          this.props.history.push("/");
        }
      });
  };

  componentDidMount = (e) => {
    this.getData();
  };

  componentWillUnmount = () => {
    if (source) {
      source.cancel("Landing Component got unmounted");
    }
  };

  render() {
    return (
      <div id="apRp">
        <div id="body-tabs">
          <div className="wraper-it-baom">
            <div id="profile-box-mone-mak-seach-dude">
              <div className="title-of-prodf">
                <div onClick={this.goBack} className="close-that">
                  <BiArrowBack />
                </div>
                <Username link={true} user={this.state.profile.userid} />
                <div className="jjjrrrdd">
                  {/*    <button  onClick={()=>this.handleSetting(true)}  className="add-nrew-progma"> <i className="fas fa-ellipsis-v"></i></button>*/}
                </div>
              </div>
              <SettingMyfiststapro
                handleSetting={this.handleSetting}
                setting={this.state.setting}
                user={this.props.user}
              />
              <div className="barnner-propfde"></div>
              <div className="cover-box-on">
                <div className="imga-profile-descp eexr">
                  <div className="pro-img-box">
                    <div className="pro-img">
                      {this.state.profile.profileUrl ? (
                        <img
                          className="pect-ppr"
                          src={`${ApiUrl.content}${this.state.profile.profileUrl}`}
                          loading="lazy"
                        />
                      ) : (
                        <img src={profile} />
                      )}
                    </div>

                    <div className="actine-edit">
                      <Username user={this.state.profile.userid} />

                      <div className="bio-sub-desciption rjjr">
                        <div className="info-acct">
                          <div id="post-nu " className="al">
                            <div id="number-post" className="number-post">
                              {this.state.profile.numberOfProgram}
                            </div>
                            <p>Program</p>
                          </div>
                          <div id="follower-nu" className="al">
                            <div
                              id="number-followers"
                              className="number-followers"
                            >
                              {this.state.profile.numberOfSubscriber}
                            </div>
                            <p>Subscribers</p>
                          </div>
                        </div>
                      </div>
                      <div className="action-follow-un-fo disps">
                        {this.state.profile.userid ? (
                          <MessageButton friend={this.state.profile.userid} />
                        ) : (
                          ""
                        )}
                        {this.state.subscribe == false ? (
                          <button className="flo">Subscribe</button>
                        ) : (
                          <button
                            onClick={this.subscribe}
                            className="flo active"
                          >
                            Subscribe
                          </button>
                        )}
                      </div>
                      <div className="bio-info">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: this.state.profile.bio,
                          }}
                        ></p>
                      </div>
                    </div>
                  </div>
                  <div className="action-follow-un-fo mobioe">
                    <div className="wraeoieke">
                      {this.state.profile.userid ? (
                        <MessageButton friend={this.state.profile.userid} />
                      ) : (
                        ""
                      )}
                      {this.state.subscribe == false ? (
                        <button className="flo">Subscribe</button>
                      ) : (
                        <button onClick={this.subscribe} className="flo active">
                          Subscribe
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="bioo-info">
                    <div className="hol-thieinformation">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: this.state.profile.bio,
                        }}
                      ></p>
                    </div>
                    <div className="bioo-sub-desciption">
                      <div className="info-acct">
                        <div id="post-nu " className="al">
                          <div id="number-post" className="number-post">
                            {this.state.profile.numberOfProgram}
                          </div>
                          <p>Program</p>
                        </div>
                        <div id="follower-nu" className="al">
                          <div
                            id="number-followers"
                            className="number-followers"
                          >
                            {this.state.profile.numberOfSubscriber}
                          </div>
                          <p>Subscribers</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {this.state.subscribeCheck !== null ? (
                this.state.subscribeCheck == false ? (
                  <div className="wraperififoojfhr">
                    <div className="wraperjf-ffkfkr">
                      <p>Subscribe to {this.state.profile.Username} </p>
                      <p>Select a subcription plan to view all the program </p>
                    </div>
                  </div>
                ) : this.state.program != null ? (
                  this.state.program.length > 0 ? (
                    <div className="hold-your-work-program active">
                      {this.state.program.map((item) => {
                        return (
                          <div className="card-box-program" key={item._id}>
                            <div className="statqusre">
                              <div className="descplr-image-program-ui">
                                <div className="hold-imf">
                                  <Link
                                    className="link0-toorohran"
                                    to={`/program/unlock/${item.programId}`}
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
                                    <img src="https://i.ytimg.com/vi/xRZB5KBLdOA/maxresdefault.jpg" />
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="waorornngrkrr">
                              <div className="title-of-workot">
                                {item.title}
                              </div>
                              <Rating rating={item.rating} />
                            </div>
                          </div>
                        );
                      })}{" "}
                    </div>
                  ) : (
                    <div className="wraperififoojfhr">
                      <div className="wraperjf-ffkfkr">
                        <p>No Program</p>
                        <p>No program was not publish in this account yet</p>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="bixnknfkfjkjrjr">
                    <LoadingSpin />
                  </div>
                )
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        {this.state.subscribeBox == true ? (
          this.state.profile._id ? (
            <Subscribe
              closesubscribe={this.closesubscribe}
              profile={this.state.profile.userid}
              subscribeBox={this.state.subscribeBox}
              plan={this.state.plan}
            />
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default withRouter(Myfitstapr);
