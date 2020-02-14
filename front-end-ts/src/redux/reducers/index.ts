import { combineReducers } from "redux";
import { IStore } from "../../interface/IStore";
import account from "./accountReducer";

export default combineReducers<IStore>({
    account
});
