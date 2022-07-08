
import React, { Component } from "react";
import Nav from "../component/nav";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
let source;
source = axios.CancelToken.source();

class Routine extends Component {
  state = {
    collection: {},
    routine: [],
  };

  goBack = (e) => {
    this.props.history.goBack();
  };

  handleChange = (event) => {
    console.log(event);
  };

  getRoutine = () => {
    axios
      .get(
        `https://vast-cliffs-15160.herokuapp.com/myroutine/${this.props.user.userid}`,
        { cancelToken: source.token }
      )
      .then((res) => {
        if (res.data.length > 0) {
          this.setState({
            routine: res.data,
          });
        } else {
        }
      });
  };

  componentDidMount = () => {
    this.getRoutine();
  };

  render() {
    let card = this.state.routine?.map((item) => {
      return (
        <div className="card-hold-workout-list" key={item._id}>
          <div className="title-of-tbhis-list">
            <p>{item.collectionName}</p>
            <div className="menun">
              <i className="fas fa-ellipsis-v"></i>
            </div>
          </div>
          <div className="hold-this-list-of-workot">
            {item.data?.map((element) => {
              return (
                <div className="workout-detailol" key={Math.random() * 10}>
                  <p className="name-of-the-workoput">{element}</p>
                  <div className="remove-this-workout-from-the-list">
                    <i className="fas fa-trash"></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="add-to-list-copopent">
            <button className="add-button-list-open">Add</button>
            <div className="class-wrer-type-toadd">
              <input placeholder="Add a workout..." type="text" />
            </div>
            <div className="conteol-add-clode">
              <button className="finish-adding">Done</button>
              <button className="add-to-that-orkout-list">Add</button>
            </div>
          </div>
          <div className="open-menu-of-this-collection">
            <div className="hearder-of-edit">
              <button className="close-this-menu-cololc">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="item-of-thiscollection-memu">
              Share
              <i className="fas fa-share"></i>
            </div>
            <div className="item-of-thiscollection-memu">
              Delete
              <i className="fas fa-trash"></i>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="conatiner">
        <Nav user={this.props.user} />
        <div id="app">
          <div id="body-tabs">
            <div className="title-coc">
              <p className="col-tit">Collection</p>

              <div className="other-action">
                <div className="curent-collection-type">Routine</div>
                <Link to="/collection">Workout</Link>
                <button>
                  {" "}
                  <p className="fas fa-plus ccl"></p>
                  <p className="bttn-tit">Add a List</p>
                </button>
              </div>
            </div>
            <div className="box-hold-all-collecion-routine">{card}</div>
          </div>
        </div>
        <div className="overlay-to-create-workout-routine">
          <div className="workout-routine-card">
            <div className="ttiel-of-rot-add-card">Add a Routine</div>
            <input
              placeholder="Collection name"
              text="text"
              className="routine-add-ollectooionf-namnrffhr"
            />
            <button className="add-to-create-thois-routibe">
              Add a Routine
            </button>
            <button className="calc-this-routin-creatyeing">Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Routine);
