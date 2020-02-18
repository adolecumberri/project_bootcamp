import React from "react";
import { IUserCard } from "src/interface/IUser";
import { Link } from "react-router-dom";
import { API_URL, LOCAL_URL } from "src/constants";
/* JSON de ciudades. */
import countries from "src/jsons/cities.json";

interface IProps {
  userCards: IUserCard[];
  country: string;
  name: string;
  profiles: {
    name: string;
  }[];
  profilesFromUsers: {
    id_user: number;
    name: string;
  }[];
}

interface IState {}

class BodyDev extends React.PureComponent<IProps> {
  render() {
    const {
      userCards,
      name,
      country,
      profiles,
      profilesFromUsers
    } = this.props;
    let userCardsFiltered = userCards.filter(user => user.name.includes(name));

    userCardsFiltered = userCardsFiltered.filter(user =>
      country !== "null" ? user.country === country : true
    );

    if (profiles.length) {
      //CREACIÓN del filtro total de las categorías.
      // TODAS las ids-categories las filtro con los Profiles seleccionados.
      let usersWithCateg = profilesFromUsers.filter(categ =>
        profiles.find(profileRow => profileRow.name === categ.name)
      );

      userCardsFiltered = userCardsFiltered.filter(u =>
        usersWithCateg.find(row => row.id_user === u.id)
      );
    }

    return (
      <div className="row justify-content-around">
        {userCardsFiltered.map((user: IUserCard, index: number) => {
          return (
            <div className="card-artist" key={index}>
              <div
                className="rounded bg-light p-1"
                style={{
                  border: "solid 1px #ddd",
                  boxShadow: "0px 2px 4px rgba(0,0,0,0.1)"
                }}
              >
                <Link to={`/content_creator/${user.id}`}>
                  <div
                    className="bg-white rounded p-1 border"
                    style={{ borderColor: "#ddd !important" }}
                  >
                    <div
                      style={{
                        minWidth: "100%",
                        height: "120px",
                        overflow: "hidden"
                      }}
                      className="mb-3 rounded-top d-flex justify-content-center"
                    >
                      <img
                        className=""
                        src={
                          user.header !== null
                            ? `${API_URL}/multimedia/user_${user.id}/header/${user.header}`
                            : require("src/images/ico_logo100x75.jpg")
                        }
                        alt={`${user.name}'s header`}
                        style={{ minWidth: "45%", minHeight: "100%" }}
                      />
                    </div>

                    <img
                      src={
                        user.avatar !== "" && user.avatar !== null
                          ? `${API_URL}/multimedia/user_${user.id}/avatar/${user.avatar}`
                          : require("src/images/ico_logo40x40.jpg")
                      }
                      alt={`${user.name}'s avatar`}
                      style={{
                        width: "100px",
                        height: "100px",
                        marginTop: "0px"
                      }}
                      className="rounded-circle mx-auto d-block"
                    />

                    <div className="mb-3" style={{ fontSize: "0.9em" }}>
                      <h6 className="text-center p-0 m-0 mt-2 mb-2 text-capitalize">
                        {user.name}
                      </h6>

                      <div className="form-row">
                        <div className="clearfix"></div>

                        <p className="text-center p-0  m-auto">
                          {
                            countries.find(
                              country => country.code === user.country
                            )?.name
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default BodyDev;
