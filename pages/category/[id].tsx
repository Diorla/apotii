import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Breadcrumb, List } from "semantic-ui-react";
import Layout from "../../components/Layout";
import { useUser } from "../../context";

export default function Category() {
  const router = useRouter();
  const { id } = router.query;
  const { tools, loadingTools } = useUser();

  const filteredTools = tools.filter((item) => item.category === id);
  if (loadingTools) return <div>Loading tools</div>;
  return (
    <Layout path="Categories">
      <Breadcrumb>
        <Link href="/categories" passHref>
          <Breadcrumb.Section link>Categories</Breadcrumb.Section>
        </Link>
        <Breadcrumb.Divider />
        <Breadcrumb.Section active>{id}</Breadcrumb.Section>
      </Breadcrumb>
      {filteredTools.length ? (
        <div>
          <List>
            {filteredTools.map((item) => (
              <List.Content key={item.id}>
                <List.Header>
                  <Link href={`/tool/${item.id}`} passHref>
                    {item.name}
                  </Link>
                </List.Header>

                <List.Description>{item.description}</List.Description>
              </List.Content>
            ))}
          </List>
        </div>
      ) : (
        <div>No tools in this categories</div>
      )}
    </Layout>
  );
}
