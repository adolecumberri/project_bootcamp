import React from "react";
import { myFetch } from "../../utils";
import Swal from "sweetalert2";

//regex
import { userRegex, emailRegex, psswRegex } from "src/regex";

//css
import "./css/login_register.css";

/* ----------------------------Propiedades Del Componente + de la Store------------------------------- */
interface IProps {
  registered: any;
}

interface IState {
  email: string;
  name: string;
  password: string;
  password_validation: string;
  error_pssw: string | boolean;
  error_name: string | boolean;
  error_email: string | boolean;
}

class register extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      email: "",
      name: "",
      password: "",
      password_validation: "",
      error_pssw: "",
      error_name: "",
      error_email: ""
    };

    /* Funciones establecidas en el register. */
    this.register = this.register.bind(this);
    /* eventos de escritura del formulario */
    this.onNameChange = this.onNameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPassword_validationChange = this.onPassword_validationChange.bind(
      this
    );
    /* Eventos blur */
    this.onNameBlur = this.onNameBlur.bind(this);
    this.onEmailBlur = this.onEmailBlur.bind(this);
    this.onPasswordBlur = this.onPasswordBlur.bind(this);

    /* eventos de confirmación del formulario */
    this.checkForm = this.checkForm.bind(this);
    this.ejecutarFetch = this.ejecutarFetch.bind(this);
  }
  onNameChange(e: any) {
    if (e.target.value.length <= 25) {
      const name = e.target.value.toLowerCase();
      this.setState({ name, error_name: "" });
    }
  }

  onPasswordChange(e: any) {
    if (e.target.value.length <= 25) {
      const password = e.target.value.toLowerCase();
      this.setState({ password, error_pssw: "" });
    }
  }
  onEmailChange(e: any) {
    if (e.target.value.length <= 45) {
      const email = e.target.value.toLowerCase();
      this.setState({ email, error_email: "" });
    }
  }
  onPassword_validationChange(e: any) {
    if (e.target.value.length <= 25) {
      const password_validation = e.target.value.toLowerCase();
      this.setState({ password_validation });
      this.setState({ password_validation, error_pssw: "" });
    }
  }

  onNameBlur(e: any) {
    if (!userRegex.test(e.target.value.toLowerCase())) {
      this.setState({
        error_name: "Username should contain numbers, letters or both"
      });
    }
  }
  onEmailBlur(e: any) {
    if (!emailRegex.test(e.target.value.toLowerCase())) {
      this.setState({
        error_email: "Wron Email format"
      });
    }
  }
  onPasswordBlur(e: any) {
    if (!psswRegex.test(e.target.value.toLowerCase())) {
      this.setState({
        error_pssw: "Password needs at least 8 alphanumeric Characters"
      });
    }
  }

  async register() {
    this.checkForm();
  }

  checkForm() {
    const { password, password_validation } = this.state;
    /* Password validation  */
    if (password.toLowerCase() !== password_validation.toLowerCase()) {
      this.setState({ error_pssw: "Passwords dont match" });
    } else {
      this.ejecutarFetch();
    }
  }

  ejecutarFetch() {
    const {
      error_pssw,
      error_email,
      error_name,
      name,
      password,
      email
    } = this.state;
    if (error_pssw === "" && error_email === "" && error_name === "") {
      myFetch({
        path: "/user",
        method: "POST",
        obj: {
          name: name.toLowerCase(),
          password: `sha1('${password.toLowerCase()}')`,
          email: email.toLowerCase()
        }
      }).then(res => {
        //si resp es null, falla el insert porque el name ya existe
        if (res == null) {
          this.setState({ error_name: "User already registered " });
        } else {
          Swal.fire({
            icon: "success",
            title: "Usuario Registrado!",
            focusConfirm: false,
            confirmButtonText: "Great!"
          });
          this.props.registered();
        }
      });
    }
  }

  render() {
    /* variables con las que trabajo en el formulario */
    const {
      email,
      name,
      password,
      password_validation,
      error_pssw,
      error_email,
      error_name
    } = this.state;
    return (
      <div
        className="container background-register animated fadeIn notSelected"
        style={{ position: "absolute", minWidth: "100%", zIndex: 4 }}
      >
        <div className="modal-dialog modal-dialog-centered animated  bounceInLeft">
          <div className="modal-content container">
            <div className="row"></div>
            <div className="modal-header mt-3 mb-3 d-flex justify-content-center">
              <h5
                className="modal-title text-center"
                id="exampleModalCenterTitle"
              >
                <img
                  src={require("../../images/ico_logo100x75.jpg")}
                  alt="proyect_bootcamps"
                />
                <br />
                Project Register
              </h5>
            </div>
            <div className="modal-body mt-3 mb-3">
              <div className="field">
                <div className="control">
                  <input
                    type="text"
                    name="name"
                    className="input col-12"
                    value={name}
                    onChange={this.onNameChange}
                    onBlur={this.onNameBlur}
                  />

                  {error_name ? (
                    <span className="error"> {error_name}</span>
                  ) : (
                    <label htmlFor="name" className="label">
                      Username
                    </label>
                  )}
                </div>
              </div>
              <div className="field">
                <input
                  type="text"
                  name="email"
                  className="input col-12"
                  onChange={this.onEmailChange}
                  onBlur={this.onEmailBlur}
                  value={email}
                />
                {error_email ? (
                  <span className="error"> {error_email}</span>
                ) : (
                  <label htmlFor="email" className="label">
                    Email
                  </label>
                )}
              </div>

              <div className="control"></div>
              <div className="field">
                <div className="control">
                  <input
                    type="text"
                    name="password"
                    className="input col-12"
                    onChange={this.onPasswordChange}
                    onBlur={this.onPasswordBlur}
                    value={password}
                  />
                  {error_pssw ? (
                    <p className="error">{error_pssw}</p>
                  ) : (
                    <label htmlFor="password" className="label">
                      Password
                    </label>
                  )}
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <input
                    type="text"
                    name="password_validation"
                    className="input col-12"
                    onChange={this.onPassword_validationChange}
                    value={password_validation}
                  />
                  {error_pssw ? (
                    <p className="error">{error_pssw}</p>
                  ) : (
                    <label htmlFor="password_validation" className="label">
                      Repeat password
                    </label>
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer mt-3 mb-3">
              <button
                type="button"
                className="my-input is-link"
                disabled={name.length === 0 || password.length === 0}
                onClick={this.register}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
/* Declarar el mapDispatchToProps de Redux 
Usado expresamente para ejecutar acciones que cambian la store
*/

export default register;
