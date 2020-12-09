// import { firestore } from "firebase/firestore/dist/index.cjs"; //firestore is database
// import { auth } from "firebase/auth/dist/index.cjs";

// import firebase from "firebase";
// import { auth, firestore } from "firebase";
import firebase from "../index";

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
            //if it is updated successfully then this runs
            debugger;
            db.collection("users")
              .add({
                firstName: user.firstName,
                lastName: user.lastName,
                uid: data.user.uid,
                createdAt: new Date(),
              })
              .then(() => {
                //succeful
                debugger;
                const loggedInUser = {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  uid: data.user.uid,
                  email: user.email,
                };
                localStorage.setItem("user", JSON.stringify(loggedInUser));
                console.log("logged in successfully...!");
              })
              .catch((error) => {
                debugger;
                console.log(error);
              });
          });
      })
      .catch((error) => {
        debugger;
        console.log(error);
      });
  };
};
