import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { FaRegCreditCard } from "react-icons/fa";
import { HiOutlineChevronRight } from "react-icons/hi";
import PaymentmethodSub from "./paymentMethodSub";
import FieldSub from "../payment/fieldSub";
class PaymentSub extends Component {
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
      <div className="card-that-hold-ifr active">
        <div className="wraper-hosmjfr-ifntjje">
          <div className="wraper-thesubscriotion ">
            <div className="wraper-thesubscriotion ">
              <div className={`wrepr-arounbd0the-plan active emprjrk`}>
                <div className="wraofhrjwirrrj">
                  <div className="wrapringt-jgj"></div>
                  <div className="div-wiri">
                    <button className="asdd-sellect"></button>
                  </div>
                  <div className="wraprjr0-rfjrj">
                    <p className="frjrj">{this.props.item.planChoose}</p>
                    <div className="wharoor-the-amoiut">
                      <span>$</span>
                      <p className="price-itr">
                        {this.props.item.price}
                      </p> /{" "}
                      <p className="title-4hh4">
                        {this.props.item.planChoose == "Silver"
                          ? "month"
                          : this.props.item.planChoose == "Platinium"
                          ? "3 month"
                          : "Year"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rjhjr">
                  <button onClick={this.props.handlenext}> Change Plan</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {this.state.option == true ? (
          <div className="payment-option">
            <div className="boixbfitjrj">Choose Payment Method</div>
            <PaymentmethodSub
              planChoose={this.props.item}
              Authorid={this.props.Authorid}
              hideoption={this.hideoption}
              handleCard={this.handleCard}
            />
            {this.state.card == true ? (
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
                {/*    <div className="pay-with-card">
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
            <FieldSub
              planChoose={this.props.item}
              Authorid={this.props.Authorid}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(PaymentSub);
