import React, { Component } from "react";
import PaymentmethodCard from "../payment/PaymentMethodeCard";
import { IoCloseSharp } from "react-icons/io5";
import FieldsCard from "./fieldsCard";
import { motion } from "framer-motion";
import { FaRegCreditCard } from "react-icons/fa";
import { HiOutlineChevronRight } from "react-icons/hi";
class PaymentBoxCard extends Component {
  state = {
    item: null,
    card: true,
    option: true,
    dropin: false,
  };
  handlePaymentcard = () => {
    this.setState({
      card: !this.state.card,
      option: !this.state.option,
      dropin: !this.state.dropin,
    });
  };
  hideoption = () => {
    this.setState({
      card: false,
    });
  };
  render() {
    return (
      <motion.div layout className="obshfhjgiiiggi">
        <div className="carsjfijfji">
          <div className="title-tijir">
            <div onClick={this.props.handleCheckout} className="close-that">
              <IoCloseSharp />
            </div>
            <div className="rhjtrj">Checkout</div>
          </div>

          <div className="sjfofoor">
            <div className="rowsjfkjk">
              <p>Items</p>
              <p>{this.props.item.length} Programs</p>
            </div>

            <div className="rowsjfkjk">
              <p>SubTotal</p>
              <p>
                $
                {this.props.item !== null
                  ? this.props.item.reduce((n, { price }) => n + price, 0)
                  : ""}
              </p>
            </div>
          </div>

          {this.state.option == true ? (
            <div className="payment-option">
              <div className="boixbfitjrj">Choose Payment Method</div>
              <PaymentmethodCard
                item={this.props.item}
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
              <FieldsCard item={this.props.item} />
            ) : (
              ""
            )}
          </div>
        </div>
      </motion.div>
    );
  }
}

export default PaymentBoxCard;
