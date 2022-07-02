import React, { Component } from "react";
import Nav from "../component/nav";
import axios from "axios";
import LoadingSpin from "../component/loadingspin";
import { HiCheck } from "react-icons/hi";
import Agreement from "../setup/agrement";
import { BsArrowRepeat, BsGraphUp } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import ApiUrl from "../url";
import SelectPlan from "../setup/selectplan";
import Verification from "../setup/verification";
import BaxBar from "../component/barbox";
import Registraction from "../setup/registraction";
import Select from "../setup/setuppage";
import { withRouter } from "react-router-dom";
let source;
source = axios.CancelToken.source();

class Setup extends Component {
  state = {
    kind: null,
    plan: [],
    created: null,
    step: 0,
    loadingButtton: false,
  };
  constructor(props) {
    super(props);
    source = axios.CancelToken.source();
  }
  goToNectAfterConfifiguration = () => {
    if (this.state.plan.length > 0) {
      document.querySelector(".hold-that-mess").innerText = "";
      document.querySelector(".hold-that-mess").classList.remove("active");
      this.next(4);
    } else {
      document.querySelector(".hold-that-mess").innerText =
        "Choose at least one subscription plan";
      document.querySelector(".hold-that-mess").classList.add("active");
    }
  };

  createWallet = () => {
    this.setState({
      loadingButtton: true,
    });

    axios
      .post("/api/create-the-wallet", { withCredentials: true })
      .then((result) => {
        if (result.data.succes == true) {
          this.setState({
            loadingButtton: false,
          });
          this.next(4);
        }
      });
  };
  selectplan = (e) => {
    let data = e.currentTarget;
    let box = data.parentElement.parentElement;
    let value = data.parentElement.parentElement.children[1].children[1].value;
    let planChoose = data.parentElement.children[1].innerText;
    if (box.classList.contains("adddeed")) {
      let option = {
        planChoose: planChoose,
        price: parseInt(value),
      };
      let list = [...this.state.plan];
      let removeIndex = list
        .map(function (item) {
          return item.price;
        })
        .indexOf(option.value);
      list.splice(removeIndex, 1);

      this.setState({
        plan: list,
      });
      box.classList.remove("active");
      box.classList.remove("adddeed");
      data.classList.remove("active");
    } else {
      if (value.length > 0) {
        if (parseInt(value) > 9999) {
          data.parentElement.parentElement.parentElement.children[1].classList.add(
            "active"
          );
          data.parentElement.parentElement.parentElement.children[1].innerText =
            "The maximun is 9999 ";
        } else {
          data.parentElement.parentElement.parentElement.children[1].innerText =
            "";
          data.parentElement.parentElement.parentElement.children[1].classList.remove(
            "active"
          );
        }
      } else {
        if (value.length == 0) {
          data.parentElement.parentElement.parentElement.children[1].innerText =
            "Enter a value";
          data.parentElement.parentElement.parentElement.children[1].classList.add(
            "active"
          );
        } else {
          data.parentElement.parentElement.parentElement.children[1].innerText =
            "";
          data.parentElement.parentElement.parentElement.children[1].classList.remove(
            "active"
          );
        }
      }

      if (parseInt(value) < 9999 && parseInt(value) > 0) {
        box.classList.add("active");
        data.classList.add("active");
        box.classList.add("adddeed");
        let option = {
          planChoose: planChoose,
          price: parseInt(value),
        };
        let array = [...this.state.plan, option];
        this.setState({
          plan: array,
        });
      } else {
        console.log("something went wrong");
      }
    }
  };

  Activatemyfistapro = () => {
    let option = {
      userid: this.props.user.userid,
      Username: this.props.user.Username,
      email: this.props.user.email,
      plan: this.state.plan,
      accountType: this.state.kind,
    };
    if (this.state.kind !== null) {
      if (this.state.kind == 0) {
        if (this.state.plan.length > 0) {
          axios
            .post(`${ApiUrl.Pay}add-a-new-myfitsta-user`, option)
            .then((res) => {
              window.location.reload();
            });
        } else {
        }
      } else {
        axios
          .post(`${ApiUrl.Pay}add-a-new-myfitsta-user`, option)
          .then((res) => {
            window.location.reload();
          });
      }
    } else {
    }
  };

  selectOption = (data) => {
    this.setState({
      kind: data,
    });
  };

  checkIfSelecthc = () => {
    if (this.state.kind == 0 || this.state.kind == 1) {
      if (this.state.kind == 0) {
        this.next(3);
      } else {
        this.next(4);
      }
    } else {
    }
  };

  next = (data) => {
    this.setState({
      step: data,
    });
  };

  componentDidMount = () => {
    axios
      .get("/api/created-wallet", { withCredentials: true })
      .then((result) => {
        if (result.data.succes == true) {
          this.setState({
            created: true,
            step: result.data.step,
          });
        } else {
          this.setState({
            created: false,
            step: 1,
          });
        }
      });
  };
  goBack = (e) => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div className="conatiner">
        <Nav user={this.props.user} />
        <div id="app">
          <div id="body-tabs">
            <div className="hold-thewelcome0-courseroell">
              <div className="control-back">
                <div className="fjf">
                  <div onClick={this.goBack} className="back-button">
                    <BiArrowBack />
                  </div>
                  <p>Setup</p>
                </div>
              </div>
              <div className="box-that-container-thecoursecro">
                {this.state.step == 1 ? (
                  <div className="wpaer-theslider active  ">
                    <BaxBar bar={1} />
                    <div className="welcom-title">
                      Introduction to MyFitstaPro
                    </div>
                    <div className="describe-ite-simple">
                      <div className="wtapthensjjfjtr">
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
                    </div>
                    <div className="controil-theaction">
                      <button
                        onClick={() => this.createWallet()}
                        className={`next agreen   ${
                          this.state.loadingButtton == true ? "loading" : ""
                        }  `}
                      >
                        {this.state.loadingButtton == true ? (
                          <LoadingSpin />
                        ) : (
                          "NEXT"
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {/*{this.state.step==2? <div className="wpaer-theslider active">
<Registraction move={this.next}/>  
    </div>:""}
    {this.state.step==3? <div className="wpaer-theslider active">
<Verification move={this.next}/>  
    </div>:""}*/}

                {this.state.step == 2 ? (
                  <div className="wpaer-theslider active">
                    <Select
                      checkIfSelecthc={this.checkIfSelecthc}
                      kind={this.state.kind}
                      selectOption={this.selectOption}
                    />
                  </div>
                ) : (
                  ""
                )}

                {this.state.step == 3 ? (
                  <div className="wpaer-theslider active ">
                    <SelectPlan
                      goToNectAfterConfifiguration={
                        this.goToNectAfterConfifiguration
                      }
                      selectplan={this.selectplan}
                      next={this.next}
                    />
                  </div>
                ) : (
                  ""
                )}

                {this.state.step == 4 ? (
                  <div className="wpaer-theslider active">
                    <Agreement Activatemyfistapro={this.Activatemyfistapro} />
                  </div>
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

export default withRouter(Setup);
