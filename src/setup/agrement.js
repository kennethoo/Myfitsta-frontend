import React, { Component } from "react";
import LoadingSpin from "../component/loadingspin";
import { BiArrowBack } from "react-icons/bi";
import BaxBar from "../component/barbox";
class Agreement extends Component {
  state = {
    loading: false,
  };

  agreeclick = () => {
    this.setState({
      loading: true,
    });
    this.props.Activatemyfistapro();
  };
  render() {
    return (
      <div className="wrpaeorrr">
       
        <div className="procer-toactive0-my-fitstra-pro">
          <div className="theslider">
          <div onClick={() => this.props.next(2)} className="close-that">
            <BiArrowBack />
          </div>
          <div className="wwwr-text">Terms and Conditions</div>
        </div>

          <div className="wtaper-tit">
            <div className="hold-infomation-nedded">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry' s standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into el
              ectronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ip sum passages, and more recently with desktop
              publishing sof tware like Aldus PageMaker including versions of
              Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry' s
              standard dummy text ever since the 1500s, when an unknown printer
              took a galley of type and scrambled it to make a type specimen
              book. It has survived not only five centuries, but also the leap
              into el ectronic typesetting, remaining essentially unchanged. It
              was popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ip sum passages, and more recently with desktop
              publishing sof tware like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
            <p className="give-that-message">
              By clicking Agreed & Continue you agreed to our Myfitstapro terms
              and conditions
            </p>
          </div>
        </div>
        {this.state.loading == true ? (
          <button className="add-shch active">
            <LoadingSpin />
          </button>
        ) : (
          <button onClick={this.agreeclick} className="add-shch">
            Agreed & Continue
          </button>
        )}
      </div>
    );
  }
}

export default Agreement;
