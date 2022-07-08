import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { HiCheck } from "react-icons/hi";
import axios from "axios";
import ApiUrl from "../url";
import { BsArrowRepeat, BsGraphUp } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import LoadingSpin from "../component/loadingspin";
import Account from "../pro/account";
import { connect } from "react-redux";
import Billing from "../pro/billing";
import SubscriberList from "../component/SubscriberList";
class MyfistaProAc extends Component {
  state = {
    edit: false,
    button: false,
    loading: false,
    id: "",
  };
  goBack = () => {
    this.props.history.goBack();
  };

  activate = () => {
    if (
      this.props.users.postnumber >= 0 &&
      this.props.users.numberfollowings >= 0
    ) {
      this.setState({
        loading: true,
      });
      let option = {
        userid: this.props.users.userid,
      };
      axios
        .post(`/api/activate-myfit-sta-pro`, option)
        .then((data) => {
          if (data.data.succes == true) {
            this.props.history.push("/setup");
          } else {
          }
        });
    }
  };
  componentDidUpdate(prevProps) {
    if (this.state.id !== this.props.match.params.id) {
      if (this.props.match.params.id == "myfistapro") {
      }
      this.setState({ id: this.props.match.params.id });
    }
  }

  componentDidMount = () => {
    //this.activate()
    if (this.props.match.params.id == "myfistapro") {
    }
    if (
      this.props.users.postnumber >= 10 &&
      this.props.users.numberfollowings >= 100
    ) {
      this.setState({
        button: true,
      });
    }
  };
  render() {
    return (
      <div className="wrrapeerr-uoirjr-cham">
        <div className="title-edit">
          <div className="before-edit">
            <div onClick={this.goBack} className="close-that">
              <BiArrowBack />
            </div>
            <p>MyFitstaPro</p>
          </div>
        </div>
        {this.props.users.myfista == true ? (
          <div className="fjejtietii">
            <div className="wrpajna-thetabshs">
              <div
                className={`tabshjjjr ${
                  this.props.match.params.data == undefined ? "active" : ""
                }`}
              >
                <Link to={"/setting/myfistapro"}>Account</Link>
              </div>
              <div
                className={`tabshjjjr ${
                  this.props.match.params.data
                    ? this.props.match.params.data == "subscriber"
                      ? "active"
                      : ""
                    : ""
                }`}
              >
                <Link to={"/setting/myfistapro/subscriber"}>Subscriber</Link>
              </div>
              <div
                className={`tabshjjjr ${
                  this.props.match.params.data
                    ? this.props.match.params.data == "subscriber"
                      ? ""
                      : "active"
                    : ""
                } `}
              >
                <Link to={"/setting/myfistapro/billing"}>Payment</Link>
              </div>
            </div>
            {this.props.match.params.data ? (
              this.props.match.params.data == "subscriber" ? (
                <SubscriberList user={this.props.users.userid} />
              ) : (
                <Billing />
              )
            ) : (
              <Account />
            )}
          </div>
        ) : (
          <div className="wrpefrirrrj">
            <div className="tifiooif">What can you do with MyFitstapro?</div>
            <div className="icondjnjr">
              Hi {this.props.users.Username}, Please keep in mind that
              MyfitstaPro will be released soon. Thank you
            </div>
            <div className="wtapthensjjfjt">
              <div className="class-boxx">
                <div className="eldtoo"></div>
                <div className="rrjjsjeje">
                  <div className="wrieii">
                    <div className="wrpsjiirir-icocod">
                      <BsArrowRepeat />
                    </div>
                    <div className="djfrjir">Create Subsciption</div>
                  </div>
                </div>
                <div className="decrioirbe">
                  <div className="wrapeiirr">
                    <div className="fjsifojdisf">
                      <HiCheck />
                    </div>
                    <div className="ksffkfkkf">
                      Create your own Subsciption plan
                    </div>
                  </div>
                  <div className="wrapeiirr">
                    <div className="fjsifojdisf">
                      <HiCheck />
                    </div>
                    <div className="ksffkfkkf">
                      Recuring payment from subscriber
                    </div>
                  </div>
                  <div className="wrapeiirr">
                    <div className="fjsifojdisf">
                      <HiCheck />
                    </div>
                    <div className="ksffkfkkf">
                      Quick and easy implimentation
                    </div>
                  </div>
                </div>
              </div>

              <div className="class-boxx">
                <div className="eldtoo"></div>
                <div className="rrjjsjeje">
                  <div className="wrieii">
                    <div className="wrpsjiirir-icocod">
                      <BsGraphUp />
                    </div>
                    <div className="djfrjir">Sell Programs</div>
                  </div>
                </div>
                <div className="decrioirbe">
                  <div className="wrapeiirr">
                    <div className="fjsifojdisf">
                      <HiCheck />
                    </div>
                    <div className="ksffkfkkf">
                      Set your own pricing for each program
                    </div>
                  </div>
                  <div className="wrapeiirr">
                    <div className="fjsifojdisf">
                      <HiCheck />
                    </div>
                    <div className="ksffkfkkf">
                      Potentility to have more subscriber
                    </div>
                  </div>
                  <div className="wrapeiirr">
                    <div className="fjsifojdisf">
                      <HiCheck />
                    </div>
                    <div className="ksffkfkkf">
                      Quick and easy implimentation
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="progress-slekdkfk">
              <div className="progremmsm">
                <div className="fsjjjrijsjjr">Follower</div>
                <div className="soeproro">
                  <p>{this.props.users.numberfollowings}</p>
                  <p>100</p>
                </div>
                <div className="progrshhhdif">
                  <div
                    style={{
                      width: `${
                        (this.props.users.numberfollowings * 100) / 100
                      }%`,
                    }}
                    className="barbsfof"
                  ></div>
                </div>
              </div>

              <div className="progremmsm">
                <div className="fsjjjrijsjjr">Post</div>
                <div className="soeproro">
                  <p>{this.props.users.postnumber}</p>
                  <p>10</p>
                </div>
                <div className="progrshhhdif">
                  <div
                    style={{
                      width: `${(this.props.users.postnumber * 100) / 10}%`,
                    }}
                    className="barbsfof"
                  ></div>
                </div>
              </div>
              {/*{this.props.users.canActivate==true?<div className={`activated-buttobox`}>
<div className={`conte-thise-actionrb active`}>

			<button  onClick={this.activate}  className={`create`}><Link to="/setup">SETUP YOUR ACCOUNT</Link></button>
            {this.state.loading==true?<div className="jietiooeo"> <LoadingSpin/></div>:""}
			</div>
</div>:<div className={`activated-buttobox`}>
<div className={`conte-thise-actionrb ${this.state.button==false ? "" :"active"}  ${this.state.loading==true ?"":""}`}>
			<button  onClick={this.activate}  className={`create`}>ACTIVATE</button>
            {this.state.loading==true?<div className="jietiooeo"> <LoadingSpin/></div>:""}
			</div>
</div>}*/}
            </div>
          </div>
        )}
      </div>
    );
  }
}
const mapstateToProps = (state) => {
  return {
    users: state.user,
  };
};
export default connect(mapstateToProps)(withRouter(MyfistaProAc));
