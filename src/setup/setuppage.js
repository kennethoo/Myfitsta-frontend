import React, { Component } from "react";
import { HiCheck } from "react-icons/hi";
import { BsArrowRepeat, BsGraphUp } from "react-icons/bs";
import BaxBar from "../component/barbox";
import { BiArrowBack } from "react-icons/bi";
class Select extends Component {
  state = {};
  render() {
    return (
      <div className="wrpaeorrr">
        
        <div className="theslider">
          <div onClick={() => this.props.next(1)} className="close-that">
            <BiArrowBack />
          </div>
          <div className="wwwr-text">Select your account</div>
        </div>
        <div className="tabsrjjrbs">
          <div className="wtapthensjjfjtr">
            <div
              onClick={() => {
                this.props.selectOption(0);
              }}
              className={`class-boxx ${this.props.kind == 0 ? "active" : ""}`}
            >
              <div className="eldtoo"></div>
              <div className="rrjjsjeje">
                <div className="wrieii">
                  <div className="wrpsjiirir-icocod">
                    <BsArrowRepeat />
                  </div>
                  <div className="djfrjir">Create Subsciption</div>
                </div>

                <div className="eldto">
                  <div className="point">
                    <i className="fas fa-circle"></i>
                  </div>
                </div>
              </div>
              <div className="decrioirbe">
                <div className="wrapeiirr">
                  <div className="fjsifojdisf">
                    <HiCheck />
                  </div>
                  <div className="ksffkfkkf">
                    Create your own Subsciption plan
                  </div>
                </div>
                <div className="wrapeiirr">
                  <div className="fjsifojdisf">
                    <HiCheck />
                  </div>
                  <div className="ksffkfkkf">
                    Recuring payment from subscriber
                  </div>
                </div>
                <div className="wrapeiirr">
                  <div className="fjsifojdisf">
                    <HiCheck />
                  </div>
                  <div className="ksffkfkkf">Quick and easy implimentation</div>
                </div>
              </div>
            </div>

            <div
              onClick={() => {
                this.props.selectOption(1);
              }}
              className={`class-boxx ${this.props.kind == 1 ? "active" : ""}`}
            >
              <div className="eldtoo"></div>
              <div className="rrjjsjeje">
                <div className="wrieii">
                  <div className="wrpsjiirir-icocod">
                    <BsGraphUp />
                  </div>
                  <div className="djfrjir">Sell Programs</div>
                </div>

                <div className="eldto">
                  <div className="point">
                    <i className="fas fa-circle"></i>
                  </div>
                </div>
              </div>
              <div className="decrioirbe">
                <div className="wrapeiirr">
                  <div className="fjsifojdisf">
                    <HiCheck />
                  </div>
                  <div className="ksffkfkkf">
                    Set your own pricing for each program
                  </div>
                </div>
                <div className="wrapeiirr">
                  <div className="fjsifojdisf">
                    <HiCheck />
                  </div>
                  <div className="ksffkfkkf">
                    Potentility to have more subscriber
                  </div>
                </div>
                <div className="wrapeiirr">
                  <div className="fjsifojdisf">
                    <HiCheck />
                  </div>
                  <div className="ksffkfkkf">Quick and easy implimentation</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => this.props.checkIfSelecthc()}
          className="add-shch"
        >
          Continue
        </button>
      </div>
    );
  }
}

export default Select;
