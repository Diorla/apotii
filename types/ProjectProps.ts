type toolsType = {
  toolID: string;
  toolName: string;
};
export default interface ProjectProps {
  id: string;
  name: string;
  description: string;
  /**
   * ids of each tool
   */
  projectTools: toolsType[];
  modified: number;
}
