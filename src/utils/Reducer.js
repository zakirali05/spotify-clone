import { reducerCases } from "./Constants";

export const initialState = {
  token: null,
  userInfo: null,
  nav: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };

    case reducerCases.SET_USER:
      return {
        ...state,
        userInfo: action.userInfo,
      };

    case reducerCases.SET_NAV:
      return {
        ...state,
        nav: action.nav,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
