import React from "react";
import { Link } from "react-router-dom";
import Login from "./user/login";
import Register from "./user/register";

/* css */
import "./css/navbar.css";

interface IProps {}

interface IState {
  loginFlag: boolean;
  registerFlag: boolean;
  flagResponsive: boolean;
}

class Navbar extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      loginFlag: false,
      registerFlag: false,
      flagResponsive: false
    };

    this.loginActivation = this.loginActivation.bind(this);
    this.registerActivation = this.registerActivation.bind(this);
    this.navbarClicked = this.navbarClicked.bind(this);

    this.displayRespNavbar = this.displayRespNavbar.bind(this);
  }

  displayRespNavbar() {
    this.setState({ flagResponsive: !this.state.flagResponsive });
  }

  loginActivation() {
    const { loginFlag } = this.state;
    this.setState({ loginFlag: !loginFlag, registerFlag: false });
  }
  registerActivation() {
    const { registerFlag } = this.state;
    this.setState({ registerFlag: !registerFlag, loginFlag: false });
  }
  navbarClicked() {
    this.setState({ loginFlag: false, registerFlag: false });
  }

  render() {
    const { loginFlag, registerFlag } = this.state;
    return (
      <>
        <div className="container-fluid notSelected" style={{ padding: "0px" }}>
          <div className="col-12" style={{ margin: "0px", padding: "0px" }}>
            <nav className="navbar navbar-expand navbar-light bg-light ">
              {/* IMG + Nombre */}
              <a className="navbar-brand my-notResp" href="/">
                <img src={require("../images/ico_logo40x40.jpg")} alt="" />
                proyect_bootcamp
              </a>
              {/* IMG resp */}
              <img
                src={require("../images/ico_logo40x40.jpg")}
                alt=""
                className="my-resp"
                onClick={this.displayRespNavbar}
              />
              <div className=" navbar-collapse" id="main_navbar">
                <ul className="navbar-nav my-navbar">
                  <li className="nav-item active">
                    <Link
                      to="/explore"
                      className="nav-link"
                      onClick={this.navbarClicked}
                    >
                      EXPLORE
                    </Link>
                  </li>
                  <li className="nav-item active">
                    <Link
                      to="/artists"
                      className="nav-link"
                      onClick={this.navbarClicked}
                    >
                      ARTISTS
                    </Link>
                  </li>
                </ul>
                <ul className="navbar-nav ">
                  <li>
                    <button
                      type="button"
                      className="my-input mr-3"
                      data-toggle="modal"
                      onClick={this.loginActivation}
                    >
                      Login
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="my-input"
                      data-toggle="modal"
                      onClick={this.registerActivation}
                    >
                      Register
                    </button>
                  </li>
                </ul>
              </div>
            </nav>
            <div className={`my-navbarResp`}>
              {/* NAVBAR RESPONSIVE */}
              <ul
                className={` ${
                  this.state.flagResponsive ? "showed" : "hidden"
                }`}
              >
                <li className="nav-item active">
                  <Link to="/explore" className="nav-link">
                    EXPLORE
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link to="/artists" className="nav-link">
                    ARTISTS
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {loginFlag && <Login />}
        {registerFlag && <Register registered={this.navbarClicked} />}
      </>
    );
  }
}

export default Navbar;
