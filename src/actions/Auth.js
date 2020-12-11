// import { firestore } from "firebase/firestore/dist/index.cjs"; //firestore is database
// import { auth } from "firebase/auth/dist/index.cjs";

// import firebase from "firebase";
// import { auth, firestore } from "firebase";
import firebase from "../index";
import { authConstanst } from "./Constants";

export const signup = (user) => {
  return (dispatch) => {
    //async is not return anything before the completion of the method below
    const db = firebase.firestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        console.log(data);

        const name = `${user.firstName} ${user.lastName}`;
        firebase
          .auth()
          .currentUser.updateProfile({
            displayName: name,
          })
          .then(() => {
            //if you are here means it is updated successfully
            db.collection("users")
              .doc(data.user.uid)
              .set({
                firstName: user.firstName,
                lastName: user.lastName,
                uid: data.user.uid,
                createdAt: new Date(),
                isOnline: true,
              })
              .then(() => {
                //succeful
                const loggedInUser = {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  uid: data.user.uid,
                  email: user.email,
                };
                localStorage.setItem("user", JSON.stringify(loggedInUser));
                console.log("User logged in successfully...!");
                dispatch({
                  type: `${authConstanst.USER_LOGIN}_SUCCESS`,
                  payload: { user: loggedInUser },
                });
              })
              .catch((error) => {
                console.log(error);
                dispatch({
                  type: `${authConstanst.USER_LOGIN}_FAILURE`,
                  payload: { error },
                });
              });
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
