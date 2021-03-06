import type { NextPage } from "next";
import Layout from "../components/Layout";
import { useUser } from "../context";
import ProjectCard from "../components/ProjectCard";
import ProjectProps from "../types/ProjectProps";
import React, { useState } from "react";
import { Card } from "semantic-ui-react";
import ToolProps from "../types/ToolProps";
import CategoryProps from "../types/CategoryProps";
import ProjectForm from "../components/ProjectForm";
import CategoryForm from "../components/CategoryForm";
import ToolForm from "../components/ToolForm";
import ButtonWrapper from "../components/ButtonWrapper";

const Home: NextPage = () => {
  const { projects, loadingProjects } = useUser();
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
  const [search, setSearch] = useState("");

  if (loadingProjects)
    return <Layout path="Projects">Project is loading</Layout>;
  return (
    <Layout
      path="Projects"
      searchValue={search}
      searchFn={(val) => setSearch(val)}
    >
      <ButtonWrapper>
        <ProjectForm
          setOpenProjectModal={setOpenProjectModal}
          openProjectModal={openProjectModal}
          project={project}
          setProject={setProject}
        />
        <CategoryForm
          setOpenCategory={setOpenCategory}
          openCategory={openCategory}
          category={category}
          setCategory={setCategory}
        />
        <ToolForm
          setOpenTool={setOpenTool}
          openTool={openTool}
          tool={tool}
          setTool={setTool}
        />
      </ButtonWrapper>

      <Card.Group>
        {projects
          .filter((item) =>
            `${item.name} ${item.description}`
              .toLowerCase()
              .includes(search.toLowerCase())
          )
          .map((item) => (
            <ProjectCard key={item.id} project={item} />
          ))}
      </Card.Group>
    </Layout>
  );
};

export default Home;
