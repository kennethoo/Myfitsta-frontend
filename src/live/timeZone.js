import React, { Component } from "react";
import moment from "moment-timezone";
import { BiCheck } from "react-icons/bi";
class TimeZone extends Component {
  state = {
    list: [],
    origin: [],
    timeChoose: "",
  };

  selected = (item) => {
    let newList = this.state.origin.filter((data) => data == item);
    this.setState(
      {
        list: newList,
        timeChoose: item,
      },
      () => {
        this.props.selctedTime(item);
      }
    );
  };
  findTime = (e) => {
    let newList = this.state.origin.filter((item) =>
      item.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
    );
    this.setState({
      list: newList,
    });
  };
  run = () => {
    if (this.state.list > 1) {
    } else {
      let list = moment.tz.names();
      let mytime = moment.tz.guess();
      let newList = list.filter((item) => item !== mytime);
      let UpdatedList = [mytime, ...newList];
      this.setState({
        list: UpdatedList,
        origin: UpdatedList,
      });
    }
  };
  componentDidMount = () => {};
  render() {
    return (
      <div className="scheule-wraper-boxx">
        <div className="wraper-boxe">
          <div className="icondrr">
            <i className="fas fa-search"></i>
          </div>
          <div className="inpit0boxs">
            <input
              onChange={this.findTime}
              onClick={this.run}
              placeholder="Pick a timezone..."
              type="text"
            />
          </div>
        </div>
        {this.state.list.length > 0 ? (
          <div className="box-hold-data">
            {this.state.list?.map((item, index) => {
              return (
                <div
                  onClick={() => {
                    this.selected(item);
                  }}
                  key={index}
                  className="contry-bojn"
                >
                  <div>{item}</div>
                  {this.state.timeChoose == item ? (
                    <div className="icondrr active">
                      <BiCheck />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default TimeZone;
