import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Breadcrumb } from "semantic-ui-react";
import ButtonWrapper from "../../components/ButtonWrapper";
import Layout from "../../components/Layout";
import ToolForm from "../../components/ToolForm";
import ToolWrapper from "../../components/ToolWrapper";
import { useUser } from "../../context";
import ToolProps from "../../types/ToolProps";

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
          <ButtonWrapper>
            <Breadcrumb>
              <Link href="/tools" passHref>
                <Breadcrumb.Section link>Tools</Breadcrumb.Section>
              </Link>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>{tool[0].name}</Breadcrumb.Section>
            </Breadcrumb>
          </ButtonWrapper>
          <ToolWrapper tool={tool[0]}>
            <ToolForm
              setOpenTool={setOpen}
              openTool={open}
              tool={currentTool}
              setTool={setCurrentTool}
              title="Edit"
            />
          </ToolWrapper>
        </div>
      ) : (
        <div>No tools in this categories</div>
      )}
    </Layout>
  );
}
