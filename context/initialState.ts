import ContextProps from "../types/ContextProps";

const initialState: ContextProps = {
  user: {
    uid: "",
    displayName: "",
    email: "",
    photoURL: "",
    category: [],
  },
  loadingUser: true,
  loadingProjects: true,
  loadingTools: true,
  projects: [],
  tools: [],
};

export default initialState;
