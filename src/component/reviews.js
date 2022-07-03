import React, { Component } from "react";
import ReviewMenu from "../component/reviewmenu";
import { withRouter } from "react-router-dom";
import Star from "../component/star";
import { motion } from "framer-motion";
import Username from "../component/username";
import IconProfile from "../component/iconpicture";
import axios from "axios";
import ApiUrl from "../url";
import { connect } from "react-redux";
class Reviews extends Component {
  state = {
    reviews: null,
    counter: 0,
  };

  loadReviews = () => {
    axios
      .get(`/api/load-reviews/${this.props.match.params.id}`)
      .then((res) => {
        if (res.data.length > 0) {
          this.setState({
            reviews: res.data,
          });
        } else {
          this.setState({
            reviews: [],
          });
        }
      });
  };

  componentDidUpdate(prevProps) {
    if (this.props.counterReview !== this.state.counter) {
      this.loadReviews();
      this.setState({ counter: this.props.counterReview });
    }
  }

  componentDidMount = () => {
    this.setState({ counter: this.props.counterReview });
    this.loadReviews();
  };

  render() {
    return (
      <div
        className={`box-trans-ce-hold-conm ${
          this.props.reviewtabs == true ? "active" : ""
        }`}
      >
        <div className="box-comment-title">
          <p>Reviews</p>
        </div>
        <div className="hold-all-of-the-commnet">
          {this.state.reviews !== null ? (
            this.state.reviews.length > 0 ? (
              this.state.reviews?.map((item) => {
                return (
                  <motion.div
                    layout
                    className="box-that-hold-the-review"
                    key={item._id}
                  >
                    <div className="baoncnfff">
                      <div className="hold-the-sh">
                        <IconProfile user={item.AnthorId} />
                      </div>
                      <div className="indorjrjr">
                        <div className="hold-thefirst-name">
                          <Username user={item.AnthorId} />
                        </div>
                        <div className="hold-thestaterating">
                          <Star rating={item.star} />
                        </div>
                      </div>
                      <div className="rmrmmektk">
                        <ReviewMenu item={item} />
                      </div>
                    </div>
                    <div className="box-that-hold-the-rewvoiew-detail">
                      <div className="hold-the-reviewert">{item.review}</div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="wraperififoojfhr">
                <div className="wraperjf-ffkfkr">
                  <p>Create a Reviews</p>
                  <p>All reviews about the program will be listed here</p>
                </div>
              </div>
            )
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
    counterReview: state.counterReview,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateReviews: (data) => {
      dispatch({ type: "UPDATE_REVIEW", data: data });
    },
  };
};
export default connect(
  mapstateToProps,
  mapDispatchToProps
)(withRouter(Reviews));
