import { useRouter } from "next/router";
import { useUser } from "../../context";
import Layout from "../../components/Layout";
import { Breadcrumb, Button, Card } from "semantic-ui-react";
import Link from "next/link";
import ToolProps from "../../types/ToolProps";
import React, { useEffect, useState } from "react";
import addProject from "../../firebase/addProject";
import toolsType from "../../types/toolsType";
import FormModal from "../../components/FormModal";
import RadioOptions from "../../components/RadioOptions";
import ToolCard from "../../components/ToolCard";
import getSubTools from "../../scripts/getSubTools";
import ButtonWrapper from "../../components/ButtonWrapper";

const convertToolsListToObj = (tools: ToolProps[]) => {
  const toolsObj: { [key: string]: ToolProps } = {};
  const catList: { [key: string]: ToolProps[] } = {};
  tools.forEach((item) => {
    const { id, category } = item;
    toolsObj[id] = item;
    if (catList[category]) catList[category].push(item);
    else catList[category] = [item];
  });
  return { toolsObj, catList };
};

export default function Projects() {
  const {
    projects,
    tools,
    user: { uid },
  } = useUser();

  const router = useRouter();
  const { id } = router.query;
  const project = projects.filter((item) => item.id === id);
  const currentProject = project[0];
  const [openEditTools, setOpenEditTools] = useState(false);
  const [filterTwo, setFilterTwo] = useState(false);
  const [filteredCategoryList, setFilteredCategoryList] = useState<{
    [key: string]: ToolProps[];
  }>({});
  const [toolsObj, setToolsObj] = useState<{ [key: string]: ToolProps }>({});
  const [categoryList, setCategoryList] = useState<{
    [key: string]: ToolProps[];
  }>({});
  useEffect(() => {
    const { toolsObj, catList } = convertToolsListToObj(tools);
    setToolsObj(toolsObj);
    setCategoryList(catList);
    const temp: { [key: string]: ToolProps[] } = {};
    Object.keys(catList).forEach((item) => {
      temp[item] = getSubTools(catList[item], true);
    });
    setFilteredCategoryList(temp);
  }, [tools]);

  const updateToolList = (prev: string, next: string) => {
    const idx = toolList.findIndex((item) => item === prev);
    setToolList([...toolList.slice(0, idx), ...toolList.slice(idx + 1), next]);
  };

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
      () => console.log("updated"),
      id
    );
  };
  const removeTool = (toolId: string) => {
    const { projectTools, id, name, description } = currentProject;
    const updatedTools = projectTools.filter((item) => item.toolID !== toolId);
    addProject(
      uid,
      {
        id,
        name,
        description,
        projectTools: updatedTools,
        modified: Date.now(),
      },
      () => console.log("updated"),
      id
    );
  };
  const [toolList, setToolList] = useState<string[]>(
    currentProject?.projectTools?.map((item) => item.toolID) || []
  );

  if (currentProject) {
    const { name, projectTools = [] } = project[0];
    return (
      <Layout path="Projects">
        <ButtonWrapper>
          <Breadcrumb>
            <Link href="/" passHref>
              <Breadcrumb.Section link>Projects</Breadcrumb.Section>
            </Link>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>{name}</Breadcrumb.Section>
          </Breadcrumb>
        </ButtonWrapper>

        <ButtonWrapper>
          <FormModal
            title="Edit tools"
            trigger={
              <Button onClick={() => setOpenEditTools(!openEditTools)}>
                Update tools
              </Button>
            }
            open={openEditTools}
            toggleModal={setOpenEditTools}
            submit={() => {
              updateProject();
              setOpenEditTools(!openEditTools);
            }}
          >
            {filterTwo ? (
              <Button onClick={() => setFilterTwo(!filterTwo)}>Show all</Button>
            ) : (
              <Button onClick={() => setFilterTwo(!filterTwo)}>Top two</Button>
            )}
            {Object.keys(filteredCategoryList).map((item, idx) => (
              <RadioOptions
                style={{ display: !filterTwo ? "none" : "initial" }}
                name={item}
                tools={filteredCategoryList[item]}
                key={idx}
                updateList={updateToolList}
                initialList={project[0].projectTools}
              />
            ))}
            {Object.keys(categoryList).map((item, idx) => (
              <RadioOptions
                style={{ display: filterTwo ? "none" : "initial" }}
                name={item}
                tools={categoryList[item]}
                key={idx}
                updateList={updateToolList}
                initialList={project[0].projectTools}
              />
            ))}
          </FormModal>
        </ButtonWrapper>
        {projectTools.length ? (
          <Card.Group>
            {projectTools?.map((tool) => {
              if (toolsObj[tool.toolID])
                return (
                  <ToolCard
                    tool={toolsObj[tool.toolID]}
                    key={tool.toolID}
                    deleteText="Remove tool"
                    deleteFn={() => removeTool(tool.toolID)}
                  />
                );
            })}
          </Card.Group>
        ) : (
          <div>No tools added yet</div>
        )}
      </Layout>
    );
  }
  return <Layout path="Projects">Sorry, project not found</Layout>;
}
