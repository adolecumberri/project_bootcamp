import React from "react";
import { API_URL, LOCAL_URL } from "src/constants";

interface IProps {
  id_user: string;
  id_portfolio: string;
  title: string;
  description: string;
  avatar: string;
}

class HeaderP extends React.PureComponent<IProps> {
  render() {
    const { id_user, id_portfolio, title, description, avatar } = this.props;

    return (
      <>
        <div className="my-headerTitlePortfolio">
          <div className="col-12 col-md-10 row">
            <div className="col-12 col-md-2 portfolioHeader">
              <img
                alt="portfolio header"
                src={
                  avatar
                    ? `${API_URL}/multimedia/user_${id_user}/portfolios/portfolio${id_portfolio}/${avatar}`
                    : `${LOCAL_URL}/images/ico_logo40x40.jpg`
                }
                className="m-0 p-0 rounded float-left"
                style={{ width: "120px", height: "120px" }}
              />
            </div>
            <div className="col-12  col-md-10">
              <div className="float-left text-left">
                <div className="info-img-description ">
                  <h3 className="text-capitalize">{title}</h3>
                </div>

                <div className="">{description}</div>
              </div>
            </div>
          </div>

          <div className=" text-secondary float-right">
            <i className="" style={{ fontSize: "18px", color: "#f36" }}>
              Views Aqui...
            </i>
            {" | "}
            <i
              className=""
              style={{ fontSize: "18px", color: "#f36", cursor: "pointer" }}
            >
              Likes aqui...
            </i>
          </div>

          <hr className="m-0 p-0 mt-5" />
        </div>
      </>
    );
  }
}

export default HeaderP;
