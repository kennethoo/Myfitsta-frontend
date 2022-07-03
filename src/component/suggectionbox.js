import React, { Component } from "react";
import axios from "axios";
import ApiUrl from "../url";
import IconProfile from "../component/iconpicture";
import ButtonFollow from "../component/buttonFollow";
import { connect } from "react-redux";

class SuggectionBox extends Component {
  state = {
    list: [],
  };

  callAi = () => {
    axios
      .get(`/api/suggstion-for-you/${this.props.users.userid}`)
      .then((res) => {
        if (res.data !== "no") {
          let list = [...this.state.list, ...res.data];
          let uniqueChars = [...new Set(list)].slice(0, 4);

          this.setState({
            list: uniqueChars,
          });
        }
      });
  };

  componentDidMount = () => {
    this.callAi();
  };
  render() {
    return (
      <div className="wrapejrhjrhh">
        {this.state.list.length > 0 ? (
          <div className="wrpaartt-peoplet">
            <div className="title-wjrjr">Suggestion</div>

            <div className="wraperrjdjtt-foloro">
              {this.state.list?.map((item) => {
                return (
                  <div className="box-to-contain0foleol" key={item._id}>
                    <div className="closrentjrr">
                      <div className="closerfjr"></div>
                    </div>
                    <div
                      className={`bander-top ${
                        item.banner.length > 0 ? "" : "active"
                      }`}
                    >
                      {item.banner.length > 0 ? (
                        <img
                          src={`${ApiUrl.content}${item.banner}`}
                          loading="lazy"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="icon-info">
                      <div className="iconfnrr">
                        <IconProfile user={item.userid} />
                      </div>
                    </div>
                    <div className="wrparrs-info">
                      <p>{item.Username}</p>
                      <p>{item.fullName}</p>
                    </div>
                    <div className="wraprrrt-follror">
                      <ButtonFollow friend={item.userid} />
                    </div>
                  </div>
                );
              })}
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
export default connect(mapstateToProps)(SuggectionBox);
