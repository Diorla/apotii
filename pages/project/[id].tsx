import { useRouter } from "next/router";
import { useUser } from "../../context";
import Layout from "../../components/Layout";
import { Breadcrumb, Button, Form, List, Radio } from "semantic-ui-react";
import Link from "next/link";
import ToolProps from "../../types/ToolProps";
import React, { useState } from "react";
import addProject from "../../firebase/addProject";
import toolsType from "../../types/toolsType";

// TODO: Add the following
/**
 * Turn add tools to modal
 * Enable selection and deselection of categories
 * Add delete to tools, categories and projects
 * Deleting categories will not delete the sub-tools, but they will not appear for selection in project
 * Deleting tools will not remove them from projects, but they will not be available for selection in project
 * @param tools
 * @param initialList
 * @returns
 */
const selectInitialValue = (tools: ToolProps[], initialList: toolsType[]) => {
  let initialId = "";
  initialList.forEach((item) => {
    if (tools.map((item) => item.id).includes(item.toolID))
      initialId = item.toolID;
  });
  return initialId;
};
const Options = ({
  tools,
  name,
  updateList,
  initialList,
}: {
  tools: ToolProps[];
  name: string;
  updateList: (prev: string, next: string) => void;
  initialList: toolsType[];
}) => {
  const [state, setState] = useState({
    value: selectInitialValue(tools, initialList),
  });
  const handleChange = (value: string) => setState({ value });

  return (
    <Form>
      <Form.Field>{name}</Form.Field>
      {tools.map((item) => (
        <Form.Field key={item.id}>
          <Radio
            label={item.name}
            name="radioGroup"
            value={state.value}
            checked={state.value === item.id}
            onChange={() => {
              updateList(state.value, item.id);
              handleChange(item.id);
            }}
          />
        </Form.Field>
      ))}
    </Form>
  );
};

const convertToolsListToObj = (tools: ToolProps[]) => {
  const toolsObj: { [key: string]: ToolProps } = {};
  const categoryList: { [key: string]: ToolProps[] } = {};
  tools.forEach((item) => {
    const { id, category } = item;
    toolsObj[id] = item;
    if (categoryList[category]) categoryList[category].push(item);
    else categoryList[category] = [item];
  });
  return { toolsObj, categoryList };
};

export default function Projects() {
  const {
    projects,
    tools,
    user: { uid },
  } = useUser();

  const router = useRouter();
  const { id } = router.query;
  const [toolList, setToolList] = useState<string[]>([]);

  const { toolsObj, categoryList } = convertToolsListToObj(tools);

  const updateToolList = (prev: string, next: string) => {
    const idx = toolList.findIndex((item) => item === prev);
    setToolList([...toolList.slice(0, idx), ...toolList.slice(idx + 1), next]);
  };

  const project = projects.filter((item) => item.id === id);
  const updateProject = () => {
    const { id, name, description } = project[0];
    const projectTools: toolsType[] = tools
      .filter((item) => toolList.includes(item.id))
      .map((item) => {
        const toolItem: toolsType = {
          toolID: item.id,
          toolName: item.name,
        };
        return toolItem;
      });

    addProject(
      uid,
      { id, name, description, projectTools, modified: Date.now() },
      () => console.log("hello there"),
      id
    );
  };

  if (project[0]) {
    const { modified, name, projectTools = [] } = project[0];
    return (
      <Layout path="Projects">
        <Breadcrumb>
          <Link href="/" passHref>
            <Breadcrumb.Section link>Projects</Breadcrumb.Section>
          </Link>
          <Breadcrumb.Divider />
          <Breadcrumb.Section active>{name}</Breadcrumb.Section>
        </Breadcrumb>
        <div> Created: {new Date(modified).toDateString()}</div>
        <Button>Edit tools</Button>
        <div>
          {Object.keys(categoryList).map((item, idx) => (
            <Options
              name={item}
              tools={categoryList[item]}
              key={idx}
              updateList={updateToolList}
              initialList={project[0].projectTools}
            />
          ))}
          <Button onClick={updateProject}>Save</Button>
        </div>
        {projectTools.length ? (
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
        ) : (
          <div>No tools added yet</div>
        )}
      </Layout>
    );
  }
  return <Layout path="Projects">Sorry, project not found</Layout>;
}
