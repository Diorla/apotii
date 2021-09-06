import Link from "next/link";
import React, { useState } from "react";
import { Button, Card } from "semantic-ui-react";
import { useUser } from "../context";
import CategoryProps from "../types/CategoryProps";
import { ConfirmState } from "../types/ConfirmProps";
import Confirm from "./Confirm";

export default function CategoryCard({
  category,
  deleteFn,
}: {
  category: CategoryProps;
  deleteFn?: () => void;
}) {
  const { tools } = useUser();
  const length = tools?.filter(
    (item) => item.category === category.name
  ).length;
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
        acceptFn={() => {
          setCurrent({
            header: "",
            message: "",
            open: false,
          });
          deleteFn && deleteFn();
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
        <Card.Header>{category.name}</Card.Header>
        <Card.Meta>{length} tools</Card.Meta>
        <Card.Description>{category.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Link href={`/category/${category.name}`} passHref>
            <Button basic color="green">
              Open
            </Button>
          </Link>
          {deleteFn && (
            <Button
              basic
              color="red"
              onClick={() =>
                setCurrent({
                  header: `Delete ${category.name}`,
                  message: `This action cannot be undone`,
                  open: true,
                })
              }
            >
              Delete
            </Button>
          )}
        </div>
      </Card.Content>
    </Card>
  );
}
