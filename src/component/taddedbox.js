import React, { Component } from "react";
import axios from "axios";
import ApiUrl from "../url";
import VideoPost from "../component/videopost";
import IconProfile from "../component/iconpicture";
import { FaRegClone } from "react-icons/fa";
import Username from "../component/username";
import { GoPlus } from "react-icons/go";
import { Link } from "react-router-dom";
import LikeButton from "../component/likeButton";
class Tagggedbox extends Component {
  state = {
    list: [],
    data: null,
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

  loaddata = () => {
    axios
      .get(`/api/imageinfo/${this.props.item.filename}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data) {
          this.setState({
            data: res.data,
          });
        }
      });
  };

  componentDidMount = () => {
    this.loaddata();
  };
  render() {
    return this.state.data !== null ? (
      this.state.data.filename ? (
        <div className="box-media-box">
          {this.state.data.filename.split(",").length > 1 ? (
            <div className="box-thjjsjjjr">
              <FaRegClone />
            </div>
          ) : (
            ""
          )}
          <div className="box-that-hold-the-media">
            <div className="wraorjrkncnfrh">
              {this.state.data.mediakind[0].includes("image") ? (
                <img
                  src={`${ApiUrl.content}${
                    this.state.data.filename.split(",")[0]
                  }`}
                  loading="lazy"
                />
              ) : (
                <VideoPost src={this.state.data.filename.split(",")[0]} />
              )}
            </div>
          </div>
          <div className="info-about-the-person">
            <div className="icon-of-people">
              <IconProfile user={this.state.data.userId} />
            </div>
            <div className="particular-info-about-the-person">
              <Username user={this.state.data.userId} />
            </div>
            <div className="pjdjj">
              <div className="wrp-actt">
                <LikeButton
                  filename={this.state.data.filename}
                  numberlike={this.state.data.numberlike}
                />
                <div className=" box-acc">
                  <div className="icon">
                    <i className="far fa-comment"></i>
                  </div>
                  <p>{this.nFormatter(this.state.data.numberofcomments)}</p>
                </div>
              </div>
            </div>
          </div>
          <Link
            className="rj0ojrj-rjosl"
            to={`/dis/${this.state.data.filename}`}
          ></Link>
          <button
            onClick={() => {
              this.props.openBoxCollection(true, this.state.data.filename);
            }}
            className="alodjrr"
          >
            <GoPlus />
          </button>
        </div>
      ) : (
        ""
      )
    ) : (
      ""
    );
  }
}
export default Tagggedbox;
