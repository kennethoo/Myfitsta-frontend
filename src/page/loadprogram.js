import React, { Component } from "react";
import Nav from "../component/nav";
import axios from "axios";
import "../style/loadp.css";
import { MdModeEdit } from "react-icons/md";
import LikeProgram from "../component/likeProgram";
import { withRouter, NavLink } from "react-router-dom";
import Video from "../component/video";
import LoadingSpin from "../component/loadingspin";
import { GrPlayFill } from "react-icons/gr";
import ProIcon from "../programs/proicon";
import { BiArrowBack } from "react-icons/bi";
import ApiUrl from "../url";
import { AiFillDelete } from "react-icons/ai";
import DeleteContent from "../component/deleteContentP";
import CommentMedia from "../component/commentMedia";
let source;
source = axios.CancelToken.source();
class Loadprogram extends Component {
  state = {
    playing: false,
    media: {},
    relaterd: null,
    id: this.props.match.params.id,
    comment: false,
    lecture: true,
    deleteContent: false,
  };
  constructor(props) {
    super(props);
    source = axios.CancelToken.source();
  }

  optionchangeP = (data) => {
    this.setState({
      deleteContent: data,
    });
  };
  goBack = (e) => {
    this.props.history.goBack();
  };

  changlepage = (one, two) => {
    this.setState({
      comment: one,
      lecture: two,
    });
  };

  getProgramInfo = () => {
    axios
      .get(`/api/program/workoutt/course/${this.props.match.params.id}`, {
        withCredentials: true,
        cancelToken: source.token,
      })
      .then((res) => {
        if (res.data.Author) {
          if (res.data.AuthorId !== this.props.user.userid) {
            this.props.history.push("/home");
          } else {
            this.setState({
              media: res.data,
            });
            if (this.state.playing == false) {
              this.loadRelater(res.data.programId, res.data.AuthorId);
              this.setState({
                playing: true,
              });
            }
          }
        } else {
          this.props.history.push("/home");
        }
      });
  };

  loadRelater = (programId, user) => {
    axios
      .get(`${ApiUrl.Two}loaddMyProgramContainer/${programId}/${user}`, {
        cancelToken: source.token,
      })
      .then((res) => {
        this.setState({
          relaterd: res.data.reverse(),
        });
      });
  };

  componentDidMount = () => {
    window.scrollTo(0, 0);
    this.getProgramInfo();
  };
  componentDidUpdate(prevProps) {
    if (this.state.id !== this.props.match.params.id) {
      window.scrollTo(0, 0);
      this.getProgramInfo();
      this.setState({ id: this.props.match.params.id });
    }
  }

  componentWillUnmount = () => {
    if (source) {
      source.cancel("Landing Component got unmounted");
    }
  };
  render() {
    return (
      <div className="conatiner">
        <Nav user={this.props.user} />
        <div id="app">
          <div id="body-tabs">
            {this.state.media._id ? (
              <div className="hold-the-program-player-coterrool">
                <div className="control-back tobabrbfb">
                  <div className="wrieii">
                    <div onClick={this.goBack} className="close-that">
                      <BiArrowBack />
                    </div>
                    <p>Program</p>
                  </div>
                </div>
                <div className="gjrdkjgkf"></div>
                <div className="wrrpaorjwwko">
                  <div className="video--image-elmnebnt-player">
                    <div className="box-player-elment">
                      {this.state.media.fileKind ? (
                        this.state.media.fileKind.includes("image") ? (
                          <img
                            src={`${ApiUrl.content}${this.state.media.file}`}
                          />
                        ) : (
                          <Video data={this.state.media.file} />
                        )
                      ) : (
                        ""
                      )}
                      {/*<div   className="left">&#10094;</div>
   <div   className="right">&#10095;</div>*/}
                    </div>

                    <div className="ejtcondigjojr">
                      {/*<div className="iconjgjotieir"></div>*/}

                      <div className="iondoftjkfjjf">
                        <div className="hoilt-tje-titlem">
                          {this.state.media.title}
                        </div>
                        <div className="rjengtnjr4">
                          <div className="wraprjttrjr-infofo"></div>
                        </div>
                      </div>
                      {/*<div className="holt-the-butotktktjrn">
    <button>Subscribers</button>
</div>*/}
                    </div>

                    <div className="ejwkjrtngnej"></div>
                    <div className="info-abour-thedub">
                      <div className="box-the-hold-your-info">
                        <div className="rjfnvvbnf">
                          <div className="iconnrhrjrjjr">
                            <ProIcon user={this.props.user.userid} />
                          </div>
                          <div className="info-about-him">
                            <p className="hfhrudru">
                              {this.props.myfitstapro.Username}
                            </p>
                            <p className="hfhrurdru">
                              {this.props.myfitstapro.numberOfSubscriber}{" "}
                              subscribers
                            </p>
                          </div>
                        </div>

                        <div className="wrsk-follow">
                          <button>
                            <NavLink
                              className="fjkjetj"
                              to={`/user/${this.props.myfitstapro.Username}/subscriber`}
                            >
                              Subscribers
                            </NavLink>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="the-boxjjrjr">
                      {this.state.media.description.length > 0 ? (
                        <div className="holthw">
                          {this.state.media.description}
                        </div>
                      ) : (
                        ""
                      )}

                      <div className="bar-tha-th4botomnn">
                        <div className="two-onnrnn">
                          {this.state.media._id ? (
                            <LikeProgram type={1} item={this.state.media} />
                          ) : (
                            ""
                          )}
                          {
                            <NavLink
                              to={`/program/workout/course/edit/${this.state.media.file}`}
                              className="Wtrpsrirjtns"
                            >
                              <div className="iocnidjnn">
                                <MdModeEdit />
                              </div>
                              <p>EDIT</p>
                            </NavLink>
                          }
                          <div
                            onClick={() => {
                              this.optionchangeP(true);
                            }}
                            className="Wtrpsrirjtns"
                          >
                            <div className="iocnidjnn">
                              <AiFillDelete />
                            </div>
                            <p>DELETE</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="tabhsjfj-jr">
                      <div
                        onClick={() => {
                          this.changlepage(false, true);
                        }}
                        className={`tabs-vjoor  ${
                          this.state.lecture == true ? "active" : ""
                        }`}
                      >
                        Content
                      </div>

                      <div
                        onClick={() => {
                          this.changlepage(true, false);
                        }}
                        className={`tabs-vjoor  ${
                          this.state.comment == true ? "active" : ""
                        }`}
                      >
                        Comment
                      </div>
                    </div>
                    <div
                      className={`commnentnjntjn ${
                        this.state.comment == true ? "active" : ""
                      }`}
                    >
                      <div className="load-the-comnent-title">
                        <p>{this.state.media.numberofComments} Comment</p>
                      </div>
                      <CommentMedia
                        userid={this.props.myfitstapro.userid}
                        user={this.props.user}
                        media={this.state.media}
                      />
                    </div>
                  </div>

                  <div
                    className={`showthebar-of-theother-element-player ${
                      this.state.lecture == true ? "active" : ""
                    }`}
                  >
                    <div className="fjejdgrrfje">
                      <div className="titketntkjej">Up Next</div>
                    </div>
                    <div className="load-sjjkr">
                      {this.state.relaterd !== null ? (
                        this.state.relaterd.map((item) => {
                          return (
                            <div
                              className={`box-that-hold-theinfo-next-program-c ${
                                item.file == this.props.match.params.id
                                  ? "active"
                                  : ""
                              }`}
                              key={item._id}
                            >
                              <div className="info-afachi">
                                <NavLink
                                  className="infjgjttgjjff"
                                  to={`/program/workout/course/edit/${item.file}`}
                                >
                                  <MdModeEdit />
                                </NavLink>
                                <div className="rro4gjgjjgttjrr"></div>
                                <NavLink
                                  to={`/program/workout/course/${item.file}`}
                                  className="read-load"
                                ></NavLink>
                                {item.fileKind.includes("image") ? (
                                  <img src={`${ApiUrl.content}${item.file}`} />
                                ) : (
                                  <div className="wraprorpsmmr">
                                    <video>
                                      <source
                                        src={`${ApiUrl.content}${item.file}`}
                                      />
                                    </video>
                                    <div className="jfjfnnerbb">
                                      <GrPlayFill
                                        style={{ fill: "white" }}
                                        size={20}
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div className="prohram-description">
                                <div className="rhrjjrjr-of-workot ">
                                  <p className="title-of-workot fbfjjr">
                                    {" "}
                                    {item.title}
                                  </p>
                                </div>
                                <div className="hold-descroptionr-rn">
                                  {item.description}
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="bixnknfkfjkjrjr">
                          <LoadingSpin />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bixnknfkfjkjrjr">
                <LoadingSpin />
              </div>
            )}
          </div>
        </div>

        <DeleteContent
          optionchangeP={this.optionchangeP}
          deleteContent={this.state.deleteContent}
        />
      </div>
    );
  }
}

export default withRouter(Loadprogram);
