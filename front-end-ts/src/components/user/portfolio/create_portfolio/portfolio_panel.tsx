import React from "react";
import { Link, Route } from "react-router-dom";
import { myFetch } from "src/utils";
import { IPortfolioCard } from "src/interface/IPorfolio";
import PortfolioCard from "../cards/portfolio_panel_card";

interface IProps {
  id_user: number | undefined;
}

interface IState {
  portfolios_preview: IPortfolioCard[];
}

class PortfolioPanel extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      portfolios_preview: []
    };
  }

  componentDidMount() {
    setTimeout(() => {
      myFetch({
        path: `/portfolio/user/${this.props.id_user}`,
        method: "GET"
      }).then((json: IPortfolioCard[]) => {
        this.setState({ portfolios_preview: json });
      });
    }, 100); //Si espero 0,1 sec, no me llega undefined el id_user
  }

  render() {
    const { portfolios_preview } = this.state;
    console.log();
    return (
      <>
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6" style={{ backgroundColor: "#f1f1f1" }}>
            <div className="row mt-5 p-0  text-center">
              <Link
                to="/user/portfolio/newPortfolio"
                className="col-12  rounded m-auto text-center "
                style={{ color: "inherit" }}
              >
                <div
                  className="text-center  m-auto p-4"
                  style={{ border: "1px solid black" }}
                >
                  <span className="">&#10010;</span>
                  <br />
                  CREAR NUEVA CARPETA DE PROYECTO
                  <div style={{ color: "#ccc" }}> Proyectos</div>
                </div>
              </Link>
            </div>
            {/* Proyectos */}
            <div className="row">
              {portfolios_preview.map(
                (cardData: IPortfolioCard, index: number) => {
                  return (
                    <PortfolioCard
                      key={index}
                      id_user={this.props?.id_user}
                      portfolio={cardData}
                    />
                  );
                }
              )}
            </div>
          </div>
          <div className="col-3"></div>
        </div>
      </>
    );
  }
}

export default PortfolioPanel;
