import React, { Component } from "react";
import axios from "axios";
import { FaRegClone } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GrPlayFill } from "react-icons/gr";
import ApiUrl from "../url";
class Mediafind extends Component {
  state = {
    data: null,
  };
  finddata = () => {
    axios
      .get(`/api/imageinfo/${this.props.filename}`, { withCredentials: true })
      .then((res) => {
        if (res.data._id) {
          this.setState({
            data: res.data,
          });
        }
      });
  };

  componentDidMount = () => {
    this.finddata();
  };

  render() {
    return (
      <div className="wraprthndn">
        {this.state.data !== null ? (
          this.state.data.filename.split(",").length > 1 ? (
            <div className="box-thjjsjjjr">
              <FaRegClone />
            </div>
          ) : (
            ""
          )
        ) : (
          ""
        )}
        <div className="wraorjrkncnfrh">
          {this.state.data !== null ? (
            this.state.data.mediakind[0].includes("image") ? (
              <img
                src={`${ApiUrl.content}${
                  this.state.data.filename.split(",")[0]
                }`}
                loading="lazy"
              />
            ) : (
              <div className="wrwjneneew">
                <div className="jfjfnnerbb">
                  <GrPlayFill style={{ fill: "white" }} size={20} />
                </div>
                <video>
                  <source
                    src={`${ApiUrl.content}${
                      this.state.data.filename.split(",")[0]
                    }`}
                  />
                </video>
              </div>
            )
          ) : (
            ""
          )}
        </div>

        {this.state.data !== null ? (
          <Link
            className="wrorksf-linjf"
            to={`/profile/${this.state.data.userId}/${this.state.data.filename}`}
          ></Link>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Mediafind;
