import React, { Component } from "react";

class Editable extends Component {
  shouldComponentUpdate = (nextProps) => {
    return nextProps.html === "CLEARED";

    //return true;
  };

  componentDidUpdate = () => {
    console.log("Did update and this.props.html ===", this.props.html);
    // Why is this necessary for the second update to happen into the DOM?
    //this.refEl.innerHTML = this.props.html;
  };

  componentDidMount = () => {};

  state = {};

  render() {
    return (
      <div
        data-placeholder="Add a comment..."
        className="hold-edit-bio rjjrjrsn"
        contentEditable
        autoCorrect="off"
        onInput={this.props.handleBio}
        dangerouslySetInnerHTML={{ __html: this.props.html }}
        ref={(el) => (this.refEl = el)}
      ></div>
    );
  }
}

export default Editable;
