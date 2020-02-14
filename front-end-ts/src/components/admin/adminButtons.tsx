import React from "react";
import { Link } from "react-router-dom";

class AdminButtons extends React.PureComponent {
  render() {
    return (
      <Link
        to="/admin/user"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <button className="btn btn-danger ml-2 mt-2">Users</button>
      </Link>
    );
  }
}

export default AdminButtons;
