import React, { Component } from "react";
import { connect } from "react-redux";
import ButtonFollow from "../component/buttonFollow";
import IconProfile from "../component/iconpicture";
import Username from "../component/username";
import LoadingSpin from "./loadingspin";
import { MdModeEdit } from "react-icons/md";
import SuggestionProgram from "../component/sugestionProgram";
import ApiUrl from "../url";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
class LoadInterest extends Component {
  state = {
    filter: "mydf",
    item: null,
    list: null,
    account: true,
    numberLoad: 10,
    loading: false,
  };
  handlefilter = (e) => {
    if (e.target.value.trim().length > 0) {
      this.setState(
        {
          filter: e.target.value.trim(),
          numberLoad: 10,
        },
        () => {
          this.handleCheck();
        }
      );
      // let list =  this.props.usernameLists.filter(item=>{
      // return item.username.includes(e.target.value)
      //   })
      //  let arraylist=[]
      // list.forEach(item=>{
      ///    arraylist.push(item.userid)
      // })
      // let newlist =[]
      //  this.state.original.forEach(item=>{
      //   if(arraylist.includes(item.accountId)){
      // newlist.push(item)
      // }
      // })
      //this.setState({
      //  list: newlist
      // })
    } else {
      this.setState(
        {
          numberLoad: 10,
          filter: "mydf",
        },
        () => {
          this.handleCheck();
        }
      );
    }
  };

  changetable = () => {
    this.setState({
      account: !this.state.account,
    });
  };

  handleLoad = (data) => {
    if (data == true) {
      if (this.state.loading == false) {
        this.setState(
          {
            numberLoad: this.state.numberLoad + 10,
          },
          () => {
            this.handleCheck();
          }
        );
      } else {
      }
    }
  };
  handleCheck = () => {
    this.setState({
      loading: true,
    });
    axios
      .get(
        `${ApiUrl.Three}connet-interest/${this.props.users.userid}/${this.state.filter}/${this.state.numberLoad}`
      )
      .then((result) => {
        if (result.data !== "no") {
          let list = result.data.filter(
            (item) => item.accountId !== this.props.users.userid
          );

          this.setState({
            loading: false,
            list: list,
          });
        } else {
          this.setState({
            loading: false,
            list: "no",
          });
        }
      });
  };

  componentDidMount = () => {
    this.handleCheck();
  };

  render() {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transform: "translateY(100%)" }}
          className="subjection-top-folow-box-rjsjr"
        >
          <div className="interesst-rjkwkrk-teitj">
            <p>Suggestion</p>
            <button
              onClick={() => {
                this.props.UpdateInterest({});
              }}
              className="close-that"
            >
              <MdModeEdit />
            </button>
          </div>
          {/*  <div className="tbabsbr">
              <button onClick={this.changetable} className={`${this.state.account==true?"active":""}`}>Accounts</button>
              <button  onClick={this.changetable} className={`${this.state.account==false?"active":""}`}> Programs</button>
           </div> */}
          {this.state.account == true ? (
            <div className="kfldkmrkf">
              {this.state.list !== null ? (
                this.state.list !== "no" ? (
                  <div className="reander-listr">
                    <div className="search-bar-chatrejk">
                      <div className="degn-for-chat-ftjdjjr">
                        <i className="fas fa-search"></i>
                      </div>
                      <input
                        onChange={this.handlefilter}
                        className="find-conrrv"
                        type="text"
                        placeholder="Search..."
                      />
                      {this.state.loading == true ? (
                        <div className="cnjrrjrn">
                          <LoadingSpin />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="ngrejtkj">
                      {this.state.list?.map((item) => {
                        return (
                          <motion.div
                            layout
                            className="holsjk-peopkr"
                            key={item._id}
                          >
                            <div className="rjnrjnejrujr">
                              <IconProfile live={true} user={item.accountId} />
                            </div>
                            <div className="rj4j53rj">
                              <Username link={true} user={item.accountId} />
                            </div>
                            <div className="jfjekkk">
                              <ButtonFollow friend={item.accountId} />
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="wraperififoojfhr">
                      <div className="wraperjf-ffkfkr">
                        <p>No result</p>
                        <p>
                          You can always update your preference to find more
                          users
                        </p>
                      </div>
                    </div>
                  </div>
                )
              ) : (
                ""
              )}
            </div>
          ) : (
            <SuggestionProgram />
          )}
        </motion.div>
      </AnimatePresence>
    );
  }
}

const mapstateToProps = (state) => {
  return {
    users: state.user,
    usernameLists: state.usernameList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    UpdateInterest: (data) => {
      dispatch({ type: "ADD_TO_INTEREST", data: data });
    },
  };
};

export default connect(mapstateToProps, mapDispatchToProps)(LoadInterest);
