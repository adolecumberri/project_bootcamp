import React from "react";
import FilterDev from "./developers_components/filter";
import HeadDev from "./developers_components/head";
import BodyDev from "./developers_components/body";
import { IUserCard } from "src/interface/IUser";
import { myFetch } from "src/utils";

//css
import "./css/developers.css";

interface IProps {}

interface IState {
  userCards: IUserCard[];
  country: string | null;
  name: string;
  profiles: {
    name: string;
  }[];
  profilesFromUsers: {
    id_user: number;
    name: string;
  }[];
  activateFiltersModal: boolean;
}

class developers extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      userCards: [],
      country: "null",
      name: "",
      profiles: [], //perfiles. NO filtros.
      profilesFromUsers: [], // perfiles relacionados a las ids.
      activateFiltersModal: false
    };
    this.showHideFiltersModal = this.showHideFiltersModal.bind(this);
    this.updateNameFilter = this.updateNameFilter.bind(this);
    this.updateCountryFilter = this.updateCountryFilter.bind(this);
    this.updateProfiles = this.updateProfiles.bind(this);
    this.clearAllFilters = this.clearAllFilters.bind(this);
  }

  showHideFiltersModal() {
    this.setState({
      activateFiltersModal: !this.state.activateFiltersModal
    });
  }

  updateNameFilter(e: any) {
    this.setState({
      name: e.target.value.toLowerCase()
    });
  }

  updateCountryFilter(e: any) {
    this.setState({
      country: e.target.selectedOptions[0].value
    });
  }

  updateProfiles(obj: { name: string }[]) {
    this.setState({ profiles: [...obj] });
  }

  clearAllFilters() {
    (document.getElementById("buscador") as any).value = "";
    (document.getElementById("country") as any).value = "null";
    this.setState({ country: "null", name: "", profiles: [] });
  }

  //Esto saca tambien los filtros. y user_developers.
  componentDidMount() {
    myFetch({
      path: "/user/getAllDev",
      method: "POST"
    }).then((json: any) => {
      this.setState({
        userCards: json.users,
        profilesFromUsers: json.profiles
      });
    });
  }

  render() {
    const {
      userCards,
      profiles,
      country,
      name,
      profilesFromUsers,
      activateFiltersModal
    } = this.state;

    return (
      <div
        className="my-container"
        style={{
          backgroundColor: "antiquewhite",
          width: "100vw"
        }}
      >
        <div className="row" style={{ margin: "0px" }}>
          <div
            className="col-12"
            style={{
              backgroundColor: "#f1f1f1"
            }}
          >
            <HeadDev
              updateNameFilter={this.updateNameFilter}
              updateCountry={this.updateCountryFilter}
              updateFiltersModal={this.showHideFiltersModal}
              clearAllFilters={this.clearAllFilters}
            />
            <BodyDev
              userCards={userCards}
              name={name}
              country={country as string}
              profiles={profiles}
              profilesFromUsers={profilesFromUsers}
            />
          </div>
        </div>
        {activateFiltersModal && (
          <FilterDev
            updateFiltersModal={this.showHideFiltersModal}
            updateProfiles={this.updateProfiles}
            profilesFilters={profiles}
          />
        )}
      </div>
    );
  }
}

export default developers;
