import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Saved extends Component {
  state = {};

  loadSaved = () => {
    console.log("jjtjj");
  };
  render() {
    return (
      <div className="hold-the-saved-bodnfknrjfj">
        <div className="box-thnbrgjhdghn">
          <div className="bodnn-tifjj">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png" />
          </div>
          <div className="thajtjtinjnjtj">
            <div className="tikjpmnr">
              How to chaecjk if you rel name is this or that or else
            </div>
            <div className="tikrkrjr">Kenneth</div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Saved);
