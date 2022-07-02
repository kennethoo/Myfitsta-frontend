import React, { Component } from "react";
import axios from "axios";
import ApiUrl from "../url";
import LoadingSpin from "../component/loadingspin";
import Username from "../component/username";
import ProgramBought from "../programs/programbougth";
import ProIcon from "../programs/proicon";
import SubscriptionBougth from "../programs/subscriptionbought";
class Unlocked extends Component {
  state = {
    data: null,
  };
  getdata = () => {
    let option = {
      userid: this.props.user.userid,
    };
    axios.post(`${ApiUrl.Three}get-my-programm`, option).then((res) => {
      if (res.data !== "no") {
        let list = [];
        res.data.data.forEach((item) => {
          let dataS = list.filter((info) => info.AuthorId == item.AuthorId);
          if (dataS.length > 0) {
            list.forEach((data) => {
              if (data.AuthorId == item.AuthorId) {
                data.list.push(item.programid);
              }
            });
          } else {
            list.push({
              AuthorId: item.AuthorId,
              kind: item.kind,
              list: [item.programid],
            });
          }
        });

        this.setState({
          data: list,
        });
      } else {
        this.setState({
          data: "no",
        });
      }
    });
  };

  componentDidMount = () => {
    this.getdata();
  };

  render() {
    return (
      <div className="tabs-that0-hold-the-unclonnfnj">
        {this.state.data !== null ? (
          this.state.data !== "no" ? (
            this.state.data.map((item) => {
              if (item.kind == 1) {
                return (
                  <div
                    className="box-that-that-hold-the-row"
                    key={item.AuthorId}
                  >
                    <div className="box-that-holdname">
                      <div className="icon-usnrn">
                        <ProIcon user={item.AuthorId} />
                      </div>
                      <div className="namebox-that-holdname">
                        <Username user={item.AuthorId} link={true} />
                      </div>
                    </div>
                    <div className="row-0tjhat-hold-theprojhfnnf">
                      {item.list.map((data, index) => {
                        return <ProgramBought programid={data} key={index} />;
                      })}
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    className="box-that-that-hold-the-row"
                    key={item.AuthorId}
                  >
                    <div className="box-that-holdname">
                      <div className="icon-usnrn">
                        <ProIcon user={item.AuthorId} />
                      </div>
                      <div className="namebox-that-holdname">
                        <Username user={item.AuthorId} link={true} />
                      </div>
                    </div>
                    <SubscriptionBougth user={item.AuthorId} />
                  </div>
                );
              }
            })
          ) : (
            <div className="wraperififoojfhr">
              <div className="wraperjf-ffkfkr">
                <p>No Subsciption or Programs</p>
                <p>
                  When you subscribe to someone or buy a program, You will be
                  able to acces it here
                </p>
              </div>
            </div>
          )
        ) : (
          <div className="bixnknfkfjkjrjr">
            <LoadingSpin />
          </div>
        )}
      </div>
    );
  }
}
export default Unlocked;
