import React from "react";
import HeaderP from "./header";
import BodyP from "./body";
import UserInfo from "./userInfo";
import MoreP from "./more_portfolios";
import { IStore } from "src/interface/IStore";
import { connect } from "react-redux";
import { IAccount } from "src/interface/IAccount";
import { myFetch } from "src/utils";
import { IPortfolioCard } from "src/interface/IPorfolio";
import { IFile } from "src/interface/IFile";
import { IUserCard } from "src/interface/IUser";

interface IProps {}

interface IGlobalStateProps {
  account: IAccount | null;
}

type TProps = IGlobalStateProps & IProps;

interface IState {
  portfolioHeader: IPortfolioCard;
  portfolio_file: IFile;
  user: IUserCard;
}

class ShowPortfolio extends React.PureComponent<TProps, IState> {
  constructor(props: TProps) {
    super(props);

    this.state = {
      portfolioHeader: {
        id: 0,
        avatar: "",
        title: "",
        likes: 0,
        views: 0,
        active: 0,
        visible: 0
      },
      portfolio_file: {
        id: 0,
        name: "",
        id_type: 0,
        id_project: null,
        id_portfolio: null,
        puntos: 0,
        views: 0,
        claps: 0,
        visible: 1,
        active: 1
      },
      user: {
        id: 0,
        name: "",
        avatar: "",
        header: "",
        country: "",
        state: ""
      }
    };
    this.updatePage = this.updatePage.bind(this);
  }
  updatePage() {
    console.log("Component Update ");
    let url = window.location.href;
    let id_portfolio = url.substring(url.lastIndexOf("/") + 1);

    myFetch({
      path: `/portfolio/header/${id_portfolio}`,
      method: "POST"
    }).then(json => {
      /* el estado que le paso a la cabecera */
      this.setState({ portfolioHeader: { ...json } });
      //coger ID_User Respecto al portafolio.
      myFetch({
        path: `/user/portfolio/${id_portfolio}`,
        method: "POST"
      }).then((user: any) => this.setState({ user: user }));

      /* conseguir los archivos para el body */
      setTimeout(() => {
        myFetch({
          path: `/file/${id_portfolio}`,
          method: "GET"
        }).then((json: IFile) => {
          this.setState({ portfolio_file: { ...json } });
        });
      }, 50);
    });
  }

  componentDidMount() {
    console.log("Component did mount ");
    let url = window.location.href;
    let id_portfolio = url.substring(url.lastIndexOf("/") + 1);

    myFetch({
      path: `/portfolio/header/${id_portfolio}`,
      method: "POST"
    }).then(json => {
      /* el estado que le paso a la cabecera */
      this.setState({ portfolioHeader: { ...json } });
      // coger ID_User Respecto al portafolio.
      myFetch({
        path: `/user/portfolio/${id_portfolio}`,
        method: "POST"
      }).then((user: any) => this.setState({ user: user }));

      /* conseguir los archivos para el body */
      setTimeout(() => {
        myFetch({
          path: `/file/${id_portfolio}`,
          method: "GET"
        }).then((json: IFile) => {
          this.setState({ portfolio_file: { ...json } });
        });
      }, 50);
    });
  }

  render() {
    let url = window.location.href;
    let id_url = url.substring(url.lastIndexOf("/") + 1);
    const { portfolio_file, user } = this.state;

    const {
      id: id_portfolio,
      title,
      description,
      avatar
    } = this.state.portfolioHeader;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-9 ml-5">
            <div className="row">
              <div className="col-12">
                <HeaderP
                  id_user={(user.id as unknown) as string}
                  id_portfolio={(id_portfolio as unknown) as string}
                  title={title}
                  description={description as string}
                  avatar={avatar as string}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <BodyP
                  id_user={user.id as number}
                  portfolio_file={portfolio_file}
                />
              </div>
            </div>
          </div>
          <div className="col-2 ">
            <div className="row">
              <div className="col-12">
                <UserInfo
                  avatar={user.avatar as string}
                  name={user.name as string}
                  id_user={(user.id as unknown) as string}
                  id_portfolio={(id_portfolio as unknown) as string}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <MoreP
                  id_user={(user.id as unknown) as string}
                  id_portfolio={(id_portfolio as unknown) as string}
                  updatePage={this.updatePage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ account }: IStore): IGlobalStateProps => ({
  account
});

export default connect(mapStateToProps)(ShowPortfolio);
