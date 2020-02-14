import React from "react";
import { myFetch } from "src/utils";
import { IPorfolioCard_explore } from "src/interface/IPorfolio";
import ECard from "./components/exploreCard";

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
      console.log(json);
    });
  }

  render() {
    const { cardsFromDDBB } = this.state;
    return (
      <div className="container-fluid">
        <div className="row pl-4 pr-4+">
          {cardsFromDDBB.map((cardData: IPorfolioCard_explore) => {
            return <ECard cardData={cardData} />;
          })}
        </div>
      </div>
    );
  }
}

export default explore;
