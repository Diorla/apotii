import firebase from "../firebase/init";
import UserProps from "../types/UserProps";
import initialState from "./initialState";

export default async function fetchUser(
  userId: string,
  user: firebase.User,
  callback: (arg0: UserProps) => any
) {
  const db = firebase.firestore();
  const { uid } = user;
  return db
    .doc(`users/${userId}`)
    .onSnapshot((doc) =>
      callback({ ...doc.data(), ...initialState.user, uid })
    );
}
