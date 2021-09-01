import Link from "next/link";
import React from "react";
import { List } from "semantic-ui-react";
import Layout from "../components/Layout";
import { useUser } from "../context";

export default function Category() {
  const { tools, loadingTools } = useUser();

  if (loadingTools) return <div>Loading tools</div>;
  return (
    <Layout>
      {tools.length ? (
        <List>
          {tools.map((item) => (
            <List.Content key={item.id}>
              <List.Header>{item.name}</List.Header>
              <Link href={`/tool/${item.id}`} passHref>
                <List.Description as="a">{item.description}</List.Description>
              </Link>
            </List.Content>
          ))}
        </List>
      ) : (
        <div>No tools added yet</div>
      )}
    </Layout>
  );
}
