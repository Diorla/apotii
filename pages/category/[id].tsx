import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Breadcrumb, Card, Grid, List } from "semantic-ui-react";
import CategoryCard from "../../components/CategoryCard";
import Layout from "../../components/Layout";
import ToolCard from "../../components/ToolCard";
import { useUser } from "../../context";

export default function Category() {
  const router = useRouter();
  const { id } = router.query;
  const { tools, loadingTools } = useUser();

  const filteredTools = tools.filter((item) => item.category === id);
  if (loadingTools) return <div>Loading tools</div>;
  return (
    <Layout path="Categories">
      <Grid.Row>
        <Breadcrumb>
          <Link href="/categories" passHref>
            <Breadcrumb.Section link>Categories</Breadcrumb.Section>
          </Link>
          <Breadcrumb.Divider />
          <Breadcrumb.Section active>{id}</Breadcrumb.Section>
        </Breadcrumb>
      </Grid.Row>
      {filteredTools.length ? (
        <Card.Group>
          {filteredTools.map((item) => (
            <ToolCard tool={item} key={item.id} />
          ))}
        </Card.Group>
      ) : (
        <div>No tools in this categories</div>
      )}
    </Layout>
  );
}
