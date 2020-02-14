import React from "react";
import { myFetch } from "../../utils";
import Swal from "sweetalert2";

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

    /* eventos de confirmación del formulario */
    this.checkForm = this.checkForm.bind(this);
    this.ejecutarFetch = this.ejecutarFetch.bind(this);
  }
  onNameChange(event: any) {
    const name = event.target.value;
    this.setState({ name, error_name: "" });
  }
  onPasswordChange(e: any) {
    const password = e.target.value;
    this.setState({ password, error_pssw: "" });
  }
  onEmailChange(e: any) {
    const email = e.target.value;
    this.setState({ email, error_email: "" });
  }

  onPassword_validationChange(e: any) {
    const password_validation = e.target.value;
    this.setState({ password_validation });
    this.setState({ password_validation, error_pssw: "" });
  }

  async register() {
    try {
      this.checkForm();
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  }

  checkForm() {
    const { password, password_validation } = this.state;
    /* Password validation  */
    if (password !== password_validation) {
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
        obj: { name, password: `sha1('${password}')`, email }
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
  /* Ni puta idea de validar o mneter RegExp */
  /*
  checkEmail(email : string){
    const emailParsed = email.toLowerCase();

      // Validacion caracteres especiales:  
      // REGEX PARA NOMBRES: ^[a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+){0,20}$

      // REGEX PARA CORREOS: ^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$  
  }
  */
  /*
  checkName(){
    // Validacion caracteres especiales:  
    // REGEX PARA NOMBRES: ^[a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+){0,20}$

    // REGEX PARA CORREOS: ^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$  
}
*/
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
        className="container background-register animated fadeIn "
        style={{ position: "absolute", minWidth: "100%", zIndex: 4 }}
      >
        <div className="modal-dialog modal-dialog-centered animated  bounceInLeft">
          <div className="modal-content container">
            <div className="row"></div>
            <div className="modal-header mt-3 mb-3">
              <h5
                className="modal-title text-center"
                id="exampleModalCenterTitle"
              >
                <img src="images/ico_logo100x75.jpg" alt="proyect_bootcamps" />
                <br />
                Registro proyect_bootcamp
              </h5>
            </div>
            <div className="modal-body mt-3 mb-3">
              <div className="field">
                <label htmlFor="name" className="label">
                  Username
                </label>
                <div className="control">
                  <input
                    type="text"
                    name="name"
                    className="input col-12"
                    value={name}
                    onChange={this.onNameChange}
                  />
                  {error_name}
                </div>
              </div>
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
                  {error_email}
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
                  {error_pssw ? <p className="error">{error_pssw}</p> : ""}
                </div>
              </div>
              <div className="field">
                <label htmlFor="password_validation" className="label">
                  Repeat password
                </label>
                <div className="control">
                  <input
                    type="text"
                    name="password_validation"
                    className="input col-12"
                    onChange={this.onPassword_validationChange}
                    value={password_validation}
                  />
                  {error_pssw ? <p className="error">{error_pssw}</p> : ""}
                </div>
              </div>
            </div>
            <div className="modal-footer mt-3 mb-3">
              <button
                type="button"
                className="btn btn-primary is-link"
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
