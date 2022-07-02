import React, { Component } from "react";
import axios from "axios";
import ApiUrl from "../url";
import Tagggedbox from "../component/taddedbox";
import { connect } from "react-redux";
class TagggedPost extends Component {
  state = {
    list: null,
  };

  loadTagged = () => {
    axios.get(`${ApiUrl.Three}Taggeg/${this.props.user}`).then((result) => {
      if (result.data !== "null") {
        this.setState({
          list: result.data.file,
        });
      } else {
        this.setState({
          list: "null",
        });
      }
    });
  };

  componentDidUpdate = () => {};

  componentDidMount = () => {
    this.loadTagged();
  };
  render() {
    return (
      <div className="wraper0the-box-postrns">
        {this.state.list !== null ? (
          this.state.list !== "null" ? (
            <div className="contiantien-post">
              {this.state.list?.map((item) => {
                return (
                  <Tagggedbox
                    openBoxCollection={this.props.openBoxCollection}
                    item={item}
                    key={item._id}
                  />
                );
              })}
            </div>
          ) : (
            <div className="wraperififoojfhr">
              <div className="wraperjf-ffkfkr">
                <p>No tags</p>
                {this.props.user !== this.props.users.userid ? (
                  <p>This account was not be tagged yet</p>
                ) : (
                  <p>When someone tag you in a post it will be listed here</p>
                )}
              </div>
            </div>
          )
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
export default connect(mapstateToProps)(TagggedPost);
