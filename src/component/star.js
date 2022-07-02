import React, { Component } from "react";

class Star extends Component {
  render() {
    return (
      <div className="hold-thestart">
        <div className="start-file">
          {this.props.rating > 0 ? (
            <i className="fas fa-star"></i>
          ) : (
            <i className="far fa-star"></i>
          )}
        </div>
        <div className="start-file">
          {this.props.rating > 1 ? (
            <i className="fas fa-star"></i>
          ) : (
            <i className="far fa-star"></i>
          )}
        </div>
        <div className="start-file">
          {this.props.rating > 2 ? (
            <i className="fas fa-star"></i>
          ) : (
            <i className="far fa-star"></i>
          )}
        </div>
        <div className="start-file">
          {this.props.rating > 3 ? (
            <i className="fas fa-star"></i>
          ) : (
            <i className="far fa-star"></i>
          )}
        </div>
        <div className="start-file">
          {this.props.rating > 4 ? (
            <i className="fas fa-star"></i>
          ) : (
            <i className="far fa-star"></i>
          )}
        </div>
      </div>
    );
  }
}

export default Star;
