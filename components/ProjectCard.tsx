import ProjectProps from "../types/ProjectProps";
import { Card, Button } from "semantic-ui-react";
import Link from "next/link";
import firebase from "../firebase/init";
import { useUser } from "../context";
import Confirm from "./Confirm";
import React, { useState } from "react";
import ProjectList from "./ProjectList";
import { ConfirmState } from "../types/ConfirmProps";
import Description from "./Description";
import { toast } from "react-toastify";

export default function ProjectCard({ project }: { project: ProjectProps }) {
  const { id, name, description, projectTools = [], modified } = project;
  const {
    user: { uid },
  } = useUser();
  const [current, setCurrent] = useState<ConfirmState>({
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
          firebase
            .firestore()
            .doc(`users/${uid}/projects/${id}`)
            .delete()
            .then(() => toast.error(`${project.name} deleted`))
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
        <Card.Content description={<Description description={description} />} />
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
      <ProjectList list={projectTools} />
    </Card>
  );
}
