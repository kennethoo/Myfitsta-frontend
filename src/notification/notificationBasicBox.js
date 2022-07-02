import React, { Component } from "react";
import { InView } from "react-intersection-observer";
import { motion } from "framer-motion";
import LikedNotification from "../notification/likednotifiction";
import CommentNotification from "../notification/commentNotification";
import TaggedNotification from "../notification/taggedNotification";
import FollowNotification from "../notification/followNotification";
import LoadingSpin from "../component/loadingspin.js";
import ApiUrl from "../url";
import axios from "axios";
let source;
source = axios.CancelToken.source();
class NotificationBasicBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      search: false,
      basic: null,
      tabsDeafalt: true,
      mouted: true,
      fitstanot: null,
      numberToLoad: 10,
      loading: false,
    };
  }

  LoadMore = (data) => {
    if (data == true) {
      if (this.state.loading == false) {
        this.setState(
          {
            numberToLoad: this.state.numberToLoad + 10,
          },
          () => {
            this.loadNotification();
          }
        );
      }
    }
  };
  loadNotification = () => {
    this.setState({
      loading: true,
    });
    axios
      .get(
        `${ApiUrl.Three}load-notiionbasic/${this.props.userid}/${this.state.numberToLoad}`,
        { cancelToken: source.token }
      )
      .then((res) => {
        if (res.data !== "no") {
          if (this.state.mouted) {
            this.setState({
              loading: false,
              basic: res.data.data,
            });
          }
        } else {
          if (this.state.mouted) {
            this.setState({
              loading: false,
              basic: "no",
            });
          }
        }
      });
  };
  componentDidMount = () => {
    this.loadNotification();
  };

  render() {
    return (
      <div
        className={`tabs-for-all ${
          this.state.tabsDeafalt == true ? "active" : ""
        }`}
      >
        {this.state.basic !== null ? (
          this.state.basic !== "no" ? (
            this.state.basic?.map((item, index) => {
              if (this.state.basic.length == index + 1) {
                return (
                  <InView
                    onChange={(inView) => this.LoadMore(inView)}
                    key={item._id}
                  >
                    <motion.div layout>
                      {item.type == "like" ? (
                        <LikedNotification item={item} key={item._id} />
                      ) : item.type == "comment" ? (
                        <CommentNotification item={item} key={item._id} />
                      ) : item.type == "tagged" ? (
                        <TaggedNotification item={item} key={item._id} />
                      ) : item.type == "follow" ? (
                        <FollowNotification item={item} key={item._id} />
                      ) : (
                        ""
                      )}
                    </motion.div>
                  </InView>
                );
              } else {
                return (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {item.type == "like" ? (
                      <LikedNotification item={item} key={item._id} />
                    ) : item.type == "comment" ? (
                      <CommentNotification item={item} key={item._id} />
                    ) : item.type == "tagged" ? (
                      <TaggedNotification item={item} key={item._id} />
                    ) : item.type == "follow" ? (
                      <FollowNotification item={item} key={item._id} />
                    ) : (
                      ""
                    )}
                  </motion.div>
                );
              }
            })
          ) : (
            <div className="wraperififoojfhr">
              <div className="wraperjf-ffkfkr">
                <p>Notification center</p>
                <p>
                  You don't have any notification yet. All your notification
                  will be listed here
                </p>
              </div>
            </div>
          )
        ) : (
          ""
        )}

        {this.state.loading ? (
          <div className="bixnknfkfjkjrjr">
            <LoadingSpin />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default NotificationBasicBox;
