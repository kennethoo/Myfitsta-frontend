import React, { Component } from "react";
import { BiRocket } from "react-icons/bi";
import { HiBadgeCheck, HiSpeakerphone } from "react-icons/hi";
import Roll from "react-reveal/Roll";
import {
  BsClock,
  BsPieChartFill,
  BsGraphUp,
  BsFillLockFill,
} from "react-icons/bs";
import { VscMail } from "react-icons/vsc";
import { RiBankLine } from "react-icons/ri";
class About extends Component {
  render() {
    return (
      <div
        id="fearture"
        className={`abourhrjjrjejje ${
          this.props.mode == true ? "active" : ""
        } `}
      >
        <div className="detailskfnf">What do we got here?</div>
        <div className="wrpsjrirr">
          <Roll left>
            <div
              className={`carvjdgjjfk ${
                this.props.mode == true ? "active" : ""
              } `}
            >
              <div className="iocjfjjr">
                <div className="wrapejrj-the-iconcj">
                  <BiRocket />
                </div>
                <p className="fhgjentr">Profile Boost</p>
              </div>

              <div className="describejrjr">
                The more active you get on the platform, the more you will be
                seen by others.
              </div>
            </div>
          </Roll>

          <Roll left>
            <div
              className={`carvjdgjjfk ${
                this.props.mode == true ? "active" : ""
              } `}
            >
              <div className="iocjfjjr">
                <div className="wrapejrj-the-iconcj">
                  <BsClock />
                </div>
                <p className="fhgjentr">Real Time</p>
              </div>

              <div className="describejrjr">
                As soon as you enter Myfitsta, you are connected to the people,
                activities, and programs that you are more interested in.
              </div>
            </div>
          </Roll>

          <Roll left>
            <div
              className={`carvjdgjjfk ${
                this.props.mode == true ? "active" : ""
              } `}
            >
              <div className="iocjfjjr">
                <div className="wrapejrj-the-iconcj">
                  <RiBankLine />
                </div>
                <p className="fhgjentr">Earn Income</p>
              </div>

              <div className="describejrjr">
                Enjoy what you love to do the most, and make money at the same
                time by selling your program
              </div>
            </div>
          </Roll>

          <Roll right>
            <div
              className={`carvjdgjjfk ${
                this.props.mode == true ? "active" : ""
              } `}
            >
              <div className="iocjfjjr">
                <div className="wrapejrj-the-iconcj">
                  <HiSpeakerphone />
                </div>
                <p className="fhgjentr">Market your Brand</p>
              </div>

              <div className="describejrjr">
                Made it easy in couple steps to show your brand to the world
              </div>
            </div>
          </Roll>

          <Roll right>
            <div
              className={`carvjdgjjfk ${
                this.props.mode == true ? "active" : ""
              } `}
            >
              <div className="iocjfjjr">
                <div className="wrapejrj-the-iconcj">
                  <HiBadgeCheck />
                </div>
                <p className="fhgjentr">Fit Check</p>
              </div>

              <div className="describejrjr">
                Show your obstacles, show how you achieved them with the help of
                your community in Myfitsta, to receive a fit check.
              </div>
            </div>
          </Roll>

          <Roll right>
            <div
              className={`carvjdgjjfk ${
                this.props.mode == true ? "active" : ""
              } `}
            >
              <div className="iocjfjjr">
                <div className="wrapejrj-the-iconcj">
                  <VscMail />
                </div>
                <p className="fhgjentr">Messaging</p>
              </div>

              <div className="describejrjr">
                Connected with people and create your community
              </div>
            </div>
          </Roll>
          <Roll left>
            <div
              className={`carvjdgjjfk ${
                this.props.mode == true ? "active" : ""
              } `}
            >
              <div className="iocjfjjr">
                <div className="wrapejrj-the-iconcj">
                  <BsPieChartFill />
                </div>
                <p className="fhgjentr">Optimization</p>
              </div>

              <div className="describejrjr">
                We connect you directly with a community to provide all the help
                needed, which will boost your profile
              </div>
            </div>
          </Roll>

          <Roll left>
            <div
              className={`carvjdgjjfk ${
                this.props.mode == true ? "active" : ""
              } `}
            >
              <div className="iocjfjjr">
                <div className="wrapejrj-the-iconcj">
                  <BsGraphUp />
                </div>
                <p className="fhgjentr">Profile Growth</p>
              </div>

              <div className="describejrjr">
                Focus on yourself, leave the rest to us and your community. More
                achievements mean more engagement.
              </div>
            </div>
          </Roll>

          <Roll left>
            <div
              className={`carvjdgjjfk ${
                this.props.mode == true ? "active" : ""
              } `}
            >
              <div className="iocjfjjr">
                <div className="wrapejrj-the-iconcj">
                  <BsFillLockFill />
                </div>
                <p className="fhgjentr">Security</p>
              </div>

              <div className="describejrjr">
                Join our encrypted and secure platform with the best of
                experience
              </div>
            </div>
          </Roll>
        </div>
      </div>
    );
  }
}
export default About;
