import Link from "next/link";
import React from "react";
import { Button, Card } from "semantic-ui-react";
import { useUser } from "../context";
import CategoryProps from "../types/CategoryProps";

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
  return (
    <Card>
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
            <Button basic color="red" onClick={() => deleteFn()}>
              Delete
            </Button>
          )}
        </div>
      </Card.Content>
    </Card>
  );
}
