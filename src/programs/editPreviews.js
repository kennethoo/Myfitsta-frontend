import React, { Component } from "react";
import VideoPost from "../component/videopost";
import axios from "axios";
import ApiUrl from "../url";
class EditPreviews extends Component {
  state = {
    preview: null,
    kind: null,
  };

  componentDidMount = () => {
    if (this.props.program.file.length > 0) {
      this.setState({
        preview: this.props.program.file,
        kind: this.props.program.fileKind,
      });
    } else {
      this.setState({
        preview: "no",
      });
    }
  };

  handleChangaFile = (event) => {
    let file = event.target.files;
    if (file[0].type.includes("image") || file[0].type.includes("video")) {
      let formData = new FormData();
      formData.append("file", file[0]);
      formData.append("programId", this.props.program.programId);
      axios
        .post(`/api/update-my-program-detail-with-image`, formData)
        .then((res) => {
          this.props.getProgramInfo();
          this.props.handlOpen(false);
        });
    }
  };

  render() {
    return (
      <div className="afichet-of-0the-presentation">
        <div className="holf-that-image">
          <div className="previews"></div>
        </div>

        <div className="toppe">
          {this.state.preview !== null ? (
            this.state.preview !== "no" ? (
              this.state.kind.includes("image") ? (
                <img
                  src={`${ApiUrl.content}${this.state.preview}`}
                  loading="lazy"
                />
              ) : (
                <VideoPost src={this.state.preview} />
              )
            ) : (
              ""
            )
          ) : (
            "loading"
          )}
        </div>
        <div className="conteol-theremove-and-add">
          <div className="upload-buttorn jfbjnnmd">
            <div id="upbox" className="upf">
              <label htmlFor="file-input">
                <i className="far fa-edit"></i>
                <p>Change</p>
              </label>
            </div>

            <input
              onChange={this.handleChangaFile}
              id="file-input"
              type="file"
              accept="image/x-png,image/gif,image/jpeg,video/mp4,video/mp3"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default EditPreviews;
