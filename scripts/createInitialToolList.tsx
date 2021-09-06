import ToolProps from "../types/ToolProps";
import toolsType from "../types/toolsType";

export default function createInitialToolList(
  tools: ToolProps[],
  initialList: toolsType[]
) {
  let initialId = "";
  initialList?.forEach((item) => {
    if (tools.map((item) => item.id).includes(item.toolID))
      initialId = item.toolID;
  });
  return initialId;
}
