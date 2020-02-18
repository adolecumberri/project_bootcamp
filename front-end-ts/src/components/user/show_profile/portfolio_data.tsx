import React from "react";
import { IPortfolioCard } from "src/interface/IPorfolio";
import { API_URL } from "src/constants";
import { Link } from "react-router-dom";

interface IProps {
  id_user: number;
  portfolios: IPortfolioCard[];
}

interface IState {}

class PortfolioData extends React.PureComponent<IProps> {
  render() {
    const { portfolios, id_user } = this.props;
    return (
      <div className="row mt-3 ">
        {portfolios.map((portfolio, i) => {
          return (
            <div key={i} className="col-2  d-flex align-items-center">
              <Link to={"/portfolio/" + portfolio.id}>
                <img
                  className="rounded my-2"
                  alt={portfolio.avatar}
                  src={`${API_URL}/multimedia/user_${id_user}/portfolios/portfolio${portfolio.id}/${portfolio.avatar}`}
                  style={{
                    maxHeight: "200px",
                    maxWidth: "200px",
                    width: "100%"
                  }}
                />
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}

export default PortfolioData;
