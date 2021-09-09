import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  Breadcrumb,
  Card,
  Container,
  Form,
  Icon,
  TextArea,
} from "semantic-ui-react";
import styled from "styled-components";
import ButtonWrapper from "../../components/ButtonWrapper";
import Layout from "../../components/Layout";
import ToolCard from "../../components/ToolCard";
import ToolForm from "../../components/ToolForm";
import { useUser } from "../../context";
import updateCategory from "../../firebase/updateCategory";
import ToolProps from "../../types/ToolProps";

const Label = styled.label`
  display: flex;
  justify-content: space-between;
  padding-right: 4px;
`;
export default function Category() {
  const router = useRouter();
  const { id } = router.query;
  const {
    tools,
    loadingTools,
    user,
    user: { categories },
  } = useUser();

  const targetCategory = categories.filter((item) => item.name === id);

  const filteredTools = tools.filter((item) => item.category === id);
  const [openTool, setOpenTool] = useState(false);
  const [tool, setTool] = useState<ToolProps>({
    id: "",
    name: "",
    description: "",
    category: typeof id === "string" ? id : "Misc",
    rating: 1,
  });
  const [category, setCategory] = useState(targetCategory[0].description);
  const [changed, setChanged] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const saveDescription = () => {
    const index = categories.findIndex((item) => item.name === id);
    const tempCategories = [
      ...categories.slice(0, index),
      {
        name: categories[index].name,
        description: category,
      },
      ...categories.slice(index + 1),
    ];
    updateCategory(user, tempCategories, () => {
      setChanged(false);
      toast("Description updated");
    });
  };
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
        <Form style={{ width: "clamp(320px, 80%, 640px)", margin: "auto" }}>
          <Label htmlFor="catDesc">
            <span>Description</span>{" "}
            <Icon name="edit" onClick={() => setDisabled(false)} />
          </Label>
          <Form.Field
            id="catDesc"
            control={TextArea}
            placeholder="Describe the category"
            value={category}
            onChange={(e: any) => {
              setCategory(e.target.value);
              setChanged(true);
            }}
            onBlur={() => setDisabled(true)}
            disabled={disabled && !changed}
          />
          {changed && <Form.Button onClick={saveDescription}>Save</Form.Button>}
        </Form>
        <ButtonWrapper />
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
