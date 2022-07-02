import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import IconProfile from "../component/iconpicture";
import Username from "../component/username";
import EditGroupProfile from "../messaging/editgroupProfile";
import { IoCloseSharp, IoFlagSharp, IoExitOutline } from "react-icons/io5";
import EditName from "../messaging/editname";
import { GoPlus } from "react-icons/go";
import ApiUrl from "../url";
import { connect } from "react-redux";
class ConversationGroup extends Component {
  state = {
    editname: false,
  };

  savename = () => {
    this.editname();
  };
  handeexitGroup = () => {
    let option = {
      conversationId: this.props.group.conversationId,
      userid: this.props.users.userid,
    };
    axios.post(`${ApiUrl.Messaging}exit-group`, option).then((result) => {
      this.props.handleDetail(false);
      let list = this.props.inbox.filter(
        (item) => item.conversationId !== this.props.group.conversationId
      );
      this.props.updateInbox(list);
      this.props.history.goBack();
    });
  };

  componentDidMount = () => {};
  render() {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, transform: "translateX(500px)" }}
          animate={{ opacity: 1, transform: "translateX(0px)" }}
          exit={{ opacity: 0 }}
          className="tndjtr"
        >
          <div className="title-ofthe-tjhrjrj">
            <div
              onClick={() => {
                this.props.handleDetail(false);
              }}
              className="back-button"
            >
              <IoCloseSharp className="whitegeb" />
            </div>
            <p>Conversation Setting</p>
          </div>

          <div className="box-thath-rhjdjnkjjrj">
            {this.props.group ? (
              <EditGroupProfile group={this.props.group} />
            ) : (
              ""
            )}

            <EditName group={this.props.group} name={this.props.group.name} />
          </div>

          <div className="info-about-menbef">
            <div className="fjjje">Members</div>
            <div className="bix-that-hoksnjrjs">
              <div className="divnf-fjr">
                <GoPlus />
              </div>
              <div onClick={this.props.handleaddParti} className="jejjr">
                Add menbers
              </div>
            </div>
            <div className="wraper-leader-rr-people">
              {this.props.group.members.map((item) => {
                return (
                  <div className="pwoplekekr" key={item._id}>
                    <div className="iconcf">
                      <IconProfile user={item.userid} />
                    </div>
                    <div className="name-rjrj">
                      <div className="thename">
                        <Username user={item.userid} link={false} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="block-holf-the-action">
            <div onClick={this.handeexitGroup} className="bloafjfkfjj">
              <div className="iconjgjjgj">
                <IoExitOutline />
              </div>
              <div className="fgejdjgnf">Exit Group</div>
            </div>

            <div className="bloafjfkfjj">
              <div className="iconjgjjgj">
                <IoFlagSharp />
              </div>
              <div className="fgejdjgnf">Report Group</div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }
}
const mapstateToProps = (state) => {
  return {
    users: state.user,
    inbox: state.inbox,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateInbox: (data) => {
      dispatch({ type: "UPDATE_INBOX", data: data });
    },
  };
};
export default connect(
  mapstateToProps,
  mapDispatchToProps
)(withRouter(ConversationGroup));
