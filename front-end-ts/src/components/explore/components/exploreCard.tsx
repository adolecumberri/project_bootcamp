import React from "react";
import { IPorfolioCard_explore } from "src/interface/IPorfolio";
import { API_URL, LOCAL_URL } from "src/constants";
import { Link } from "react-router-dom";

interface IProps {
  cardData: IPorfolioCard_explore;
}

class ECard extends React.PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const {
      id_user,
      id_portfolio,
      header,
      avatar,
      likes,
      views
    } = this.props.cardData;
    return (
      <Link
        to={`/portfolio/${id_portfolio}`}
        className=" col-xl-3 col-md-6 col-sm-6 col-12 my-2 px-2"
      >
        <div
          className=" rounded px-2 border bg-white"
          style={{ width: "100%", height: "250px" }}
        >
          <div style={{ height: "200px", overflow: "hidden" }}>
            <img
              src={`${API_URL}/multimedia/user_${id_user}/portfolios/portfolio${id_portfolio}/${avatar}`}
              style={{ width: "100%" }}
              className="border rounded my-2"
            />
          </div>
          <p className="small pt-2">
            <img
              src={`${API_URL}/multimedia/user_${id_user}/portfolios/portfolio${id_portfolio}/body/${header}`}
              className="rounded"
              style={{ maxWidth: "35px", maxHeight: "35px" }}
            />
            <span className="float-right text-secondary" id="">
              <i
                className=" ml-4 "
                style={{ fontSize: "18px", cursor: "pointer" }}
              ></i>{" "}
              likes: {Math.floor(Math.random() * 99 + 1)}
            </span>
            <span className="float-right text-secondary" id="">
              <i
                className=" ml-4 mr-2"
                style={{ fontSize: "18px", cursor: "pointer" }}
              ></i>
              views: {Math.floor(Math.random() * 199 + 1)}
            </span>
          </p>
        </div>
      </Link>
    );
  }
}

export default ECard;
