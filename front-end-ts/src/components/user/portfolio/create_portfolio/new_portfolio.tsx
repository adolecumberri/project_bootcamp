import React from "react";

/** Redux imports */
import { IAccount } from "src/interface/IAccount";
import { connect } from "react-redux";
import { IStore } from "src/interface/IStore";
import { myFetchFiles } from "src/utils";

//regEx

interface IProps {
  history: any;
}
interface IGlobalStateProps {
  account: IAccount | null;
}

type TProps = IGlobalStateProps & IProps;

interface IState {
  title: string;
  description: string;
  avatar_preview: boolean;
  file_preview: boolean;

  hasContent_avatar: boolean;
  hasContent_title: boolean;
  hasContent_body: boolean;
}

class NewPortfolio extends React.PureComponent<TProps, IState> {
  //estas referencias estan mal usadas en las funciones de previsualizacion.ç
  // puedo acceder a ellas por el evento "e"
  avatarFile: React.RefObject<HTMLInputElement>;
  contentFile: React.RefObject<HTMLInputElement>;

  constructor(props: TProps) {
    super(props);

    this.state = {
      title: "",
      description: "",
      avatar_preview: false,
      file_preview: false,

      hasContent_avatar: false,
      hasContent_title: false,
      hasContent_body: false
    };

    this.avatarFile = React.createRef();
    this.contentFile = React.createRef();

    this.changeTitle = this.changeTitle.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.changeAvatar = this.changeAvatar.bind(this);
    this.changeContentFile = this.changeContentFile.bind(this);
    this.submitPortfolio = this.submitPortfolio.bind(this);
    /* funcion de preview de imagen */
    this.previewFile = this.previewFile.bind(this);
  }

  changeTitle(e: any) {
    /** Check del boolean que desbloquea o no el boton de submit */
    if (e.target.value.length > 0) {
      this.setState({ hasContent_title: true });
    } else {
      this.setState({ hasContent_title: false });
    }
    /* Title tiene una longitud MAX de 60 chars. */
    if (e.target.value.length < 60) this.setState({ title: e.target.value });
  }

  changeDescription(e: any) {
    if (e.target.value.length < 200)
      this.setState({ description: e.target.value });
  }

  changeAvatar(e: any) {
    this.setState({ avatar_preview: true });
    this.previewFile("avatar_file", "avatar_file_preview");
  }

  changeContentFile(e: any) {
    this.setState({ file_preview: true });
    this.previewFile("content_file", "preview_content_file");
  }

  checkSubmitBoolean() {}

  submitPortfolio() {
    /* Las 2 imagenes se me pasan por referencia.
    Los inputs estan en los estados */
    const formData = new FormData();
    //1º cargo el porfolio y despues la imagen relacionada.
    if (this.avatarFile.current?.files) {
      formData.append("avatar_portfolio", this.avatarFile.current?.files[0]);
      formData.append("title", this.state.title);
      formData.append("description", this.state.description);
      formData.append("id_user", (this.props.account?.id as unknown) as string);
      /* TODO: arreglar back para la subida de imagenes del porfolio. */
      myFetchFiles({
        path: `/records/portfolio`,
        method: "PUT",
        formData
      }).then(({ insertId }: any) => {
        /* Una vez creado el portfolio
      INSERTO EL CONTENIDO */
        const formData2 = new FormData();
        formData2.append("id_portfolio", insertId);
        formData2.append(
          "id_user",
          (this.props.account?.id as unknown) as string
        );

        if (this.contentFile.current?.files) {
          formData2.append(
            "body_portfolio",
            this.contentFile.current?.files[0]
          );
        }

        myFetchFiles({
          path: `/records/file`,
          method: "PUT",
          formData: formData2
        }).then(json => {
          if (json?.response) {
            this.props.history.push("/user/portfolio"); // Redireccion SIN ${LOCAL_URL}
          }
        });
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

  render() {
    const {
      title,
      avatar_preview,
      file_preview,
      hasContent_title,
      hasContent_body,
      hasContent_avatar
    } = this.state;
    return (
      <>
        <div className="container-fluid mt-5">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
              <div className=" card text-center">
                <div className="card-header ">
                  <h6 className="col-md-12">Portfolio Information </h6>
                </div>

                <div className="card-body">
                  <div>
                    <div className="row">
                      <div className="card-body col-3">
                        <div className="custom-file mt-5">
                          <input
                            type="file"
                            className="custom-file-input"
                            name="avatar"
                            id="avatar_file"
                            ref={this.avatarFile}
                            onChange={e => {
                              this.setState({ hasContent_avatar: true });
                              this.changeAvatar(e);
                            }}
                          />
                          <label
                            className="custom-file-label d-flex justify-content-left pl-4 "
                            htmlFor="avatar"
                          >
                            Avatar??
                          </label>
                          <div className="invalid-feedback">
                            Example invalid custom file feedback
                          </div>
                          <img
                            alt="avatar for your Profile!"
                            src={
                              !avatar_preview
                                ? require("../../../../images/ico_logo40x40.jpg")
                                : ""
                            }
                            className="rounded-circle mt-4"
                            id="avatar_file_preview"
                            style={{ height: "160px", width: "160px" }}
                          />
                        </div>
                      </div>

                      <div className="card-body col-9">
                        <div className="form-group"></div>

                        <div className="form-row mb-3">
                          <div className="form-group col-md-12">
                            <label>Project Title</label>
                            <input
                              className="form-control textInput"
                              type="text"
                              value={title ? "" + title : ""}
                              placeholder="How to name it?"
                              onChange={this.changeTitle}
                            />
                          </div>

                          <div className="form-group col-md-12">
                            <label>are 200 words enought to describe it?</label>

                            <textarea
                              id="projectDescription"
                              className="form-control textInput"
                              name="description"
                              rows={5}
                              maxLength={200}
                              placeholder="Hmmmmm..."
                              onChange={this.changeDescription}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr />

                    <div className="form-group col-md-12">
                      <label>
                        Files to add inside into this wonderful portfolio?
                        <br />
                        <small> Otherwise it will be a little empty </small>
                      </label>

                      {/* imput File Que (TODO:) DEBE!!!!!! set MULTIPLE */}
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          name="content_file"
                          id="content_file"
                          ref={this.contentFile}
                          onChange={e => {
                            this.setState({ hasContent_body: true });
                            this.changeContentFile(e);
                          }}
                        />
                        <label
                          className="custom-file-label pl-n5 "
                          htmlFor="avatar"
                        >
                          Click here to add a file
                        </label>
                        <div className="invalid-feedback">
                          Example invalid custom file feedback
                        </div>
                      </div>
                    </div>

                    <div
                      className="row text-secondary p-4 mb-5 text-center"
                      style={{ border: "dashed 1px #ccc" }}
                    >
                      <p id="text_img" className="m-auto col-12">
                        {/* AÑADIR ELEMENTOS AQUI: */}
                        {file_preview ? (
                          <img
                            alt="preview"
                            id="preview_content_file"
                            style={{ maxWidth: "360px", maxHeight: "360px" }}
                          />
                        ) : (
                          "There are not files added"
                        )}
                      </p>
                    </div>

                    <hr />
                    <div className="col-12">
                      {hasContent_avatar &&
                      hasContent_body &&
                      hasContent_title ? (
                        <button
                          className="my-input"
                          onClick={this.submitPortfolio}
                        >
                          Guardar proyecto
                        </button>
                      ) : (
                        <button
                          disabled
                          className="my-input disabled"
                          onClick={this.submitPortfolio}
                        >
                          Guardar proyecto
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-2"></div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ account }: IStore): IGlobalStateProps => ({
  account
});

export default connect(mapStateToProps)(NewPortfolio);
