import React from "react";
import { Link } from "react-router-dom";
import { myFetch } from "src/utils";
import { IPortfolioCard } from "src/interface/IPorfolio";
import PortfolioCard from "../cards/portfolio_panel_card";
import { API_URL } from "src/constants";

import "./css/portfolio-panel.css";

interface IProps {
  id_user: number | undefined;
}

interface IState {
  portfolios_preview: IPortfolioCard[];
  isActiveDelete: boolean;
  projectToDelete: IPortfolioCard | undefined;
}

class PortfolioPanel extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      portfolios_preview: [],
      isActiveDelete: false,
      projectToDelete: undefined
    };

    this.showHideModalDelete = this.showHideModalDelete.bind(this);
    this.my_forceUpdate = this.my_forceUpdate.bind(this);
  }

  //enseño el modal que puede borrar el proyecto
  showHideModalDelete(projectToDelete: IPortfolioCard) {
    this.setState({ isActiveDelete: !this.state.isActiveDelete });
    this.setState({ projectToDelete: projectToDelete });
  }

  deleteProject(id: number) {
    myFetch({
      path: `/portfolio/${id}`,
      method: "DELETE"
    });
  }
  my_forceUpdate() {
    myFetch({
      path: `/portfolio/user/${this.props.id_user}`,
      method: "GET"
    }).then((json: IPortfolioCard[]) => {
      this.setState({ portfolios_preview: json });
    });
  }

  componentDidMount() {
    setTimeout(() => {
      myFetch({
        path: `/portfolio/user/${this.props.id_user}`,
        method: "GET"
      }).then((json: IPortfolioCard[]) => {
        this.setState({ portfolios_preview: json });
      });
    }, 100); //Si espero 0,1 sec, no me llega undefined el id_user
  }

  render() {
    const { portfolios_preview, isActiveDelete, projectToDelete } = this.state;
    return (
      <>
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6">
            <div className="row mt-5 p-0  text-center">
              <Link
                to="/user/portfolio/newPortfolio"
                className="col-12  rounded m-auto text-center "
                style={{ color: "inherit" }}
              >
                <div
                  className="text-center  m-auto p-4 notSelected"
                  style={{
                    border: "1px solid black",
                    backgroundColor: "#f1f1f1"
                  }}
                >
                  <span className="">&#10010;</span>
                  <br />
                  CREATE NEW PROJECT
                  <div style={{ color: "#ccc" }}>
                    {" "}
                    Show us what are you able to do{" "}
                  </div>
                </div>
              </Link>
            </div>
            {/* Proyectos */}
            <div className="row">
              {portfolios_preview.map(
                (cardData: IPortfolioCard, index: number) => {
                  return (
                    <PortfolioCard
                      key={index}
                      id_user={this.props?.id_user}
                      portfolio={cardData}
                      modal={this.showHideModalDelete}
                    />
                  );
                }
              )}
            </div>
          </div>
          <div className="col-3"></div>
        </div>
        {/* MODAL */}
        {isActiveDelete ? (
          <div
            className={`my-modalProjectDelete notSelected `}
            style={{
              position: "absolute",
              minWidth: "100%",
              zIndex: 3,
              top: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center"
            }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5
                    className="modal-title"
                    style={{ wordWrap: "break-word", maxWidth: "200px" }}
                  >
                    Delete {projectToDelete?.title}?
                  </h5>
                  <button
                    type="button"
                    className="my-close close"
                    onClick={() => {
                      this.setState({ isActiveDelete: false });
                    }}
                  >
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <img
                    alt="there is an error if you can read this message, contact us ;)"
                    src={`${API_URL}/multimedia/user_${this.props.id_user}/portfolios/portfolio${projectToDelete?.id}/${projectToDelete?.avatar}`}
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      this.setState({ isActiveDelete: false });
                    }}
                  >
                    Better Not
                  </button>
                  <button
                    type="button"
                    className="my-input"
                    onClick={() => {
                      this.deleteProject(projectToDelete?.id as number);
                      this.my_forceUpdate();
                      this.setState({ isActiveDelete: false });
                    }}
                  >
                    Good Bye project?
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default PortfolioPanel;
