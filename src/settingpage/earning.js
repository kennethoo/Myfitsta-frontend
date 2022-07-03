import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import Chart from "../chart/chart.js";
import ApiUrl from "../url";
import { BiArrowBack } from "react-icons/bi";
import OrderSales from "../pro/orderSale";
import LoadingSpin from "../component/loadingspin.js";
import OrderSubscription from "../pro/orderSubscription";
import { connect } from "react-redux";
import TodayEarning from "../earnings/today";
import TotalEarning from "../earnings/total";
import MonthEarning from "../earnings/month";
import UnpaidEarning from "../earnings/unpaid";
class Earning extends Component {
  state = {
    data: null,
    profile: null,
  };
  goBack = () => {
    this.props.history.goBack();
  };

  getProfile = () => {
    axios
      .get(`/api/myfitsta/account/${this.props.user.userid}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data !== "Does not exist") {
          this.setState({
            profile: res.data.accountType,
          });
        }
      });
  };
  getinfo = () => {
    axios
      .get(`/api/get-my-earning-data/${this.props.user.userid}`)
      .then((result) => {
        if (result.data.length > 0) {
          this.setState({
            data: result.data,
          });
        } else {
          this.setState({
            data: [],
          });
        }
      });
  };

  componentDidMount = () => {
    this.getProfile();
    this.getinfo();
  };
  render() {
    return (
      <div className="wrrapeerr-uoirjr-cham">
        <div className="title-edit">
          <div className="before-edit">
            <div onClick={this.goBack} className="close-that">
              <BiArrowBack />
            </div>
            <p>Earning</p>
          </div>
        </div>

        {this.props.user.myfista == true ? (
          this.state.data !== null ? (
            <div className="earningsf-boxnjf">
              <div className="hold-thegrapgjhs-jfhtf">
                {this.state.data !== null ? (
                  this.state.data !== "no" ? (
                    <Chart data={this.state.data} />
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </div>
              {this.state.data !== null ? (
                this.state.data != "no" ? (
                  <div className="hold-the-box-of--the-info">
                    <TotalEarning data={this.state.data} />
                    <TodayEarning data={this.state.data} />
                    <UnpaidEarning data={this.state.data} />
                    <MonthEarning data={this.state.data} />
                  </div>
                ) : (
                  ""
                )
              ) : (
                ""
              )}

              {this.state.profile !== null ? (
                this.state.profile !== "no" ? (
                  <div className="holfthe-order-ejj">
                    {this.state.data !== null ? (
                      this.state.profile !== null ? (
                        this.state.profile !== "no" ? (
                          this.state.profile == 0 ? (
                            <OrderSubscription
                              data={this.state.data.reverse()}
                            />
                          ) : (
                            <OrderSales data={this.state.data} />
                          )
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
          ) : (
            <div className="bixnknfkfjkjrjr">
              <LoadingSpin />
            </div>
          )
        ) : (
          <div className="wraperififoojfhr">
            <div className="wraperjf-ffkfkr">
              <p>lock Earnings</p>
              <p>To be able unlock Earning you need to activate MyfitstaPro</p>
              <div className="wraper-thejr">
                <Link className="dijroooeo" to={"/setting/myfistapro"}>
                  Check status
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
const mapstateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapstateToProps)(withRouter(Earning));
