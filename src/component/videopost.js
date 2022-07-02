import React, { Component } from "react";
import { GrPlayFill } from "react-icons/gr";
import ReactPlayer from "react-player/lazy";
import ApiUrl from "../url";
import { InView } from "react-intersection-observer";
class VideoPost extends Component {
  state = {
    playing: false,
  };

  run = (data) => {
    if (data == false) {
      this.setState({
        playing: false,
      });
    }
  };
  playvideo = () => {
    this.setState({
      playing: !this.state.playing,
    });
  };
  render() {
    return (
      <InView onChange={(inView) => this.run(inView)} className="bix-vuie">
        <ReactPlayer
          playsinline={true}
          type="video/mp4"
          width={"100%"}
          height={"100%"}
          onEnded={() => {
            this.playvideo();
          }}
          playing={this.state.playing}
          muted={false}
          className="video-post"
          url={`${ApiUrl.content}${this.props.src}`}
        />
        <div className="control-video">
          <div onClick={this.playvideo} className="play-video">
            {this.state.playing == false ? (
              <div className="jfjfnnerbb">
                <GrPlayFill style={{ fill: "white" }} size={20} />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </InView>
    );
  }
}

export default VideoPost;
