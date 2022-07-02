import React, { Component } from "react";
import Nav from "../component/nav";
import axios from "axios";
import adapter from "webrtc-adapter";
import "../style/live.css";
import webrtc from "wrtc";
import ApiUrl from "../url";
import EndLive from "../live/endLive";
import IconProfile from "../component/iconpicture";
import Username from "../component/username";
import Description from "../live/description";
import { withRouter } from "react-router-dom";
import { IoSendSharp } from "react-icons/io5";
import Schedule from "../live/schedule";
import { GrSchedulePlay, GrFormNext, GrNext } from "react-icons/gr";
import { AiOutlineEye } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
import socket from "../socketConfig";
let source;
source = axios.CancelToken.source();
class Live extends Component {
  constructor(props) {
    super(props);
    this.videoTag = React.createRef();
    this.canvas = React.createRef();
    source = axios.CancelToken.source();
    this.peerConnection = null;
    this.state = {
      blodData: [],
      senderStream: [],
      scheduleInfo: null,
      open: false,
      endLive: false,
      begin: false,
      loadingCreateLive: false,
      livebox: false,
      descriptionBox: false,
      nextBox: false,
      scheduleBox: false,
      liveMessage: [],
      title: "",
      description: "",
      id: "",
      people: 0,
      message: "",
      StateLive: false,
      peerConnections: {},
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
  nextPage = (data) => {
    this.setState({
      scheduleInfo: data,
      descriptionBox: true,
      scheduleBox: false,
    });
  };

  goBack = (e) => {
    this.props.history.goBack();
  };
  haandleTitle = (e) => {
    this.setState({
      title: e.target.value,
    });
  };
  haandlemessage = (e) => {
    if (e.target.innerText.trim().length > 0) {
      this.setState({
        message: e.target.innerText,
      });
    }
  };

  haandledescription = (e) => {
    this.setState({
      description: e.target.innerText,
    });
  };

  goLive = (data) => {
    this.setState({
      open: data,
      descriptionBox: false,
      scheduleBox: false,
      nextBox: false,
    });
  };

  openLivebox = (data) => {
    this.setState({
      livebox: data,
    });
  };

  nextBoxDescription = (data) => {
    this.setState({
      nextBox: data,
      descriptionBox: data,
    });
  };
  nextBoxSchedule = (data) => {
    this.setState({
      nextBox: data,
      scheduleBox: data,
    });
  };

  live = () => {
    if (this.state.title.length > 0) {
      if (this.state.StateLive == false) {
        this.setState({
          loadingCreateLive: true,
        });
        navigator.mediaDevices
          .getUserMedia({
            audio: true,
            video: true,
          })
          .then((stream) => {
            this.videoTag.current.srcObject = stream;
            this.createLive(stream);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  runtraks = (stream) => {
    stream
      .getTracks()
      .forEach((track) => this.peerConnection.addTrack(track, stream));
  };

  createLive = (stream) => {
    this.setState({
      loadingCreateLive: true,
    });
    let data = {};
    if (this.state.scheduleInfo == null) {
      data = {
        title: this.state.title,
        description: this.state.description,
        scheduleBox: {},
        instant: true,
      };
    } else {
      data = {
        title: this.state.title,
        description: this.state.description,
        scheduleBox: this.state.scheduleInfo,
        instant: false,
      };
    }
    axios.post("/api/create-a-live", data).then((data) => {
      this.setState(
        {
          id: data.data.roomId,
        },
        () => {
          if (data.data.instant == false) {
            window.location.reload();
          } else {
            console.log(data.data.roomId);
            this.peerConnection = this.createPeer(data.data.roomId);
            this.runtraks(stream);
            this.isLive();
            this.reatimeConnection();
            socket.emit("broadcaster", data.data);
          }
        }
      );
    });
  };

  createPeer = (data) => {
    const peer = new RTCPeerConnection(this.state.config);
    peer.onnegotiationneeded = () =>
      this.handleNegotiationNeededEvent(peer, data);
    return peer;
  };
  handleNegotiationNeededEvent = (peer, data) => {
    const offer = peer.createOffer().then(() => {
      peer.setLocalDescription(offer);
    });
  };

  beginStreming = () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then((stream) => {
        this.videoTag.current.srcObject = stream;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  reatimeConnection = () => {
    socket.on("wacther", async (data) => {
      const peer = new RTCPeerConnection(this.state.config);
      const desc = new RTCSessionDescription(data.sdp);
      await peer.setRemoteDescription(desc);
      let index = this.state.senderStream.findIndex((x) => x.room === data.id);
      if (this.state.StateLive) {
        this.videoTag.current.srcObject
          .getTracks()
          .forEach((track) =>
            peer.addTrack(track, this.videoTag.current.srcObject)
          );
        peer.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit("candidate", data.senderid, event.candidate);
          }
        };
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        const payload = {
          succes: true,
          sdp: peer.localDescription,
          senderid: data.senderid,
        };
        socket.emit("wacther-pass", payload);
      } else {
        const payload = {
          succes: false,
          senderid: data.senderid,
        };
        socket.emit("wacther-pass", payload);
      }
    });

    socket.on("broadcastLive", async (data) => {
      const payload = {
        sdp: "peer.localDescription",
        room: data.room,
      };
      socket.emit("broadcastLive-pass", payload);
    });

    socket.on("rooomId", (data) => {
      this.setState(
        {
          StateLive: true,
        },
        () => {}
      );
    });

    socket.on("number-of-people", (data) => {
      this.setState({
        people: data - 1,
      });
    });
    window.onunload = window.onbeforeunload = () => {
      socket.emit("disconect-from-the-live", {
        id: socket.id,
        room: this.state.id,
        userid: this.props.user.userid,
      });
      socket.emit("live-broad-casting", this.props.user.userid);
    };

    socket.on("new-sms", (data) => {
      let list = [...this.state.liveMessage, data];
      this.setState({
        liveMessage: list,
      });
      document.querySelector(".hold-thoses-chat").scrollTop =
        document.querySelector(".hold-thoses-chat").scrollHeight;
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
        this.setState({
          message: "",
        });
        document.querySelector(".hold-message").innerText = "";
        document.querySelector(".hold-message").focus();
      }
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

  isLive = () => {
    document.querySelector(".tile-o-live-prpe").style.display = "none";
    this.goLive(false);
  };

  handleEnlive = (data) => {
    if (data == true) {
      this.removeMyLiveSesssion();
    }
  };
  openBoxEndlive = (data) => {
    this.setState({
      endLive: data,
    });
  };
  removeMyLiveSesssion = () => {
    let payload = {
      broadcasterName: this.props.user.userid,
      roomId: this.state.id,
    };
    axios.post("/api/end-live", payload).then((data) => {
      socket.emit("disconect-from-the-live", {
        id: socket.id,
        room: this.state.id,
        userid: this.props.user.userid,
      });
      socket.emit("live-broad-casting", this.props.user.userid);
      this.props.history.push("/home");
    });
  };
  componentWillUnmount() {
    if (source) {
      source.cancel("Landing Component got unmounted");
    }
    if (this.state.StateLive) {
      socket.emit("disconect-from-the-live", {
        room: this.state.id,
        userid: this.props.user.userid,
      });
      const mediaStream = this.videoTag.current.srcObject;
      const tracks = mediaStream.getTracks();
      tracks[0].stop();
      tracks.forEach((track) => track.stop());
      socket.emit("live-broad-casting", "users");
      socket.off("rooomId");
      socket.off("number-of-people");
      socket.off("new-sms");
      socket.off("my-live-information-stream");
    }
  }

  componentDidMount = () => {};
  render() {
    return (
      <div className="conatiner">
        <Nav user={this.props.user} />
        <div id="app">
          <div id="body-tabss">
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
                  {this.state.StateLive ? (
                    <div
                      className={`hold-connected ${
                        this.state.StateLive ? "active" : ""
                      }`}
                    >
                      <div className="live-sh">Live</div>
                      <div className="number-odthem">
                        <div className="fjjeerb">
                          <AiOutlineEye />
                        </div>
                        <div> {this.nFormatter(this.state.people)}</div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="direction-to-gdo-live">
                    <div className="wrrjrrjrkmfmf">
                      {" "}
                      <i className="fas fa-video"></i>
                    </div>
                    <div>Click on Go Live, to create a Live Workout</div>
                  </div>
                  <div className="controle-the-call">
                    <button
                      onClick={() => {
                        this.goLive(true);
                      }}
                      className="go-live"
                    >
                      <div className="close-thatt">
                        {" "}
                        <i className="fas fa-video"></i>
                      </div>

                      <p>GO LIVE</p>
                    </button>
                  </div>
                </div>

                <video
                  ref={this.videoTag}
                  autoPlay={true}
                  playsInline
                  muted
                  className="live"
                ></video>
                {this.state.StateLive == true ? (
                  <div className="wrappingf">
                    <div className="controle-the-call">
                      <button
                        onClick={() => {
                          this.openBoxEndlive(true);
                        }}
                        className="go-live"
                      >
                        <p>END LIVE</p>
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
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
                      className={`memu ${
                        this.state.StateLive == true ? "active" : ""
                      }`}
                    >
                      <i className="fas fa-ellipsis-v"></i>
                    </div>
                  </div>
                  <div className="tile-of-chart-mobile">
                    <p className="tt-mi">Live Workout</p>
                    <div className="vajufjrr">
                      <button
                        onClick={() => {
                          this.openBoxEndlive(true);
                        }}
                        className="end-live"
                      >
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

                    {/*   <div className="info-rooom">
            <p>Live</p>
            <p>You</p>
            </div>*/}
                    <div className="wrpiiriri">
                      <div className="edit-box-profile">
                        <p>Live</p>
                        <p>You</p>
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

        <div
          className={`overlay-workoiut-live-box  ${
            this.state.open == false ? "" : "active"
          }`}
        >
          <div className="card-tolanch-the-live">
            <div className="title-of--thise-action rhbrnr">
              <button
                onClick={() => {
                  this.goLive(false);
                }}
                className="close-that"
              >
                <IoCloseSharp />
              </button>
              <p>Create a Live</p>
            </div>
            {this.state.nextBox == false ? (
              <div className="wraprkrkrrrr">
                <div
                  onClick={() => {
                    this.nextBoxDescription(true);
                  }}
                  className="box-that-hold-the-setting active"
                >
                  <div className="jejjjtt">
                    <div className="hold-thatiocom">
                      <i className="fas fa-video"></i>
                    </div>
                    <button className="edit-the-program">Instant Live</button>
                  </div>
                  <div className="hold-thatiocom">
                    <GrNext />
                  </div>
                </div>
                {/*   <div onClick={()=>{this.nextBoxSchedule(true)}}   className="box-that-hold-the-setting active">
                     <div className="jejjjtt">
                     <div className="hold-thatiocom">
                     <GrSchedulePlay/>
                     </div>
                     <button  className="edit-the-program">Schedule a Live</button>
                     </div>
                     <div className="hold-thatiocom">
                     <GrNext/>
                     </div>
                     </div>*/}
              </div>
            ) : (
              ""
            )}
            {this.state.descriptionBox ? (
              <Description
                loadingCreateLive={this.state.loadingCreateLive}
                haandledescription={this.haandledescription}
                haandleTitle={this.haandleTitle}
                live={this.live}
              />
            ) : (
              ""
            )}
            {this.state.scheduleBox ? (
              <Schedule nextPage={this.nextPage} />
            ) : (
              ""
            )}
          </div>
        </div>
        {this.state.endLive ? (
          <EndLive
            openBoxEndlive={this.openBoxEndlive}
            handleEnlive={this.handleEnlive}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default withRouter(Live);
