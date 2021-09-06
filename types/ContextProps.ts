import ProjectProps from "./ProjectProps";
import ToolProps from "./ToolProp";
import UserProps from "./UserProps";

// Practically all the data that will be rendered
export default interface ContextProps {
  user: UserProps;
  loadingUser: boolean;
  tools: ToolProps[];
  loadingTools: boolean;
  projects: ProjectProps[];
  loadingProjects: boolean;
}
