import React, { Component } from "react";
import Nav from "../component/nav";
import axios from "axios";
import ApiUrl from "../url";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { withRouter, Link } from "react-router-dom";
import PaymentBoxCard from "../payment/PaymentBoxcard";
import { BiArrowBack } from "react-icons/bi";
import CardItem from "../component/carditem";
let source;
source = axios.CancelToken.source();
class Card extends Component {
  constructor(props) {
    super(props);
    source = axios.CancelToken.source();
  }
  state = {
    Ucards: [],
    price: 0,
    item: [],
    checkout: false,
  };
  goback = () => {
    this.props.history.goBack();
  };

  handleCheckout = () => {
    if (this.state.item.length > 0) {
      this.setState({
        checkout: !this.state.checkout,
      });
    }
  };
  handleadd = (item) => {
    if (this.state.item.includes(item)) {
      let mylist = this.state.item.filter(
        (element) => element.programId !== item.programId
      );
    } else {
      let mylist = [...this.state.item, item];
      this.setState({
        item: mylist,
      });
    }
  };

  handleclick = (id, item, status) => {
    let list = this.state.Ucards;
    list.forEach((element) => {
      if (element.programId == id) {
        element.selected = !element.selected;
      }
    });
    this.setState({
      Ucards: list,
    });
    let option = {
      programid: id,
      userid: this.props.user.userid,
      selected: !status,
    };
    axios
      .post(`${ApiUrl.Three}update-my-card-info`, option, {
        cancelToken: source.token,
      })
      .then((result) => {});
    if (this.state.item.includes(item)) {
      let mylist = this.state.item.filter(
        (element) => element.programId !== item.programId
      );
      this.setState({
        item: mylist,
        card: list,
      });
    } else {
      let mylist = [...this.state.item, item];
      this.setState({
        item: mylist,
        Ucards: list,
      });
    }
  };
  removeFromCard = (item) => {
    let listone = [
      ...this.state.Ucards.filter((item) => item.programId !== item),
    ];
    let listtwo = [
      ...this.state.item.filter((item) => item.programId !== item),
    ];
    this.setState({
      Ucards: listone,
      item: listtwo,
    });
  };

  getCardInfo = () => {
    axios
      .get("/api/my-card", { withCredentials: true, cancelToken: source.token })
      .then((res) => {
        if (res.data.item) {
          this.setState({
            Ucards: res.data.item,
          });
        } else {
          this.setState({
            Ucards: [],
          });
        }
      });
  };

  getItem = (item, selected) => {
    axios
      .get(`/api/program-data/${item}`, {
        withCredentials: true,
        cancelToken: source.token,
      })
      .then((res) => {
        if (res.data._id) {
          let item = res.data;
          let price = this.state.price;
          price = price + parseInt(item.price);
          item.selected = selected;
          let list = [...this.state.card, item];
          this.setState({
            Ucards: list,
            price: price,
          });
        }
      });
  };

  componentDidMount = () => {
    this.getCardInfo();
  };

  render() {
    return (
      <div className="conatiner">
        <Nav user={this.props.user} />
        <div id="app">
          <div id="body-tabs">
            <div className="tabs-that0-hold-the-settingt">
              <div className="title-of-prodf">
                <div onClick={this.goback} className="close-that">
                  <BiArrowBack />
                </div>
                <p className="tti-rh">Shopping Card</p>
                <div className="wure">
                  <div className="back-button">
                    <Link to={"/card"}>
                      <AiOutlineShoppingCart className="shoiton" />
                    </Link>
                    <p className="numberr-cardf">
                      {this.state.card !== null ? this.state.Ucards.length : ""}
                    </p>
                  </div>
                </div>
              </div>
              {this.state.card !== null ? (
                this.state.Ucards.length > 0 ? (
                  <div className="wraerjfjj-rjhhjjd">
                    <div className="box-rjjjje">
                      {this.state.card !== null ? (
                        this.state.Ucards.length > 0 ? (
                          <div className="tthe-title-oftndnf">Programs</div>
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      )}
                      {this.state.Ucards?.map((item) => {
                        return (
                          <CardItem
                            removeFromCard={this.removeFromCard}
                            handleadd={this.handleadd}
                            handleclick={this.handleclick}
                            item={item}
                            key={item.programId}
                          />
                        );
                      })}
                    </div>

                    {this.state.card !== null ? (
                      this.state.Ucards.length > 0 ? (
                        <div className="box-t0-chec-out">
                          <div className="boixjjrjrw">
                            <div className="rjjrwjjr">Details</div>
                            <div className="probrjrnf">
                              <p>Item</p>
                              <p>
                                {this.state.item !== null
                                  ? this.state.item.length
                                  : ""}
                              </p>
                            </div>
                            <div className="probrjrnf">
                              <p>SubTotal</p>
                              <p>
                                $
                                {this.state.item !== null
                                  ? this.state.item.reduce(
                                      (n, { price }) => n + price,
                                      0
                                    )
                                  : ""}
                              </p>
                            </div>

                            <button
                              onClick={this.handleCheckout}
                              className="rchejfr"
                            >
                              Checkout
                            </button>
                          </div>
                        </div>
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
              {this.state.card !== null ? (
                this.state.Ucards.length > 0 ? (
                  ""
                ) : (
                  <div className="wraperififoojfhr">
                    <div className="wraperjf-ffkfkr">
                      <p>Empty card</p>
                      <p>
                        When you add a program to you card you can purchace it
                        here
                      </p>
                    </div>
                  </div>
                )
              ) : (
                ""
              )}
            </div>

            {this.state.card !== null ? (
              this.state.Ucards.length > 0 ? (
                <div className="wrapejrjrtnr">
                  <button onClick={this.handleCheckout} className="rchejfr">
                    Checkout{" "}
                    {this.state.item !== null ? this.state.item.length : ""}{" "}
                    Programs
                  </button>
                </div>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
        </div>
        {this.state.checkout == true ? (
          <PaymentBoxCard
            handleCheckout={this.handleCheckout}
            item={this.state.item}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default withRouter(Card);
