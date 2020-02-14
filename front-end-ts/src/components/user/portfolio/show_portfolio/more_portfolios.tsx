import React from "react";
import { myFetch } from "src/utils";
import { IPortfolioCard } from "src/interface/IPorfolio";
import MorePortfolioCard from "../cards/more_porfolios_card";

interface IProps {
  id_user: string;
  id_portfolio: string;
  updatePage: any; //tipado de funcion que le pasa el padre
}
interface IState {
  portfolios_preview: IPortfolioCard[];
}
class MoreP extends React.PureComponent<IProps, IState> {
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
        console.log("json");
        console.log(json);
        this.setState({ portfolios_preview: json });
      });
    }, 200);
  }

  render() {
    const { portfolios_preview } = this.state;
    return (
      <>
        <div className="container ">
          <div className="row " onClick={this.props.updatePage}>
            {portfolios_preview.map(
              (cardData: IPortfolioCard, index: number) => {
                return (
                  <MorePortfolioCard
                    key={index}
                    id_user={(this.props?.id_user as unknown) as number}
                    portfolio={cardData}
                  />
                );
              }
            )}
          </div>
        </div>
      </>
    );
  }
}

export default MoreP;
