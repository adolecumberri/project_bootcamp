import React from "react";
import { IProfile } from "src/interface/IProfile";

import { myFetch } from "src/utils";

interface IProps {
  updateFiltersModal: any;
  updateProfiles: any;
  profilesFilters: {
    name: string;
  }[];
}

interface IState {
  profiles: IProfile;
}

class FilterDev extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      profiles: {
        categories: [],
        catNulls: [],
        catNotNulls: []
      }
    };
    this.checkCategory = this.checkCategory.bind(this);
    this.creteObjAndUpdate = this.creteObjAndUpdate.bind(this);
  }

  //Si se clickea la categoría, se cambian todos los hijos de la misma
  checkCategory({ target }: any) {
    let hijos: any = document.getElementsByClassName(target.id);
    for (let i = 0; i < hijos.length; i++) {
      hijos[i].checked = target.checked; // pongo a true el input
    }
    this.creteObjAndUpdate();
  }

  //Creación de objeto global.
  creteObjAndUpdate() {
    let checkBoxs = document
      .getElementById("modal-filters")
      ?.getElementsByClassName("my-cb");
    (checkBoxs as any) = Array.from((checkBoxs as unknown) as any);
    checkBoxs = (checkBoxs as any).filter((input: any) => input.checked);

    let objUpdater: any = [];
    (checkBoxs as any).forEach((input: any) =>
      objUpdater.push({
        name: input.getAttribute("meta-name")
      })
    );

    this.props.updateProfiles(objUpdater);
  }

  componentDidMount() {
    myFetch({
      path: "/profile",
      method: "GET"
    }).then(prof => {
      let newProfiles: IProfile = {
        categories: prof.categories,
        catNotNulls: prof.catNotNulls,
        catNulls: prof.catNulls
      };
      this.setState({ profiles: newProfiles });
    });
  }

  render() {
    const { categories, catNotNulls, catNulls } = this.state.profiles;
    const { profilesFilters } = this.props;
    return (
      <div
        className="modal-dialog   modal-lg modal-dialog-centered animated  bounceInRight"
        role="document"
        style={{
          position: "absolute",
          zIndex: 4,
          top: 0,
          left: 0,
          right: 0,
          marginLeft: "auto"
        }}
      >
        <div className="modal-content" id="modal-filters">
          <div className="row"></div>
          <div
            className="modal-header my-titleDevelopers mb-3"
            style={{ fontSize: "25px" }}
          >
            Artists Filters
            <button
              type="button"
              className="close"
              onClick={this.props.updateFiltersModal}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body mt-3 mb-3">
            <div className="row">
              {catNulls.map(prof => {
                return (
                  <div key={prof.id} className="col-6  col-md-3 pr-0 ">
                    <div className="col-12 px-0 mx-0 ">
                      <label htmlFor={"" + prof.id} className="text-capitalize">
                        <input
                          id={"" + prof.id}
                          type="checkbox"
                          className="mr-3 my-cb"
                          meta-name={prof.name}
                          style={{
                            marginBottom: "0px",
                            width: "15px",
                            height: "15px"
                          }}
                          checked={
                            profilesFilters.find(
                              ({ name }) => name === prof.name
                            )?.name
                              ? true
                              : false
                          }
                          onChange={this.creteObjAndUpdate}
                        />

                        {prof.name}
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
            <hr />
            {/* PARTE DE GRUPOS */}
            <div className="row">
              {categories.map((categ, index) => {
                return (
                  <div className=" col-6 col-md-4" key={index}>
                    <h5
                      className="col-12 "
                      style={{ borderBottom: "2px solid #1a1b1e" }}
                    >
                      <label
                        htmlFor={categ.category}
                        className="d-flex justify-content-between"
                      >
                        {categ.category}
                        <input
                          id={categ.category}
                          type="checkbox"
                          className="mr-3 mt-2"
                          style={{
                            marginBottom: "5px",
                            width: "15px",
                            height: "15px"
                          }}
                          onChange={this.checkCategory}
                        />
                      </label>
                    </h5>

                    <div className="card-body">
                      {catNotNulls.map((prof, i) => {
                        return prof.category === categ.category ? (
                          <div className="row" key={i}>
                            <div className="col-12  d-flex justify-content-start align-items-center text-capitalize">
                              <label htmlFor={"" + prof.id}>
                                <input
                                  id={"" + prof.id}
                                  type="checkbox"
                                  className={`mr-3 ${categ.category} my-cb`}
                                  style={{
                                    marginBottom: "5px",
                                    width: "15px",
                                    height: "15px"
                                  }}
                                  meta-name={prof.name}
                                  meta-categ={categ.category}
                                  checked={
                                    profilesFilters.find(
                                      ({ name }) => name === prof.name
                                    )?.name
                                      ? true
                                      : false
                                  }
                                  onChange={this.creteObjAndUpdate}
                                />

                                {prof.name}
                              </label>
                            </div>
                          </div>
                        ) : (
                          ""
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="modal-footer"></div>
        </div>
      </div>
    );
  }
}

export default FilterDev;
