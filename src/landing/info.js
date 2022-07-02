import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import video from "../media/video3.mp4";
import ReactPlayer from "react-player";

class Info extends Component {
  render() {
    return (
      <div className="reskjrrj">
        <Fade left>
          <div
            className={`featyu-aboutb-app ${
              this.props.mode == true ? "active" : ""
            } `}
          >
            <div className="detailskfnf white">What is MyFitsta?</div>
            <div className="smajkkrrjr white">
              Myfitsta is a social fitness platform that is changing the way
              people think about fitness. It is a platform that allows anyone to
              buy and sell programs. it helps you achieve your fitness goals, by
              surrounding you with a supportive community.
            </div>

            <div className="wrwpsjr-the-featureee"></div>
          </div>
        </Fade>
        <Fade right>
          <div className="rtjtrhrienj">
            <ReactPlayer
              url={video}
              width="100%"
              controls={true}
              height="100%"
              playing={true}
              muted={true}
              loop={true}
            />
          </div>
        </Fade>
      </div>
    );
  }
}
export default Info;
