import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import AddField from "../payment/addField";
import ApiUrl from "../url";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegCreditCard, FaPaypal } from "react-icons/fa";
import { HiOutlineChevronRight } from "react-icons/hi";
class AddMethod extends Component {
  state = {
    listCard: null,
    button: false,
    option: true,
    field: false,
  };

  handlePaymentcard = () => {
    this.setState({
      option: false,
      field: true,
    });
  };
  render() {
    return (
      <div className="wraojrikkr-obebe">
        <div className="dnjsjrjrjr">
          <div className="title-of--thise-action">
            <button
              onClick={() => {
                this.props.hnddleclick();
              }}
              className="close-that"
            >
              {" "}
              <IoCloseSharp />
            </button>
            <p>Add Payment Method</p>
          </div>
          {this.state.option == true ? (
            <div className="wroiriitiiir">
              <div onClick={this.handlePaymentcard} className="pay-with-card">
                <div className="wrtapr">
                  <div className="iconfte">
                    <FaRegCreditCard />
                  </div>
                  <div className="titler">Credit / Debit card</div>
                </div>
                <div className="rkieokr">
                  <HiOutlineChevronRight />
                </div>
              </div>
              {/*     <div className="pay-with-card">
                <div className="wrtapr">
                <div className="iconfte"  >
                     <FaPaypal/>
                   </div>
                   <div className="titler">Paypal</div>
                </div>
                <div className="rkieokr">
                <HiOutlineChevronRight/>
                </div>
                </div>*/}
            </div>
          ) : (
            ""
          )}
          {this.state.field == true ? (
            <AddField acountD={this.props.acountD} />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default AddMethod;
