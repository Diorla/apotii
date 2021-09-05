import Link from "next/link";
import React from "react";
import { Card, List } from "semantic-ui-react";
import Layout from "../components/Layout";
import ToolCard from "../components/ToolCard";
import { useUser } from "../context";

export default function Category() {
  const { tools, loadingTools } = useUser();

  if (loadingTools) return <div>Loading tools</div>;
  return (
    <Layout path="Tools">
      {tools.length ? (
        <Card.Group>
          {tools.map((item) => (
            <ToolCard tool={item} key={item.id} />
          ))}
        </Card.Group>
      ) : (
        <div>No tools added yet</div>
      )}
    </Layout>
  );
}
