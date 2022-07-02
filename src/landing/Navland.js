import React, { Component } from "react";
import { VscChromeClose } from "react-icons/vsc";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../logo/logo.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BsMoon } from "react-icons/bs";
class Navland extends Component {
  state = {
    mode: false,
    nav: false,
    theme: "",
  };
  openNav = (data) => {
    this.setState({
      nav: data,
    });
    this.props.openNav(data);
  };

  loadTheme = (theme) => {
    const root = document.querySelector("#root");
    root.setAttribute("color-scheme", `${theme}`);
    localStorage.setItem("mode", theme);
    this.setState({
      theme: theme,
    });
  };

  componentDidMount = () => {
    theme: localStorage.getItem("mode");
  };
  render() {
    return (
      <div className="wrapeeriror">
        <div
          className={`hearderdff ${this.state.mode == true ? "active" : ""}  `}
        >
          <Link to={"/"} className="wrparpprpr">
            <div className="holthe-logo"></div>
            <div className="hold-the-logo">
              <motion.img
                animate={{ rotate: 360 }}
                transition={{ duration: 3 }}
                draggable="false"
                src={logo}
              />
            </div>
            <div className="hiolt-the-name">MYFITSTA</div>
          </Link>
          <div className="hold-shjjrj">
            <div className="hlsjjjr">
              <div>
                <a href="/">Home</a>
              </div>
            </div>
            <div className="hlsjjjr">
              <div>
                <a href="/#about">About us</a>
              </div>
            </div>

            <div className="hlsjjjr">
              <div>
                <a href="/#fearture"> Features</a>
              </div>
            </div>
            <div className="hlsjjjr">
              <div>
                <a href="/terms">Terms</a>
              </div>
            </div>

           {/* <div className="hlsjjjr">
              <div>
                <a href="/terms">FAQ</a>
              </div>
            </div>*/}
          </div>

          <div className="wraperr-takrkrk">
            <button className="wraper-for-loginf">
              <Link to={"/login"}>Login</Link>
            </button>
            <button className="wraper-for-loginf box">
              <Link to={"/register"}>Sign Up</Link>
            </button>
            {this.state.theme == "dark" ? (
              <button
                onClick={() => {
                  this.loadTheme("light");
                }}
                className="wrpajrnr-modeor"
              >
                <BsMoon />
              </button>
            ) : (
              <button
                onClick={() => {
                  this.loadTheme("dark");
                }}
                className="wrpajrnr-modeor"
              >
                <BsMoon />
              </button>
            )}
          </div>

          <div
            onClick={() => {
              this.openNav(true);
            }}
            className="heamber-varr"
          >
            <GiHamburgerMenu />
          </div>
        </div>

        <div
          className={`side-bahrirr  ${
            this.state.mode == true ? "activee" : ""
          }    ${this.state.nav == true ? "active" : ""}`}
        >
          <div className="hold-shjtjrj">
            <div className="hlsjjjtjtjjtttr">
              <div className="wrparpprpr">
                <div className="holthe-logo"></div>
                <div className="hold-the-logo">
                  <img draggable="false" src={logo} />
                </div>
                <div className="hiolt-the-name">MYFITSTA</div>
              </div>
              <div
                onClick={() => {
                  this.openNav(false);
                }}
                className="close-that"
              >
                <VscChromeClose />
              </div>
            </div>
            <div className="hlsjjjtjtjjr">
              <a
                onClick={() => {
                  this.openNav(false);
                }}
                href="/"
              >
                Home
              </a>
            </div>
            <div className="hlsjjjtjtjjr">
              <a
                onClick={() => {
                  this.openNav(false);
                }}
                href="/#about"
              >
                About us
              </a>
            </div>
            <div className="hlsjjjtjtjjr">
              <a
                onClick={() => {
                  this.openNav(false);
                }}
                href="/#fearture"
              >
                Feature
              </a>
            </div>
            <div className="hlsjjjtjtjjr">
              <a
                onClick={() => {
                  this.openNav(false);
                }}
                href="/terms"
              >
                Terms
              </a>
            </div>
            <div className="wrsjjrrjr-ejrr">
              <button>
                <Link to={"/login"}>Login</Link>
              </button>
              <button>
                <Link to={"/register"}>Sign Up</Link>
              </button>
            </div>
          </div>
          <div className="scribrrnjr"></div>
        </div>
      </div>
    );
  }
}

export default Navland;
