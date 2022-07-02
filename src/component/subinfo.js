import React, { Component } from "react";
import axios from "axios";
import ApiUrl from "../url";
import Username from "../component/username";
import IconProfile from "../component/iconpicture";
import { connect } from "react-redux";
class Subinfo extends Component {
  state = {
    username: null,
    call: false,
    fullName: null,
    list: null,
  };

  checkconenction = () => {
    axios
      .get(
        `${ApiUrl.Three}check-in-about-him/her/${this.props.user}/${this.props.users.userid}`
      )
      .then((res) => {
        if (res.data.fullName) {
          this.setState({
            fullName: res.data.fullName,
          });
        } else {
          this.setState({
            list: res.data,
          });
        }
      });
  };

  componentDidMount = () => {
    this.checkconenction();
  };
  render() {
    return (
      <div className="rraprjej-infjfnjgj">
        {this.state.fullName !== null ? <p>{this.state.fullName}</p> : ""}

        {this.state.list !== null ? (
          <div className="ensrj">
            <div className="wrpaer-bob-diesiif">
              {this.state.list?.map((item, index) => {
                if (index < 3) {
                  return (
                    <div className="iocnnfrn" key={item}>
                      <IconProfile user={item} />
                    </div>
                  );
                }
              })}
            </div>
            <div className="jejjsnjr">
              Followed by
              {this.state.list?.map((item, index) => {
                if (index < 1) {
                  return (
                    <div className="iocnnfrntjjiei" key={item}>
                      <Username user={item} />
                    </div>
                  );
                }
              })}
              {this.state.list.length > 1
                ? ` and ${this.state.list.length - 1} people`
                : ""}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapstateToProps = (state) => {
  return {
    users: state.user,
  };
};
export default connect(mapstateToProps)(Subinfo);
