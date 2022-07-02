import React, { Component } from "react";
import axios from "axios";
import Username from "../component/username";
import IconProfile from "../component/iconpicture";
import { BiCheck } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
class TagPeople extends Component {
  state = {
    item: "",
    people: [],
    selected: [],
  };

  selectedpeople = (data) => {
    let listp = [...this.state.selected];
    if (listp.filter((e) => e.id === data.id).length > 0) {
      let list = this.state.selected.filter((item) => {
        return item.id !== data.id;
      });
      console.log(list);
      this.setState({
        selected: list,
      });
      this.props.savepeople(list);
    } else {
      let list = [...this.state.selected, data];
      console.log(list);
      this.props.savepeople(list);
      this.setState({
        selected: list,
      });
    }
  };
  filtertags = (e) => {
    this.setState({
      item: e.target.value,
    });
    if (e.target.value.trim().length > 0) {
      axios
        .get(`/api/profilename/${e.target.value.trim()}/20`, {
          withCredentials: true,
        })
        .then((res) => {
          this.setState({
            people: res.data,
          });
        });
    } else {
      this.setState({
        people: [],
      });
    }
  };
  render() {
    return (
      <div className="wraper0the-box">
        <div className="titlerr">Tagged People</div>
        <div className="hold-thepeople-whrepar">
          {this.state.selected?.map((item) => {
            return (
              <div className="people-iconfjjnrn  " key={item.id}>
                <div className="hold-the-icon">
                  <IconProfile user={item.id} />
                </div>
                <Username user={item.id} />
                <div
                  onClick={(e) => {
                    this.selectedpeople({ id: item.id });
                  }}
                  className="hold-the-icon"
                >
                  <IoCloseSharp />
                </div>
              </div>
            );
          })}
        </div>
        <input
          onChange={this.filtertags}
          value={this.state.item}
          type="text"
          placeholder="Tag People..."
        />
        <div className="wrparrt-the-people">
          {this.state.people?.map((item) => {
            return (
              <div
                onClick={(e) => {
                  this.selectedpeople({ id: item.userid });
                }}
                className={`list-peopkojr ${
                  this.state.selected.some((e) => e.id == item.userid)
                    ? "active"
                    : ""
                } `}
                key={item._id}
              >
                <div className="inforisjjofjjr">
                  <IconProfile user={item.userid} />
                </div>
                <div className="ksiiriijr">
                  <Username user={item.userid} />
                </div>
                <div className="inforisjjorfjjr">
                  <p className="pinntjsjdjj">
                    <BiCheck />
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default TagPeople;
