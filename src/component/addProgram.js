import React, { Component } from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import ApiUrl from "../url";
class Addprogram extends Component {
  state = {
    open: true,
    title: "",
    description: "",
    file: null,
    button: false,
    loadind: false,
  };

  handleCreate = () => {
    if (this.state.title.length > 0) {
      const program = {
        Author: this.props.user.Username,
        AuthorId: this.props.user.userid,
        title: this.state.title,
        description: this.state.description,
        type: this.props.type,
      };
      this.setState({
        loadind: true,
      });
      axios
        .post(`${ApiUrl.Two}add-a-new-program-with-no-image-or-video`, program)
        .then((res) => {
          if (res.data == "change the title") {
            console.log("chage it");
            document.querySelector(".hold-that-messe").classList.add("active");
            document.querySelector(".hold-that-messe").innerText =
              "This title already exist";
          } else {
            this.props.history.push(`/program/workout/${res.data.programId}`);
          }
        });
    } else {
      document.querySelector(".hold-that-messe").classList.add("active");
      document.querySelector(".hold-that-messe").innerText =
        "Please give  a title";
    }
  };

  handlechange = (e) => {
    this.setState({
      title: e.target.value.toLowerCase(),
    });
    if (e.target.value.length > 0) {
      this.setState({
        button: true,
      });
    } else {
      this.setState({
        button: false,
      });
    }
  };

  handledesd = (e) => {
    this.setState({
      description: e.target.innerText,
    });
  };

  render() {
    return (
      <div
        className={`overlay-new-program  ${
          this.props.open == false ? "" : "active"
        }`}
      >
        <div className="box-that-create-a-new-program">
          <div className="title-of--thise-action">
            <button
              onClick={() => this.props.handlOpen(false)}
              className="close-that"
            >
              <IoCloseSharp />
            </button>
            <p>Create a Program</p>
          </div>

          <div className="edit-box-profile">
            <label htmlFor="title">Title</label>
            <input
              onChange={this.handlechange}
              className="username-profile"
              type="text"
              placeholder="Add a title..."
            />
          </div>

          <p className="hold-that-messe"></p>

          {/*	<div className="edit-box-profile ehh">
				<p>Description</p>

			      <div className="watpr-contnr-mem edit-for ">
				  <div className="wrappe-mmeshe-bio rhrhr">
				  <div   onKeyUp={this.handledesd}   contentEditable="true" data-placeholder="Add a description...(optinal)" className="hold-edit-bio "></div>
			  </div>
			  </div>
			
			  
			</div>*/}

          <div className="conte-thise-action">
            {this.state.loadind ? (
              <button
                className={`create  ${
                  this.state.button == false ? "" : "active"
                }`}
              ></button>
            ) : (
              <button
                onClick={() => this.handleCreate()}
                className={`create  ${
                  this.state.button == false ? "" : "active"
                }`}
              >
                CREATE
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Addprogram);
