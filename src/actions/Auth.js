import * as firestore from "firebase"; //firestore is database
import { auth } from "firebase/app";

export const signup = (user) => {
  return async (dispatch) => {
    //async is not return anything before the completion of the method below

    const db = firestore();

    auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((user) => console.log(user))
      .catch((err) => console.log(err));
  };
};
