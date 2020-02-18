import React from "react";
import { IUser } from "src/interface/IUser";

/* JSON de ciudades. */
import countries from "src/jsons/cities.json";
import { IportfolioUser } from "src/interface/IProfile";

interface IProps {
  user: IUser | null;

  user_profile: IportfolioUser | undefined;
}

class PortfolioUserData extends React.PureComponent<IProps> {
  render() {
    let userData: any = { ...this?.props?.user };
    const { active, age, gender, country } = userData;
    const categories = this.props.user_profile?.categories;
    const result = this.props.user_profile?.result;

    return active ? (
      <div>
        {age || gender || country ? (
          <div className="card-header p-0" key="10001">
            Information
          </div>
        ) : (
          ""
        )}
        {age ? <div className="">{age?.substring(0, 4)}</div> : ""}
        {gender ? <div className="">{gender}</div> : ""}
        {country ? (
          <div className="">
            {countries.find(e => (e.code === country ? true : false))?.name}
          </div>
        ) : (
          ""
        )}

        {this.props.user_profile ? (
          <div>
            {categories?.length !== 0 ? (
              <div className="card-header p-0 mt-5">Knowledge</div>
            ) : (
              ""
            )}
            {result?.map((row: any, index: number) => {
              return row.category === null ? (
                <div key={index}>{`${row.name}`}</div>
              ) : (
                ""
              );
            })}
            <div>
              {categories?.map((categ, index) => {
                return (
                  <>
                    <div key={index + "01"} className="ml-3">
                      {categ.category}
                    </div>
                    <div key={index + "02"}>
                      {result?.map((row, index) => {
                        return row.category === categ.category ? (
                          <div key={index + "03"}>{`${row.name}`}</div>
                        ) : (
                          ""
                        );
                      })}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    ) : (
      <div key={10001}>This user is not active</div>
    );
  }
}

export default PortfolioUserData;
