import React, { Component } from "react";
import axios from "axios";
import Rating from "../component/rating";
import { ImCheckmark } from "react-icons/im";
import ApiUrl from "../url";
import {
  AiTwotoneDislike,
  AiTwotoneLike,
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlinePlus,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosShareAlt } from "react-icons/io";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
class Shopcard extends Component {
  state = {
    check: null,
  };
  check = () => {
    axios
      .get(
        `${ApiUrl.Three}check-if-bougth/${this.props.user.userid}/${this.props.item.programId}`
      )
      .then((result) => {
        this.setState({
          check: result.data,
        });
      });
  };
  componentDidMount = () => {
    this.check();
  };
  render() {
    return this.state.check !== null ? (
      <div className="card-box-program" key={this.props.item._id}>
        <div className="statqusre">
          <div className="descplr-image-program-ui">
            <div className="hold-imf">
              {this.state.check == true ? (
                <div className="fjgkkgkgjg bougth">bougth</div>
              ) : (
                ""
              )}
              {this.state.check == true ? (
                <Link
                  className="link0-toorohran"
                  to={`/program/unlock/${this.props.item.programId}`}
                ></Link>
              ) : (
                <Link
                  className="link0-toorohran"
                  to={`/account/program/workout/${this.props.item.programId}`}
                ></Link>
              )}
              {this.props.item.file.length > 0 ? (
                this.props.item.fileKind.includes("image") ? (
                  <img src={`${ApiUrl.content}${this.props.item.file}`} />
                ) : (
                  <video>
                    <source src={`${ApiUrl.content}${this.props.item.file}`} />
                  </video>
                )
              ) : (
                <img src="https://i.ytimg.com/vi/xRZB5KBLdOA/maxresdefault.jpg" />
              )}
            </div>
          </div>
        </div>

        <div className="waorornngrkrr">
          <div className="title-of-workot">{this.props.item.title}</div>
          <Rating rating={this.props.item.rating} />
          <div className="action-post-desing">
            <div className="mmenu-act5fjjs">
              <span>${this.props.item.price}</span>
            </div>
          </div>
        </div>
      </div>
    ) : (
      ""
    );
  }
}
const mapstateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapstateToProps)(Shopcard);
