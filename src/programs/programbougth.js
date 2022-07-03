import React, { Component } from "react";
import Rating from "../component/rating";
import { Link } from "react-router-dom";
import axios from "axios";
import VideoPost from "../component/videopost";
import ApiUrl from "../url";
class ProgramBought extends Component {
  state = {
    item: null,
  };
  componentDidMount = () => {
    axios
      .get(`/api/program-bought/${this.props.programid}`)
      .then((result) => {
        if (result.data !== "no") {
          this.setState({
            item: result.data,
          });
        } else {
          this.setState({
            item: "no",
          });
        }
      });
  };
  render() {
    return this.state.item !== null ? (
      this.state.item !== "no" ? (
        <div className="box-thsthstbb">
          <div className="boxrnfnfnbn">
            {this.state.item.fileKind.includes("image") ? (
              <img src={`${ApiUrl.content}${this.state.item.file}`} />
            ) : (
              <VideoPost src={this.state.item.file} />
            )}
          </div>
          <div className="boxrnfnfnbebnsnnnrn">
            <div className="title-of-workot">{this.state.item.title}</div>
            <Rating rating={this.state.item.rating} />
          </div>
          <Link
            className="box-that-link"
            to={`/program/unlock/${this.props.programid}`}
          ></Link>
        </div>
      ) : (
        ""
      )
    ) : (
      ""
    );
  }
}

export default ProgramBought;
