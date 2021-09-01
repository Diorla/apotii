import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { List } from "semantic-ui-react";
import Layout from "../../components/Layout";
import { useUser } from "../../context";

export default function Category() {
  const router = useRouter();
  const { id } = router.query;
  const { tools, loadingTools } = useUser();

  const filteredTools = tools.filter((item) => item.category === id);
  if (loadingTools) return <div>Loading tools</div>;
  return (
    <Layout>
      {filteredTools.length ? (
        <List>
          {filteredTools.map((item) => (
            <List.Content key={item.id}>
              <List.Header>{item.name}</List.Header>
              <Link href={`/tools/${item.id}`} passHref>
                <List.Description as="a">{item.description}</List.Description>
              </Link>
            </List.Content>
          ))}
        </List>
      ) : (
        <div>No tools in this categories</div>
      )}
    </Layout>
  );
}
