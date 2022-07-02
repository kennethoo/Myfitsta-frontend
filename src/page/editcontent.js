import React, { Component } from "react";
import Nav from "../component/nav";
import axios from "axios";
import ApiUrl from "../url";
import { withRouter } from "react-router-dom";
import VideoProgram from "../component/videoProgram";
import { BiArrowBack } from "react-icons/bi";
let source;
source = axios.CancelToken.source();
class EditContent extends Component {
  state = {
    title: "",
    description: "",
    media: {},
    button: false,
  };
  constructor(props) {
    super(props);
    source = axios.CancelToken.source();
  }
  goBack = (e) => {
    this.props.history.goBack();
  };
  handleChange = (e) => {
    this.setState({
      title: e.target.value,
      button: true,
    });
  };

  handledecription = (e) => {
    this.setState({
      description: e.target.innerText,
      button: true,
    });
  };

  saveChange = () => {
    if (
      this.state.title !== this.state.media.title ||
      this.state.description !== this.state.media.description
    ) {
      if (this.state.title.length > 4 || this.state.description.length > 4) {
        let option = {
          file: this.state.media.file,
          title: this.state.title,
          description: this.state.description,
        };
        axios.post("/api/edit/content/update", option).then((res) => {
          this.loadcontent();
          this.setState({
            button: false,
          });
        });
      } else {
      }
    }
  };

  loadcontent = () => {
    axios
      .get(`/api/edit/content/${this.props.match.params.id}`, {
        withCredentials: true,
        cancelToken: source.token,
      })
      .then((res) => {
        if (res.data !== "No") {
          this.setState({
            media: res.data,
            description: res.data.description,
            description: res.data.description,
            title: res.data.title,
          });
        } else {
          this.props.history.goBack();
        }
      });
  };
  componentDidMount = () => {
    this.loadcontent();
  };

  componentWillUnmount = () => {
    if (source) {
      source.cancel("Landing Component got unmounted");
    }
  };
  render() {
    return (
      <div className="conatiner">
        <Nav user={this.props.user} />
        <div id="app">
          <div id="body-tabs">
            <div className="title-of-prodf">
              <div className="wror-wrr">
                <div onClick={this.goBack} className="back-button">
                  <BiArrowBack />
                </div>
                <p className="tti-rhe">Edit Program</p>
              </div>
              <div className="hold-the-upload"></div>
            </div>
            <div className="wraorrikrkjrjjjjjsjjj">
              <div className="wrsjjjjrjrjjjjh">
                {this.state.media.fileKind ? (
                  this.state.media.fileKind.includes("image") ? (
                    <img src={`${ApiUrl.content}${this.state.media.file}`} />
                  ) : (
                    <VideoProgram src={this.state.media.file} />
                  )
                ) : (
                  ""
                )}
              </div>
              <div className="eidtj0-boxhr">
                <div className="title-of--thise-action rhbrnr">
                  <p>Edit</p>
                </div>

                <div className="bojcijrr">
                  <div className="edit-box-profile">
                    <label htmlFor="title">Title</label>
                    <input
                      onChange={this.handleChange}
                      placeholder={this.state.media.title}
                      className="username-profile"
                      type="text"
                    />
                  </div>

                  <div className="edit-box-profile">
                    <p>Description</p>
                    <div className="watpr-contnr-mem edit-for">
                      <div className="wrappe-mmeshe-bio">
                        <div
                          onKeyUp={this.handledecription}
                          contentEditable="true"
                          data-placeholder={this.state.media.description}
                          className="hold-edit-bio"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`conte-thise-action ${
                      this.state.button === true ? "active" : ""
                    }`}
                  >
                    <button onClick={this.saveChange} className="save">
                      Save Change
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(EditContent);
