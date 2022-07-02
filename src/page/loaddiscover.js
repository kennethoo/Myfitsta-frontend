import React, { Component } from "react";
import Nav from "../component/nav";
import Search from "../component/seach";
import Boxcollection from "../component/boxcollection";
import ShareOption from "../component/shareoption";
import SharePost from "../component/sharepost";
import RelatedPost from "../component/relatedpost";
import axios from "axios";
import { withRouter } from "react-router-dom";
import PostBox from "../component/postbox";
import { BiArrowBack } from "react-icons/bi";
import Report from "../component/report";
let source;
source = axios.CancelToken.source();
class LoadDiscover extends Component {
  state = {
    search: false,
    post: null,
    file: "",
    shareoption: false,
    sharebox: false,
  };

  constructor(props) {
    super(props);
    source = axios.CancelToken.source();
  }
  handlOpenS = (data) => {
    this.setState({
      sharebox: data,
    });
    this.handleSettingg(false, this.state.file);
  };

  handleSettingg = (data, file) => {
    this.setState({
      shareoption: data,
      file: file,
    });
  };

  openSearch = (data) => {
    this.setState({
      search: data,
    });
  };

  goBack = (e) => {
    this.props.history.goBack();
  };
  loadPost = () => {
    axios
      .get(`/api/imageinfo/${this.props.match.params.id}`, {
        withCredentials: true,
        cancelToken: source.token,
      })
      .then((res) => {
        if (res.data) {
          this.setState({
            post: res.data,
          });
        }
      });
  };

  componentDidMount = () => {
    this.loadPost();
  };

  componentWillUnmount = () => {
    if (source) {
      source.cancel("Landing Component got unmounted");
    }
  };
  render() {
    return (
      <div className="conatiner">
        <Nav user={this.props.user} />
        <div id="app">
          <div id="body-tabs">
            <div className="wrper-div-hisjn">
              <div id="head">
                <div className="wrieii">
                  <div onClick={this.goBack} className="close-that">
                    <BiArrowBack />
                  </div>
                  <p>Discover</p>
                </div>
                <div id="nt-mes">
                  <div
                    onClick={() => {
                      this.openSearch(true);
                    }}
                    className="serach-pro"
                  >
                    <i className="fas fa-search"></i>
                  </div>
                </div>
              </div>
              <div className="feedfjjjjjr-wrosf">
                <div className="head-active">
                  <div className="njejkjrmmfsr">
                    <div className="wrieii">
                      <div onClick={this.goBack} className="close-that">
                        <BiArrowBack />
                      </div>
                      <p>Discover</p>
                    </div>
                  </div>

                  <div className="wjjijnnff">
                    <div
                      onClick={() => {
                        this.openSearch(true);
                      }}
                      className="open-seach"
                    >
                      <i className="fas fa-search"></i>
                    </div>
                  </div>
                </div>
                <div className="rfjkernjk">
                  {this.state.post !== null ? (
                    <PostBox
                      openBoxCollection={this.props.openBoxCollection}
                      handleSetting={this.handleSettingg}
                      user={this.props.user}
                      item={this.state.post}
                    />
                  ) : (
                    ""
                  )}
                  {this.state.post !== null ? (
                    <RelatedPost
                      user={this.props.user}
                      item={this.state.post}
                      openBoxCollection={this.props.openBoxCollection}
                      handleSetting={this.handleSettingg}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <Search
                user={this.props.user}
                openSearch={this.openSearch}
                seach={this.state.search}
              />
            </div>
          </div>
        </div>
        <Boxcollection
          user={this.props.user}
          file={this.props.file}
          openBoxCollection={this.props.openBoxCollection}
          boxCollection={this.props.boxCollection}
        />
        <ShareOption
          handlOpenS={this.handlOpenS}
          handleSetting={this.handleSettingg}
          shareoption={this.state.shareoption}
        />
        <SharePost
          user={this.props.user}
          file={this.state.file}
          handlOpenS={this.handlOpenS}
          sharebox={this.state.sharebox}
          kind={"post"}
        />
        <Report />
      </div>
    );
  }
}

export default withRouter(LoadDiscover);
