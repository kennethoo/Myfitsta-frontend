import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import VideoPost from "../component/videopost";
import IconProfile from "../component/iconpicture";
import Username from "../component/username";
import DataPost from "../component/datePost";
import ApiUrl from "../url";
class TaggedNotification extends Component {
  state = {
    username: null,
    media: null,
  };

  getmedia = () => {
    axios
      .get(`/api/imageinfo/${this.props.item.media}`, { withCredentials: true })
      .then((res) => {
        if (res.data.filename) {
          this.setState({
            media: res.data,
          });
        } else {
        }
      });
  };
  componentDidMount = () => {
    this.getmedia();
  };
  render() {
    return (
      <div className="div-hold-hold-thenotification">
        <div className="wjsjrhrnnff ">
          <div className="icon-of-thedube">
            {this.props.item ? (
              <IconProfile user={this.props.item.notifiyiId} />
            ) : (
              ""
            )}
          </div>
          <div className="messahrhrn-not">
            <div className="ejwjjr">
              {this.props.item ? (
                <Username link={true} user={this.props.item.notifiyiId} />
              ) : (
                ""
              )}
            </div>

            <div className="bmhjn">
              {" "}
              <div>tagged you </div>{" "}
              <div className="boxfj-rnj">
                {this.props.item ? (
                  <DataPost date={this.props.item.date} />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          {this.state.media !== null ? (
            <Link
              to={`/profile/${this.state.media.userId}/${this.state.media.filename}`}
              className="div-that-wraper-the-imga3"
            >
              {this.state.media !== null ? (
                this.state.media.mediakind[0].includes("image") ? (
                  <img
                    src={`${ApiUrl.content}${
                      this.state.media.filename.split(",")[0]
                    }`}
                    loading="lazy"
                  />
                ) : (
                  <VideoPost src={this.state.media.filename.split(",")[0]} />
                )
              ) : (
                ""
              )}
            </Link>
          ) : (
            ""
          )}
        </div>

        {/*<div className="itjejmsmf">
            <button><i className="fas fa-ellipsis-v"></i></button>
        </div>*/}
      </div>
    );
  }
}

export default TaggedNotification;
