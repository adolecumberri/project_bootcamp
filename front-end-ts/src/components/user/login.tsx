import React from "react";
import { emailRegex, psswRegex } from "../../regex";
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
  errorEmail: string;
  errorPssw: string;
}

class login extends React.PureComponent<TProps, IState> {
  constructor(props: TProps) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: "",
      errorEmail: "",
      errorPssw: ""
    };

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onPasswordBlur = this.onPasswordBlur.bind(this);
    this.onEmailBlur = this.onEmailBlur.bind(this);
    this.login = this.login.bind(this);
  }

  onEmailChange(e: any) {
    if (e.target.value.length <= 45) {
      const email = e.target.value.toLowerCase();
      this.setState({ email: email, error: "" });
    }
  }

  onEmailBlur(e: any) {
    if (!emailRegex.test(e.target.value.toLowerCase())) {
      this.setState({
        errorEmail: "Wrong Email Format"
      });
    } else {
      this.setState({
        errorEmail: ""
      });
    }
  }

  onPasswordChange(e: any) {
    if (e.target.value.length <= 25) {
      const password = e.target.value.toLowerCase();
      this.setState({ password: password, error: "" });
    } else {
      this.setState({
        errorPssw: ""
      });
    }
  }
  onPasswordBlur(e: any) {
    if (!psswRegex.test(e.target.value.toLowerCase())) {
      this.setState({
        errorPssw: "Password needs at least 8 alphanumeric Characters"
      });
    }
  }

  login() {
    const { setAccount } = this.props;
    const { email, password } = this.state;

    if (
      psswRegex.test(password.toLowerCase()) &&
      emailRegex.test(email.toLowerCase())
    ) {
      myFetch({
        path: "/user/login",
        method: "POST",
        obj: {
          email: email.toLowerCase(),
          password: `sha1('${password.toLowerCase()}')`
        }
      }).then(token => {
        if (token) {
          myLocalStorage("coworkin_token", token);
          const account = generateAccountFromToken(token);
          setAccount(account);
        } else {
          this.setState({ error: "Wrong information " });
        }
      });
    }
  }

  render() {
    const { email, password, errorEmail, errorPssw } = this.state;

    return (
      <div
        className="container background-login animated fadeIn slow notSelected"
        style={{ position: "absolute", minWidth: "100%", zIndex: 4 }}
      >
        <div
          className="modal-dialog modal-dialog-centered animated  bounceInRight"
          role="document"
        >
          <div className="modal-content">
            <div className="row"></div>
            <div className="modal-header mt-3 mb-3 d-flex justify-content-center">
              <h5
                className="modal-title text-center"
                id="exampleModalCenterTitle"
              >
                <img
                  src={require("../../images/ico_logo100x75.jpg")}
                  alt="proyect_bootcamp"
                />
                <br />
                Login proyect_bootcamp
              </h5>
            </div>

            <div className="modal-body mt-3 mb-3">
              <div className="field">
                <div className="control">
                  <input
                    type="text"
                    name="email"
                    className="input col-12"
                    onChange={this.onEmailChange}
                    value={email}
                    onBlur={this.onEmailBlur}
                  />
                </div>
                <label htmlFor="email" className="label">
                  {errorEmail ? (
                    <span className="error">{errorEmail}</span>
                  ) : (
                    "Email"
                  )}
                </label>
              </div>

              <div className="field">
                <div className="control">
                  <input
                    type="text"
                    name="password"
                    className="input col-12"
                    onChange={this.onPasswordChange}
                    value={password}
                    onBlur={this.onPasswordBlur}
                  />
                </div>
                <label htmlFor="password" className="label">
                  {errorPssw ? (
                    <span className="error">{errorPssw}</span>
                  ) : (
                    "Password"
                  )}
                </label>
              </div>
            </div>
            <div className="modal-footer">
              {this.state.error ? (
                <span className="error"> {this.state.error}</span>
              ) : (
                ""
              )}
              <button
                type="button"
                className="my-input is-link"
                disabled={email.length === 0 || password.length === 0}
                onClick={this.login}
              >
                Login
              </button>
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
