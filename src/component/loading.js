import React, { Component } from "react";
import logo from "../logo/logo.png";
import LoadingSpin from "./loadingspin";
import { motion } from "framer-motion";
class Loading extends Component {
  render() {
    return (
      <div className={`loading  ${this.props.loading == true ? "active" : ""}`}>
        <motion.img
          layout
          animate={{ rotate: 360, width: 200, height: 200 }}
          transition={{ duration: 3 }}
          src={logo}
          alt="logo"
        />
        <div className="wraprkrrnrnjn">
          <LoadingSpin />
        </div>
      </div>
    );
  }
}

export default Loading;
