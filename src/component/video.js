import React, { Component } from "react";
import ApiUrl from "../url";
import { GrPlayFill, GrPauseFill } from "react-icons/gr";
class Video extends Component {
  state = {
    playing: false,
    x: null,
    fullscren: false,
  };

  fullScreen = () => {
    this.setState(
      {
        fullscren: !this.state.fullscren,
      },
      () => {
        if (this.state.fullscren == true) {
          document
            .exitFullscreen()
            .then(() => {})
            .catch(function (error) {
              console.log(error.message);
            });
        } else {
          let element = document.querySelector(".wraproor");
          element
            .requestFullscreen()
            .then(() => {})
            .catch(function (error) {
              console.log(error.message);
            });
        }
      }
    );
  };
  play = (event) => {
    let bar = document.querySelector(".progress-bar");
    let curentTimeur = document.querySelector(".curent-timeu");
    let control = document.querySelector(".play-that-orpause-tie");
    let video = document.querySelector(".vide");
    if (video.classList.contains("playing")) {
      video.classList.remove("playing");
      video.pause();
      this.setState({
        playing: false,
      });
    } else {
      video.classList.add("playing");
      video.play();
      this.setState({
        playing: true,
      });

      this.state.x = setInterval(() => {
        let currentime = parseInt(video.currentTime.toFixed(2));
        let percent = (video.currentTime * 100) / video.duration;
        bar.style.width = `${percent}%`;
        curentTimeur.innerText = this.convert(
          parseInt(video.currentTime.toFixed(2))
        );
        if (
          parseInt(curentTimeur.innerText) ===
          this.convert(parseInt(video.duration.toFixed(2)))
        ) {
          console.log("rj");
          clearInterval(this.state.x);
          video.stop();
          this.setState({
            playing: false,
          });
        }
      }, 1000);
    }
  };

  convert = (s) => {
    const hours = Math.floor(s / 60 / 60);
    const minutes = Math.floor(s / 60) - hours * 60;
    let sec = s % 60;
    let timeursend;
    timeursend = `${hours}:${minutes}:${sec}`;
    if (hours <= 0) {
      timeursend = `${minutes}:${sec}`;
    }

    if (minutes <= 0) {
      timeursend = `0:${sec}`;
    }

    if (sec > 10) {
    } else {
      timeursend = `0:0${sec}`;
    }
    return timeursend;
  };

  getTimeur = () => {
    let video = document.querySelector(".vide");
    let end = document.querySelector(".end-entimeur");
    end.innerHTML = this.convert(parseInt(video.duration.toFixed(2)));
  };

  componentDidMount = () => {};

  render() {
    return (
      <div className="wraproor">
        <div className="wrpaer-video">
          <video onLoadedMetadata={this.getTimeur} className="vide">
            <source src={`${ApiUrl.content}${this.props.data}`} />
          </video>
        </div>

        <div
          className={`control-theelment ${
            this.state.playing == false ? "active" : ""
          }`}
        >
          <div className="control-bar">
            <div className="bar-that-show-it">
              <div className="progress-bar"></div>
            </div>
          </div>
          <div className="control-action-video">
            <div className="wraper-div-actionr-omne">
              <div className="play-or-pause-media">
                <div className="play-that-orpause-tie" onClick={this.play}>
                  {this.state.playing == false ? (
                    <GrPlayFill style={{ fill: "white" }} size={20} />
                  ) : (
                    <GrPauseFill />
                  )}
                </div>
              </div>

              <div className="soud-or-pause-media">
                <i className="fas fa-volume-up"></i>
              </div>

              <div className="timeur-intheplayyer">
                <div className="box-hold-thsttimeur">
                  <p className="curent-timeu">0:00</p>/
                  <p className="end-entimeur">0:00</p>
                </div>
              </div>
            </div>
            <div onClick={this.fullScreen} className="wraper-div-actionr-two">
              <div className="expandx">
                <i className="fas fa-expand"></i>
              </div>
            </div>
          </div>
          <div className="click-toplay-orpay"></div>
        </div>
      </div>
    );
  }
}

export default Video;
