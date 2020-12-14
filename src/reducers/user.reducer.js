import { userConstants } from "../actions/Constants";

const initState = {
  users: [],
};
export default (state = initState, action) => {
  switch (action.type) {
    case `${userConstants.GET_REALTIME_USERS}_REQUEST`:
      break;

    case `${userConstants.GET_REALTIME_USERS}_SUCCESS`:
      state = {
        ...state,
        users: action.payload.users,
      };
      break;

    case `${userConstants.GET_REALTIME_USERS}_FAILURE`:
      break;
  }
  return state;
};
