import React, { Component } from "react";
import { GrPlayFill } from "react-icons/gr";
import ReactPlayer from "react-player/lazy";
class PreviewPost extends Component {
  state = {
    data: null,
    playing: false,
  };
  run = (data) => {
    if (data == false) {
      this.setState({
        playing: false,
      });
    }
  };
  componentDidUpdate = (prevProps) => {
    if (this.props.src !== this.state.data) {
      this.setState({
        playing: false,
        data: this.props.src,
      });
    }
  };
  componentDidMount = () => {
    this.setState({
      data: this.props.src,
    });
  };

  playvideo = () => {
    this.setState({
      playing: !this.state.playing,
    });
  };

  render() {
    return (
      <div className="previews">
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
          url={this.props.src}
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
      </div>
    );
  }
}
export default PreviewPost;
