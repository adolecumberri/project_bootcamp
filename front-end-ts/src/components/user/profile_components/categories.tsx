import React from "react";
import { IProfile } from "../../../interface/IProfile";
import { myFetch } from "src/utils";
import { IStore } from "src/interface/IStore";
import { IAccount } from "src/interface/IAccount";
import { connect } from "react-redux";

interface IGlobalStateProps {
  account: IAccount | null;
}

interface IState {
  profiles: IProfile;
  containedProfiles: number[];
}
class Categories extends React.PureComponent<IGlobalStateProps, IState> {
  constructor(props: IGlobalStateProps) {
    super(props);
    this.state = {
      profiles: {
        categories: [],
        catNulls: [],
        catNotNulls: []
      },
      containedProfiles: []
    };
    this.updateCategorie = this.updateCategorie.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      myFetch({
        path: `/user_profile/${this.props.account?.id}`,
        method: "GET"
      }).then(json => {
        if (json) {
          let arrayNums: number[] = [];
          json.forEach((row: { id_profile: number }) => {
            arrayNums.push(row.id_profile);
          });
          this.setState({ containedProfiles: [...arrayNums] });
          /* fetch del contenido de los perfiles.
					Ejecutado despues del fetch que consigue los perfiles del usuario */
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
      });
    }, 10);
  }

  updateCategorie(e: any) {
    const id_user = this.props.account?.id;
    const id_profile = e.target.id;
    myFetch({
      path: "/user_profile",
      method: e.target.checked ? "POST" : "DELETE",
      obj: { id_user: id_user, id_profile: parseInt(id_profile) }
    });
  }

  render() {
    const { categories, catNotNulls, catNulls } = this.state.profiles;
    const { containedProfiles } = this.state;
    return (
      <div className="container">
        <div className="card text-center  mt-4">
          <div className="card-header">
            <h5 className="col-12 mt-1">Categories</h5>
          </div>
          <div className="card-body">
            <div className="row">
              {catNulls.map(prof => {
                return (
                  <div key={prof.id} className="col-3">
                    <div className="row">
                      <div className="col-2" />
                      <div className="col-2 ">
                        <input
                          id={"" + prof.id}
                          type="checkbox"
                          className="mr-3 "
                          style={{ marginBottom: "5px" }}
                          onChange={this.updateCategorie}
                          defaultChecked={
                            containedProfiles.includes(prof.id) ? true : false
                          }
                        />
                      </div>

                      <div className="col-8 d-flex justify-content-start">
                        <label htmlFor={"" + prof.id}>{prof.name}</label>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <hr />
          <div className="card-body">
            <div className="row">
              {categories.map((categ, index) => {
                return (
                  <div className="col-4" key={index}>
                    <div className="card-header">
                      <h5 className="col-12 mt-1">{categ.category}</h5>
                    </div>
                    <div className="card-body">
                      {catNotNulls.map((prof, i) => {
                        return prof.category === categ.category ? (
                          <div className="row" key={i}>
                            <div className="col-2" />
                            <div className="col-2">
                              <input
                                id={"" + prof.id}
                                type="checkbox"
                                className="mr-3 "
                                style={{ marginBottom: "5px" }}
                                onChange={this.updateCategorie}
                                defaultChecked={
                                  containedProfiles.includes(prof.id)
                                    ? true
                                    : false
                                }
                              />
                            </div>
                            <div className="col-8  d-flex justify-content-start">
                              <label htmlFor={"" + prof.id}>{prof.name}</label>
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

          <div className="row" />
        </div>
      </div>
    );
  }
}
/* algo que recibo */
const mapStateToProps = ({ account }: IStore): IGlobalStateProps => ({
  account
});

export default connect(mapStateToProps)(Categories);
