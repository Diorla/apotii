import { useState, useEffect, createContext, useContext } from "react";
import firebase from "../firebase/init";
import UserProps from "../types/UserProps";
import initialState from "./initialState";
import fetchList from "../firebase/fetchList";
import fetchUser from "../firebase/fetchUser";
import ProjectProps from "../types/ProjectProps";
import ToolProps from "../types/ToolProp";
import ContextProps from "../types/ContextProps";

export const UserContext = createContext(initialState);

export default function UserContextComp({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserProps>(initialState.user);
  const [loadingUser, setLoadingUser] = useState(true);
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [tools, setTools] = useState<ToolProps[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingTools, setLoadingTools] = useState(true);

  useEffect(() => {
    const unsubscriber = firebase.auth().onAuthStateChanged(async (user) => {
      try {
        if (user && user.uid) {
          fetchUser(user.uid, user, setUser).then(() => setLoadingUser(false));
          fetchList(user.uid, "projects", setProjects)
            .then(() => setLoadingProjects(false))
            .catch((err) => console.error(err));
          fetchList(user.uid, "tools", setTools)
            .then(() => setLoadingTools(false))
            .catch((err) => console.error(err));
        } else setUser(initialState.user);
      } catch (error) {
        console.error(error);
      }
    });

    return () => unsubscriber();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loadingUser,
        projects,
        tools,
        loadingProjects,
        loadingTools,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = (): ContextProps => useContext(UserContext);
