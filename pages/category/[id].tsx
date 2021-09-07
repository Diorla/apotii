import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Breadcrumb, Card, Container } from "semantic-ui-react";
import ButtonWrapper from "../../components/ButtonWrapper";
import Layout from "../../components/Layout";
import ToolCard from "../../components/ToolCard";
import ToolForm from "../../components/ToolForm";
import { useUser } from "../../context";
import ToolProps from "../../types/ToolProps";

export default function Category() {
  const router = useRouter();
  const { id } = router.query;
  const { tools, loadingTools } = useUser();

  const filteredTools = tools.filter((item) => item.category === id);
  const [openTool, setOpenTool] = useState(false);
  const [tool, setTool] = useState<ToolProps>({
    id: "",
    name: "",
    description: "",
    category: typeof id === "string" ? id : "Misc",
    rating: 1,
  });
  if (loadingTools) return <div>Loading tools</div>;
  return (
    <Layout path="Categories">
      <Container fluid>
        <ButtonWrapper>
          <Breadcrumb>
            <Link href="/categories" passHref>
              <Breadcrumb.Section link>Categories</Breadcrumb.Section>
            </Link>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>{id}</Breadcrumb.Section>
          </Breadcrumb>
        </ButtonWrapper>
        <ButtonWrapper>
          <ToolForm
            openTool={openTool}
            setOpenTool={setOpenTool}
            tool={tool}
            setTool={setTool}
          />
        </ButtonWrapper>
        {filteredTools.length ? (
          <Card.Group>
            {filteredTools.map((item) => (
              <ToolCard tool={item} key={item.id} />
            ))}
          </Card.Group>
        ) : (
          <div>No tools in this categories</div>
        )}
      </Container>
    </Layout>
  );
}
