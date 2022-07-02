import React, { Component } from "react";
import PaymentSub from "../payment/paymentsub";
import { IoCloseSharp } from "react-icons/io5";
import { motion } from "framer-motion";
class Subscribe extends Component {
  state = {
    selected: null,
    tabNext: false,
  };

  handleSelected = (data) => {
    console.log(data);
    this.setState({
      selected: data,
    });
  };

  handlenext = () => {
    if (this.state.selected !== null) {
      this.setState({
        tabNext: !this.state.tabNext,
      });
    }
  };
  componentDidMount = () => {};
  render() {
    return (
      <motion.div
        className={`overlay-to-subcribe  ${
          this.props.subscribeBox == false ? "" : "active"
        }`}
      >
        <motion.div layout className="pupurps-to0subcribve">
          <div className="bander-box-subred">
            <div className="babdo">
              <button
                onClick={() => {
                  this.props.closesubscribe();
                }}
                className="close-that"
              >
                <IoCloseSharp />
              </button>
              <p>Subcribe</p>
            </div>

            <p className="his-name"></p>
            <p className="his-neame">Subscribe to this programs</p>
          </div>
          <div className="hold-thesubcribe">
            <p className="his-nreame">Select one subscription plan</p>
            {this.state.tabNext == true ? (
              ""
            ) : (
              <div className="wrajrkr-wosorr">
                <div className="hold-that-scuscri-tion">
                  {this.props.plan?.map((item) => {
                    return (
                      <div
                        onClick={() => {
                          this.handleSelected(item);
                        }}
                        className="wraper-thesubscriotion "
                        key={item._id}
                      >
                        <div
                          className={`wrepr-arounbd0the-plan ${
                            this.state.selected !== null
                              ? item.planChoose ==
                                this.state.selected.planChoose
                                ? "active"
                                : ""
                              : ""
                          }`}
                        >
                          <div className="div-wiri">
                            <button className="asdd-sellect"></button>
                            <p>{item.planChoose}</p>
                          </div>
                          <div className="wharoor-the-amoiut">
                            <span>$</span>
                            <p className="price-it">{item.price}</p> /{" "}
                            <p className="title-4hh4">
                              {item.planChoose == "Silver"
                                ? "month"
                                : item.planChoose == "Platinium"
                                ? "3 month"
                                : "Year"}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="hold-that-mess"></p>
                <div className="controil-theaction">
                  <button onClick={this.handlenext} className="add-shch">
                    CONTINUE
                  </button>
                </div>
              </div>
            )}

            {this.state.tabNext == true ? (
              <PaymentSub
                handlenext={this.handlenext}
                Authorid={this.props.profile}
                item={this.state.selected}
              />
            ) : (
              ""
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  }
}

export default Subscribe;
