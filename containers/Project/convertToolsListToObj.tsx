import ToolProps from "../../types/ToolProps";

export default function convertToolsListToObj(tools: ToolProps[]): {
  toolsObj: { [key: string]: ToolProps };
  catList: { [key: string]: ToolProps[] };
} {
  const toolsObj: { [key: string]: ToolProps } = {};
  const catList: { [key: string]: ToolProps[] } = {};
  tools.forEach((item) => {
    const { id, category } = item;
    toolsObj[id] = item;
    if (catList[category]) catList[category].push(item);
    else catList[category] = [item];
  });
  return { toolsObj, catList };
}
