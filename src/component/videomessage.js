import React, { Component } from "react";
import MenuMessage from "../messaging/messagemenu";
import { connect } from "react-redux";
import VideoPost from "../component/videopost";
class VideoMessage extends Component {
  state = {
    icon: null,
  };
  componentDidMount = () => {
    document.querySelector(".box-hold-convertion").scrollTop =
      document.querySelector(".box-hold-convertion").scrollHeight;
  };

  render() {
    return (
      <div className="fesjte">
        {this.props.users.userid == this.props.item.sender ? (
          <div className="bfhehbfbhe">
            <MenuMessage
              handleRemove={this.props.handleRemove}
              item={this.props.item}
            />
          </div>
        ) : (
          ""
        )}
        <div className="box-thmerjhr">
          <div className="hold-that-imghjnd">
            <VideoPost src={this.props.item.content} />
          </div>
          <div className="hold-thjat-data"></div>
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

export default connect(mapstateToProps)(VideoMessage);
