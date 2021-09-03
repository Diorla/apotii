import type { NextPage } from "next";
import Layout from "../components/Layout";
import { useUser } from "../context";
import ProjectCard from "../components/ProjectCard";
import ProjectProps from "../types/ProjectProps";
import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import ToolProps from "../types/ToolProps";
import CategoryProps from "../types/CategoryProps";
import ProjectForm from "../components/ProjectForm";
import CategoryForm from "../components/CategoryForm";
import ToolForm from "../components/ToolForm";
import styled from "styled-components";

const GridWrapper = styled.div`
  display: flex;
  column-gap: 4px;
  flex-wrap: wrap;
  align-items: baseline;
  padding: 4px;
`;
const Home: NextPage = () => {
  const {
    user,
    user: { uid, categories = [] },
    projects,
    loadingProjects,
  } = useUser();
  const [project, setProject] = useState<ProjectProps>({
    id: "",
    name: "",
    description: "",
    projectTools: [],
    modified: Date.now(),
  });
  const [openProjectModal, setOpenProjectModal] = useState(false);
  const [tool, setTool] = useState<ToolProps>({
    id: "",
    name: "",
    category: "",
    rating: 1,
    description: "",
  });
  const [openTool, setOpenTool] = useState(false);

  const [category, setCategory] = useState<CategoryProps>({
    name: "",
    description: "",
  });
  const [openCategory, setOpenCategory] = useState(false);

  const options = [
    { name: "Misc", description: "The default categories" },
    ...categories,
  ].map((item) => {
    return {
      value: item.name,
      text: item.name,
    };
  });

  const categoryError = categories
    .map((item) => item.name)
    .includes(category.name);

  if (loadingProjects) return <div>Projects loading</div>;
  return (
    <Layout path="Projects">
      <Grid.Row>
        <ProjectForm
          setOpenProjectModal={setOpenProjectModal}
          openProjectModal={openProjectModal}
          uid={uid}
          project={project}
          setProject={setProject}
        />
        <CategoryForm
          setOpenCategory={setOpenCategory}
          openCategory={openCategory}
          user={user}
          category={category}
          categoryError={categoryError}
          setCategory={setCategory}
        />
        <ToolForm
          setOpenTool={setOpenTool}
          openTool={openTool}
          uid={uid}
          tool={tool}
          setTool={setTool}
          options={options}
        />
      </Grid.Row>

      <GridWrapper>
        {projects.map((item) => (
          <ProjectCard key={item.id} project={item} />
        ))}
      </GridWrapper>
    </Layout>
  );
};

export default Home;
