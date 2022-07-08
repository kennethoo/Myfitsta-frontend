import React, { Component } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Field from "../payment/fields";
import Paymentmethod from "../payment/paymentMethod";
import { motion } from "framer-motion";
import { withRouter } from "react-router-dom";
import { FaRegCreditCard } from "react-icons/fa";
import { HiOutlineChevronRight } from "react-icons/hi";
class PaymentOption extends Component {
  instance;
  state = {
    item: null,
    card: true,
    option: true,
    dropin: false,
  };
  componentDidMount() {
    let option = {
      userid: "1",
    };
    //axios.post("http://localhost:3500/pay-the-program",option).then((result)=>{
    // (result)
    //})
  }

  handleCard = () => {};

  hideoption = () => {
    this.setState({
      card: false,
    });
  };

  handlePaymentcard = () => {
    this.setState({
      card: !this.state.card,
      option: !this.state.option,
      dropin: !this.state.dropin,
    });
  };

  render() {
    return (
      <motion.div layout className="paymentntn-modal">
        <div className="card-that-hold-ifr">
          <div className="title-tijir">
            <div onClick={this.props.handlePay} className="close-that">
              <IoCloseSharp />
            </div>
            <div className="rhjtrj">Checkout</div>
          </div>
          {/*  <div className="wraper-hosmjfr-ifnf">
            <div className="iconjrr-of-profhrr">

            {this.props.program.fileKind.includes("image")?<img className="pect-ppr" src={`https://wefitmedia.s3.us-east-2.amazonaws.com/${this.props.program.file}`} loading="lazy"/>:""}

            </div>
            <div className="program-drtainr">
                <div className="title-rhjrhr">{this.props.program.title}</div>
                <div className="holf-the-price-detail">
                    <div className="box-eooe">
        <span>$</span>
        <p>{this.props.program.price}</p>

                    </div>
                </div>
            </div>

            </div>*/}
          {this.state.option == true ? (
            <div className="payment-option">
              <div className="boixbfitjrj">Choose Payment Method</div>
              <Paymentmethod
                item={this.props.program}
                hideoption={this.hideoption}
                handleCard={this.handleCard}
              />
              {this.state.card == true ? (
                <div className="wroiriitiiir">
                  <div
                    onClick={this.handlePaymentcard}
                    className="pay-with-card"
                  >
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
                  {/* <div className="pay-with-card">
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
            </div>
          ) : (
            ""
          )}

          <div className="holdnrkj-fjrkr">
            {this.state.dropin == true ? (
              <Field item={this.props.program} />
            ) : (
              ""
            )}
          </div>
        </div>
      </motion.div>
    );
  }
}

export default withRouter(PaymentOption);
