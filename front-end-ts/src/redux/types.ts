import { IAccount } from "../interface/IAccount";

/*TYPES son las interfaces de las acciones */

interface ISetAccountAction {
    type: "SET_ACCOUNT";
    payload: IAccount;
}

/* PREguntar por qué logout no tiene payload. (creo que porque no envia nada.) */
interface ILogoutAction{
    type: "LOGOUT";
}

export type TAction = ISetAccountAction | ILogoutAction;