import React, { Component } from "react";
import Nav from "../component/nav";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import "../style/setting.css";
import Mode from "../settingpage/mode";
import MyfistaProAc from "../settingpage/myfitstapro";
import LoginActivity from "../settingpage/loginactivity";
import Earning from "../settingpage/earning";
import { MdModeEdit } from "react-icons/md";
import TermCondition from "../settingpage/termandcondition";
import Subcription from "../settingpage/subscription";
import ChangePassword from "../settingpage/changePassword";
import Edit from "../page/edit";
import { RiArrowRightSLine, RiLockPasswordFill } from "react-icons/ri";
import { AiFillFire } from "react-icons/ai";
import { SiGooglemaps } from "react-icons/si";
import { BsArrowRepeat, BsBarChartFill, BsMoon } from "react-icons/bs";
import { BiArrowBack, BiLogOut } from "react-icons/bi";
import { FaClipboardList } from "react-icons/fa";
let source;
source = axios.CancelToken.source();
class Setting extends Component {
  state = {};
  constructor(props) {
    super(props);
    source = axios.CancelToken.source();
  }
  goBack = () => {
    this.props.history.push("/home");
  };

  componentDidUpdate = () => {
    if (this.props.match.params.id == undefined) {
      if (window.screen.width >= 1100) {
        this.props.history.push("/setting/edit");
      }
    }
  };
  logout = () => {
    axios.get("/api/logoutt", { withCredentials: true }).then((res) => {
      window.location.reload();
    });
  };
  componentDidMount = () => {
    if (this.props.match.params.id == undefined) {
      if (window.screen.width >= 1030) {
        this.props.history.push("/setting/edit");
      }
    }
  };

  render() {
    return (
      <div className="conatiner">
        <Nav user={this.props.user} />
        <div id="app">
          <div id="body-tabs">
            <div className="tabs-that0-hold-the-setting">
              <div
                className={`bar-that-hold-it   ${
                  this.props.match.params.id !== undefined ? "displauie" : ""
                }  `}
              >
                <div className="tilte-t-the-message">
                  <div className="jrnrjnjrnf">
                    <div onClick={this.goBack} className="close-that">
                      <BiArrowBack />
                    </div>
                    <p>Setting</p>
                  </div>
                  <div
                    onClick={() => {
                      this.handleopen(true);
                    }}
                    className="back-button"
                  ></div>
                </div>

                <div
                  className={`box-that0-hold-thetabsb-m ${
                    this.props.match.params.id !== undefined
                      ? this.props.match.params.id == "edit"
                        ? "active "
                        : ""
                      : ""
                  } `}
                >
                  <div className="back-buttont">
                    <MdModeEdit />
                  </div>
                  <Link to={"/setting/edit"}>Edit Profile</Link>
                  <div className="back-button">
                    <RiArrowRightSLine />
                  </div>
                </div>
                <div
                  className={`box-that0-hold-thetabsb-m ${
                    this.props.match.params.id !== undefined
                      ? this.props.match.params.id == "changePassword"
                        ? "active "
                        : ""
                      : ""
                  }`}
                >
                  <div className="back-buttont">
                    <RiLockPasswordFill />
                  </div>
                  <Link to={"/setting/changePassword"}>Change Password</Link>
                  <div className="back-button">
                    <RiArrowRightSLine />
                  </div>
                </div>
                {/*<div className={`box-that0-hold-thetabsb-m ${this.props.match.params.id!==undefined? this.props.match.params.id=="notification"?"active ":"" :""}`}>
<div className="back-buttont">
    <MdNotifications/>
</div>
<Link to={"/setting/notification"}>Push Notification</Link>
    <div className="back-button"><RiArrowRightSLine/></div>
</div>*/}

                <div
                  className={`box-that0-hold-thetabsb-m ${
                    this.props.match.params.id !== undefined
                      ? this.props.match.params.id == "myfistapro"
                        ? "active "
                        : ""
                      : ""
                  }`}
                >
                  <div className="back-buttont">
                    <AiFillFire />
                  </div>
                  <Link to={"/setting/myfistapro"}>MyFitstaPro</Link>
                  <div className="back-button">
                    <RiArrowRightSLine />
                  </div>
                </div>

                <div
                  className={`box-that0-hold-thetabsb-m ${
                    this.props.match.params.id !== undefined
                      ? this.props.match.params.id == "subscription"
                        ? "active "
                        : ""
                      : ""
                  }`}
                >
                  <div className="back-buttont">
                    <BsArrowRepeat />
                  </div>
                  <Link to={"/setting/subscription"}>Subscription & order</Link>
                  <div className="back-button">
                    <RiArrowRightSLine />
                  </div>
                </div>
                <div
                  className={`box-that0-hold-thetabsb-m ${
                    this.props.match.params.id !== undefined
                      ? this.props.match.params.id == "earning"
                        ? "active "
                        : ""
                      : ""
                  }`}
                >
                  <div className="back-buttont">
                    <BsBarChartFill />
                  </div>
                  <Link to={"/setting/earning"}>Earnings</Link>
                  <div className="back-button">
                    <RiArrowRightSLine />
                  </div>
                </div>
                <div
                  className={`box-that0-hold-thetabsb-m ${
                    this.props.match.params.id !== undefined
                      ? this.props.match.params.id == "loginActivity"
                        ? "active "
                        : ""
                      : ""
                  }`}
                >
                  <div className="back-buttont">
                    <SiGooglemaps />
                  </div>
                  <Link to={"/setting/loginActivity"}>Login Activity</Link>
                  <div className="back-button">
                    <RiArrowRightSLine />
                  </div>
                </div>
                <div
                  className={`box-that0-hold-thetabsb-m ${
                    this.props.match.params.id !== undefined
                      ? this.props.match.params.id == "mode"
                        ? "active "
                        : ""
                      : ""
                  }`}
                >
                  <div className="back-buttont">
                    <BsMoon />
                  </div>
                  <Link to={"/setting/mode"}>Theme</Link>
                  <div className="back-button">
                    <RiArrowRightSLine />
                  </div>
                </div>

                {/*<div className={`box-that0-hold-thetabsb-m ${this.props.match.params.id!==undefined? this.props.match.params.id=="paymentInfo"?"active ":"" :""}`}>
<div className="back-buttont">
    <MdPayment/>
</div>
<Link to={"/setting/paymentInfo"}>Payment Information</Link>
    <div className="back-button"><RiArrowRightSLine/></div>
</div>*/}
                <div
                  className={`box-that0-hold-thetabsb-m ${
                    this.props.match.params.id !== undefined
                      ? this.props.match.params.id == "termsCondition"
                        ? "active "
                        : ""
                      : ""
                  }`}
                >
                  <div className="back-buttont">
                    <FaClipboardList />
                  </div>
                  <Link to={"/setting/termsCondition"}>
                    Terms and Conditions
                  </Link>
                  <div className="back-button">
                    <RiArrowRightSLine />
                  </div>
                </div>

                <div
                  onClick={this.logout}
                  className={`box-that0-hold-thetabsb-m rhrhhrh ${
                    this.props.match.params.id !== undefined
                      ? this.props.match.params.id == "termsCondition"
                        ? "active "
                        : ""
                      : ""
                  }`}
                >
                  <div className="back-buttont">
                    <BiLogOut />
                  </div>
                  <p>Log out</p>
                </div>
              </div>
              <div
                className={`wrapr-thatj-tahbs ${
                  this.props.match.params.id !== undefined ? "active" : ""
                }`}
              >
                {this.props.match.params.id !== undefined ? (
                  this.props.match.params.id == "edit" ? (
                    <div
                      className={`sub-wraprj-tabs ${
                        this.props.match.params.id !== undefined
                          ? this.props.match.params.id == "edit"
                            ? "active "
                            : ""
                          : ""
                      }`}
                    >
                      <Edit user={this.props.user} />
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}

                {this.props.match.params.id !== undefined ? (
                  this.props.match.params.id == "changePassword" ? (
                    <div
                      className={`sub-wraprj-tabs ${
                        this.props.match.params.id !== undefined
                          ? this.props.match.params.id == "changePassword"
                            ? "active "
                            : ""
                          : ""
                      }`}
                    >
                      <ChangePassword />
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}

                {this.props.match.params.id !== undefined ? (
                  this.props.match.params.id == "earning" ? (
                    <div
                      className={`sub-wraprj-tabs ${
                        this.props.match.params.id !== undefined
                          ? this.props.match.params.id == "earning"
                            ? "active "
                            : ""
                          : ""
                      }`}
                    >
                      <Earning />
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}

                {this.props.match.params.id !== undefined ? (
                  this.props.match.params.id == "loginActivity" ? (
                    <div
                      className={`sub-wraprj-tabs ${
                        this.props.match.params.id !== undefined
                          ? this.props.match.params.id == "loginActivity"
                            ? "active "
                            : ""
                          : ""
                      }`}
                    >
                      <LoginActivity />
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}

                {/*{this.props.match.params.id!==undefined? this.props.match.params.id=="notification"?<div className={`sub-wraprj-tabs ${this.props.match.params.id!==undefined? this.props.match.params.id=="notification"?"active ":"" :""}`} >
  <NotificationAc/>
</div>:"" :""}*/}
                {this.props.match.params.id !== undefined ? (
                  this.props.match.params.id == "subscription" ? (
                    <div
                      className={`sub-wraprj-tabs ${
                        this.props.match.params.id !== undefined
                          ? this.props.match.params.id == "subscription"
                            ? "active "
                            : ""
                          : ""
                      }`}
                    >
                      <Subcription />
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
                {/*{this.props.match.params.id!==undefined? this.props.match.params.id=="paymentInfo"?<div className={`sub-wraprj-tabs ${this.props.match.params.id!==undefined? this.props.match.params.id=="paymentInfo"?"active ":"" :""}`} >
   {<PaymentInfo/>}
</div>:"" :""}*/}
                {this.props.match.params.id !== undefined ? (
                  this.props.match.params.id == "termsCondition" ? (
                    <div
                      className={`sub-wraprj-tabs ${
                        this.props.match.params.id !== undefined
                          ? this.props.match.params.id == "termsCondition"
                            ? "active "
                            : ""
                          : ""
                      }`}
                    >
                      <TermCondition />
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
                {this.props.match.params.id !== undefined ? (
                  this.props.match.params.id == "myfistapro" ? (
                    <div
                      className={`sub-wraprj-tabs ${
                        this.props.match.params.id !== undefined
                          ? this.props.match.params.id == "myfistapro"
                            ? "active "
                            : ""
                          : ""
                      }`}
                    >
                      <MyfistaProAc />
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
                {this.props.match.params.id !== undefined ? (
                  this.props.match.params.id == "mode" ? (
                    <div
                      className={`sub-wraprj-tabs ${
                        this.props.match.params.id !== undefined
                          ? this.props.match.params.id == "mode"
                            ? "active "
                            : ""
                          : ""
                      }`}
                    >
                      <Mode />
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Setting);
