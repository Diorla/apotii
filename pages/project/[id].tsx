import { useRouter } from "next/router";
import { useUser } from "../../context";
import Layout from "../../components/Layout";
import { Breadcrumb, List } from "semantic-ui-react";
import Link from "next/link";
import ToolProps from "../../types/ToolProps";

const convertToolsListToObj = (tools: ToolProps[]) => {
  const obj: { [key: string]: ToolProps } = {};
  tools.forEach((item) => {
    const { id } = item;
    obj[id] = {
      ...item,
    };
  });
  return obj;
};

export default function Projects() {
  const { projects, tools } = useUser();
  const router = useRouter();
  const { id } = router.query;

  const toolsObj = convertToolsListToObj(tools);

  const project = projects.filter((item) => item.id === id);
  console.log(project[0]);
  if (project[0]) {
    const { modified, name, projectTools = [] } = project[0];
    return (
      <Layout>
        <Breadcrumb>
          <Link href="/" passHref>
            <Breadcrumb.Section link>Projects</Breadcrumb.Section>
          </Link>
          <Breadcrumb.Divider />
          <Breadcrumb.Section active>{name}</Breadcrumb.Section>
        </Breadcrumb>
        <div> Created: {new Date(modified).toDateString()}</div>
        <List>
          {projectTools.map((tool) => (
            <List.Content key={tool.toolID}>
              <List.Header>{toolsObj[tool.toolID].name}</List.Header>
              <Link href="/categories" passHref>
                <List.Description as="a">
                  {toolsObj[tool.toolID].category}
                </List.Description>
              </Link>
              <Link href="/categories" passHref>
                <List.Description as="a">
                  {toolsObj[tool.toolID].category}
                </List.Description>
              </Link>
              <List.Description>
                {toolsObj[tool.toolID].description}
              </List.Description>
            </List.Content>
          ))}
        </List>
      </Layout>
    );
  }
  return <Layout>Sorry, project not found</Layout>;
}
