import React, { Component } from "react";
import moment from "moment";
import Username from "../component/username";
import IconProfile from "../component/iconpicture";
class OrderSales extends Component {
  state = {
    list: null,
  };

  componentDidMount = () => {
    console.log(this.props.data);
  };
  render() {
    return (
      <div className="hold-the-box-of-shit-bjf">
        <div className="the-theh-titklen-than">
          <p>Orders</p>
        </div>
        <div className="rjrnjmrkesr sjrwkjrj">
          <div className="rjer3lwr3w">Subscriber</div>
          <div className="rjer3lwr3w">Program</div>
          <div className="rjer3lwr3w">Date</div>
          <div className="rjer3lwr3w">Price</div>
        </div>
        <div className="wrpsoofoof">
          {this.props.data !== null ? (
            this.props.data.length > 0 ? (
              this.props.data.map((item) => {
                return (
                  <div key={item._id} className="ifiirkjjr">
                    <div className="rjer3lwr3w">
                      <div className="jeirir">
                        <div className="chhfjf-sfufr">
                          <IconProfile user={item.custumerid} />
                        </div>
                        <Username user={item.custumerid} />
                      </div>
                    </div>
                    <div className="rjer3lwr3w">
                      <div className="fjeijsgijijf">
                        How top build you back musclu in a power full way that
                        you will not understaind
                      </div>
                    </div>
                    <div className="rjer3lwr3w">
                      {moment(item.date).format("L")}
                    </div>
                    <div className="rjer3lwr3w">
                      <span>$</span>
                      {item.earn + item.takeCut}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="wraperififoojfhr">
                <div className="wraperjf-ffkfkr">
                  <p>No Transation</p>
                  <p>When someone buy your programs you will be notifies</p>
                </div>
              </div>
            )
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default OrderSales;
