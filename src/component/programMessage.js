import React, { Component } from "react";
import axios from "axios";
import BoxMedia from "../component/boxmedia";
import IconProfile from "../component/iconpicture";
import Username from "../component/username";
class ProgramMessage extends Component {
  state = {
    icon: null,
    data: null,
    post: null,
    file: "",
    program: null,
    kind: [],
    show: null,
  };

  loadProgram = () => {
    axios
      .get(`/api/program-data/${this.props.item.content}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.programId) {
          this.setState({
            program: res.data,
            file: res.data.file,
            kind: [res.data.fileKind],
            show: true,
          });
          document.querySelector(".box-hold-convertion").scrollTop =
            document.querySelector(".box-hold-convertion").scrollHeight;
        } else {
          console.log("rkk");
        }
      });
  };

  componentDidMount = () => {
    console.log(this.props.item.content);
    if (this.props.item.content.length > 0) {
      this.loadProgram();
    }
  };
  render() {
    return this.state.show !== null ? (
      this.state.show == true ? (
        <div className="wrspejrj-profilej chh">
          <div className="header-post vbf ">
            <div className="icon0tjnnr">
              {this.state.program !== null ? (
                <IconProfile user={this.state.program.AuthorId} />
              ) : (
                ""
              )}
            </div>
            <div className="usernamerrjjr">
              {" "}
              {this.state.program !== null ? (
                <Username user={this.state.program.AuthorId} />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="wriskjrr">
            <div className="labsl-prjrj">PROGRAM</div>
            {this.state.program != null ? (
              <BoxMedia file={this.state.file} kind={this.state.kind} />
            ) : (
              ""
            )}
            <div className="henfnnnfkf">
              {this.state.program != null ? this.state.program.title : ""}
            </div>
          </div>
        </div>
      ) : (
        "rjrj"
      )
    ) : (
      ""
    );
  }
}

export default ProgramMessage;
