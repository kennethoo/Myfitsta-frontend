import "./App.css";
import "./style/style.css";
import "./style/landing.css";
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  withRouter,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Pageai from "./ai/pageai";
import axios from "axios";
import Faq from "./landing/faq";
import LoadConnection from "./page/loadConnection";
import Card from "./page/card";
import { connect } from "react-redux";
import Checkout from "./page/checkout";
import Register from "./page/register";
import Landing from "./page/landingPage";
import ShopingItem from "./page/shopingItem";
import Notification from "./page/notification";
import Setup from "./page/setup";
import Terms from "./landing/terms";
import Termss from "./landing/termss";
import Policy from "./landing/policy";
import LoadProfile from "./page/loadProfile";
import LoadlookProgram from "./page/loaddLookprogram";
import Recorver from "./page/recover";
import Home from "./page/home";
import Cookies from "./landing/coki";
import Loading from "./component/loading";
import React, { Component } from "react";
import Login from "./page/login";
import Discover from "./page/discover";
import Group from "./messaging/group";
import Upload from "./page/upload";
import Collection from "./page/collection";
import NoFound from "./page/nofound";
import LoadDiscover from "./page/loaddiscover";
import Comment from "./page/comment";
import Myfitstapro from "./page/myfitstapro";
import Conversation from "./page/conversation";
import Profile from "./page/profile";
import Message from "./page/message";
import Live from "./page/live";
import Watcher from "./page/watcher";
import Lookprogram from "./page/lookprogram";
import SeeCollection from "./page/seeCollection";
import Myprogram from "./page/myprogram";
import Setting from "./page/seting";
import Visitpage from "./page/visitepage";
import Loadprogram from "./page/loadprogram";
import Edit from "./page/edit";
import Routine from "./page/routine";
import EditContent from "./page/editcontent";
import Lookformyfitstapro from "./page/lookformyfitstapro";
import socket from "./socketConfig";
class App extends Component {
  state = {
    user: null,
    boxCollection: false,
    file: "",
    myfitstapro: {},
    pro: false,
  };

  checkLike = (e) => {
    axios.get("/api/likeonpost", { withCredentials: true }).then((res) => {
      if (res.data.length > 0) {
        this.props.adddLikes(res.data);
      }
    });
  };

  checkmyfistapro = (follower, post) => {};

  getfitstapro = (e) => {
    axios
      .get("/api/check-myfitstapro", { withCredentials: true })
      .then((res) => {
        this.props.proUpdate(res.data);
        this.setState({
          myfitstapro: res.data,
        });
      });
  };

  openBoxCollection = (data, file) => {
    this.setState({
      boxCollection: data,
      file: file,
    });
  };

  checkLogin = () => {
    axios.get("/api/check-login", { withCredentials: true }).then((res) => {
      this.props.loginAthification(res.data);
      if (res.data.userid) {
        this.setState({
          user: res.data,
        });
        let userid = res.data.userid;
        socket.auth = { userid };
        socket.connect();

        this.checkLike();
        if (res.data.myfista == true) {
          this.getfitstapro();
        }
      } else {
        this.setState({
          user: { email: "" },
        });
      }
    });
  };
  handerlogin = (data) => {
    this.setState({
      user: data,
    });
    window.location.reload();
  };
  loadTheme = (theme) => {
    const root = document.querySelector("#root");
    root.setAttribute("color-scheme", `${theme}`);
    localStorage.setItem("mode", theme);
  };

  componentWillMount() {
    this.props.history.listen((location, action) => {
      ("on route change");
    });
  }
  componentDidMount() {
    socket.on("check-everone-login-activity", () => {
      this.checkLogin();
    });

    this.checkLogin();
    const mode = localStorage.getItem("mode");
    if (mode == null) {
      this.loadTheme("light");
    } else {
      this.loadTheme(mode);
    }
  }

  render() {
    return (
      <div className="appppp">
        <BrowserRouter>
          <AnimatePresence>
            <Switch>
              <Route exact path="/">
                {this.state.user ? (
                  this.state.user.email.length > 0 ? (
                    <Redirect to="/home" />
                  ) : (
                    <Landing />
                  )
                ) : (
                  <Loading />
                )}
              </Route>
              <Route path="/home">
                {this.state.user ? (
                  this.state.user.email.length > 0 ? (
                    <Home
                      file={this.state.file}
                      openBoxCollection={this.openBoxCollection}
                      boxCollection={this.state.boxCollection}
                      user={this.state.user}
                    />
                  ) : (
                    <Redirect to="/login" />
                  )
                ) : (
                  <Loading />
                )}
              </Route>
              <Route path="/ai">
                {this.state.user ? (
                  this.state.user.email.length > 0 ? (
                    <Pageai
                      file={this.state.file}
                      openBoxCollection={this.openBoxCollection}
                      boxCollection={this.state.boxCollection}
                      user={this.state.user}
                    />
                  ) : (
                    <Redirect to="/login" />
                  )
                ) : (
                  <Loading />
                )}
              </Route>
              <Route path="/login">
                {this.state.user ? (
                  this.state.user.email.length > 0 ? (
                    <Redirect to="/home" />
                  ) : (
                    <Login login={this.handerlogin} />
                  )
                ) : (
                  <Loading />
                )}
              </Route>

              <Route path="/register">
                {this.state.user ? (
                  this.state.user.email.length > 0 ? (
                    <Redirect to="/home" />
                  ) : (
                    <Register login={this.handerlogin} />
                  )
                ) : (
                  <Loading />
                )}
              </Route>
              <Route exact path="/discover">
                {this.state.user !== null ? (
                  this.state.user.email.length > 0 ? (
                    <Discover
                      file={this.state.file}
                      openBoxCollection={this.openBoxCollection}
                      boxCollection={this.state.boxCollection}
                      user={this.state.user}
                    />
                  ) : (
                    <Redirect to="/login" />
                  )
                ) : (
                  <Loading />
                )}
              </Route>
              <Route path="/discover/:id">
                {this.state.user !== null ? (
                  this.state.user.email.length > 0 ? (
                    <Discover
                      file={this.state.file}
                      openBoxCollection={this.openBoxCollection}
                      boxCollection={this.state.boxCollection}
                      user={this.state.user}
                    />
                  ) : (
                    <Redirect to="/login" />
                  )
                ) : (
                  <Loading />
                )}
              </Route>
              <Route path="/notifications">
                {this.state.user !== null ? (
                  this.state.user.email.length > 0 ? (
                    <Notification user={this.state.user} />
                  ) : (
                    <Redirect to="/login" />
                  )
                ) : (
                  <Loading />
                )}
              </Route>
              <Route exact path="/profile">
                {this.state.user !== null ? (
                  this.state.user.email.length > 0 ? (
                    <Profile
                      file={this.state.file}
                      openBoxCollection={this.openBoxCollection}
                      boxCollection={this.state.boxCollection}
                      user={this.state.user}
                    />
                  ) : (
                    <Redirect to="/login" />
                  )
                ) : (
                  <Loading />
                )}
              </Route>

              <Route path="/profile/:id/:data">
                {this.state.user !== null ? (
                  this.state.user.email.length > 0 ? (
                    <LoadProfile
                      file={this.state.file}
                      openBoxCollection={this.openBoxCollection}
                      boxCollection={this.state.boxCollection}
                      user={this.state.user}
                    />
                  ) : (
                    <Redirect to="/login" />
                  )
                ) : (
                  <Loading />
                )}
              </Route>

              <Route path="/post">
                {this.state.user !== null ? (
                  this.state.user.email.length > 0 ? (
                    <Upload user={this.state.user} />
                  ) : (
                    <Redirect to="/login" />
                  )
                ) : (
                  <Loading />
                )}
              </Route>

              <Route exact path="/collection/program">
                {this.state.user !== null ? (
                  this.state.user.email.length > 0 ? (
                    <Collection
                      file={this.state.file}
                      openBoxCollection={this.openBoxCollection}
                      boxCollection={this.state.boxCollection}
                      user={this.state.user}
                    />
                  ) : (
                    <Redirect to="/login" />
                  )
                ) : (
                  <Loading />
                )}
              </Route>
              <Route exact path="/collection">
                {this.state.user !== null ? (
                  this.state.user.email.length > 0 ? (
                    <Collection user={this.state.user} />
                  ) : (
                    <Redirect to="/login" />
                  )
                ) : (
                  <Loading />
                )}
              </Route>

              <Route exact path="/live">
                {this.state.user !== null ? (
                  this.state.user.email.length > 0 ? (
                    <Live user={this.state.user} />
                  ) : (
                    <Redirect to="/login" />
                  )
                ) : (
                  <Loading />
                )}
              </Route>
              <Route exact path="/live/:id">
                {this.state.user !== null ? (
                  this.state.user.email.length > 0 ? (
                    <Watcher user={this.state.user} />
                  ) : (
                    <Redirect to="/login" />
                  )
                ) : (
                  <Loading />
                )}
              </Route>
              <Route exact path="/message">
                {this.state.user !== null ? (
                  this.state.user.email.length > 0 ? (
                    <Message user={this.state.user} />
                  ) : (
                    <Redirect to="/login" />
                  )
                ) : (
                  <Loading />
                )}
              </Route>

              <Route exact path="/account/:id">
                {this.state.user !== null ? (
                  this.state.user.email.length > 0 ? (
                    <Visitpage
                      file={this.state.file}
                      openBoxCollection={this.openBoxCollection}
                      boxCollection={this.state.boxCollection}
                      user={this.state.user}
                    />
                  ) : (
                    <Redirect to="/login" />
                  )
                ) : (
                  <Loading />
                )}
              </Route>
              <Route exact path="/message/:id">
                {this.state.user !== null ? (
                  this.state.user.email.length > 0 ? (
                    <Conversation user={this.state.user} />
                  ) : (
                    <Redirect to="/login" />
                  )
                ) : (
                  <Loading />
                )}
              </Route>
              <Route exact path="/message/room/:id">
                {this.state.user !== null ? (
                  this.state.user.email.length > 0 ? (
                    <Group user={this.state.user} />
                  ) : (
                    <Redirect to="/login" />
                  )
                ) : (
                  <Loading />
                )}
              </Route>

              <Route exact path="/myfitstapro">
                {this.state.user !== null ? (
                  this.state.user.email.length > 0 ? (
                    this.state.user.myfista == true ? (
                      this.state.myfitstapro.Username ? (
                        <Myfitstapro
                          myfitstapro={this.state.myfitstapro}
                          file={this.state.file}
                          openBoxCollection={this.openBoxCollection}
                          boxCollection={this.state.boxCollection}
                          user={this.state.user}
                        />
                      ) : (
                        <Loading />
                      )
                    ) : (
                      <Redirect to="/home" />
                    )
                  ) : (
                    <Redirect to="/login" />
                  )
                ) : (
                  <Loading />
                )}
              </Route>

              <Route exact path="/program/workout/:id">
                {this.state.user !== null ? (
                  this.state.user.email.length > 0 ? (
                    this.state.user.myfista == true ? (
                      <Myprogram
                        openBoxCollection={this.openBoxCollection}
                        boxCollection={this.state.boxCollection}
                        user={this.state.user}
                      />
                    ) : (
                      <Redirect to="/home" />
                    )
                  ) : (
                    <Redirect to="/login" />
                  )
                ) : (
                  <Loading />
                )}
              </Route>

              <Route exact path="/program/workout/course/:id">
                {this.state.user !== null ? (
                  this.state.user.email.length > 0 ? (
                    this.state.user.myfista == true ? (
                      <Loadprogram
                        myfitstapro={this.state.myfitstapro}
                        openBoxCollection={this.openBoxCollection}
                        boxCollection={this.state.boxCollection}
                        user={this.state.user}
                      />
                    ) : (
                      <Redirect to="/home" />
                    )
                  ) : (
                    <Redirect to="/login" />
                  )
                ) : (
                  <Loading />
                )}
              </Route>

              <Route path="/program/unlock/:id">
                {this.state.user !== null ? (
                  this.state.user.email.length > 0 ? (
                    <Lookprogram user={this.state.user} />
                  ) : (
                    <Redirect to="/login" />
                  )
                ) : (
                  <Loading />
                )}
              </Route>

              <Route path="/edit">
                {this.state.user !== null ? (
                  this.state.user.email.length > 0 ? (
                    <Edit user={this.state.user} />
                  ) : (
                    <Redirect to="/login" />
                  )
                ) : (
                  <Loading />
                )}
              </Route>

              <Route path="/collection/:id">
                {this.state.user !== null ? (
                  this.state.user.email.length > 0 ? (
                    <SeeCollection
                      file={this.state.file}
                      openBoxCollection={this.openBoxCollection}
                      boxCollection={this.state.boxCollection}
                      user={this.state.user}
                    />
                  ) : (
                    <Redirect to="/login" />
                  )
                ) : (
                  <Loading />
                )}
              </Route>
              <Route exact path="/myfitstapro/:id">
                {this.state.user !== null ? (
                  this.state.user.email.length > 0 ? (
                    <Lookformyfitstapro user={this.state.user} />
                  ) : (
                    <Redirect to="/login" />
                  )
                ) : (
                  <Loading />
                )}
              </Route>
              <Route exact path="/recover">
                <Recorver user={this.state.user} />
              </Route>

              <Route exact path="/account/program/workout/:id">
                {this.state.user !== null ? (
                  this.state.user.email.length > 0 ? (
                    <ShopingItem user={this.state.user} />
                  ) : (
                    <Redirect to="/login" />
                  )
                ) : (
                  <Loading />
                )}
              </Route>

              <Route exact path="/account/program/checkout/:id">
                {this.state.user !== null ? (
                  this.state.user.email.length > 0 ? (
                    <Checkout user={this.state.user} />
                  ) : (
                    <Redirect to="/login" />
                  )
                ) : (
                  <Loading />
                )}
              </Route>
              <Route exact path="/account/program/workout/course/:id">
                {this.state.user !== null ? (
                  this.state.user.email.length > 0 ? (
                    <LoadlookProgram user={this.state.user} />
                  ) : (
                    <Redirect to="/login" />
                  )
                ) : (
                  <Loading />
                )}
              </Route>
              <Route exact path="/comment/:id">
                {this.state.user !== null ? (
                  this.state.user.email.length > 0 ? (
                    <Comment user={this.state.user} />
                  ) : (
                    <Redirect to="/login" />
                  )
                ) : (
                  <Loading />
                )}
              </Route>
              <Route exact path="/routine">
                {this.state.user !== null ? (
                  this.state.user.email.length > 0 ? (
                    <Routine user={this.state.user} />
                  ) : (
                    <Redirect to="/login" />
                  )
                ) : (
                  <Loading />
                )}
              </Route>
              <Route exact path="/setup">
                {this.state.user !== null ? (
                  this.state.user.email.length > 0 ? (
                    this.state.user.canActivate == true ? (
                      this.state.myfitstapro.Username ? (
                        <Redirect to="/myfitstapro" />
                      ) : (
                        <Setup user={this.state.user} />
                      )
                    ) : (
                      <Redirect to="/home" />
                    )
                  ) : (
                    <Redirect to="/login" />
                  )
                ) : (
                  <Loading />
                )}
              </Route>
              <Route exact path="/card">
                {this.state.user !== null ? (
                  this.state.user.email.length > 0 ? (
                    <Card user={this.state.user} />
                  ) : (
                    <Redirect to="/login" />
                  )
                ) : (
                  <Loading />
                )}
              </Route>
              <Route exact path="/setting">
                {this.state.user !== null ? (
                  this.state.user.email.length > 0 ? (
                    <Setting user={this.state.user} />
                  ) : (
                    <Redirect to="/login" />
                  )
                ) : (
                  <Loading />
                )}
              </Route>
              <Route exact path="/setting/:id">
                {this.state.user !== null ? (
                  this.state.user.email.length > 0 ? (
                    <Setting user={this.state.user} />
                  ) : (
                    <Redirect to="/login" />
                  )
                ) : (
                  <Loading />
                )}
              </Route>
              <Route exact path="/setting/:id/:data">
                {this.state.user !== null ? (
                  this.state.user.email.length > 0 ? (
                    <Setting user={this.state.user} />
                  ) : (
                    <Redirect to="/login" />
                  )
                ) : (
                  <Loading />
                )}
              </Route>

              <Route exact path="/program/workout/course/edit/:id">
                {this.state.user !== null ? (
                  this.state.user.email.length > 0 ? (
                    <EditContent user={this.state.user} />
                  ) : (
                    <Redirect to="/login" />
                  )
                ) : (
                  <Loading />
                )}
              </Route>
              <Route exact path="/dis/:id">
                {this.state.user !== null ? (
                  this.state.user.email.length > 0 ? (
                    <LoadDiscover
                      file={this.state.file}
                      openBoxCollection={this.openBoxCollection}
                      boxCollection={this.state.boxCollection}
                      user={this.state.user}
                    />
                  ) : (
                    <Redirect to="/login" />
                  )
                ) : (
                  <Loading />
                )}
              </Route>
              <Route exact path="/user/:id/:data">
                {this.state.user !== null ? (
                  this.state.user.email.length > 0 ? (
                    <LoadConnection user={this.state.user} />
                  ) : (
                    <Redirect to="/login" />
                  )
                ) : (
                  <Loading />
                )}
              </Route>
              <Route exact path="/termsconditon">
                <Terms />
              </Route>
              <Route exact path="/terms">
                <Termss />
              </Route>
              <Route exact path="/cookies">
                <Cookies />
              </Route>
              <Route exact path="/privacy">
                <Policy />
              </Route>
              <Route path="*">
                <NoFound />
              </Route>
            </Switch>
          </AnimatePresence>
        </BrowserRouter>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    adddLikes: (data) => {
      dispatch({ type: "ADD_LIKES", data: data });
    },
    loginAthification: (data) => {
      dispatch({ type: "LOGIN", data: data });
    },
    proUpdate: (data) => {
      dispatch({ type: "PRO", data: data });
    },
  };
};
export default connect(null, mapDispatchToProps)(withRouter(App));
