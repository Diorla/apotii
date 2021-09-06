import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Breadcrumb, Button } from "semantic-ui-react";
import Layout from "../../components/Layout";
import ToolForm from "../../components/ToolForm";
import { useUser } from "../../context";
import ToolProps from "../../types/ToolProp";

export default function Category() {
  const router = useRouter();
  const { id } = router.query;
  const { tools, loadingTools } = useUser();
  const tool = tools.filter((item) => item.id === id);
  const [open, setOpen] = useState(false);
  const [currentTool, setCurrentTool] = useState<ToolProps>(tool[0] || {});
  if (loadingTools) return <div>Loading tools</div>;
  return (
    <Layout path="Tools">
      {tool[0] ? (
        <div>
          <Breadcrumb>
            <Link href="/tools" passHref>
              <Breadcrumb.Section link>Tools</Breadcrumb.Section>
            </Link>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>{tool[0].name}</Breadcrumb.Section>
          </Breadcrumb>
          <div>Name: {tool[0].name} </div>
          <div>Description: {tool[0].description} </div>
          <div>Category: {tool[0].category} </div>
          <div>Rating: {tool[0].rating} </div>
          <ToolForm
            setOpenTool={setOpen}
            openTool={open}
            tool={currentTool}
            setTool={setCurrentTool}
            title="Edit tool"
          />
        </div>
      ) : (
        <div>No tools in this categories</div>
      )}
    </Layout>
  );
}
