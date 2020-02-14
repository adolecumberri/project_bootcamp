import React from "react";
import { myFetch } from "src/utils";
import { IAdminUser } from "src/interface/IUser";

interface IProps {}

interface IState {
  users: IAdminUser[] | any;
}

class UserAdmin extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      users: []
    };
  }

  render() {
    /* Algoritmica para crear las tarjetas? */

    console.log("fetch lanzao");
    myFetch({
      path: "/admin/user",
      method: "POST"
    }).then(json => {
      this.setState({ users: json });
    });

    const { users } = this.state;
    return (
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="d-flex align-items-center justify-content-center">
          <div className="col-12">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    #
                  </th>
                  <th scope="col" className="text-center">
                    Name
                  </th>
                  <th scope="col" className="text-center">
                    Email
                  </th>
                  <th scope="col" className="text-center">
                    Admin?
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: any) => {
                  return (
                    <tr key={user.id}>
                      <td className="text-center">{user.id}</td>
                      <td className="text-center">{user.name}</td>
                      <td className="text-center">{user.email}</td>
                      <td className="d-flex justify-content-between">
                        <div>
                          <input
                            type="radio"
                            name={user.id}
                            id={`admin${user.id}`}
                            onChange={e => {
                              myFetch({
                                path: "/user/" + e.target.name,
                                method: "PUT",
                                obj: { isAdmin: 1 }
                              }).then(() => {
                                //this.setState({ users: [...users] });
                              });
                            }}
                            checked={user.isAdmin ? true : false}
                            className="form-check-input mr-2"
                          />
                          <label htmlFor={`admin${user.id}`}>Admin</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            name={user.id}
                            id={`noAdmin${user.id}`}
                            onChange={e => {
                              myFetch({
                                path: "/user/" + e.target.name,
                                method: "PUT",
                                obj: { isAdmin: 0 }
                              }).then(() => {
                                // this.setState({ users: [...users] });
                              });
                            }}
                            checked={!user.isAdmin ? true : false}
                            className="form-check-input mr-2"
                          />
                          <label htmlFor={`noAdmin${user.id}`}>No Admin</label>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default UserAdmin;
