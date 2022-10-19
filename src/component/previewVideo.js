import React, { Component } from "react";
import ReactPlayer from "react-player/lazy";
import { GrPlayFill } from "react-icons/gr";

class PreviewVideo extends Component {
  state = {
    playing: false,
  };

  playvideo = () => {
    console.log("run");
    this.setState({
      playing: !this.state.playing,
    });
  };
  render() {
    return (
      <div className="bix-vuie">
        {/*<video   className="video-post" >
<source src={this.props.src}/>
 </video>
*/}

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
            {this.state.playing == true ? (
              ""
            ) : (
              <div className="jfjfnnerbb">
                <GrPlayFill style={{ fill: "white" }} size={20} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default PreviewVideo;
