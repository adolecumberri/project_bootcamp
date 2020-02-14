import React from "react";
import { IPortfolioCard } from "src/interface/IPorfolio";
import { API_URL } from "src/constants";
import { Link } from "react-router-dom";

interface IProps {
  portfolio: IPortfolioCard;
  id_user: number | undefined;
}

interface IState {}

class MorePortfolioCard extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { id_user } = this.props;
    const { portfolio } = this.props;
    return (
      <>
        <div className="col-4 p-1">
          <div
            className="p-1 rounded"
            style={{
              border: "solid 1px #eee",
              backgroundColor: "#fff",
              boxShadow: "1px 1px 4px rgba(0,0,0,0.2)",
              maxHeight: "70px",
              maxWidth: "90px"
            }}
          >
            <div className="" style={{ backgroundColor: "#fff" }}>
              <Link to={`/portfolio/${portfolio.id}`}>
                <img
                  src={`${API_URL}/multimedia/user_${id_user}/portfolios/portfolio${portfolio.id}/${portfolio.avatar}`}
                  alt="Avatar"
                  className="image"
                  style={{
                    borderRadius: "5px 5px 0px 0px",
                    maxWidth: "100%",
                    maxHeight: "100%"
                  }}
                />
                {/* <i className="" aria-hidden="true"></i> Mostrar cuando hover*/}
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default MorePortfolioCard;
