import React, { Component } from "react";

class Rating extends Component {
  numberformat = (val, decimals) => {
    val = parseFloat(val);
    return val.toFixed(decimals);
  };

  render() {
    return (
      <div className="rating-ofhte-program">
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
        {this.props.rating > 0 ? (
          <p className="hold-ratinf">
            {this.numberformat(this.props.rating, 2)}
          </p>
        ) : (
          <p className="message-not-ration"></p>
        )}
        {this.props.people ? (
          <p className="number-of-peopkera0-tatie">({this.props.people})</p>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Rating;
