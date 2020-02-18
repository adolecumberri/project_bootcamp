import React from "react";
import { myFetch } from "src/utils";
import { IPorfolioCard_explore } from "src/interface/IPorfolio";
import ECard from "./components/exploreCard";

//css
import "./css/index_explore.css";

interface IProps {}
interface IState {
  cardsFromDDBB: IPorfolioCard_explore[];
}

class explore extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      cardsFromDDBB: []
    };
  }

  componentDidMount() {
    myFetch({
      path: `/portfolio/random`,
      method: "POST"
    }).then((json: IPorfolioCard_explore[]) => {
      this.setState({ cardsFromDDBB: json });
    });
  }

  render() {
    const { cardsFromDDBB } = this.state;
    return (
      <div className="my-containerFluid">
        <div className="my-rowExplore">
          {cardsFromDDBB.map(
            (cardData: IPorfolioCard_explore, index: number) => {
              return <ECard key={index} cardData={cardData} />;
            }
          )}
        </div>
      </div>
    );
  }
}

export default explore;
