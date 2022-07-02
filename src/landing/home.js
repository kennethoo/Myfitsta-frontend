import big from "../media/cool.svg";
import Navland from "./Navland";
import React, { Component } from "react";
import { motion } from "framer-motion";
import Info from "./info";
import About from "./About";
import Slide from "./slide";
import BoxCook from "./boxcook";
import Feature from "./Feature";
import Fouter from "./Fouter";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";

class HomeLand extends Component {
  state = {
    nav: false,
    mode: false,
  };

  switchToggle = () => {
    this.setState({
      mode: !this.state.mode,
    });
    localStorage.setItem("mode", !this.state.mode);
  };
  loadTheme = (theme) => {
    const root = document.querySelector(":root");
    root.setAttribute("color-scheme", `${theme}`);
    localStorage.setItem("mode", theme);
  };
  openNav = (data) => {
    this.setState({
      nav: data,
    });
  };

  componentDidMount = () => {};
  render() {
    return (
      <motion.div className={`homne-page`}>
        <Navland switchToggle={this.switchToggle} openNav={this.openNav} />
        <div className="holsnjnfj-iofjf">
          <div className="hold-theicondjfnnr">
            <Fade top>
              <div className="wrspjjjrrork">
                <div className="hold-iphomje">
                  <img src={big} />
                </div>
              </div>
            </Fade>
          </div>

          <div className="fjsfieiitwire">
            <Fade bottom>
              <div className={`hfgjjetrnrn   `}>
                <div className="trrjsjjrr">
                  <Fade left cascade>
                    Create Your
                  </Fade>

                  <span className="rjrjrj">Fitness World</span>
                </div>
                <div className="smajkkrjr">
                  <Fade left cascade>
                    A platform that assists you with your fitness-related
                    activities and helps you earn money from the comfort of your
                    home
                  </Fade>
                </div>

                <div className="wraperjrjr">
                  <button>
                    <Link to={"/login"}>Login</Link>
                  </button>
                  <button>
                    <Link to={"/register"}>Sign Up</Link>
                  </button>
                </div>
              </div>
            </Fade>
          </div>
        </div>

        {/*    <LightSpeed left >
    <div className="box-bnsjrkrjk">
    Who need a website when you can have a fitness world
</div>
        </LightSpeed>*/}
        <div id="about" className="wrpsjrtjjt-ntjj">
          <Info mode={this.state.mode} />
          <Feature mode={this.state.mode} />
        </div>
        <Slide />
        <About mode={this.state.mode} />
        <Fouter mode={this.state.mode} />
        <BoxCook />
      </motion.div>
    );
  }
}

export default HomeLand;
