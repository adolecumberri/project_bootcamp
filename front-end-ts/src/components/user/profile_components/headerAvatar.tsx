import React from "react";
import { LOCAL_URL, API_URL } from "src/constants";
import { IStore } from "src/interface/IStore";
import { IAccount } from "src/interface/IAccount";
import { connect } from "react-redux";
import { myFetchFiles, myLocalStorage } from "src/utils";
import { SetAccountAction } from "src/redux/actions";
import { decode } from "jsonwebtoken";

interface IProps {}
interface IGlobalStateProps {
  account: IAccount | null;
}

interface IGlobalActionProps {
  setAccount(account: IAccount): void;
}

type TProps = IGlobalStateProps & IProps & IGlobalActionProps;

interface IState {
  update: boolean;
}

class HeaderAvatar extends React.PureComponent<TProps, IState> {
  fileAvatar: React.RefObject<HTMLInputElement>;
  fileHeader: React.RefObject<HTMLInputElement>;

  constructor(props: TProps) {
    super(props);
    this.state = {
      update: false
    };
    this.fileAvatar = React.createRef();
    this.fileHeader = React.createRef();

    this.uploadAvatar = this.uploadAvatar.bind(this);
    this.uploadHeader = this.uploadHeader.bind(this);

    this.previewFile = this.previewFile.bind(this);
  }

  uploadAvatar() {
    if (this.fileAvatar.current?.files) {
      const formData = new FormData();
      const path = this.fileAvatar.current.files[0];
      formData.append("file", path);

      myFetchFiles({
        method: "PUT",
        path: `/records/user/${this.props.account?.id}/avatar`,
        formData
      }).then(json => {
        //TODO: sustituir
        if (json) {
          /* Actualizacion del token tras el update */
          let token = localStorage.getItem("coworkin_token");
          // El token trae expire & value. Value es el token como tal.
          // lo convierto en objeto y saco el value.
          console.log("token");
          console.log(token);
          console.log("json");
          console.log(json);
          //TODO:
          /* PARCHE porque NEW TOKEN ES STRING A VECES!!!!! */
          if (typeof JSON.parse(token as string).value === "string") {
            let newToken = token ? JSON.parse(token).value : null;
            // decodifico newToken en un objeto

            newToken = decode(newToken);
            newToken.avatar = json.avatar;
            newToken.header = json.header;
            myLocalStorage("coworkin_token", newToken);
            this.props.setAccount(newToken);

            /* ESTE CODIGO ES OPTIMIZABLE */
          } else {
            let newToken = token ? JSON.parse(token).value : null;
            // decodifico newToken en un objeto

            newToken.avatar = json.avatar;
            newToken.header = json.header;
            myLocalStorage("coworkin_token", newToken);
            this.props.setAccount(newToken);
          }

          //Estado para que se actualice el componente
          this.setState({ update: !this.state.update });
        }
      });
    }
  }

  uploadHeader() {
    if (this.fileHeader.current?.files) {
      const formData = new FormData();
      const path = this.fileHeader.current.files[0];
      formData.append("file", path);

      myFetchFiles({
        method: "PUT",
        path: `/records/user/${this.props.account?.id}/header`,
        formData
      }).then(json => {
        //TODO: sustituir
        if (json) {
          /* Actualizacion del token tras el update */
          let token = localStorage.getItem("coworkin_token");
          // El token trae expire & value. Value es el token como tal.
          // lo convierto en objeto y saco el value.

          //TODO:
          /* PARCHE porque NEW TOKEN ES STRING A VECES!!!!! */
          if (typeof JSON.parse(token as string).value === "string") {
            let newToken = token ? JSON.parse(token).value : null;
            // decodifico newToken en un objeto

            newToken = decode(newToken);
            newToken.avatar = json.avatar;
            newToken.header = json.header;
            myLocalStorage("coworkin_token", newToken);
            this.props.setAccount(newToken);

            /* ESTE CODIGO ES OPTIMIZABLE */
          } else {
            let newToken = token ? JSON.parse(token).value : null;
            // decodifico newToken en un objeto

            newToken.avatar = json.avatar;
            newToken.header = json.header;
            myLocalStorage("coworkin_token", newToken);
            this.props.setAccount(newToken);
          }

          //Estado para que se actualice el componente
          this.setState({ update: !this.state.update });
        }
      });
    }
  }

  previewFile(from: string, to: string) {
    let oFReader = new FileReader();
    oFReader.readAsDataURL(
      /* Input type file de donde viene */
      (document.getElementById(`${from}`) as any).files[0]
    );

    oFReader.onload = function(oFREvent) {
      /* input a donde va */
      (document.getElementById(
        `${to}`
      ) as any).src = (oFREvent as any).target.result;
    };
  }

  componentWillUnmount() {
    console.log("COMPONENT UNMOUN! akjsdfhskafjhfklahdfak");
  }

  componentDidMount() {}

  render() {
    const header = this.props.account?.header;
    const avatar = this.props.account?.avatar;
    const id = this.props.account?.id;
    return (
      <div className="container">
        <div className="card text-center  mt-4">
          <div className="card-header">
            <h5 className="col-12 mt-1">Header and Avatar of the portfolio </h5>
          </div>

          <div className="row">
            <div className="card-body  col-4 px-5">
              <div className="form-group col-10 m-auto py-1">
                <label>Upload avatar</label>
              </div>
              <div className="panel-body centered">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    name="avatar"
                    ref={this.fileAvatar}
                    onChange={this.uploadAvatar}
                    id="input_avatar"
                  />
                  <label
                    className="custom-file-label pl-n5 pr-5"
                    htmlFor="avatar"
                  >
                    Choose Avatar
                  </label>
                  <div className="invalid-feedback">
                    Example invalid custom file feedback
                  </div>
                </div>
                <img
                  alt="avatar for your Profile!"
                  src={
                    avatar
                      ? `${API_URL}/multimedia/user_${id}/avatar/${avatar}`
                      : `${LOCAL_URL}/images/ico_logo40x40.jpg`
                  }
                  className="rounded-circle mt-3"
                  id="foto_avatar"
                  style={{ height: "160px", width: "160px" }}
                />
              </div>
            </div>

            <div className="card-body  col-8 px-5">
              <div className="form-group col-10 m-auto py-1">
                <label>Upload Header</label>
              </div>
              <div className="panel-body centered">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    name="header"
                    ref={this.fileHeader}
                    accept=".png, .jpg, .jpeg"
                    onChange={this.uploadHeader}
                    id="input_header"
                  />
                  <label className="custom-file-label pl-n5" htmlFor="header">
                    Choose Header
                  </label>
                  <div className="invalid-feedback">
                    Example invalid custom file feedback
                  </div>
                </div>
                <div
                  style={{
                    maxHeight: "163px",
                    border: "1px solid   darkgray"
                  }}
                  className="rounded mt-3"
                >
                  <img
                    alt="Header for your profile"
                    src={
                      header
                        ? `${API_URL}/multimedia/user_${id}/header/${header}`
                        : `${LOCAL_URL}/images/header.jpeg`
                    }
                    id="foto_header"
                    style={{
                      maxHeight: "163px",
                      maxWidth: "100%",
                      objectFit: "contain"
                    }}
                  />
                </div>
              </div>
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

const mapStateToProps = ({ account }: IStore): IGlobalStateProps => ({
  account
});
export default connect(mapStateToProps, mapDispatchToProps)(HeaderAvatar);
