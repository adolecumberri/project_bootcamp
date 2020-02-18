import React from "react";
import { API_URL } from "src/constants";
import { Link } from "react-router-dom";

interface IProps {
  avatar: string;
  name: string;
  id_user: string;
  id_portfolio: string;
}

class UserInfo extends React.PureComponent<IProps> {
  render() {
    const { avatar, name, id_user } = this.props;
    return (
      <>
        <div className="container">
          <div className=" mb-2 mt-5">
            <div className=" m-0 pt-2 ml-2">
              <Link to={`/content_creator/${id_user}`}>
                <div className="text-center">
                  <img
                    alt="User Avatar... where is it?"
                    src={
                      avatar
                        ? `${API_URL}/multimedia/user_${id_user}/avatar/${avatar}`
                        : require("../../../../images/ico_logo40x40.jpg")
                    }
                    className="logo rounded"
                    style={{ width: "80px" }}
                  />
                  <br />
                  <span className="info-user-name text-capitalize">
                    {" "}
                    {name}
                  </span>
                  <br />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default UserInfo;
