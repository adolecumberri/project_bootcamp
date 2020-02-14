import React from "react";
import { myFetch } from "src/utils";
import { IPortfolioCard } from "src/interface/IPorfolio";
import { IAccount } from "src/interface/IAccount";
import { API_URL } from "src/constants";

interface IProps {
  id_user: string;
  id_portfolio: string;
  title: string;
  description: string;
  avatar: string;
}

class HeaderP extends React.PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const { id_user, id_portfolio, title, description, avatar } = this.props;

    return (
      <>
        <div className="col-10 m-auto p-0 pt-5 pb-3">
          <div className="col-10 row">
            <div className="col-2">
              <img
                alt="portfolio header"
                src={`${API_URL}/multimedia/user_${id_user}/portfolios/portfolio${id_portfolio}/${avatar}`}
                className="m-0 p-0 rounded float-left"
                style={{ width: "120px", height: "120px" }}
              />
            </div>
            <div className="col-10">
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
