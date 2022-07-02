import React, { Component } from "react";
import Rating from "../component/rating";
import { withRouter } from "react-router-dom";
import "../style/program.css";
import Nav from "../component/nav";
import Cardmdedia from "../component/cardmedia";
import axios from "axios";
import ApiUrl from "../url";
import PaymentOption from "../payment/paymentBox";
import AddTocardButton from "../component/addtocardbutton";
import { BiArrowBack } from "react-icons/bi";
import VideoProgram from "../component/videoProgram";
import Reviews from "../component/reviews";
import SettingHisProgram from "../component/settinghisprogram";
let source;
source = axios.CancelToken.source();
class ShopingItem extends Component {
  state = {
    setting: false,
    program: {},
    loading: true,
    reviewtabs: true,
    paybox: false,
  };
  constructor(props) {
    super(props);
    source = axios.CancelToken.source();
  }
  goBack = (e) => {
    this.props.history.goBack();
  };
  handleSetting = (data) => {
    this.setState({
      setting: data,
    });
  };
  handlePay = () => {
    this.setState({
      paybox: !this.state.paybox,
    });
  };

  getProgramInfo = (data) => {
    axios
      .get(`/api/accountt/program/workout/${this.props.match.params.id}`, {
        withCredentials: true,
        cancelToken: source.token,
      })
      .then((res) => {
        if (res.data.bougth == false) {
          this.setState({
            program: res.data.program,
          });
        } else {
          this.props.history.push(
            `/program/unlock/${res.data.program.programId}`
          );
        }
      });
  };

  componentDidMount = () => {
    this.getProgramInfo();
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
            {this.state.program._id ? (
              <div className="wraper-it-baom">
                <div className="hold-the-program-information">
                  <div className="title-of-prodf">
                    <div className="wror-wrr">
                      <div onClick={this.goBack} className="close-that">
                        <BiArrowBack />
                      </div>
                      <p className="tti-rhe">Workout Program</p>
                    </div>
                    {/* <div className="hold-the-upload">
                          
                          <button  onClick={()=>this.handleSetting(true)} className="meunue-the-program"><i className ="fas fa-ellipsis-v"></i></button>
                         </div>*/}
                  </div>
                  <SettingHisProgram
                    handleSetting={this.handleSetting}
                    setting={this.state.setting}
                    user={this.props.user}
                  />

                  <div className="banner-that-hold-the-information">
                    <div className="box-that-hold-theafihe-url">
                      {this.state.program.fileKind ? (
                        this.state.program.fileKind.includes("image") ? (
                          <img
                            src={`${ApiUrl.content}${this.state.program.file}`}
                          />
                        ) : (
                          <VideoProgram src={this.state.program.file} />
                        )
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="box-hod-theinfomation">
                      <div className="hold-the-title-ofthe-program">
                        {this.state.program.title}
                      </div>
                      <div className="deaciption-ofthe-program">
                        {this.state.program.description}
                      </div>

                      <Rating
                        people={this.state.program.numberofpeopleRating}
                        rating={this.state.program.rating}
                      />
                      <div className="name-oftheowner0of-the-workout">
                        {this.state.program.Author}
                      </div>
                      <p className="theutit">${this.state.program.price}.00</p>
                    </div>
                    <div className="box-theprocedt0-thecheckk">
                      <button onClick={this.handlePay} className="add-to-cardr">
                        Buy Now
                      </button>
                      <AddTocardButton id={this.state.program.programId} />
                    </div>
                  </div>

                  <Cardmdedia acount={"account"} item={this.state.item} />
                  <div className="wrapproririrjf">
                    <Reviews reviewtabs={this.state.reviewtabs} />
                  </div>
                </div>

                <div className="wrpaooeiririfjsj">
                  <Reviews reviewtabs={this.state.reviewtabs} />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        {this.state.program._id ? (
          this.state.paybox == true ? (
            <PaymentOption
              handlePay={this.handlePay}
              program={this.state.program}
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

export default withRouter(ShopingItem);
