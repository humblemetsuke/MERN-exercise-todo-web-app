import { SET_CURRENT_USER, USER_LOADING, USER_FETCH_ALL } from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  users: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case USER_FETCH_ALL:
      return {
          ...state,
          users: [...action.payload]
      }
    default:
      return state;
  }
}
