import firebase from "./init";
import UserProps from "../types/UserProps";
import initialState from "../context/initialState";

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
      callback({ ...initialState.user, ...doc.data(), uid })
    );
}
