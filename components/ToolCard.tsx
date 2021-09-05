import Link from "next/link";
import React from "react";
import { Button, Card } from "semantic-ui-react";
import ToolProps from "../types/ToolProps";

export default function ToolCard({
  tool,
  deleteFn,
}: {
  tool: ToolProps;
  deleteFn?: () => void;
}) {
  return (
    <Card>
      <Card.Content>
        <Card.Header>{tool.name}</Card.Header>
        <Card.Meta>{tool.category}</Card.Meta>
        <Card.Description>{tool.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Link href={`/tool/${tool.id}`} passHref>
            <Button basic color="green">
              Open
            </Button>
          </Link>
          <Button basic color="red" onClick={() => deleteFn && deleteFn()}>
            Delete
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}
