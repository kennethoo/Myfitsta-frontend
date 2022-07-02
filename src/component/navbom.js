import React, { Component } from "react";
import "../style/discover.css";
import { GoPlus } from "react-icons/go";
import { NavLink } from "react-router-dom";
import Notin from "../component/notin";
import { connect } from "react-redux";
class Navbom extends Component {
  render() {
    return (
      <div id="navigation">
        <NavLink to={"/home"} className="navvf">
          <div className="djrjnkrke">
            <i className="fas fa-home"></i>
          </div>
        </NavLink>
        <NavLink to={"/discover"} className="navvf" data-tab-target="#search">
          <div className="djrjnkrke">
            <i className="far fa-compass"></i>
          </div>
        </NavLink>
        <div className="navvf">
          <button
            onClick={() => this.props.handloption(true)}
            className="open-seachrr"
          >
            <GoPlus />
          </button>
        </div>
        <NavLink to={"/notifications"} className="navvf">
          <div className="djrjnkrke">
            <Notin userid={this.props.user.userid} />
            <i className="far fa-bell"></i>
          </div>
        </NavLink>
        <NavLink to={"/collection"} className="navvf">
          <div className="djrjnkrke">
            <i className="fas fa-folder-plus"></i>
          </div>
        </NavLink>

        {/*<NavLink  to={"/myfitstapro"} className="nav-li nav-info  " data-tab-target="#account">
            <i className="fas fa-fire-alt"></i>
           
            </NavLink>*/}
      </div>
    );
  }
}
const mapstateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapstateToProps)(Navbom);
