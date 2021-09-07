import Link from "next/link";
import React from "react";
import { Card, Rating } from "semantic-ui-react";
import styled from "styled-components";
import ToolProps from "../types/ToolProps";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export default function ToolWrapper({
  tool,
  children,
}: {
  tool: ToolProps;
  children: React.ReactNode;
}) {
  return (
    <StyledWrapper>
      <Card
        color="red"
        style={{ minHeight: 150, width: "clamp(320px, 80%, 640px)" }}
      >
        <Card.Content>
          <Card.Header>{tool.name}</Card.Header>
          <Card.Meta>
            <Link href={`/category/${tool.category}`} passHref>
              {tool.category}
            </Link>
          </Card.Meta>
          <Card.Description>
            {tool.description || "No description provided"}
          </Card.Description>
          <div>{children}</div>
        </Card.Content>
        <Card.Content extra>
          <Rating
            maxRating={5}
            defaultRating={tool.rating}
            icon="star"
            disabled
          />
        </Card.Content>
      </Card>
    </StyledWrapper>
  );
}
