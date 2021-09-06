import React, { useState } from "react";
import { Card, List } from "semantic-ui-react";
import pluralize from "../scripts/pluralize";
import toolsType from "../types/toolsType";

export default function ProjectList({ list }: { list: toolsType[] }) {
  const length = list.length;

  if (!length) return <Card.Content extra>No tools added</Card.Content>;
  return (
    <Card.Content extra>
      <div>
        {list.length} {pluralize("tool", list.length)}
      </div>
      <div>
        {list.map((item) => (
          <React.Fragment key={item.toolID}>
            <span style={{ textDecoration: "underline" }}>{item.toolName}</span>{" "}
          </React.Fragment>
        ))}
      </div>
    </Card.Content>
  );
}
