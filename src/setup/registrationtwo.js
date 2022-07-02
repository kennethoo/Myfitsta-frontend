import React, { Component } from "react";
class RegistractionTwo extends Component {
  state = {
    user: {
      userid: "",
      firstName: "",
      lastName: "",
      address: "",
      City: "",
      State: "",
      Zip: "",
      ssn: "",
      number: "9177742866",
      birth: "",
    },
  };
  render() {
    return (
      <div className="jsjfoijeif">
        <div className="edit-box-profile">
          <p>Street address</p>
          <input
            onChange={this.props.handleChange}
            className="email-profile"
            type="text"
            name="address"
            placeholder={"Street address"}
            value={this.props.user.address}
          />
        </div>
        <div className="edit-box-profile">
          <p>City</p>
          <input
            onChange={this.props.handleChange}
            className="email-profile"
            type="text"
            name="City"
            placeholder={"City"}
            value={this.props.user.City}
          />
        </div>
        <div className="edit-box-profile">
          <p>State</p>
          <input
            onChange={this.props.handleChange}
            className="email-profile"
            type="text"
            name="State"
            placeholder={"State"}
            value={this.props.user.State}
          />
        </div>
        <div className="edit-box-profile">
          <p>Zip</p>
          <input
            onChange={this.props.handleChange}
            className="email-profile"
            type="text"
            name="Zip"
            placeholder={"Zip"}
            value={this.props.user.Zip}
          />
        </div>
      </div>
    );
  }
}

export default RegistractionTwo;
