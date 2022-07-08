import React, { Component } from "react";
import { BiArrowBack } from "react-icons/bi";
import BaxBar from "../component/barbox";
class SelectPlan extends Component {
  state = {};

  render() {
    return (
      <div className="wrpaeorrr">
       
        <div className="theslider">
          <div onClick={() => this.props.next(2)} className="close-that">
            <BiArrowBack />
          </div>
          <div className="wwwr-text">Choose your subscrition plan</div>
        </div>
        
        <div className="sucbrcriotion-thatprice">
          <div className="wraper-thesubscriotion">
            <div className="wrepr-arounbd0the-plan">
              <div className="div-wiri">
                <button
                  onClick={(e) => {
                    this.props.selectplan(e);
                  }}
                  className="asdd-sellect"
                ></button>
                <p>Silver</p>
              </div>
              <div className="wharoor-the-amoiut">
                <p className="desd">$</p>
                <input placeholder="0" className="input" type="number" />/
                <p className="title-4hh4">month</p>
              </div>
            </div>
            <p className="give-messa"></p>
          </div>

          <div className="wraper-thesubscriotion">
            <div className="wrepr-arounbd0the-plan">
              <div className="div-wiri">
                <button
                  onClick={(e) => {
                    this.props.selectplan(e);
                  }}
                  className="asdd-sellect"
                ></button>
                <p>Platinium</p>
              </div>
              <div className="wharoor-the-amoiut">
                <p className="desd">$</p>
                <input placeholder="0" className="input" type="number" />/
                <p className="title-4hh4">3 month</p>
              </div>
            </div>
            <p className="give-messa"></p>
          </div>

          <div className="wraper-thesubscriotion">
            <div className="wrepr-arounbd0the-plan">
              <div className="div-wiri">
                <button
                  onClick={(e) => {
                    this.props.selectplan(e);
                  }}
                  className="asdd-sellect"
                ></button>
                <p>Gold</p>
              </div>
              <div className="wharoor-the-amoiut">
                <p className="desd">$</p>
                <input placeholder="0" className="input" type="number" />/
                <p className="title-4hh4">years</p>
              </div>
            </div>
            <p className="give-messa"></p>
          </div>

          <p className="hold-that-mess"></p>
        </div>
        <div className="controil-theaction">
          <button
            onClick={this.props.goToNectAfterConfifiguration}
            className="add-shch"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }
}

export default SelectPlan;
