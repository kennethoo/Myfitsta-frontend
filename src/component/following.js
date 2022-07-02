import React, { Component } from "react";
import axios from "axios";
import Subinfo from "../component/subinfo";
import ApiUrl from "../url";
import LoadingSpin from "./loadingspin";
import { InView } from "react-intersection-observer";
import ButtonFollow from "../component/buttonFollow";
import IconProfile from "../component/iconpicture";
import Username from "../component/username";
import { motion } from "framer-motion";
import { AiOutlineSearch } from "react-icons/ai";
import { connect } from "react-redux";
class Following extends Component {
  state = {
    id: "",
    following: null,
    loading: false,
    numberToLoad: 10,
    value: "myfitsta",
  };

  checkLoad = (data) => {
    if (data == true) {
      if (this.state.loading == false) {
        this.setState(
          {
            numberLoad: this.state.numberLoad + 10,
          },
          () => {
            this.seachPeopple(this.state.numberToLoad);
          }
        );
      }
    }
  };
  seachPeopple = (number) => {
    this.setState({
      loading: true,
    });
    axios
      .get(
        `${ApiUrl.Three}Myfollowings/${this.props.user}/${this.state.value}/${number}`
      )
      .then((result) => {
        this.setState({
          loading: false,
          following: result.data,
        });
      });
  };
  handleFind = (e) => {
    if (e.target.value.trim().length > 0) {
      this.setState(
        {
          value: e.target.value,
        },
        () => {
          this.seachPeopple(this.state.numberToLoad);
        }
      );
      this.seachPeopple(e.target.value, this.state.numberLoad);
    } else {
      this.setState(
        {
          value: "myfitsta",
        },
        () => {
          this.seachPeopple(this.state.numberToLoad);
        }
      );
    }
  };
  componentDidMount = () => {
    this.seachPeopple(this.state.numberToLoad);
  };

  render() {
    return (
      <div className="wraprtr-thos-foloeor">
        <div className="hold-theseachffur">
          <div className="screachfjjjoorjj">
            <div className="iconrjrnr">
              <AiOutlineSearch />
            </div>
            <input
              onChange={this.handleFind}
              className="class-inoputoe"
              placeholder="Seach..."
              type="text"
            />
            {this.state.loading == true ? (
              <div className="cnjrrjrn">
                <LoadingSpin />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="tharjrngnjfjfj">
          {this.state.following !== null ? (
            this.state.following !== "no" ? (
              this.state.following?.map((item, index) => {
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="wrprtit-peoplrkr"
                    key={item.following}
                  >
                    {this.state.following.length == index + 1 ? (
                      <InView
                        onChange={(inView, entry) => this.checkLoad(inView)}
                        className="jkrikskfjjr"
                      >
                        <div className="jkrikskfjjr">
                          <div className="iconnf">
                            <IconProfile user={item.following} />
                          </div>
                          <div className="wirjsjjfkkfkf">
                            <Username link={true} user={item.following} />
                            <Subinfo user={item.following} />
                          </div>
                        </div>
                      </InView>
                    ) : (
                      <div className="jkrikskfjjr">
                        <div className="iconnf">
                          <IconProfile user={item.following} />
                        </div>
                        <div className="wirjsjjfkkfkf">
                          <Username link={true} user={item.following} />
                          <Subinfo user={item.following} />
                        </div>
                      </div>
                    )}

                    <div className="wrsokf">
                      <ButtonFollow friend={item.following} />
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="tnntntn">
                <p>No Following Yet</p>
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
    users: state.user,
    usernameLists: state.usernameList,
  };
};
export default connect(mapstateToProps)(Following);
