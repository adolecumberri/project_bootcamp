import { API_URL } from "./constants";
import { IAccount } from "./interface/IAccount";
import { ITokenPayload } from "./interface/ITokenPayload";
import { decode } from "jsonwebtoken";

export const myFetch = async ({
  method = "GET",
  path,
  obj,
  token
}: {
  path: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  obj?: Object;
  token?: string;
}) => {
  const response = await fetch(API_URL + path, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : ""
    },
    body: obj ? JSON.stringify(obj) : undefined
  });
  try {
    const json = await response.json();
    return json;
  } catch {
    return null;
  }
};
/* Mejorable. */
/* Tipado de entrada de atributos*/
export const myFetchFiles = async ({
  method = "GET",
  path,
  obj,
  formData,
  token
}: {
  path: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  obj?: Object;
  formData?: FormData;
  token?: string;
}) => {
  let headers = new Headers();
  let body = undefined;
  if (obj) {
    headers.set("Content-Type", "application/json");
    body = JSON.stringify(obj);
  } else if (formData) {
    body = formData;
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  console.log(body);
  const response = await fetch(API_URL + path, {
    method,
    headers,
    body
  });
  try {
    const json = await response.json();
    return json;
  } catch {
    return null;
  }
};


/* introduce Local storage + time */
export const myLocalStorage = (key: string, value: string) => {
  const now = new Date();

  const item = {
    value: value,
    expiry: now.getTime() + 86400000
  };
  localStorage.setItem(key, JSON.stringify(item));
};


export const generateAccountFromToken = (token: ITokenPayload | string): IAccount => {

  /* El token puede venir como string o como ITokenPayload
  porque programo como un simio. 
  TODO: unificar entradas O! crear 2 funciones. */
  if(typeof token == "string"){
    const { id, name, header, avatar, isAdmin } = decode(token) as ITokenPayload;
    return { token, id, name, header, avatar, isAdmin } 
  }else{
    const { id, name, header, avatar, isAdmin } = token as ITokenPayload;
    return { token: (token as unknown as string), id, name, header, avatar, isAdmin };
  }
 
};



export const updateToken = (obj:
  {
    id?: number,
    name?: string,
    header?: string,
    avatar?: string,
    isAdmin?: boolean
  }
) => {
  /* TODO: refactorizar */
  /* preguntar a carlos sobre destructuraciones. */

}