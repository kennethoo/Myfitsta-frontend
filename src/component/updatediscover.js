import React, { Component } from "react";
import axios from "axios";
import ApiUrl from "../url";
import { withRouter } from "react-router-dom";
import { CgSearch } from "react-icons/cg";
import uuid from "react-uuid";
import { BiArrowBack } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";

class UpdateDiscover extends Component {
  container = React.createRef();
  state = {
    id: "",
    open: false,
    data: [],
    find: "",
  };

  handletouch = (data) => {
    this.setState({
      open: data,
    });
  };

  handleClick = (data) => {
    this.handletouch(false);
    this.setState({
      find: data,
    });
    this.props.history.push(`/discover/${data}`);
  };

  loadSugestion = (e) => {
    this.setState({
      find: e.target.value,
    });

    if (e.target.value.length > 0) {
      axios.get(`/api/suggestion/${e.target.value}`).then((res) => {
        if (res.data !== "no") {
          let list = [...new Set(res.data)];

          this.setState({
            data: list,
          });
        } else {
        }
      });
    } else {
    }
  };

  findSugestion = (data) => {};

  handleClickOutside = (event) => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target)
    ) {
      this.handletouch(false);
    } else {
    }
  };
  componentDidUpdate = () => {
    if (this.props.match.params.id) {
      if (this.state.id !== this.props.match.params.id) {
        //this.loadGalery(this.props.match.params.id,this.state.numberLoad)

        this.setState({ id: this.props.match.params.id });
      }
    }
  };
  componentDidMount = () => {
    if (this.props.match.params.id !== undefined) {
      this.setState({
        find: this.props.match.params.id,
      });
    }

    document.addEventListener("mousedown", this.handleClickOutside);
  };

  componentWillUnmount = () => {
    document.removeEventListener("mousedown", this.handleClickOutside);
  };

  render() {
    return (
      <div
        ref={this.container}
        className={`wraper-theshiirr ${
          this.state.open == true ? "active" : ""
        }`}
      >
        <div className="seac-box" id="search-boxxx">
          <button
            onClick={(e) => {
              this.handletouch(false);
            }}
            className="find-con sear"
          >
            {this.state.open == true ? <BiArrowBack /> : <CgSearch />}
          </button>
          <input
            onClick={(e) => {
              this.handletouch(true);
            }}
            value={this.state.find}
            onChange={this.loadSugestion}
            autoComplete="off"
            type="text"
            name="pr"
            placeholder="Search..."
            id="seach-profile"
          />
          <div className="close-seach">
            <IoCloseSharp />
          </div>
        </div>
        <div className="clas-holdin-fhbbs">
          {this.state.data?.map((item) => {
            return (
              <div className="box-thsthn" key={uuid()}>
                <div className="njejkjrmmfsr">
                  <div className="wrieii">
                    <div className="back-button">
                      <CgSearch />
                    </div>
                    <button
                      className="mddjndd-kfjf"
                      onClick={() => {
                        this.handleClick(item.replace("#", ""));
                      }}
                    >
                      {item.replace("#", "")}
                    </button>
                  </div>
                </div>
                <div className="back-button">
                  <IoCloseSharp />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default withRouter(UpdateDiscover);
