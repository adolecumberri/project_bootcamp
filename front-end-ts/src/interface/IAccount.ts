/* Interfaz del token */

import { ITokenPayload } from "./ITokenPayload";

export interface IAccount extends ITokenPayload {
  token: string;
}
