import { Action } from "redux";

const INITIAL_STATE = {}

export default function rootReducer (state = INITIAL_STATE, action: Action) {

    switch (action.type) {
        default:
            return state
            break
    }
}