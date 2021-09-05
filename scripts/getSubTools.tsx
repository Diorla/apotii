import ToolProps from "../types/ToolProps";
import filterTopTwo from "./filterTopTwo";

export default function getSubTools(tools: ToolProps[], filtered: boolean) {
  if (filtered) return filterTopTwo(tools);
  return tools;
}
