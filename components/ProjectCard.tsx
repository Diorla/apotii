import ProjectProps from "../types/ProjectProps";
import { Card, List, Button } from "semantic-ui-react";
import Link from "next/link";

export default function ProjectCard({ project }: { project: ProjectProps }) {
  const { id, name, description, projectTools = [], modified } = project;
  return (
    <Card>
      <Card.Content header={name} />
      <Card.Content>
        <Card.Meta>{new Date(modified).toDateString()}</Card.Meta>
        <Card.Content description={description} />
        <Link href={`projects/${id}`} passHref>
          <Button size="mini" primary>
            Open
          </Button>
        </Link>
      </Card.Content>
      <Card.Content extra>
        {projectTools.length ? (
          <List>
            {projectTools.map((item) => (
              <List.Item key={item.toolID}>{item.toolName}</List.Item>
            ))}
          </List>
        ) : (
          <div>No tools added</div>
        )}
      </Card.Content>
    </Card>
  );
}
