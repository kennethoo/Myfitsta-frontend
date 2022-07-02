import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import ApiUrl from "../url";
import { FiCheckCircle } from "react-icons/fi";
import { BiCookie } from "react-icons/bi";
import { BsShieldCheck } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
class TermCondition extends Component {
  state = {};
  goBack = () => {
    this.props.history.goBack();
  };

  componentDidMount = () => {};
  render() {
    return (
      <div className="wrrapeerr-uoirjr-cham">
        <div className="title-edit">
          <div className="before-edit">
            <div onClick={this.goBack} className="close-that">
              <BiArrowBack />
            </div>
            <p>Terms and conditions</p>
          </div>
        </div>
        <div className="wrapririrr">
          <div className="wrpsjrirrr">
            <Link
              to="/termsconditon"
              className={`carvjdgjjfk ${
                this.props.mode == true ? "active" : ""
              } `}
            >
              <div className="iocjfjjr">
                <div className="wrapejrj-the-iconcj">
                  <FiCheckCircle />
                </div>
                <p className="fhgjentr">Terms & Conditions</p>
              </div>

              <div className="describejrjr">
                Here you can reviews our Terms & Conditions
              </div>
            </Link>
            <Link
              to="/cookies"
              className={`carvjdgjjfk ${
                this.props.mode == true ? "active" : ""
              } `}
            >
              <div className="iocjfjjr">
                <div className="wrapejrj-the-iconcj">
                  <BiCookie />
                </div>
                <p className="fhgjentr">Cookies Policy</p>
              </div>

              <div className="describejrjr">
                Here you can reviews our Cookies Policy
              </div>
            </Link>

            <Link
              to="/privacy"
              className={`carvjdgjjfk ${
                this.props.mode == true ? "active" : ""
              } `}
            >
              <div className="iocjfjjr">
                <div className="wrapejrj-the-iconcj">
                  <BsShieldCheck />
                </div>
                <p className="fhgjentr">Privacy Policy</p>
              </div>

              <div className="describejrjr">
                Here you can reviews our Privacy Policy
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(TermCondition);
