import React, { Component } from "react";
import { Link } from "react-router-dom";
import ApiUrl from "../url";
import { GrPlayFill } from "react-icons/gr";
class Cardmdedia extends Component {
  render() {
    let media = this.props.item?.map((data) => {
      return (
        <div className="card-program-video-image" key={data._id}>
          <div className="hold-thedesign-affiche">
            <Link
              to={`${
                this.props.acount ? "/account" : ""
              }/program/workout/course/${data.file}`}
              className="read-load"
            ></Link>
            {data.fileKind.includes("image") ? (
              <img src={`${ApiUrl.content}${data.file}`} />
            ) : (
              <div className="wraprorpsmmr">
                <video playsInline={true}>
                  <source src={`${ApiUrl.content}${data.file}`} />
                </video>
                <div className="jfjfnnerbb">
                  <GrPlayFill style={{ fill: "white" }} size={20} />
                </div>
              </div>
            )}
          </div>
          <div className="title-of-workot">{data.title}</div>
        </div>
      );
    });
    return (
      <div
        className={`hold-the-program-media ${
          this.props.tabsprogram == true ? "active" : ""
        }`}
      >
        {media}
      </div>
    );
  }
}

export default Cardmdedia;
