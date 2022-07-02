import React, { Component } from "react";
import axios from "axios";
import IconProfile from "../component/iconpicture";
import Username from "../component/username";
import Mediafind from "../component/mediafind";
class Profilemessage extends Component {
  state = {
    icon: null,
    data: null,
    post: null,
  };

  getprofilrhhhfhe = () => {
    axios.get(`/api/getid/6064a917f2f04e508d13b0d1`).then((res) => {
      if (res.data.userid) {
        this.setState({
          data: res.data,
          post: res.data.post,
        });
      }
    });
  };

  componentDidMount = () => {
    this.getprofilrhhhfhe();
  };

  render() {
    let post =
      this.state.post !== null ? (
        this.state.post !== "null" ? (
          <div className="wrsprrtt-theprofilee">
            {this.state.post.map((item, index) => {
              if (index <= 6) {
                return (
                  <div className="sub-gridnfnb" key={item._id}>
                    <Mediafind filename={item.filename.toString()} />
                  </div>
                );
              } else {
              }
            })}
          </div>
        ) : (
          ""
        )
      ) : (
        ""
      );

    return (
      <div className="wrspejrj-profilej">
        <div className="header-post">
          <div className="icon0tjnnr">
            {this.state.data !== null ? (
              <IconProfile user={this.state.data.userid} />
            ) : (
              ""
            )}
          </div>
          <div className="usernamerrjjr">
            {" "}
            {this.state.data !== null ? (
              <Username user={this.state.data.userid} />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="wrsprrkrjjrjjr">{post}</div>
      </div>
    );
  }
}

export default Profilemessage;
