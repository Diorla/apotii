import toolsType from "./toolsType";

export default interface ProjectProps {
  id: string;
  name: string;
  description: string;
  /**
   * ids of each tool and name of each tools
   */
  projectTools: toolsType[];
  modified: number;
}
