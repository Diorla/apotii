import React, { useState } from "react";
import { Card, Grid, List } from "semantic-ui-react";
import ButtonWrapper from "../components/ButtonWrapper";
import Layout from "../components/Layout";
import ToolCard from "../components/ToolCard";
import ToolForm from "../components/ToolForm";
import { useUser } from "../context";
import ToolProps from "../types/ToolProps";

export default function Tool() {
  const { tools, loadingTools } = useUser();
  const [openTool, setOpenTool] = useState(false);
  const [tool, setTool] = useState<ToolProps>({
    id: "",
    name: "",
    description: "",
    category: "Misc",
    rating: 1,
  });
  const [search, setSearch] = useState("");
  if (loadingTools) return <div>Loading tools</div>;
  return (
    <Layout
      path="Tools"
      searchValue={search}
      searchFn={(val) => setSearch(val)}
    >
      <ButtonWrapper>
        <ToolForm
          openTool={openTool}
          setOpenTool={setOpenTool}
          tool={tool}
          setTool={setTool}
        />
      </ButtonWrapper>
      <Grid.Row>
        {tools.length ? (
          <Card.Group>
            {tools
              .filter((item) =>
                `${item.name} ${item.description} ${item.category}`
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((item) => (
                <ToolCard tool={item} key={item.id} />
              ))}
          </Card.Group>
        ) : (
          <div>No tools added yet</div>
        )}
      </Grid.Row>
    </Layout>
  );
}
