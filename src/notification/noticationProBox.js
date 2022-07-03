import React, { Component } from "react";
import { InView } from "react-intersection-observer";
import LoadingSpin from "../component/loadingspin.js";
import ProSubscription from "../notification/proSubscription";
import ApiUrl from "../url";
import axios from "axios";
let source;
source = axios.CancelToken.source();
class NotificationProBox extends Component {
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
            this.loadNotificationPro();
          }
        );
      }
    }
  };
  loadNotificationPro = () => {
    this.setState({
      loading: true,
    });
    axios
      .get(
        `/api/load-notiionpro/${this.props.userid}/${this.state.numberToLoad}`,
        { cancelToken: source.token }
      )
      .then((res) => {
        if (res.data !== "no") {
          if (this.state.mouted) {
            this.setState({
              loading: false,
              fitstanot: res.data.data,
            });
          }
        } else {
          if (this.state.mouted) {
            this.setState({
              loading: false,
              fitstanot: "no",
            });
          }
        }
      });
  };

  componentDidMount = () => {
    this.loadNotificationPro();
  };

  render() {
    return (
      <div className={`tabs-for-all active`}>
        {this.state.fitstanot !== null ? (
          this.state.fitstanot !== "no" ? (
            this.state.fitstanot?.map((item, index) => {
              if (this.state.fitstanot.length == index + 1) {
                return (
                  <InView
                    onChange={(inView) => this.LoadMore(inView)}
                    key={item._id}
                  >
                    {item.type == "Subscription" ? (
                      <ProSubscription item={item} key={item._id} />
                    ) : (
                      ""
                    )}
                  </InView>
                );
              } else {
                return item.type == "Subscription" ? (
                  <ProSubscription item={item} key={item._id} />
                ) : (
                  ""
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
          <div className="wrapdjrrjj"></div>
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
export default NotificationProBox;
