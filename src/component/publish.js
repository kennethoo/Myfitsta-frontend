import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import ApiUrl from "../url";
import { IoCloseSharp } from "react-icons/io5";
import LoadingSpin from "../component/loadingspin";
import VideoPost from "./videopost";
class Publish extends Component {
  state = {
    people: [],
    publish: false,
    canpublih: false,
    loading: false,
  };

  publish = () => {
    if (this.state.canpublih) {
      let option = {
        AuthorId: this.props.users.userid,
        programId: this.props.item.programId,
        publish: !this.state.publish,
        loading: true,
      };

      axios
        .post(`${ApiUrl.Three}publish-a-program`, option)
        .then((result) => {
          this.props.changePublichState();
          this.props.handlepublish(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
    }
  };

  checkPublich = () => {
    if (this.state.publish == false) {
      if (this.props.type == 0) {
        if (this.props.title.length > 5 && this.props.description.length > 5) {
          this.setState({
            canpublih: true,
          });
        } else {
        }
      } else {
        if (
          this.props.title.length > 5 &&
          this.props.description.length > 5 &&
          this.props.price > 0
        ) {
          this.setState({
            canpublih: true,
          });
        } else {
        }
      }
    } else {
    }
  };

  componentDidMount = () => {
    this.setState({
      publish: this.props.item.publish,
      canpublih: this.props.item.publish,
    });
    this.checkPublich();
  };
  render() {
    return (
      <div
        className={`box-sggbdd  ${this.props.publish == false ? "" : "active"}`}
      >
        <div className="bodnfkror">
          <div className="title-of--thise-action gjtjtjtj">
            <div className="wriettii">
              <button
                onClick={() => this.props.handlepublish(false)}
                className="close-that"
              >
                <IoCloseSharp />
              </button>
              <p>Publish Program</p>
            </div>

            <div className="wrapiroirr">
              {this.props.item.fileKind ? (
                this.props.item.fileKind.includes("image") ? (
                  <img src={`${ApiUrl.content}${this.props.item.file}`} />
                ) : (
                  <VideoPost src={this.props.item.file} />
                )
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="wjfjrjjn">
            <div className="edit-box-profile">
              <p htmlFor="title">Title</p>
              <div className="jjrjr">{this.props.title}</div>
            </div>
            <div className="edit-box-profile">
              <p htmlFor="title">Description</p>
              <div className="jjrjr">{this.props.description}</div>
            </div>

            {this.props.type !== undefined ? (
              this.props.type == 0 ? (
                ""
              ) : (
                <div className="edit-box-profile">
                  <p htmlFor="title">Price</p>
                  <div className="jjrjr">${this.props.price}</div>
                </div>
              )
            ) : (
              ""
            )}
          </div>

          {this.state.publish == false ? (
            <div
              onClick={this.publish}
              className={`conte-thise-action  ${
                this.state.canpublih == false ? "" : "active"
              }  ${this.state.loading == true ? "loading" : ""}`}
            >
              <button className="save">
                {this.state.loading == true ? "Publishing" : "Publish"}
              </button>
              {this.state.loading == true ? (
                <div className="wraprroro">
                  <LoadingSpin />
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}

          {this.state.publish == true ? (
            <div
              onClick={this.publish}
              className={`conte-thise-action  ${
                this.state.canpublih == false ? "" : "activefjf"
              }  ${this.state.loading == true ? "loading" : ""}`}
            >
              <button className="save">
                {this.state.loading == true ? "UnPublishing" : "UnPublish"}
              </button>
              {this.state.loading == true ? (
                <div className="wraprroro">
                  <LoadingSpin />
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

const mapstateToProps = (state) => {
  return {
    users: state.user,
  };
};

export default connect(mapstateToProps)(Publish);
