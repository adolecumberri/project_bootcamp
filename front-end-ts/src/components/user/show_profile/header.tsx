import React from "react";
import { API_URL } from "src/constants";

interface IProps {
  id_user: number | null;
  header: string | null;
  avatar: string | null;
  name: string | null;
  numPorfolios: number;
}

class Header extends React.PureComponent<IProps> {
  componentDidMount() {}

  render() {
    const { numPorfolios, name, avatar, header, id_user } = this.props;
    return (
      <div className="container-fluid px-0">
        <div
          className="col-12 d-flex justify-content-center align-items-end "
          id="header"
          style={{
            backgroundImage: `url(${API_URL}/multimedia/user_${id_user}/header/${header})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "auto 100%",
            backgroundColor: "#eaeaea",
            minHeight: "350px",
            maxHeight: "450px"
          }}
        >
          <div
            className=" mb-3"
            style={{
              backgroundColor: "#f1f1f1",
              height: "120px",
              width: "120px",
              borderRadius: "20%"
            }}
          >
            <img
              alt="User Profile Avatar"
              className="rounded"
              src={
                avatar
                  ? `${API_URL}/multimedia/user_${id_user}/avatar/${avatar}`
                  : require("../../../images/ico_logo40x40.jpg")
              }
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
        <div
          className="col-12 d-flex align-items-center pl-4"
          style={{
            backgroundColor: "#3f3f3f",
            height: "45px",
            color: "#f1f1f1"
          }}
        >
          {numPorfolios ? numPorfolios : "0"} proyects published by&nbsp;
          <span className="text-capitalize"> {name}</span>.
        </div>
      </div>
    );
  }
}

export default Header;
