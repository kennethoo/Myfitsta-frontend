import React, { Component } from "react";
import { FiInstagram, FiTwitter } from "react-icons/fi";
import { AiFillLinkedin } from "react-icons/ai";
class Fouter extends Component {
  render() {
    return (
      <div className="featyu-aboutb-app-foirtsrt">
        <div className="foutnejrnr">
          Copyright 2021 MYFITSTA LLC, All rights Reserved
        </div>
        <div className="clanjrr-0hjrjrj-ffrrj">
          <div className="icon-of-icifj">
            <a href="https://www.instagram.com/myfitsta.ig/">
              {" "}
              <FiInstagram />
            </a>
          </div>
          <div className="icon-of-icifj">
            <a href="https://twitter.com/myfitsta/">
              {" "}
              <FiTwitter />
            </a>
          </div>
          <div className="icon-of-icifj">
            <a href="https://www.linkedin.com/company/myfitsta/">
              {" "}
              <AiFillLinkedin />
            </a>
          </div>
        </div>
        <div className="jjrjr">
          <a href="mailto:myfitsta@outlook.com"> myfitsta@outlook.com</a>
        </div>
      </div>
    );
  }
}
export default Fouter;
