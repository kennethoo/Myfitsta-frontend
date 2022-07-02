import React, { Component } from "react";
import axios from "axios";
import adapter from "webrtc-adapter";
import { withRouter } from "react-router-dom";
import LoadingSpin from "../component/loadingspin";
import Nav from "../component/nav";
import LiveEnd from "../live/liveend";
import { GrPlayFill } from "react-icons/gr";
import IconProfile from "../component/iconpicture";
import Username from "../component/username";
import { IoSendSharp } from "react-icons/io5";
import { AiOutlineEye } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import socket from "../socketConfig";
import ApiUrl from "../url";
import { IoCloseSharp } from "react-icons/io5";
let source;
source = axios.CancelToken.source();
class Watcher extends Component {
  constructor(props) {
    super(props);
    this.videoTag = React.createRef();
    source = axios.CancelToken.source();
    this.peerConnection = null;
    this.state = {
      data: {},
      blopData: null,
      playing: true,
      endedLive: false,
      muted: true,
      start: false,
      monted: false,
      loading: true,
      liveMessage: [],
      livebox: false,
      title: "",
      code: "",
      description: "",
      id: "",
      people: 0,
      message: "",
      StateLive: false,
      config: {
        iceServers: [
          {
            urls: "stun:stun.l.google.com:19302",
          },
          {
            urls: "turn:numb.viagenie.ca",
            username: "webrtc@live.com",
            credential: "muazkh",
          },
        ],
      },
    };
  }

  openLivebox = (data) => {
    this.setState({
      livebox: data,
    });
  };

  sendmessage = () => {
    if (this.state.StateLive == true) {
      if (this.state.message.length > 0) {
        socket.emit("new-message-to-chat", {
          room: this.state.id,
          content: this.state.message,
          sender: this.props.user.userid,
          icon: this.props.user.profile,
        });
        document.querySelector(".hold-message").innerText = "";
        document.querySelector(".hold-message").focus();
      }
    }
  };

  goBack = (e) => {
    this.props.history.goBack();
  };
  haandlemessage = (e) => {
    if (e.target.innerText.trim().length > 0) {
      this.setState({
        message: e.target.innerText,
      });
    }
  };
  resquestLive = () => {
    axios
      .get(`/api/live-straming/${this.props.match.params.id}`, {
        withCredentials: true,
        cancelToken: source.token,
      })
      .then((res) => {
        if (res.data.broadcasterName) {
          if (res.data.instant == true) {
            this.setState({
              data: res.data,
              title: res.data.roomName,
              description: res.data.roomInfo,
              id: res.data.roomId,
            });
            this.reatimeConnection();
            this.live();
          } else {
          }
        } else {
          this.props.history.goBack();
        }
      });
  };

  live = () => {
    this.peerConnection = this.createPeer();
    this.peerConnection.addTransceiver("video", { direction: "recvonly" });
  };
  createPeer = () => {
    const peer = new RTCPeerConnection(this.state.config);
    peer.ontrack = this.handleTrackEvent;
    peer.onnegotiationneeded = () => this.handleNegotiationNeededEvent(peer);
    return peer;
  };
  handleNegotiationNeededEvent = (peer) => {
    const offer = peer.createOffer().then(() => {
      peer.setLocalDescription(offer).then(() => {
        const payload = {
          sdp: peer.localDescription,
          id: this.props.match.params.id,
          identification: socket.id,
        };

        socket.emit("wacth-a-live", payload);
        socket.on("wath-accepted", (infolive) => {
          if (infolive.succes == true) {
            const desc = new RTCSessionDescription(infolive.sdp);
            peer.setRemoteDescription(desc).catch((e) => console.log(e));
          } else {
            this.props.history.goBack();
          }
        });
      });
    });
  };

  handleTrackEvent = (e) => {
    this.videoTag.current.srcObject = e.streams[0];
    this.setState({
      StateLive: true,
      loading: false,
    });
    document.querySelector(".tile-o-live-prpe").style.opacity = "0";
  };

  reatimeConnection = () => {
    socket.on("disconnectPeer", (data) => {
      this.setState({
        StateLive: false,
        endedLive: true,
      });
      this.peerConnection.close();
    });
    socket.on("candidate", (id, candidate) => {
      this.peerConnection
        .addIceCandidate(new RTCIceCandidate(candidate))
        .catch((e) => console.error(e));
    });

    socket.emit("wacth-live-workout", { room: this.props.match.params.id });
    socket.on("number-of-people", (data) => {
      this.setState({
        people: data - 1,
      });
    });

    socket.on("new-sms", (data) => {
      let list = [...this.state.liveMessage, data];
      this.setState({
        liveMessage: list,
      });
      document.querySelector(".hold-thoses-chat").scrollTop =
        document.querySelector(".hold-thoses-chat").scrollHeight;
    });

    socket.on("disconnectLive", (data) => {
      this.peerConnection.close();
      this.props.history.goBack();
    });
    window.onunload = window.onbeforeunload = () => {
      this.peerConnection.close();
    };
  };

  playVideo = () => {
    if (this.state.playing == false) {
      this.setState({
        playing: true,
        muted: false,
      });
    }
  };

  nFormatter = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num;
  };
  componentDidMount = () => {
    this.resquestLive();
  };
  componentWillUnmount() {
    if (this.state.StateLive) {
      socket.emit("disconect-from-the-live", {
        room: this.state.id,
        userid: this.props.user.userid,
      });
      this.peerConnection.close();
    }
    socket.off("disconnectPeer");
    socket.off("wath-accepted");
    socket.off("number-of-people");
    socket.off("new-sms");
    socket.off("candidate");
    socket.off("disconnectLive");
  }
  render() {
    return (
      <div className="conatiner">
        <Nav user={this.props.user} />
        <div id="app">
          <div id="body-tabs">
            <div className="box-hold-the-lie-and-chat">
              <div className="hold-videi-live">
                <div
                  className={`hold-lay ${
                    this.state.StateLive == true ? "active" : ""
                  }`}
                >
                  <div className="tile-o-live-prpe">
                    <div onClick={this.goBack} className="close-that">
                      <BiArrowBack />
                    </div>
                    <p className="">Live Workout</p>
                  </div>
                  {this.state.loading == true ? (
                    <div className="wrapjrjrrjjrjrjjrj">
                      <LoadingSpin />
                    </div>
                  ) : (
                    <div className="hold-connected">
                      <div className="live-sh">Live</div>
                      <div className="fjjeerb">
                        <AiOutlineEye />
                      </div>
                      <div className="number-odthem">
                        {this.nFormatter(this.state.people)}
                      </div>
                    </div>
                  )}
                </div>
                <video
                  ref={this.videoTag}
                  playsInline={true}
                  muted={true}
                  autoPlay={true}
                  className="live"
                ></video>
                {this.state.StateLive ? (
                  this.state.playing == false ? (
                    <div className="bigerr-wrpaprr">
                      {this.state.playing == false ? (
                        <div
                          onClick={() => {
                            this.playVideo();
                          }}
                          className="jfjfnnerbb"
                        >
                          <GrPlayFill style={{ fill: "white" }} size={20} />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
                <div className="end-of-the-live"></div>
              </div>

              <div
                className={`hold-chat-live ${
                  this.state.StateLive == true ? "active" : ""
                }`}
              >
                <div className="hold-those-chat">
                  <div className="tile-of-chart">
                    <p>Live Chat</p>
                    <div
                      onClick={() => {
                        this.openLivebox(true);
                      }}
                      className="memu"
                    >
                      <i className="fas fa-ellipsis-v"></i>
                    </div>
                  </div>
                  <div className="tile-of-chart-mobile">
                    <p className="tt-mi">Live Workout</p>
                    <div className="vajufjrr">
                      <button className="end-live">
                        <IoCloseSharp />
                      </button>
                      <button
                        onClick={() => {
                          this.openLivebox(true);
                        }}
                        className="menu-live"
                      >
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                    </div>
                  </div>
                  <div className="hold-thoses-chat">
                    {this.state.liveMessage?.map((item, index) => {
                      return (
                        <div className="chat-live-box-contaier" key={index}>
                          <div className="hold-live-pr-url">
                            <IconProfile user={item.sender} />
                          </div>
                          <div className="hold-live-content">
                            <Username link={true} user={item.sender} />
                            <p className="hold-content">{item.content}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="type-message-box">
                  <div className="watpr-contnr-mem">
                    <div className="wrappe-mmeshe">
                      <div
                        onKeyUp={this.haandlemessage}
                        contentEditable="true"
                        data-placeholder="Type a message..."
                        className="hold-message"
                      ></div>
                      <div onClick={this.sendmessage} className="send-hold">
                        <button>
                          <IoSendSharp />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`overlay-live-info  ${
                    this.state.livebox == false ? "" : "active"
                  }`}
                >
                  <div className="box-info-live">
                    <div className="title-of--thise-action">
                      <button
                        onClick={() => this.openLivebox(false)}
                        className="close-that"
                      >
                        <IoCloseSharp />
                      </button>
                      <p>Live</p>
                    </div>
                    <div className="wrpiiriri">
                      <div className="edit-box-profile">
                        <p>Live</p>
                        <div className="fjettj">
                          {this.state.data.broadcasterName ? (
                            <Username user={this.state.data.broadcasterName} />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="edit-box-profile">
                        <p>Live title</p>
                        <p>
                          {this.state.title.length > 0
                            ? this.state.title
                            : "No Room"}
                        </p>
                      </div>

                      <div className="edit-box-profile">
                        <p>Live Description</p>
                        <p className="room-descro">
                          {this.state.description.length > 0
                            ? this.state.title
                            : "No Room"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.endedLive ? <LiveEnd /> : ""}
      </div>
    );
  }
}
export default withRouter(Watcher);
