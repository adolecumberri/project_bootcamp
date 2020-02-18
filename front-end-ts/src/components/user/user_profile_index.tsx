import React from "react";

/* Componentes del portfolio */
import PortfolioUserData from "./show_profile/portfolio_user_data";
import Header from "./show_profile/header";
import PortfolioData from "./show_profile/portfolio_data";
import { myFetch } from "src/utils";
import { IUser } from "src/interface/IUser";
import { IPortfolioCard } from "src/interface/IPorfolio";
import { IportfolioUser } from "src/interface/IProfile";

interface IProps {}

interface IState {
  user: IUser;
  numPorfolios: number;
  portfolios_from_index: IPortfolioCard[];
  user_profile: IportfolioUser[] | undefined;
}

class UserProfile extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      user: {
        id: 0,
        email: "",
        name: "",
        age: "",
        gender: "",
        country: "",
        state: "",
        header: "",
        avatar: "",
        feature: "",
        cv_photo: "",
        cv_studies: "",
        cv_works: "",
        cv_experience: "",
        job_desired: false,
        colaboration_desired: false,
        likes: 0,
        seen: 0,
        isDeveloper: false,
        outstanding: false,
        ip: "",
        last_visit: "",
        active: 1
      },
      numPorfolios: 0,
      portfolios_from_index: [],
      user_profile: undefined
    };
  }

  componentDidMount() {
    let url = window.location.href;
    let id_portfolio = url.substring(url.lastIndexOf("/") + 1);
    /** GET USER BY ID */
    myFetch({
      path: `/user/${id_portfolio}`,
      method: "GET"
    }).then(json => {
      this.setState({ user: { ...json } });

      /* Get num of portfolios */
      myFetch({
        path: `/portfolio/count/${json.id}`,
        method: "POST"
      }).then((result: any) => {
        this.setState({ numPorfolios: result.num });
      });

      /* Cargar los portfolios */
      myFetch({
        path: `/portfolio/user/${json.id}`,
        method: "GET"
      }).then(porfolios => {
        this.setState({ portfolios_from_index: porfolios });
      });

      setTimeout(() => {
        myFetch({
          path: `/profile/user/${json.id}`,
          method: "POST"
        }).then((profiles: any) => {
          this.setState({
            user_profile: profiles
          });
        });
      }, 200);
    });
  }

  render() {
    const { id, header, avatar, name } = this.state.user;
    const { user_profile, portfolios_from_index } = this.state;

    return (
      <div>
        <Header
          id_user={id}
          header={header}
          avatar={avatar}
          name={name}
          numPorfolios={this.state.numPorfolios}
        />
        <div className="container-fluid px-0">
          <div
            className="row justify-content-around "
            style={{ width: "100%" }}
          >
            <div className="col-9 ">
              <PortfolioData id_user={id} portfolios={portfolios_from_index} />
            </div>
            <div className="col-2">
              <PortfolioUserData
                user={this.state.user}
                user_profile={(user_profile as unknown) as IportfolioUser}
              ></PortfolioUserData>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/* algo que recibo */
// const mapStateToProps = ({ account }: IStore): IGlobalStateProps => ({
//   account
// });

// export default connect(mapStateToProps)(portfolio);

export default UserProfile;
