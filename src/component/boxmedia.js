import React, { Component } from "react";
import VideoPost from "../component/videopost";
import ApiUrl from "../url";
import { GrNext, GrPrevious } from "react-icons/gr";
import { motion, AnimatePresence } from "framer-motion";
class BoxMedia extends Component {
  state = {
    index: 0,
    previous: 0,
    begin: false,
  };

  next = (event) => {
    if (this.state.index + 1 < this.props.file.split(",").length) {
      this.setState({
        index: this.state.index + 1,
        previous: this.state.index + 1 - 1,
        begin: true,
      });
    }
  };

  move = (data) => {
    this.setState({
      index: data,
    });
  };

  back = (event) => {
    if (this.state.index > 0) {
      this.setState({
        index: this.state.index - 1,
        previous: this.state.index - 1 + 1,
      });
    }
  };
  render() {
    return (
      <div className="post-content">
        {this.props.file.split(",").length == 1 ? (
          this.props.kind[0].includes("image") ? (
            <img src={`${ApiUrl.content}${this.props.file}`} alt="workout" />
          ) : (
            <VideoPost src={this.props.file} />
          )
        ) : (
          <div className="multipla-content">
            {this.props.file.split(",").map((value, index) => {
              return this.state.index == index ? (
                <AnimatePresence custom={index} key={index}>
                  <motion.div
                    key={index}
                    transition={{
                      type: "spring",
                      damping: 50,
                      stiffness: 500,
                    }}
                    initial="enter"
                    animate="in"
                    exit="exit"
                    variants={{
                      enter: {
                        x:
                          this.state.begin == true
                            ? this.state.index > this.state.previous
                              ? 500
                              : -500
                            : "",
                        opacity: 0,
                      },
                      in: { x: 0, opacity: 1 },
                      exit: (_index) => ({
                        x: _index > index ? -500 : 500,
                        opacity: 0,
                      }),
                    }}
                    layout
                    className="media-box active"
                  >
                    {this.props.kind[index].includes("image") ? (
                      <img src={`${ApiUrl.content}${value}`} loading="lazy" />
                    ) : (
                      <VideoPost src={value} />
                    )}
                  </motion.div>
                </AnimatePresence>
              ) : (
                ""
              );
            })}
          </div>
        )}

        {this.props.file.split(",").length > 1 ? (
          <div className="state">
            <div className="curent">{this.state.index + 1}</div>/
            <div className="total">{this.props.file.split(",").length}</div>
          </div>
        ) : (
          ""
        )}

        {this.props.file.split(",").length > 1 ? (
          <div onClick={this.back} className="left">
            <GrPrevious />
          </div>
        ) : (
          ""
        )}
        {this.props.file.split(",").length > 1 ? (
          <div onClick={this.next} className="right">
            <GrNext />
          </div>
        ) : (
          ""
        )}

        {this.props.file.split(",").length > 1 ? (
          <div className="bottntejjtt">
            <div className="wrparr-lutt">
              {this.props.file.split(",").map((item, index) => {
                return (
                  <div
                    className={`wrwsjrp ${
                      this.state.index == index ? "active" : ""
                    }`}
                    key={Math.floor(Math.random() * 1000)}
                  >
                    <button
                      onClick={() => {
                        this.move(index);
                      }}
                    ></button>
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

export default BoxMedia;
