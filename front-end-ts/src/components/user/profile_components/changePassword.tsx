import React from "react";
import { IAccount } from "src/interface/IAccount";
import { IStore } from "src/interface/IStore";
import { connect } from "react-redux";
import { myFetch } from "src/utils";
import { psswRegex } from "src/regex";

interface IGlobalStateProps {
  account: IAccount | null;
}

interface IState {
  error_old_pssw: string;
  error_new_pssw: string;
}

class ChangePassword extends React.PureComponent<IGlobalStateProps, IState> {
  newPsswRpt: React.RefObject<HTMLInputElement>;
  newPssw: React.RefObject<HTMLInputElement>;
  constructor(props: IGlobalStateProps) {
    super(props);

    this.state = {
      error_old_pssw: "",
      error_new_pssw: ""
    };
    this.newPsswRpt = React.createRef();
    this.newPssw = React.createRef();
    this.checkCurrentPassword = this.checkCurrentPassword.bind(this);
    this.changePssw = this.changePssw.bind(this);
    this.resetError_new_pssw = this.resetError_new_pssw.bind(this);
  }

  checkCurrentPassword(e: any) {
    const id = this.props.account?.id;
    const old_pssw = e.target.value;
    //  ""
    if (psswRegex.test(e.target.value)) {
      myFetch({
        path: `/user/check_password`,
        method: "POST",
        obj: { old_pssw: old_pssw, id_user: id }
      }).then(json => {
        if (!json.name) {
          this.setState({ error_old_pssw: "Wrong Password" });
        }
      });
    } else {
      this.setState({
        error_old_pssw: "Password needs at least 8 alphanumeric Characters"
      });
    }
  }

  changePssw() {
    let np = this?.newPsswRpt?.current?.value;
    let npr = this?.newPssw?.current?.value;
    let id = this.props.account?.id;
    if (np !== "" && npr !== "") {
      if (psswRegex.test(np as string) && psswRegex.test(npr as string)) {
        if (np === npr || this.state.error_old_pssw !== "") {
          myFetch({
            path: `/user/${id}`,
            method: "PUT",
            obj: { password: `sha1('${np}')` }
          });
        } else {
          if (this.state.error_old_pssw !== "") {
            this.setState({ error_new_pssw: "Current password Missing" });
          } else {
            this.setState({ error_new_pssw: "Passwords should match" });
          }
        }
      } else {
        this.setState({
          error_new_pssw: "Password needs at least 8 alphanumeric Characters"
        });
      }
    }
  }
  resetError_new_pssw() {
    this.setState({ error_new_pssw: "" });
  }
  render() {
    const { error_old_pssw, error_new_pssw } = this.state;
    return (
      <>
        <div className="container">
          <div className="card-header mt-5">
            <h5 className="col-12 mt-1">Account Data</h5>
          </div>

          <div className="card text-center  mt-4">
            <div className="card-header">
              <h5 className="col-12 mt-1">Reset Password</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-12 col-md-5">
                  <label htmlFor="old_passw" className="float-left">
                    Old Password
                  </label>
                  <input
                    id="old_passw"
                    name="old_pssw"
                    type="text"
                    className="form-control"
                    onBlur={this.checkCurrentPassword}
                    onChange={() => {
                      this.setState({ error_old_pssw: "" });
                    }}
                  />
                  <small className="form-text text-muted">
                    {error_old_pssw}
                  </small>
                </div>
                <div className="col-12 col-md-5">
                  <div className="row">
                    <div className="col-12">
                      <label htmlFor="new_pssw" className="float-left">
                        New Password
                      </label>
                      <input
                        id="new_pssw"
                        name="new_pssw"
                        type="text"
                        className="form-control"
                        ref={this.newPssw}
                        onBlur={this.changePssw}
                        onKeyDown={this.resetError_new_pssw}
                      />
                      <small className="form-text text-muted">
                        {error_new_pssw}
                      </small>
                    </div>
                    <div className="col-12 mt-2">
                      <label htmlFor="new_pssw_rpt" className="float-left">
                        Repeat New Password
                      </label>
                      <input
                        id="new_pssw_rpt"
                        name="new_pssw_rpt"
                        type="text"
                        className="form-control"
                        ref={this.newPsswRpt}
                        onBlur={this.changePssw}
                        onKeyDown={this.resetError_new_pssw}
                      />
                      <small className="form-text text-muted">
                        {error_new_pssw}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

/* algo que recibo */
const mapStateToProps = ({ account }: IStore): IGlobalStateProps => ({
  account
});

export default connect(mapStateToProps)(ChangePassword);
