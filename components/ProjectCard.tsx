import ProjectProps from "../types/ProjectProps";
import { Card, List, Button } from "semantic-ui-react";
import Link from "next/link";
import firebase from "../firebase/init";
import { useUser } from "../context";
import Confirm from "./Confirm";
import { useState } from "react";
type currentType = {
  header: string;
  message: string;
  open: boolean;
};

const pluralize = (word: string, count?: number) => {
  if (count && count > 1) return `${word}s`;
  return word;
};
export default function ProjectCard({ project }: { project: ProjectProps }) {
  const { id, name, description, projectTools = [], modified } = project;
  const {
    user: { uid },
  } = useUser();
  const [current, setCurrent] = useState<currentType>({
    header: "",
    message: "",
    open: false,
  });
  return (
    <Card>
      <Confirm
        open={current.open}
        header={current.header}
        message={current.message}
        acceptFn={() =>
          firebase.firestore().doc(`users/${uid}/projects/${id}`).delete()
        }
        cancelFn={() =>
          setCurrent({
            header: "",
            message: "",
            open: false,
          })
        }
      />
      <Card.Content header={name} />
      <Card.Content>
        <Card.Meta>{new Date(modified).toDateString()}</Card.Meta>
        <Card.Content description={description} />
        <Link href={`project/${id}`} passHref>
          <Button size="mini" primary>
            Open
          </Button>
        </Link>
        <Button
          size="mini"
          color="red"
          onClick={() =>
            setCurrent({
              header: `Delete ${project.name}`,
              message: `This action cannot be undone`,
              open: true,
            })
          }
        >
          Delete
        </Button>
      </Card.Content>
      <Card.Content extra>
        {projectTools.length ? (
          <div>
            {projectTools.length} {pluralize("tool", projectTools.length)} added
          </div>
        ) : (
          <div>No tools added</div>
        )}
      </Card.Content>
    </Card>
  );
}
