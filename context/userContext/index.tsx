import { useState, useEffect, createContext, useContext } from "react";
import firebase from "../../firebase/init";
import UserProps from "../../types/UserProps";
import initialState from "./initialState";

export const UserContext = createContext(initialState);

export default function UserContextComp({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserProps>(initialState.user);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const unsubscriber = firebase.auth().onAuthStateChanged(async (user) => {
      try {
        if (user) {
          const { uid, displayName, email, photoURL } = user;
          // const userDoc = await firebase.firestore().doc(`users/${uid}`).get()
          setUser({
            uid,
            displayName: displayName || "",
            email: email || "",
            photoURL: photoURL || "",
          });
        } else setUser(initialState.user);
      } catch (error) {
      } finally {
        setLoadingUser(false);
      }
    });

    return () => unsubscriber();
  }, []);

  return (
    <UserContext.Provider value={{ user, loadingUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = (): { user: UserProps; loadingUser: boolean } =>
  useContext(UserContext);
