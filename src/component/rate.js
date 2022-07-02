import React, { Component } from "react";
import axios from "axios";
import { IoCloseSharp } from "react-icons/io5";
import ApiUrl from "../url";
class Rate extends Component {
  state = {
    review: "",
  };

  handleReview = (e) => {
    this.setState({
      review: e.target.innerText,
    });
  };

  loadRate = () => {
    axios
      .get(
        `${ApiUrl.Three}load-my-rate/${this.props.userid}/${this.props.programId}`
      )
      .then((res) => {
        if (res.data.AnthorId) {
          this.props.updateRating(res.data.star);
          this.setState({
            review: res.data.review,
          });
        } else {
        }
      });
  };

  addRating = () => {
    if (this.props.review > 0) {
      document.querySelector(".rjfrjjrjr").innerText = "";
      let option = {
        AnthorId: this.props.userid,
        programId: this.props.programId,
        star: this.props.review,
        review: this.state.review,
      };

      axios.post(`${ApiUrl.Three}rate-programs`, option).then((res) => {
        this.props.openRate(false);
        this.props.updateReview();
      });
    } else {
      document.querySelector(".rjfrjjrjr").innerText = "😅 Please rate first";
    }
  };

  componentDidMount = () => {
    if (this.props.programId) {
      this.loadRate();
    }
  };

  render() {
    return (
      <div
        className={`over-lauy-that-boxnfnf  ${
          this.props.rate == false ? "" : "active"
        }`}
      >
        <div className="bojxjfjjtj-to-rate">
          <div className="title-of--thise-action">
            <button
              onClick={() => this.props.openRate(false)}
              className="close-that"
            >
              <IoCloseSharp />
            </button>
            <p>Rate</p>
          </div>
          <div className="box-thatjdjjje">
            <div className="hold-thestart rhjjtj">
              <div
                onClick={() => {
                  this.props.updateRating(1);
                }}
                className="start-file"
              >
                {this.props.review > 0 ? (
                  <i className="fas fa-star"></i>
                ) : (
                  <i className="far fa-star"></i>
                )}
              </div>
              <div
                onClick={() => {
                  this.props.updateRating(2);
                }}
                className="start-file"
              >
                {this.props.review > 1 ? (
                  <i className="fas fa-star"></i>
                ) : (
                  <i className="far fa-star"></i>
                )}
              </div>
              <div
                onClick={() => {
                  this.props.updateRating(3);
                }}
                className="start-file"
              >
                {this.props.review > 2 ? (
                  <i className="fas fa-star"></i>
                ) : (
                  <i className="far fa-star"></i>
                )}
              </div>
              <div
                onClick={() => {
                  this.props.updateRating(4);
                }}
                className="start-file"
              >
                {this.props.review > 3 ? (
                  <i className="fas fa-star"></i>
                ) : (
                  <i className="far fa-star"></i>
                )}
              </div>
              <div
                onClick={() => {
                  this.props.updateRating(5);
                }}
                className="start-file"
              >
                {this.props.review > 4 ? (
                  <i className="fas fa-star"></i>
                ) : (
                  <i className="far fa-star"></i>
                )}
              </div>
            </div>
          </div>

          <div className="edit-box-profile">
            <p>Review</p>

            <div className="watpr-contnr-mem edit-forr tjjjtt">
              <div className="wrappe-mmeshe-bio">
                <div
                  autoCorrect={"off"}
                  suppressContentEditableWarning={true}
                  onKeyUp={this.handleReview}
                  contentEditable="true"
                  data-placeholder={
                    this.state.review.length > 0
                      ? this.state.review
                      : "Type your reviews.."
                  }
                  className="hold-edit-bio rjjrjrsn"
                ></div>
              </div>
            </div>
          </div>
          <p className="rjfrjjrjr"></p>

          <button onClick={this.addRating} className="add-shch iririre">
            SUBMIT
          </button>
        </div>
      </div>
    );
  }
}

export default Rate;
