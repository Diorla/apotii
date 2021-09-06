import ToolProps from "../types/ToolProp";
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
