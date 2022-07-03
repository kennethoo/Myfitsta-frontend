import React, { Component } from "react";
import {
  AiTwotoneDislike,
  AiTwotoneLike,
  AiOutlineLike,
  AiOutlineDislike,
} from "react-icons/ai";
import { connect } from "react-redux";
import ApiUrl from "../url";
import axios from "axios";
class LikeProgram extends Component {
  state = {
    counter: 0,
    counterDowm: 0,
    item: null,
  };

  likePogram = (data) => {
    let option = {
      userid: this.props.users.userid,
      contentId: this.props.item.file,
      like: data,
    };
    if (data == true) {
      this.setState({
        item: option,
        counter: this.state.counter + 1,
        counterDowm:
          this.state.counterDowm !== 0 ? this.state.counterDowm - 1 : 0,
      });
    } else {
      this.setState({
        item: option,
        counter: this.state.counter !== 0 ? this.state.counter - 1 : 0,
        counterDowm: this.state.counterDowm + 1,
      });
    }

    axios.post(`/api/like-a-program`, option).then((result) => {});
  };

  handleCheck = () => {
    axios
      .get(
        `/api/check/${this.props.users.userid}/in/${this.props.item.file}/programs`
      )
      .then((result) => {
        if (result.data.contentId) {
          this.setState({
            item: result.data,
          });
        } else {
          this.setState({
            item: {},
          });
        }
      });
  };

  removeLike = (data) => {
    axios
      .post(`/api/like-program-remove`, this.state.item)
      .then((result) => {
        if (data == true) {
          this.setState({
            item: {},
            counter: this.state.counter !== 0 ? this.state.counter - 1 : 0,
          });
        } else {
          this.setState({
            item: {},
            counterDowm:
              this.state.counterDowm !== 0 ? this.state.counterDowm - 1 : 0,
          });
        }

        this.setState({});
      });
  };
  componentDidMount = () => {
    this.setState({
      counter: this.props.item.numberofLike,
      counterDowm: this.props.item.numberofdisLike,
    });
    this.handleCheck();
  };

  render() {
    return (
      <div className="fnedijtjfkef">
        {this.props.type == 1 ? (
          <div className="jjrwretgtt">
            <div className="tjjtjtjjt">
              {this.state.item !== null ? (
                this.state.item.like == true ? (
                  <div
                    onClick={() => {
                      this.removeLike(true);
                    }}
                    className="Wtrpsrirjtns  tjrdtj  active"
                  >
                    <div className="iocnidjnn">
                      <AiTwotoneLike />
                    </div>
                    <p>{this.state.counter}</p>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      this.likePogram(true);
                    }}
                    className=" Wtrpsrirjtns tjrdtj "
                  >
                    <div className="iocnidjnn">
                      <AiOutlineLike />
                    </div>
                    <p>{this.state.counter}</p>
                  </div>
                )
              ) : (
                ""
              )}

              {this.state.item !== null ? (
                this.state.item.like == false ? (
                  <div
                    onClick={() => {
                      this.removeLike(false);
                    }}
                    className=" Wtrpsrirjtns tjrdtj active"
                  >
                    <div className="iocnidjnn">
                      <AiTwotoneDislike />
                    </div>
                    <p>{this.state.counterDowm}</p>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      this.likePogram(false);
                    }}
                    className=" Wtrpsrirjtns tjrdtj"
                  >
                    <div className="iocnidjnn">
                      <AiOutlineDislike />
                    </div>
                    <p>{this.state.counterDowm}</p>
                  </div>
                )
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapstateToProps = (state) => {
  return {
    users: state.user,
  };
};
export default connect(mapstateToProps)(LikeProgram);
