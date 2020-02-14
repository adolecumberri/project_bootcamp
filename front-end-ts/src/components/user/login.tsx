import React from "react";

/*-------------------------------------- Import de redux: ----------------------------*/
import { connect } from "react-redux";
/* Acciones que voy a usar con la Store de Redux */
import { SetAccountAction } from "../../redux/actions";
/* Interfaz de tipos de datos acumulados */
import { IAccount } from "../../interface/IAccount";
import { myFetch, generateAccountFromToken, myLocalStorage } from "src/utils";

interface IProps {}

interface IGlobalActionProps {
  setAccount(account: IAccount): void;
}

type TProps = IProps & IGlobalActionProps;

interface IState {
  email: string;
  password: string;
  error: string;
}

class login extends React.PureComponent<TProps, IState> {
  constructor(props: TProps) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: ""
    };

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.login = this.login.bind(this);
  }

  onEmailChange(e: any) {
    const email = e.target.value;
    this.setState({ email });
  }

  onPasswordChange(e: any) {
    const password = e.target.value;
    this.setState({ password });
  }

  login() {
    const { setAccount } = this.props;
    const { email, password } = this.state;

    myFetch({
      path: "/user/login",
      method: "POST",
      obj: { email, password: `sha1('${password}')` }
    }).then(token => {
      console.log(token);
      if (token) {
        myLocalStorage("coworkin_token", token);
        const account = generateAccountFromToken(token);
        setAccount(account);
      } else {
        this.setState({ error: "Credenciales inválidas " });
      }
    });
  }

  render() {
    const { email, password } = this.state;

    return (
      <div
        className="container background-login animated fadeIn slow "
        style={{ position: "absolute", minWidth: "100%", zIndex: 4 }}
      >
        <div
          className="modal-dialog modal-dialog-centered animated  bounceInRight"
          role="document"
        >
          <div className="modal-content">
            <div className="row"></div>
            <div className="modal-header mt-3 mb-3">
              <h5
                className="modal-title text-center"
                id="exampleModalCenterTitle"
              >
                <img src="images/ico_logo100x75.jpg" alt="proyect_bootcamp" />
                <br />
                Registro proyect_bootcamp
              </h5>
            </div>

            <div className="modal-body mt-3 mb-3">
              <div className="field">
                <label htmlFor="email" className="label">
                  Email
                </label>
                <div className="control">
                  <input
                    type="text"
                    name="email"
                    className="input col-12"
                    onChange={this.onEmailChange}
                    value={email}
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="password" className="label">
                  Password
                </label>
                <div className="control">
                  <input
                    type="text"
                    name="password"
                    className="input col-12"
                    onChange={this.onPasswordChange}
                    value={password}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary is-link"
                disabled={email.length === 0 || password.length === 0}
                onClick={this.login}
              >
                Login
              </button>
              {this.state.error}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps: IGlobalActionProps = {
  setAccount: SetAccountAction
};

export default connect(null, mapDispatchToProps)(login);
