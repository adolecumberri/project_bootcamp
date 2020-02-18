import React from "react";
import HeaderAvatar from "./profile_components/headerAvatar";
import DeveloperData from "./profile_components/developerData";
import Categories from "./profile_components/categories";
import ChangePassword from "./profile_components/changePassword";
import { Route, Link } from "react-router-dom";

/* JSON de ciudades. */
import countries from "../../jsons/cities.json";

//css
import "./css/updateUser.css";

class Profile extends React.PureComponent {
  render() {
    // let currentLink = window.location.href.substr(LOCAL_URL.length);
    // console.log(LOCAL_URL);
    // console.log(currentLink);
    return (
      <div
        style={{ backgroundColor: "#f1f1f1", width: "100vw", height: "92vh" }}
      >
        <div
          className="navbar navbar-expand-lg"
          style={{
            backgroundColor: "#f1f1f1",
            width: "100vw",
            margin: "0px",
            paddingTop: "30px"
          }}
        >
          <ul className="navbar-nav my-UpdateUserList">
            <Link
              to="/user/profile/header_avatar"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li className="nav-item my-input mx-2">Header / Avatar</li>
            </Link>

            <Link
              to="/user/profile/developer/data"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li className="nav-item  my-input mx-2">Developer information</li>{" "}
            </Link>

            <Link
              to="/user/profile/categories"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li className="nav-item  my-input mx-2">Categories</li>{" "}
            </Link>

            <Link
              to="/user/profile/change_password"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li className="nav-item  my-input mx-2">Account Data</li>
            </Link>
          </ul>
        </div>

        <div className="row my-row">
          <div className="col-12 col-md-2"></div>
          <div className="col-12 col-md-8">
            <Route
              path="/user/profile/header_avatar"
              exact
              component={HeaderAvatar}
            />

            <Route path="/user/profile/developer/data" exact>
              <DeveloperData countries={countries}></DeveloperData>
            </Route>

            <Route path="/user/profile/categories" exact>
              <Categories />
            </Route>

            <Route
              path="/user/profile/change_password"
              exact
              component={ChangePassword}
            />
          </div>
          <div className="col-12 col-md-2"></div>
        </div>
      </div>
    );
  }
}

export default Profile;
