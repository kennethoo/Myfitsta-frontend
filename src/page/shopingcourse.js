import React, { Component } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Shopcard from "../component/shopcard";
import Setting from "../component/settinglookMyfista";
import axios from "axios";
import ProIcon from "../programs/proicon";
import ApiUrl from "../url";
import Username from "../component/username";
import LoadingSpin from "../component/loadingspin";
import PersoCard from "../component/persocard";
import { BiArrowBack } from "react-icons/bi";
import { withRouter, Link } from "react-router-dom";
import MessageButton from "../component/messageSomeone";
import "../style/setup.css";
let source;
source = axios.CancelToken.source();
class Shoping extends Component {
  state = {
    setting: false,
    subscribe: false,
    profile: {},
    subscribeCheck: null,
    plan: [],
    subscribeBox: false,
    program: null,
    card: [],
    tabsprogram: true,
    tabscard: false,
  };
  constructor(props) {
    super(props);
    source = axios.CancelToken.source();
  }
  goback = () => {
    this.props.history.goBack();
  };

  changetabs = (one, two) => {
    this.setState({
      tabsprogram: one,
      tabscard: two,
    });
  };
  getCardInfo = () => {
    axios
      .get("/api/my-card", { withCredentials: true, cancelToken: source.token })
      .then((res) => {
        if (res.data.item) {
          let list = [...res.data.item];
          this.setState({
            card: list,
          });
        }
      });
  };

  getProgram = (e) => {
    axios
      .get(
        `/api/load-my-active-pwo/${this.state.profile.userid}/to/${this.props.user.userid}`,
        { cancelToken: source.token }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.length > 0) {
          this.setState({
            program: res.data.reverse(),
          });
        } else {
          this.setState({
            program: "no",
          });
        }
      });
  };

  handleSetting = (data) => {
    this.setState({
      setting: data,
    });
  };

  subscribe = (event) => {
    if (this.state.subscribe == true) {
      let option = {
        User: this.state.profile.userid,
        subScriber: this.props.user.userid,
        PlanOfUser: "",
        typeofSubscription: this.state.profile.accountType,
      };

      axios.post(`/api/newSubcribert`, option).then((res) => {
        window.location.reload();
      });
    } else {
    }
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
            subscribe: false,
          });
          this.getProgram();
        } else {
          this.setState({
            program: "no",
            subscribeCheck: false,
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

  componentDidMount = () => {
    this.getData();
    this.getCardInfo();
  };

  componentWillUnmount = () => {
    if (source) {
      source.cancel("Landing Component got unmounted");
    }
  };

  render() {
    return (
      <div id="body-tabs">
        <div className="wraper-it-baom">
          <div id="profile-box-mone-mak-seach-dude">
            <div className="title-of-prodf">
              <div onClick={this.goback} className="close-that">
                <BiArrowBack />
              </div>
              <Username link={true} user={this.state.profile.userid} />
              <div className="wure">
                <div className="back-button">
                  <Link to={"/card"}>
                    <AiOutlineShoppingCart className="shoiton" />
                  </Link>
                </div>
                <p className="numberr-cardf">{this.state.card.length}</p>
              </div>
            </div>
            <Setting
              handleSetting={this.handleSetting}
              setting={this.state.setting}
            />
            <div className="barnner-propfde"></div>
            <div className="cover-box-on">
              <div className="imga-profile-descp eexr">
                <div className="pro-img-box">
                  <div className="pro-img">
                    {this.state.profile.userid ? (
                      <ProIcon user={this.state.profile.userid} />
                    ) : (
                      ""
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
                        <button onClick={this.subscribe} className="flo active">
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
                        <div id="number-followers" className="number-followers">
                          {this.state.profile.numberOfSubscriber}
                        </div>
                        <p>Subscribers</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*  <div className="tabs">
   
        <div onClick={()=>{this.changetabs(true,false)}}  className={`tabs-tonore ${this.state.tabsprogram==true?"active":""}`}>
            Programs
        </div>
      
        <div className="tabs-tonore">
      
        </div>
    </div>
*/}

            {this.state.subscribeCheck !== null ? (
              this.state.subscribeCheck == false ? (
                <div className="wraperjf-ffkfkr">
                  <p>Subscribe to {this.state.profile.Username} </p>
                  <p>
                    TO be able to see all the program relase by this accoount{" "}
                  </p>
                </div>
              ) : this.state.program !== null ? (
                this.state.program !== "no" ? (
                  <div
                    className={`hold-your-work-program ${
                      this.state.tabsprogram == true ? "active" : ""
                    }`}
                  >
                    {this.state.program !== null
                      ? this.state.program !== "no"
                        ? this.state.program.length > 0
                          ? this.state.program?.map((element) => {
                              return (
                                <Shopcard
                                  card={this.state.card}
                                  addToCard={this.addToCard}
                                  key={element._id}
                                  item={element}
                                />
                              );
                            })
                          : "no"
                        : "ttt"
                      : ""}
                  </div>
                ) : (
                  <div className="wraperjf-ffkfkr">
                    <p>No program</p>
                    <p>
                      When {this.state.profile.Username} release a program it
                      will be listed here{" "}
                    </p>
                  </div>
                )
              ) : (
                ""
              )
            ) : (
              <div className="bixnknfkfjkjrjr">
                <LoadingSpin />
              </div>
            )}

            <div
              className={`hiold-my-programs ${
                this.state.tabscard == true ? "active" : ""
              }`}
            >
              <PersoCard />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Shoping);
