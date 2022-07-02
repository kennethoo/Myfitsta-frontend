import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import logoone from "../logo/logo.png";
import BoxAccount from "../component/boxAccoount";
import Notin from "../component/notin";
class Nav extends Component {
  logout = () => {
    axios.get("/api/logoutt", { withCredentials: true }).then((res) => {
      window.location.reload();
    });
  };

  render() {
    let user = this.props.user;
    return (
      <div id="overl">
        <div id="side-nav">
          <div>
            <div className="fjejgf">
              <div className="nan-app">
                <img src={logoone} alt="logo" />
              </div>
              <div className="rrjhr">MYFITSTA</div>
            </div>
            <BoxAccount user={this.props.user} />

            <div className="nav-side">
              <NavLink
                to="/home"
                className="nav-lii nav-infoo  "
                data-tab-target="#home"
              >
                <div className="ic">
                  <i className="fas fa-home"></i>
                </div>

                <p>Home</p>
              </NavLink>

              <NavLink
                to="/notifications"
                className="nav-lii nav-infoo  "
                data-tab-target="#home"
              >
                <div className="ic">
                  <Notin userid={this.props.user.userid} />
                  <i className="far fa-bell"></i>
                </div>
                <p>Notifications</p>
              </NavLink>

              <NavLink
                to="/discover"
                className="nav-lii nav-infoo  "
                data-tab-target="#search"
              >
                <div className="ic">
                  <i className="far fa-compass"></i>
                </div>
                <p>Discover</p>
              </NavLink>

              <NavLink
                to="/profile"
                className="nav-lii nav-infoo   "
                data-tab-target="#account"
              >
                <div className="ic">
                  <i className="far fa-user"></i>
                </div>

                <p>Profile</p>
              </NavLink>

              {this.props.user.myfista == true ? (
                <NavLink
                  to="/myfitstapro"
                  className="nav-lii nav-infoo   "
                  data-tab-target="#account"
                >
                  <div className="ic">
                    <i className="fas fa-fire-alt"></i>
                  </div>
                  <p>MyFitstapro</p>
                </NavLink>
              ) : (
                ""
              )}

              <NavLink
                to="/collection"
                className="nav-lii nav-infoo   "
                data-tab-target="#"
              >
                <div className="ic">
                  <i className="fas fa-folder-plus"></i>
                </div>

                <p>Collection</p>
              </NavLink>

              <NavLink to="/message" className="nav-lii nav-infoo">
                <div className="ic">
                  <i className="far fa-envelope"></i>
                </div>

                <p to="/message">Message</p>
              </NavLink>

              <NavLink to="/setting" className="nav-lii nav-infoo">
                <div className="ic">
                  <i className="fas fa-cog"></i>
                </div>

                <p to="/message">Setting</p>
              </NavLink>

              {/*<div className="nav-lii nav-infoo">
    <div className="ic">
    
    </div>
    
    <button onClick={this.logout}>
      Log out
    </button>
</div>*/}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Nav;
