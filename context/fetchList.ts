import firebase from "../firebase/init";

/**
 * Used to fetch and monitor if there are any changes
 * @param userId the user id
 * @param callback it will contain array of all activities
 */
export default async function fetchList(
  userId: string,
  type: "tools" | "projects",
  callback: (e: any[]) => void
): Promise<void> {
  const db = firebase.firestore();

  const collectionRef = db.collection(`users/${userId}/${type}`);

  collectionRef.onSnapshot((querySnapshot) => {
    const tempArray: any[] = [];
    querySnapshot.forEach((doc: any) => {
      tempArray.push(doc.data());
    });
    callback(tempArray);
  });
}
