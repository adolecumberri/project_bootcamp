import { IAccount } from "../interface/IAccount";
import { TAction } from "./types";

/* Aquí genero las acciones que son las que se llaman */


export const SetAccountAction = ( account: IAccount ) : TAction => ({
    type: "SET_ACCOUNT",
    payload: account
})

export const LogoutAction = (): TAction =>({ type: "LOGOUT" })