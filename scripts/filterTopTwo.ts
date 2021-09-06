import ToolProps from "../types/ToolProp";
import select from "./select";

export default function filterTopTwo(list: ToolProps[]): ToolProps[] {
  // Choose based on rating
  const favId = select(
    list.map((item) => item.id),
    list.map((item) => item.rating)
  );
  // Get the index of the selected fav
  const favIndex = list.findIndex((item) => item.id === favId);
  // Remove already selected from list
  const newArr = [...list.slice(0, favIndex), ...list.slice(favIndex + 1)];
  // Randomly chosen
  const randomChoice = select(newArr);
  // The randomly chosen comes first
  return [randomChoice, list[favIndex]];
}
