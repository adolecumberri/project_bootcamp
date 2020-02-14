import React from "react";
import "./assets/App.css";
import { generateAccountFromToken } from "./utils";
import { BrowserRouter, Switch, Route } from "react-router-dom";

/* IMPORT DE COMPONENTES  */
/* Redux interfaces/actions */
import { connect } from "react-redux";
import { SetAccountAction } from "./redux/actions";
import { IStore } from "./interface/IStore";
import { IAccount } from "./interface/IAccount";

/* Main Pages */
import main from "./components/main/index_main";
import explore from "./components/explore/index_explore";
import developers from "./components/developers/index_developers";
import enterprises from "./components/enterprise/index_enterprise";
import contact_us from "./components/contact_us/index_contact_us";

/* Navbars */
import NavbarLogged from "./components/navbarLogged";
import NavbarUnlogged from "./components/navbarUnlogged";

/* User Section */
import UserUpdate from "./components/user/update_user_index";

/*  porfolio Section */
import ShowPortfolio from "./components/user/portfolio/show_portfolio/index";
import UserProfile from "./components/user/user_profile_index";
import PortfolioPanel from "./components/user/portfolio/create_portfolio/portfolio_panel";

/* Admin Stuff */
import UserAdmin from "./components/admin/userAdmin";
import NewPortfolio from "./components/user/portfolio/create_portfolio/new_portfolio";

/* css */
import "./css/app.css";

interface IGlobalStateProps {
  account: IAccount | null;
}

interface IGlobalActionProps {
  setAccount(account: IAccount): void;
}

type TProps = IGlobalStateProps & IGlobalActionProps;

class App extends React.PureComponent<TProps> {
  componentDidMount() {
    const { setAccount } = this.props;
    const token = localStorage.getItem("coworkin_token");
    if (token) {
      const { value } = JSON.parse(token); //el token tiene value Y expiry.
      setAccount(generateAccountFromToken(value));
    }
  }

  render() {
    const { account } = this.props;
    return (
      <div className="app">
        <BrowserRouter>
          {!account && <NavbarUnlogged />}
          {account && <NavbarLogged />}
          <Switch>
            <Route path="/" exact component={main} />
            <Route path="/main" exact component={main} />
            <Route path="/contact_us" exact component={contact_us} />
            <Route path="/developers" exact component={developers} />
            <Route path="/enterprises" exact component={enterprises} />
            <Route path="/explore" exact component={explore} />
            <Route path="/admin/user" component={UserAdmin} />
            <Route path="/portfolio/:id_portfolio" component={ShowPortfolio} />
            <Route path="/content_creator/:id">
              <UserProfile />
            </Route>
            <Route exact path="/user/portfolio">
              <PortfolioPanel id_user={account?.id}></PortfolioPanel>
            </Route>
            <Route
              path="/user/portfolio/newPortfolio"
              component={NewPortfolio}
            />

            <Route path="/user/profile" component={UserUpdate} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = ({ account }: IStore): IGlobalStateProps => ({
  account
});

const mapDispatchToProps: IGlobalActionProps = {
  setAccount: SetAccountAction
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
