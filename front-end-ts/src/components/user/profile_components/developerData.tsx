import React from "react";
import { myFetch, myLocalStorage } from "../../../utils";
import { connect } from "react-redux";

import { IDevInformation } from "../../../interface/IUser";
import { IAccount } from "../../../interface/IAccount.js";
import { IStore } from "../../../interface/IStore";
import { SetAccountAction } from "src/redux/actions";
import { decode } from "jsonwebtoken";

import { userRegex, cityRegex } from "src/regex";

interface IGlobalStateProps {
  account: IAccount | null;
}

interface IGlobalActionProps {
  setAccount(account: IAccount): void;
}

interface IProps {
  countries: {
    name: string;
    code: string;
  }[];
}

interface IState {
  error_name: string | boolean;
  error_city: string | boolean;
  error_email: string | boolean;

  user: IDevInformation;
}

type TProps = IGlobalStateProps & IProps & IGlobalActionProps;

class DeveloperData extends React.PureComponent<TProps, IState> {
  constructor(props: TProps) {
    super(props);
    this.state = {
      user: {
        name: "",
        gender: "",
        age: {
          day: "",
          month: "",
          year: ""
        },
        country: "",
        state: ""
      },
      error_city: false,
      error_email: false,
      error_name: false
    };

    this.checkDay = this.checkDay.bind(this);
    this.checkMonth = this.checkMonth.bind(this);
    this.checkYear = this.checkYear.bind(this);
    this.selectEvent = this.selectEvent.bind(this);

    this.updateUserFromInput = this.updateUserFromInput.bind(this);
    this.updateUserFromSelect = this.updateUserFromSelect.bind(this);
    this.UpdateUserBirth = this.UpdateUserBirth.bind(this);

    this.checkCityInput = this.checkCityInput.bind(this);
    this.checkUserInput = this.checkUserInput.bind(this);
  }

  checkDay(e: { target: { value: any } }) {
    let {
      target: { value }
    } = e;
    let newUser = this.state.user;
    if (parseInt(value) <= 31 || !parseInt(value)) {
      newUser.age.day = value;
      this.setState({ user: { ...newUser } });
    }

    if (value.length === 2) {
      document.getElementById("month-input")?.focus();
    }
    /* Esto puede fallar porque aunque no se actualice el estado,
    puede que el valor del imput se almacene */
  }

  checkMonth(e: { target: { value: any } }) {
    let {
      target: { value }
    } = e;
    let newUser = this.state.user;
    if (parseInt(value) <= 12 || !parseInt(value)) {
      newUser.age.month = value;
      this.setState({ user: { ...newUser } });
    }

    if (value.length === 2) {
      document.getElementById("year-input")?.focus();
    }
  }

  checkYear(e: { target: { value: any }; type: any }) {
    let {
      target: { value }
    } = e;
    let newUser = { ...this.state.user };

    if (parseInt(value) <= new Date().getFullYear() || !parseInt(value)) {
      if (
        value.length === "4" &&
        parseInt(value) <= 1950 &&
        e.type === "blur"
      ) {
        newUser.age.year = "1970";
        this.setState({ user: { ...newUser } });
      } else {
        newUser.age.year = value;
        this.setState({ user: { ...newUser } });
      }
    } else {
      newUser.age.year = "" + new Date().getFullYear();
      this.setState({ user: { ...newUser } });
    }
    if (value.length === 4) {
      document.getElementById("country")?.focus();
    }
  }

  selectEvent(e: any) {
    let select = e.target;

    if (e.type === "mousedown") {
      select.size = 8;
    } else {
      if (e.type === "blur") {
        select.size = 0;
      } else {
        select.size = 0;
      }
    }
    if (select.selectedOptions) {
      let newUser = this.state.user;
      newUser.country = select.selectedOptions[0].value;
      this.setState({ user: { ...newUser } });
    }
  }

  checkUserInput(e: any) {
    if (!userRegex.test(e.target.value)) {
      this.setState({
        error_name: "Username should contain numbers, letters or both"
      });
    } else {
      this.setState({ error_name: "" });
      this.updateUserFromInput("name", e.target.value);
    }
  }

  checkCityInput(e: any) {
    if (!cityRegex.test(e.target.value)) {
      this.setState({
        error_city: "City should just have letters"
      });
    } else {
      this.setState({ error_city: "" });
      this.updateUserFromInput("city", e.target.value);
    }
  }

  updateUserFromInput(name: string, value: string) {
    let { account } = this.props;
    let obj: any = {};

    if (value.length >= 3) {
      if (name === "name") {
        obj = { name: value.toLowerCase() };
      } else {
        obj = { state: value.toLowerCase() };
      }

      myFetch({
        path: `/user/${account?.id}`,
        method: "PUT",
        obj: obj
      }).then(res => {
        //si resp es null, falla el insert porque el name ya existe
        if (!res && name === "name") {
          this.setState({ error_name: true });
        } else {
          this.setState({ error_name: false });
          //TODO: cambiar por funcion de actualizar TOKEN/REDUX
          /* ACTUALIZACION DE REDUX Y EL TOKEN */
          /* Actualizacion del token tras el update */
          let token = localStorage.getItem("coworkin_token");
          // El token trae expire & value. Value es el token como tal.
          // lo convierto en objeto y saco el value.
          let newToken = token ? JSON.parse(token).value : null;
          if (typeof newToken == "string") newToken = decode(newToken);
          // decodifico newToken en un objeto
          if (name === "name") {
            newToken.name = value.toLowerCase();
          } else {
            newToken.state = value.toLowerCase();
          }
          myLocalStorage("coworkin_token", newToken);
          this.props.setAccount(newToken);
        }
      });
    }
  }

  updateUserFromSelect(e: { target: HTMLSelectElement }) {
    let { account } = this.props;
    let { name, selectedOptions } = e.target;
    let obj: any = {};
    if (name === "gender") {
      obj = { gender: selectedOptions[0].value };
    } else {
      obj = { country: selectedOptions[0].value };
    }
    try {
      myFetch({
        path: `/user/${account?.id}`,
        method: "PUT",
        obj: obj
      });
    } catch (err) {
      console.log(err);
    }
  }

  UpdateUserBirth() {
    setTimeout(() => {
      let {
        user: {
          age: { day, month, year }
        }
      } = this.state;
      let { account } = this.props;

      if (day !== "" || month !== "" || year !== "") {
        let obj: any = {};
        obj = {
          age: `STR_TO_DATE(CONCAT('${year}','-',LPAD('${month}',2,'00'),'-',LPAD('${day}',2,'00')), '%Y-%m-%d')`
        };
        myFetch({
          path: `/user/${account?.id}`,
          method: "PUT",
          obj: obj
        });
      }
    }, 1000);
  }

  componentDidMount() {
    setTimeout(() => {
      let { account } = this.props;
      myFetch({
        path: `/user/dev_info`,
        method: "POST",
        obj: { id: account?.id }
      }).then((json: IDevInformation | null) => {
        if (json) {
          this.setState({ user: { ...json } });
        }
      });
    }, 1);
  }

  render() {
    const {
      user: {
        name,
        country,
        state,
        gender,
        age: { day, month, year }
      },
      error_name,
      error_city
    } = this.state;
    const { countries } = this.props;

    return (
      <>
        <div className="my-container">
          <div className="card text-center  mt-4">
            <div className="card-header">
              <h5 className="col-12 mt-1">Developer Information</h5>
            </div>

            <div className="card-body">
              <div className="row">
                <div className="form-group col-12 col-md-5">
                  {!error_name ? (
                    <label htmlFor="name">Username</label>
                  ) : (
                    <label htmlFor="name" style={{ color: "red" }}>
                      {error_name}
                    </label>
                  )}
                  <input
                    name="name"
                    type="text"
                    className="my-form-control my-input text-capitalize"
                    placeholder="Your username? ;)"
                    onBlur={this.checkUserInput}
                    defaultValue={`${name}`}
                  />
                </div>
                <div className="my-form-group col-6 col-md-3">
                  <label htmlFor="name">Gender</label>
                  <select
                    name="gender"
                    className="my-form-control my-input"
                    value={gender ? `${gender.toLowerCase()}` : "DEFAULT"}
                    onChange={e => {
                      let newUser = this.state.user;
                      newUser.gender = e.target.selectedOptions[0].value;
                      this.setState({ user: { ...newUser } });

                      this.updateUserFromSelect(e);
                    }}
                  >
                    <option value="DEFAULT" disabled>
                      Find yourst, able?{" "}
                    </option>
                    <option value="other">Other</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="my-form-group col-6 col-md-4">
                  <label>Date</label>
                  <div
                    className="my-form-control m-0 p-0 border-0"
                    style={{ textAlign: "left" }}
                  >
                    <input
                      id="day-input"
                      type="number"
                      className=" form-control col-4 float-left my-input my-numeric-input"
                      placeholder="DD"
                      value={day ? day : undefined}
                      onChange={this.checkDay}
                      onBlur={this.UpdateUserBirth}
                      min="1"
                      max="31"
                    />

                    <input
                      id="month-input"
                      type="number"
                      className=" form-control my-input  col-4 float-left"
                      placeholder="MM"
                      value={month}
                      onChange={this.checkMonth}
                      onBlur={this.UpdateUserBirth}
                      min="1"
                      max="12"
                    />
                    <input
                      id="year-input"
                      type="number"
                      className=" form-control my-input  col-4 float-left"
                      placeholder="YYYY"
                      value={year}
                      onChange={this.checkYear}
                      onBlur={e => {
                        this.checkYear(e);
                        this.UpdateUserBirth();
                      }}
                      min="1950"
                      max={new Date().getFullYear()}
                    />
                  </div>
                </div>
                <div className="my-form-group col-6 col-md-6">
                  <label htmlFor="country">Country</label>
                  <select
                    id="country"
                    name="country"
                    className="my-form-control my-input"
                    onMouseDown={this.selectEvent}
                    onChange={event => {
                      this.selectEvent(event);
                      this.updateUserFromSelect(event);
                    }}
                    onBlur={this.selectEvent}
                    style={{ maxWidth: "94%" }}
                    value={country ? country : "DEFAULT"}
                  >
                    <option
                      disabled
                      value="DEFAULT"
                      style={{ color: "#eaeaea" }}
                    >
                      Where do you come from?
                    </option>
                    {countries.map((country: any, index: number) => {
                      return (
                        <option key={index} value={country.code}>
                          {country.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="my-form-group col-6 col-md-6">
                  {error_city ? (
                    <label className="error">{error_city}</label>
                  ) : (
                    <label htmlFor="state">City</label>
                  )}

                  <input
                    name="state"
                    type="text"
                    className="my-form-control my-input "
                    placeholder=" City ? <---"
                    onBlur={this.checkCityInput}
                    defaultValue={state ? `${state}` : ""}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps: IGlobalActionProps = {
  setAccount: SetAccountAction
};

/* algo que recibo */
const mapStateToProps = ({ account }: IStore): IGlobalStateProps => ({
  account
});

export default connect(mapStateToProps, mapDispatchToProps)(DeveloperData);
