import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Nav from "../component/nav";
import axios from "axios";
import moment from "moment";
import ApiUrl from "../url";
import TagPeople from "../component/tagsPeople";
import { IoCloseSharp } from "react-icons/io5";
import { BiArrowBack } from "react-icons/bi";
import PreviewPost from "../video/previewPost";
import LoadingSpin from "../component/loadingspin";
import "../style/style.css";
let source;
source = axios.CancelToken.source();
let people = 0;
class Upload extends Component {
  state = {
    item: "",
    fileShow: null,
    fileArray: [],
    pageOne: true,
    pageTwo: false,
    messageTag: "",
    description: "",
    tags: [],
    uploadIng: false,
    tagsPeopple: [],
  };
  constructor(props) {
    super(props);
    source = axios.CancelToken.source();
  }
  savepeople = (data) => {
    let list = [...data];
    this.setState({
      tagsPeopple: list,
    });
  };

  filtertags = (e) => {
    this.setState({
      item: e.target.value.trim(),
    });
  };
  inputKeyDown = (e) => {
    if (e.keyCode === 13 || e.keyCode === 32) {
      if (this.state.item.trim().length > 0 && this.state.tags.length <= 15) {
        let list = [...this.state.tags, this.state.item];
        this.setState({
          tags: list,
          item: "",
        });
      }
    }
  };

  goBack = (e) => {
    this.props.history.goBack();
  };

  selectt = (e, data) => {
    let tagsd = e.currentTarget;
    if (tagsd.classList.contains("active")) {
      let index = this.state.tags.indexOf(data);
      let list = [...this.state.tags];
      list.splice(index, 1);
      this.setState({
        tags: list,
      });
    } else {
      let list = [...this.state.tags, data];
      this.setState({
        tags: list,
      });
    }
  };

  handleFileUpload = () => {
    if (this.state.fileArray.length > 0 && this.state.tags.length > 0) {
      this.setState({
        messageTag: "",
      });
      const formData = new FormData();
      formData.append("id", this.props.user.userid);
      formData.append("caption", this.state.description);
      formData.append("date", moment().format());
      for (let i = 0; i < this.state.fileArray.length; i++) {
        formData.append("file", this.state.fileArray[i]);
      }
      if (this.state.tagsPeopple.length > 0) {
        for (let i = 0; i < this.state.tagsPeopple.length; i++) {
          formData.append("tagged", this.state.tagsPeopple[i].id);
        }
      }
      for (let i = 0; i < this.state.tags.length; i++) {
        formData.append("kind", this.state.tags[i]);
      }
      axios.post(`/api/upload`, formData).then((res) => {
        this.props.history.push("/home");
      });
      this.setState({
        uploadIng: true,
      });
    } else {
      if (this.state.tags.length == 0) {
        this.setState({
          messageTag: "You need at least one Tag",
        });
      }
    }
  };
  hangleDescription = (event) => {
    this.setState({
      description: event.target.innerText.trim().replace(/\n/g, "<br/>"),
    });
  };

  nextPage = (one, two) => {
    if (this.state.fileArray.length > 0) {
      this.setState({
        pageOne: one,
        pageTwo: two,
      });
    }
  };

  hangleRemove = (data) => {
    let list = this.state.tags;
    list.splice(data, 1);
    this.setState({
      tags: list,
    });
  };

  hangleTags = (event) => {
    // if(event.keyCode===32){
    //  if(event.target.value.trim().length>0){
    //     let list = [...this.state.tags,event.target.value]
    //     this.setState({
    //    tags:list
    //     })
    //     event.target.value=""
    //  }
    // }
  };

  handleChange = (event) => {
    let file = event.target.files;
    if (file[0].type.includes("image") || file[0].type.includes("video")) {
      for (var i = 0; i <= file.length - 1; i++) {
        let list = [...this.state.fileArray, file[i]];
        console.log(file);
        this.setState({
          fileArray: list,
        });
      }
      if (this.state.fileShow == null) {
        this.showFirstElment();
      } else {
      }
    }
  };

  removeFile = (data) => {
    let file = this.state.fileArray[data];
    let list = [...this.state.fileArray];
    list.splice(data, 1);
    this.setState({
      fileArray: list,
    });
    if (file === this.state.fileShow) {
      let last = this.state.fileArray[this.state.fileArray.length - 1];
      this.setState({
        fileShow: last,
      });
    } else {
    }
    if (this.state.fileArray.length - 1 !== 0) {
    } else {
      this.setState({
        fileShow: null,
      });
    }
  };

  hangleDrop = (event) => {};
  onDragOver = (event) => {
    event.preventDefault();
  };
  onFileDrop = (event) => {
    event.preventDefault();
    let file = event.dataTransfer.files;
    for (var i = 0; i <= file.length - 1; i++) {
      if (file[i].type.includes("image") || file[i].type.includes("video")) {
        let list = [...this.state.fileArray, file[i]];
        this.setState({
          fileArray: list,
        });
      }
    }
    if (this.state.fileShow == null) {
      this.showFirstElment();
    } else {
    }
  };
  onDragEnter = (event) => {
    event.preventDefault();
  };
  clickFile = (data) => {
    this.setState({
      fileShow: this.state.fileArray[data],
    });
  };

  showFirstElment = (e) => {
    setTimeout(() => {
      this.setState({
        fileShow: this.state.fileArray[0],
      });
    }, 50);
  };

  render() {
    let data = this.state.fileArray.map((item) => {
      if (item.type.includes("image")) {
        return (
          <div
            className={`prpbox  ${this.state.fileShow == item ? "active" : ""}`}
            key={this.state.fileArray.indexOf(item)}
          >
            <div className="remove-media">
              <div
                onClick={() =>
                  this.clickFile(this.state.fileArray.indexOf(item))
                }
                className="file-tored"
              ></div>
              <button
                onClick={() =>
                  this.removeFile(this.state.fileArray.indexOf(item))
                }
                className="rrm"
              >
                &times;
              </button>
            </div>
            <img
              src={URL.createObjectURL(item)}
              alt="Image"
              loading="lazy"
            ></img>
          </div>
        );
      } else {
        return (
          <div className="prpbox" key={this.state.fileArray.indexOf(item)}>
            <div className="remove-media">
              <div
                onClick={() =>
                  this.clickFile(this.state.fileArray.indexOf(item))
                }
                className="file-tored"
              ></div>
              <button
                onClick={() =>
                  this.removeFile(this.state.fileArray.indexOf(item))
                }
                className="rrm"
              >
                &times;
              </button>
            </div>
            <video>
              <source src={URL.createObjectURL(item)} type="" />
            </video>
            <div className="control-that-video-post">
              <button>
                <i className="fas fa-play"></i>
              </button>
            </div>
          </div>
        );
      }
    });

    return (
      <div className="conatiner">
        <div
          className={`over-lay-when-postig  ${
            this.state.uploadIng == true ? "active" : ""
          }`}
        >
          <LoadingSpin />
        </div>
        <Nav user={this.props.user} />
        <div id="app">
          <div id="body-tabss">
            <div id="post">
              <div
                className={`box-uploadone  ${
                  this.state.pageOne == true ? "active" : "disp"
                }`}
              >
                <div className="title-post">
                  <div onClick={this.goBack} className="close-that">
                    <IoCloseSharp />
                  </div>
                  <p>Preview</p>
                  <div className="necxt-page">
                    <button
                      onClick={() => this.nextPage(false, true)}
                      className="go-to-detail"
                    >
                      Next
                    </button>
                  </div>
                </div>
                <div id="blog-upload">
                  <div className="medieopreviews">
                    {this.state.fileShow !== null ? (
                      this.state.fileShow.type.includes("image") ? (
                        <div className="previews">
                          <img
                            src={URL.createObjectURL(this.state.fileShow)}
                            alt="Image"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <PreviewPost
                          src={URL.createObjectURL(this.state.fileShow)}
                        />
                      )
                    ) : (
                      <div
                        className="upload-message"
                        onDragEnter={this.onDragEnter}
                        onDragOver={this.onDragOver}
                        onDrop={this.onFileDrop}
                      >
                        <p>Drag and drop a video or a Photo</p>
                        <i className="fas fa-upload upl"></i>
                      </div>
                    )}
                    <div className="contantin-it-medi"></div>
                  </div>

                  <div className="upload-button">
                    <div className="control-pr">{data}</div>

                    <div id="upbox">
                      <label htmlFor="file-input">
                        <i className="fas fa-plus"></i>
                        <p>Add File</p>
                      </label>
                    </div>
                    <input
                      multiple
                      id="file-input"
                      type="file"
                      onChange={this.handleChange}
                      accept="image/png, image/gif,image/jpeg,video/mp4"
                    />
                  </div>
                </div>
              </div>

              <div
                className={`section-two  ${
                  this.state.pageTwo == true ? "active" : ""
                }`}
              >
                <div className="before-upod">
                  <div
                    onClick={() => this.nextPage(true, false)}
                    className="close-that"
                  >
                    <BiArrowBack />
                  </div>
                  <p>Details</p>
                  <div className="div-bx-post">
                    <button onClick={() => this.handleFileUpload()}>
                      Post
                    </button>
                  </div>
                </div>
                <div id="caption">
                  <div className="titlerr">Caption</div>
                  <div
                    className="add-description-detail"
                    onKeyUp={this.hangleDescription}
                    contentEditable="true"
                    data-placeholder="Add a description..."
                  ></div>
                </div>
                <div className="kind">
                  <div className="titlerr">Add a tag</div>
                  <div className="contailner-ofthe-tags">
                    {this.state.tags?.map((item) => {
                      return (
                        <div
                          onClick={(e) => {
                            this.selectt(e, item);
                          }}
                          className={`tags-repred  ${
                            this.state.tags.includes(item) ? "active" : ""
                          }`}
                          key={Math.random() * 5}
                        >
                          <div>{item}</div>
                          <div className="close-thatr">
                            <button className="button-selleti">
                              <IoCloseSharp />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div id="add-tags">
                    <input
                      onChange={this.filtertags}
                      onKeyDown={this.inputKeyDown}
                      value={this.state.item}
                      type="text"
                      placeholder="Add a tags..."
                    />
                  </div>
                </div>
                <div className="messsage-ne">{this.state.messageTag}</div>

                <TagPeople
                  tagsPeopple={this.state.tagsPeopple}
                  savepeople={this.savepeople}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Upload);
