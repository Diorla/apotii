import CategoryProps from "../types/CategoryProps";
import UserProps from "../types/UserProps";
import firebase from "./init";

export default function updateCategory(
  user: UserProps,
  categories: CategoryProps[],
  callback?: () => void
) {
  const { uid, displayName, email, photoURL } = user;
  const db = firebase.firestore();
  db.doc(`users/${uid}`)
    .set(
      {
        uid,
        displayName,
        email,
        photoURL,
        categories,
      },
      { merge: true }
    )
    .then(() => callback && callback())
    .catch((err) => console.error(err.message));
}
