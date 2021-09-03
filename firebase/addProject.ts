import { v4 } from "uuid";
import ProjectProps from "../types/ProjectProps";
import firebase from "./init";

export default function addProject(
  userId: string,
  project: ProjectProps,
  callback: () => void,
  currentId?: string
): 0 | undefined {
  const db = firebase.firestore();
  if (!project.name) return 0;
  const id = currentId || v4();
  db.doc(`users/${userId}/projects/${id}`)
    .set(
      {
        ...project,
        id,
        tools: [],
        modified: Date.now(),
      },
      { merge: true }
    )
    .then(callback)
    .catch((err) => console.error(err.message));
}
