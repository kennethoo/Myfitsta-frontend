import React, { Component } from "react";
import { connect } from "react-redux";
import LoadingSpin from "../component/loadingspin.js";
import { InView } from "react-intersection-observer";
import PostCollection from "../component/postcollection";
import Postfit from "../component/postfit";
class Post extends Component {
  state = {};

  checkLoad = (data) => {
    if (data == true) {
      if (this.props.loading == true) {
      } else {
        this.props.loadmore(true);
      }
    }
  };

  componentDidMount = () => {
    // <PostBox key={item._id} item={item} user={this.props.user}  openBoxCollection={this.props.openBoxCollection}  handleSetting={this.props.handleSetting}  />
  };

  render() {
    return (
      <div className="feeed">
        {/*  <Postfit loadmore={this.props.loadmore}   user={this.props.user}  openBoxCollection={this.props.openBoxCollection}  handleSetting={this.props.handleSetting}/>*/}
        {this.props.feed.length > 0 ? (
          this.props.feed.map((item, index) => {
            if (this.props.feed.length == index + 1) {
              return (
                <InView
                  key={item}
                  onChange={(inView) => this.checkLoad(inView)}
                >
                  <PostCollection
                    loadmore={this.props.loadmore}
                    item={item}
                    user={this.props.user}
                    openBoxCollection={this.props.openBoxCollection}
                    handleSetting={this.props.handleSetting}
                  />
                </InView>
              );
            } else {
              return (
                <PostCollection
                  key={item}
                  loadmore={this.props.loadmore}
                  item={item}
                  user={this.props.user}
                  openBoxCollection={this.props.openBoxCollection}
                  handleSetting={this.props.handleSetting}
                />
              );
            }
          })
        ) : (
          <div className="wrpsjfifkfkfjf "></div>
        )}

        {this.props.loading == true ? (
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

const mapStateProps = (state) => {
  return {
    posts: state.posts,
    users: state.user,
  };
};

export default connect()(Post);
