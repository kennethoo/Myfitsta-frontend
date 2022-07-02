import React, { Component } from "react";
import { GrPlayFill } from "react-icons/gr";
class SingleView extends Component {
  state = {};

  render() {
    return (
      <div className="box-thatjekkek">
        {this.props.kind.includes("image") ? (
          <img
            src={`https://wefitmedia.s3.us-east-2.amazonaws.com/${
              this.props.file.split(",")[0]
            }`}
          />
        ) : (
          <div className="wrwjneneew">
            <div className="jfjfnnerbb">
              <GrPlayFill style={{ fill: "white" }} size={20} />
            </div>
            <video>
              <source
                src={`https://wefitmedia.s3.us-east-2.amazonaws.com/${
                  this.props.file.split(",")[0]
                }`}
              />
            </video>
          </div>
        )}
      </div>
    );
  }
}
export default SingleView;
