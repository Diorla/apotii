import CategoryProps from "../types/CategoryProps";
import UserProps from "../types/UserProps";
import firebase from "./init";

export default function addCategory(
  user: UserProps,
  category: CategoryProps,
  categoryError: boolean,
  callback: () => void
) {
  if (!category.name) return 0;
  if (categoryError) return 0;
  const { uid, displayName, email, photoURL, categories = [] } = user;
  const db = firebase.firestore();
  db.doc(`users/${uid}`)
    .set(
      {
        uid,
        displayName,
        email,
        photoURL,
        categories: [...categories, category],
      },
      { merge: true }
    )
    .then(callback)
    .catch((err) => console.error(err.message));
}
