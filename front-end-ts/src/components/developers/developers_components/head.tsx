import React from "react";

/* JSON de ciudades. */
import countries from "src/jsons/cities.json";

interface IProps {
  updateNameFilter: any;
  updateCountry: any;
  updateFiltersModal: any;
  clearAllFilters: any;
}

class HeadDev extends React.PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);
  }
  render() {
    const {
      updateNameFilter,
      updateCountry,
      updateFiltersModal,
      clearAllFilters
    } = this.props;
    return (
      <>
        <div className="row mt-4">
          <div className="col-12 ">
            <h2 className="text-secondary float-left">Developers</h2>
          </div>
          <div className="col-4 mb-3 mt-3">
            <input
              id="buscador"
              className="form-control "
              style={{ height: "40px" }}
              type="text"
              placeholder="User Searcher"
              onChange={e => updateNameFilter(e)}
            />
          </div>
          <div className="col-4 mb-3 mt-3">
            <select
              id="country"
              name="country"
              className="form-control mr-2"
              defaultValue={"null"}
              key={"key02"}
              style={{ height: "40px" }}
              onChange={updateCountry}
            >
              <option key={"default"} value="null" style={{ color: "#eaeaea" }}>
                Country ?
              </option>
              {countries.map((country: any, index: number) => {
                return (
                  <option key={index + "01"} value={country.code}>
                    {country.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-2 mb-3 mt-3">
            <input
              className="form-control "
              style={{ height: "40px" }}
              type="button"
              value="Filters"
              onClick={updateFiltersModal}
            />
          </div>
          <div className="col-2 mb-3 mt-3">
            <input
              className="form-control "
              style={{ height: "40px" }}
              type="button"
              value="Clear Filters"
              onClick={clearAllFilters}
            />
          </div>
        </div>
      </>
    );
  }
}

export default HeadDev;
