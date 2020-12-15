import { userConstants } from "./Constants";
import firebase from "../index";

export const getRealTimeUsers = (uid) => {
  //if anything return from async function then it will be a promise
  return async (dispatch) => {
    dispatch({ type: `${userConstants.GET_REALTIME_USERS}_REQUEST` });

    const db = firebase.firestore();

    const unsubscribe = db
      .collection("users")
      //   .where("uid", "!=", uid)  //firebase does not support !=, ==,>, <
      .onSnapshot((querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().uid !== uid) {
            users.push(doc.data());
          }
        });
        console.log(users);
        dispatch({
          type: `${userConstants.GET_REALTIME_USERS}_SUCCESS`,
          payload: { users },
        });
      });
    return unsubscribe;
  };
};
