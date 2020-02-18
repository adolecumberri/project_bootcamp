import React from "react";
import { Link } from "react-router-dom";
import Registered from "../components/user/registered";

import { connect } from "react-redux";
import { IStore } from "src/interface/IStore";
import { IAccount } from "src/interface/IAccount";
import AdminButtons from "./admin/adminButtons";

/* css */
import "./css/navbar.css";

interface IGlobalStateProps {
  account: IAccount | null;
}

interface IGlobalActionProps {}

type TProps = IGlobalStateProps & IGlobalActionProps;

interface IState {
  flagResponsive: boolean;
}

class NavbarLogged extends React.PureComponent<TProps, IState> {
  constructor(props: TProps) {
    super(props);

    this.state = {
      flagResponsive: false
    };

    this.displayRespNavbar = this.displayRespNavbar.bind(this);
  }

  displayRespNavbar() {
    this.setState({ flagResponsive: !this.state.flagResponsive });
  }

  render() {
    const { account } = this.props;
    const isAdmin = account?.isAdmin;

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
                  {/* <li className="nav-item active">
                    <Link to="/main" className="nav-link">
                      MAIN
                    </Link>
                  </li> */}
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
                  {isAdmin ? (
                    <li className="nav-item active mt-n2">
                      <AdminButtons />
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
                <Registered />
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
                {isAdmin ? (
                  <li className="nav-item active mt-n2">
                    <AdminButtons />
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ account }: IStore): IGlobalStateProps => ({
  account
});

export default connect(mapStateToProps)(NavbarLogged);
