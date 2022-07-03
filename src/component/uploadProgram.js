import React, { Component } from "react";
import axios from "axios";
import ApiUrl from "../url";
import { withRouter } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import PreviewVideo from "../component/previewVideo";
import { IoCloseSharp } from "react-icons/io5";
import Editable from "../component/editable";
import { BiArrowBack } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { motion } from "framer-motion";
import LoadingSpin from "../component/loadingspin";
class UploadInProgram extends Component {
  state = {
    title: "",
    description: "",
    preview: null,
    button: false,
    next: false,
    loading: false,
  };

  nextTab = () => {
    if (this.state.preview !== null) {
      this.setState({
        next: !this.state.next,
      });
    }
  };
  RemovePreview = () => {
    this.setState({
      preview: null,
    });
  };

  upload = () => {
    if (this.state.loading == false) {
      if (this.state.preview !== null && this.state.title.length > 0) {
        let formData = new FormData();
        formData.append("file", this.state.preview);
        formData.append("title", this.state.title);
        formData.append("Author", this.props.user.Username);
        formData.append("AuthorId", this.props.user.userid);
        formData.append("programId", this.props.program.programId);
        formData.append("description", this.state.description);
        this.setState({
          loading: true,
        });
        axios
          .post(`/api/video-or-image-for-the-program`, formData)
          .then((res) => {
            this.props.handlUpload(false);
            this.props.looadProgram();
          });
      } else {
      }
    }
  };

  handleChangaFile = (event) => {
    let file = event.target.files;
    if (file[0].type.includes("image") || file[0].type.includes("video")) {
      this.setState({
        preview: event.target.files[0],
      });
    }
    if (this.state.title.length > 0) {
      this.setState({
        button: true,
      });
    }
  };

  handleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
    if (this.state.preview !== null && event.target.value.length > 0) {
      this.setState({
        button: true,
      });
    } else {
      this.setState({
        button: false,
      });
    }
  };

  handledecription = (event) => {
    this.setState({
      description: event.target.innerText,
    });
  };

  render() {
    return (
      <div
        className={`overlay-new-program-Upload  ${
          this.props.upload == false ? "" : "active"
        }`}
      >
        <motion.div className="box-that-create-a-new-program big">
          <div
            className={`jehtjfnejdnrn ${
              this.state.next == false ? "active" : ""
            }`}
          >
            <div className="title-of--thise-action gjtjtjtj">
              <div className="wrieii">
                <button
                  onClick={() => this.props.handlUpload(false)}
                  className="close-that"
                >
                  <IoCloseSharp />
                </button>
                <p>Upload</p>
              </div>
              <div onClick={this.nextTab} className="close-that">
                <BsArrowRight />
              </div>
            </div>
            <div className="afichet-of-0the-presentation biger">
              <div className="holf-that-image uploadbox ">
                {this.state.preview !== null ? (
                  this.state.preview.type.includes("image") ? (
                    <img src={URL.createObjectURL(this.state.preview)} />
                  ) : (
                    <PreviewVideo
                      src={URL.createObjectURL(this.state.preview)}
                    />
                  )
                ) : (
                  ""
                )}
              </div>
              <div
                className={`conteol-theremove-and-add ${
                  this.state.preview !== null ? "active" : ""
                } `}
              >
                <div
                  className={`upload-button ${
                    this.state.preview !== null ? "active" : ""
                  }`}
                >
                  <div id="upbox">
                    <label htmlFor="file-input-media">
                      <i className="fas fa-plus"></i>
                      <p className="uple">Add File</p>
                    </label>
                  </div>

                  <input
                    onChange={this.handleChangaFile}
                    id="file-input-media"
                    type="file"
                    accept="image/x-png,image/gif,image/jpeg,video/mp4,video/mp3"
                  />
                </div>

                <div className="gjejtnr">
                  <button onClick={this.RemovePreview} className="back-nfnfnn">
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`box-bfjner ${this.state.next == true ? "active" : ""}`}
          >
            <div className="title-of--thise-action">
              <div className="wrieii">
                <button onClick={this.nextTab} className="close-that">
                  <BiArrowBack />
                </button>
                <p>Details</p>
              </div>
              <div onClick={this.nextTab} className="nextrn"></div>
            </div>
            <div className="edit-box-profile">
              <label htmlFor="title">Title</label>
              <input
                onChange={this.handleChange}
                className="username-profilee"
                type="text"
                placeholder="Add a title..."
              />
            </div>

            <div className="edit-box-profile">
              <p>Description</p>

              <div className="watpr-contnr-mem edit-for">
                <div className="wrappe-mmeshe-bio">
                  <Editable
                    handleBio={this.handledecription}
                    html={this.state.description}
                  />
                </div>
              </div>
            </div>
            <div
              className={`conte-thise-action ${
                this.state.button == true ? "active" : ""
              } ${this.state.loading == true ? "loading" : ""}`}
            >
              <button onClick={this.upload} className="upload">
                Upload
              </button>
              {this.state.loading == true ? (
                <div className="wraprroro">
                  <LoadingSpin />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
}

export default withRouter(UploadInProgram);
