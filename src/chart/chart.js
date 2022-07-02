import React, { Component } from "react";
import moment from "moment";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { format, parseISO, subDay } from "date-fns";
class Chart extends Component {
  state = {
    data: null,
    week: true,
    monthone: false,
    monthtwo: false,
    year: false,
  };

  filterday = () => {
    let curentdate = moment().format("MMM Do YY");
    let date = this.props.data.filter(
      (item) => moment(item.date).format("MMM Do YY") === curentdate
    );
    console.log(date);
  };

  filterWeek = () => {
    var currentDate = moment();
    var weekStart = currentDate.clone().startOf("week");
    var weekEnd = currentDate.clone().endOf("week");
    var days = [];
    for (let i = 0; i <= 6; i++) {
      days.push(moment(weekStart).add(i, "days").format("L"));
    }

    let list = [];
    this.props.data.forEach((item) => {
      if (days.includes(moment(item.date).format("L"))) {
        console.log("yes");
        list.push({
          date: moment(item.date).format("MMM Do"),
          value: item.earn,
        });
      }
    });
    console.log(list);
    this.setState({
      data: list,
    });
  };

  filtermonth = () => {
    let currentMonth = "0" + (new Date().getMonth() + 1);
    let currentYear = new Date().getFullYear().toString();
    let list = [];
    this.props.data.forEach((item) => {
      if (
        moment(item.date).format("L").includes(currentMonth) &&
        moment(item.date).format("L").includes(currentYear)
      ) {
        list.push({
          date: moment(item.date).format("MMM Do"),
          value: item.earn,
        });
      } else {
      }
    });
    this.setState({
      data: list,
    });
  };

  filter = (type) => {
    if (type == "week") {
      this.filterWeek();
      this.setState({
        week: true,
      });
    }
    if (type == "month") {
      this.filtermonth();
      this.setState({
        week: false,
      });
    }
  };

  formatdata = () => {
    let list = [];
    this.props.data.forEach((element) => {
      list.push({
        date: moment(element.date).format("MMM Do"),
        value: element.earn,
      });
    });
    this.setState({
      data: list,
    });
  };
  componentDidMount = () => {
    this.formatdata();
  };
  render() {
    return (
      <div className="wrpaertfeuigektrt">
        <div className="tirlemnkwm-wkr">
          <p>Earning Summary</p>
          {/*<div className="cjfkjririiffii">
    <button  className={this.state.week==true?"active":""} onClick={()=>{this.filter("week")}}>1W</button>
    <button  className={this.state.monthone==true?"active":""} onClick={()=>{this.filter("month")}}>1M</button>
    <button  className={this.state.monthtwo==true?"active":""}>3M</button>
    <button  className={this.state.year==true?"active":""}>1Y</button>


</div>*/}
        </div>

        {this.props.data.length > 0 ? (
          <div className="hold-thegrapgjhs-jfhf">
            <div className="rnjenwrjj3j">
              {this.state.data !== null ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={this.state.data}>
                    <defs>
                      <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor="#6f56e5"
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="75%"
                          stopColor="#6f56e5"
                          stopOpacity={0.05}
                        />
                      </linearGradient>
                    </defs>
                    <Area dataKey="value" stroke="#6f56e5" fill="url(#color)" />
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      dy={5}
                    />

                    <YAxis
                      dataKey="value"
                      axisLine={false}
                      tickLine={false}
                      tickCount={5}
                      tickFormatter={(number) => `$${number.toFixed(2)}`}
                    />
                    <Tooltip />
                    <CartesianGrid opacity={0.1} vertical={false} />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          <div className="hold-thegrapgjhs-jfht"></div>
        )}
      </div>
    );
  }
}

export default Chart;
