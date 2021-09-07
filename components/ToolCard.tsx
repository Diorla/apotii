import Link from "next/link";
import React, { useState } from "react";
import { Button, Card, Rating } from "semantic-ui-react";
import { ConfirmState } from "../types/ConfirmProps";
import ToolProps from "../types/ToolProps";
import Confirm from "./Confirm";
import firebase from "../firebase/init";
import { useUser } from "../context";

export default function ToolCard({
  tool,
  deleteFn,
  deleteText,
}: {
  tool: ToolProps;
  deleteFn?: () => void;
  deleteText?: string;
}) {
  const [current, setCurrent] = useState<ConfirmState>({
    header: "",
    message: "",
    open: false,
  });
  const {
    user: { uid },
  } = useUser();
  return (
    <Card>
      <Confirm
        open={current.open}
        header={current.header}
        message={current.message}
        acceptFn={() => {
          firebase
            .firestore()
            .doc(`users/${uid}/tools/${tool.id}`)
            .delete()
            .then(() =>
              setCurrent({
                header: "",
                message: "",
                open: false,
              })
            );
        }}
        cancelFn={() =>
          setCurrent({
            header: "",
            message: "",
            open: false,
          })
        }
      />
      <Card.Content>
        <Card.Header>{tool.name}</Card.Header>
        <Card.Meta>
          <Rating
            maxRating={5}
            defaultRating={tool.rating}
            icon="star"
            disabled
          />
          <div>
            <Link href={`/category/${tool.category}`} passHref>
              {tool.category}
            </Link>
          </div>
        </Card.Meta>
        <Card.Description>{tool.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Link href={`/tool/${tool.id}`} passHref>
            <Button basic color="green">
              Open
            </Button>
          </Link>
          <Button
            basic
            color="red"
            onClick={() =>
              deleteFn
                ? deleteFn()
                : setCurrent({
                    header: `Delete ${tool.name}`,
                    message: `This action cannot be undone`,
                    open: true,
                  })
            }
          >
            {deleteText || "Delete"}
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}
