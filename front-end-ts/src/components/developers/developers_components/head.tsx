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
  render() {
    const {
      updateNameFilter,
      updateCountry,
      updateFiltersModal,
      clearAllFilters
    } = this.props;
    return (
      <>
        <div className="row mt-4" style={{ margin: "0px" }}>
          <div className="col-12 ">
            <h2 className="my-titleDevelopers">Artists</h2>
          </div>
          <div className="filterType1">
            <input
              id="buscador"
              className="my-input"
              style={{ height: "40px", width: "100%" }}
              type="text"
              placeholder="User Searcher"
              onChange={e => updateNameFilter(e)}
            />
          </div>
          <div className="filterType1">
            <select
              id="country"
              name="country"
              className="my-input mr-2"
              defaultValue={"null"}
              key={"key02"}
              style={{ height: "40px", width: "100%  " }}
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
          <div className="filterType2">
            <input
              className="my-input "
              style={{ height: "40px" }}
              type="button"
              value="Filters"
              onClick={updateFiltersModal}
            />
          </div>
          <div className="filterType2">
            <input
              className="my-input"
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
