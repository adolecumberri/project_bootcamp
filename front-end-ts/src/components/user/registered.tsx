import React from "react";
import { Link } from "react-router-dom";
import { LogoutAction } from "src/redux/actions";
import { IAccount } from "src/interface/IAccount";
import { IStore } from "src/interface/IStore";
import { connect } from "react-redux";
import { API_URL } from "src/constants";

//css
import "./css/registered.css";

interface IGlobalStateProps {
  account: IAccount | null;
}

interface IGlobalActionProps {
  logout(): void;
}

interface IState {}

type TProps = IGlobalStateProps & IGlobalActionProps;

class Registered extends React.PureComponent<TProps, IState> {
  constructor(props: TProps) {
    super(props);
    this.state = {};

    this.logout = this.logout.bind(this);
  }

  logout() {
    const { logout } = this.props;
    localStorage.removeItem("coworkin_token");
    logout();
  }

  render() {
    const { id, avatar, name } = this.props.account as IAccount;
    return (
      <ul
        className="navbar-nav mr-5 pr-4 my-userNavbar"
        style={{
          backgroundColor: "#efefef",
          borderRadius: "6%",
          maxHeight: "58px"
        }}
      >
        <li className="nav-item dropdown">
          <a
            className="float-left mb-2 nav-link "
            href="/"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
          >
            {/* avatar
                      ? `${API_URL}/multimedia/user_${id}/avatar/${avatar}`
                      : `${LOCAL_URL}/images/ico_logo40x40.jpg` */}
            <img
              alt="User Visual Stuff"
              src={
                avatar
                  ? `${API_URL}/multimedia/user_${id}/avatar/${avatar}`
                  : require("../../images/ico_logo40x40.jpg")
              }
              id="mi_avatar"
              className="rounded-circle mt-1"
              style={{ float: "left", height: "5vh", maxWidth: "6vh" }}
            />
            <div className="my-registeredTitle">
              {name} <i className="fa fa-caret-down" aria-hidden="true"></i>
            </div>
          </a>
          <div className="dropdown-menu">
            <label className=" ml-3 my-userMenu" style={{ color: "#a1a1a1" }}>
              <i className=""></i> USER
            </label>
            <Link to="/user/profile" className="dropdown-item my-userMenu">
              <i className=""></i>My Profile
            </Link>

            <Link to="/user/portfolio" className="dropdown-item my-userMenu">
              <i className=""></i>My Portfolio
            </Link>
            <div className="dropdown-divider"></div>

            {/* <label className=" ml-3" style={{ color: "#a1a1a1" }}>
              <i className=""></i> ENTERPRISE
            </label>
            <Link to="/" className="dropdown-item">
              <i className=""></i> My Enterprises
            </Link>

            <div className="dropdown-divider"></div> */}
            {/* <Link to="/" className="dropdown-item">
              <i className=""></i> Suggestions Mailbox
            </Link> */}
            <Link to="/main" className="dropdown-item" onClick={this.logout}>
              <i className=""></i> Logout
            </Link>
          </div>
        </li>
      </ul>
    );
  }
}

/* algo que recibo */
const mapStateToProps = ({ account }: IStore): IGlobalStateProps => ({
  account
});

/* Algo que quiero hacer. Accion que describo: logout, accion que importo de las
Actions.ts? -> LogoutAction */
const mapDispatchToProps = {
  logout: LogoutAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Registered);
