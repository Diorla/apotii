import firebase from "./init";
import { v4 } from "uuid";
import ToolProps from "../types/ToolProps";

export default function addTool(
  userId: string,
  tool: ToolProps,
  callback: () => void
): 0 | undefined {
  const db = firebase.firestore();
  if (!tool.name) return 0;
  const id = v4();
  db.doc(`users/${userId}/tools/${id}`)
    .set(
      {
        ...tool,
        id,
        modified: Date.now(),
      },
      { merge: true }
    )
    .then(() => callback)
    .catch((err) => console.error(err.message));
}
