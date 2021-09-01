import type { NextPage } from "next";
import Layout from "../components/Layout";
import { useUser } from "../context";
import firebase from "../firebase/init";
import { v4 } from "uuid";
import ProjectCard from "../components/ProjectCard";
import ProjectProps from "../types/ProjectProps";
import React, { useState } from "react";
import { Button, Form, Rating, Select, TextArea } from "semantic-ui-react";
import FormModal from "../components/FormModal";
import ToolProps from "../types/ToolProps";
import CategoryProps from "../types/CategoryProps";

const Home: NextPage = () => {
  const {
    user: { uid, categories = [], displayName, email, photoURL },
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
  const addProject = () => {
    const db = firebase.firestore();
    if (!project.name) return 0;
    const id = v4();
    db.doc(`users/${uid}/projects/${id}`)
      .set({
        ...project,
        id,
        tools: [],
        modified: Date.now(),
      })
      .then(() => setOpenProjectModal(false))
      .then(() =>
        setProject({
          id: "",
          name: "",
          description: "",
          projectTools: [],
          modified: Date.now(),
        })
      )
      .catch((err) => console.error(err.message));
  };
  const options = [
    { name: "Misc", description: "The default categories" },
    ...categories,
  ].map((item) => {
    return {
      value: item.name,
      text: item.name,
    };
  });

  const addTool = () => {
    const db = firebase.firestore();
    if (!tool.name) return 0;
    const id = v4();
    db.doc(`users/${uid}/tools/${id}`)
      .set({
        ...tool,
        id,
        modified: Date.now(),
      })
      .then(() => setOpenTool(false))
      .then(() =>
        setTool({
          id: "",
          name: "",
          category: "",
          rating: 1,
          description: "",
        })
      )
      .catch((err) => console.error(err.message));
  };

  const categoryError = categories
    .map((item) => item.name)
    .includes(category.name);
  const addCategory = () => {
    if (!category.name) return 0;
    if (categoryError) return 0;
    const db = firebase.firestore();
    db.doc(`users/${uid}`)
      .set(
        {
          uid,
          displayName,
          email,
          photoURL,
          categories: [...categories, category],
        },
        { merge: true }
      )
      .then(() => setOpenCategory(false))
      .then(() =>
        setCategory({
          name: "",
          description: "",
        })
      )
      .catch((err) => console.error(err.message));
  };
  if (loadingProjects) return <div>Projects loading</div>;
  return (
    <Layout>
      <FormModal
        title="Create new project"
        trigger={
          <Button onClick={() => setOpenProjectModal(!openProjectModal)}>
            New Project
          </Button>
        }
        open={openProjectModal}
        toggleModal={setOpenProjectModal}
        submit={addProject}
      >
        <Form>
          <Form.Field>
            <label>Name</label>
            <input
              placeholder="Facebook, Twitter"
              value={project.name}
              onChange={(e) =>
                setProject({
                  ...project,
                  name: e.target.value,
                })
              }
            />
          </Form.Field>
          <Form.Field
            control={TextArea}
            label="About"
            placeholder="Describe the project"
            value={project.description}
            onChange={(e: any) =>
              setProject({
                ...project,
                description: e.target.value,
              })
            }
          />
        </Form>
      </FormModal>
      <FormModal
        title="Create new category"
        trigger={
          <Button onClick={() => setOpenCategory(!openCategory)}>
            New Category
          </Button>
        }
        open={openCategory}
        toggleModal={setOpenCategory}
        submit={addCategory}
      >
        <Form>
          <Form.Field error={categoryError}>
            <label>Name{categoryError && ": (Category already exist)"}</label>
            <input
              placeholder="Frontend, Storage, CMS"
              value={category.name}
              onChange={(e) =>
                setCategory({
                  ...category,
                  name: e.target.value,
                })
              }
            />
          </Form.Field>
          <Form.Field
            control={TextArea}
            label="About"
            placeholder="Describe the category"
            value={category.description}
            onChange={(e: any) =>
              setCategory({
                ...category,
                description: e.target.value,
              })
            }
          />
        </Form>
      </FormModal>

      <FormModal
        title="Create new tool"
        trigger={
          <Button onClick={() => setOpenTool(!openTool)}>New tool</Button>
        }
        open={openTool}
        toggleModal={setOpenTool}
        submit={addTool}
      >
        <Form>
          <Form.Field>
            <label>Name</label>
            <input
              placeholder="React, Electron, Vanilla JS"
              value={tool.name}
              onChange={(e) =>
                setTool({
                  ...tool,
                  name: e.target.value,
                })
              }
            />
          </Form.Field>
          <Form.Field
            control={TextArea}
            label="About"
            placeholder="Describe the tool, framework or library"
            value={tool.description}
            onChange={(e: any) =>
              setTool({
                ...tool,
                description: e.target.value,
              })
            }
          />
          <Form.Field>
            <label htmlFor="select category">Select Category</label>
            <Select
              placeholder="Select your country"
              options={options}
              value={tool.category}
              onChange={(_e, data) =>
                setTool({
                  ...tool,
                  category: String(data.value),
                })
              }
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="rating">Rating</label>
            <Rating
              id="rating"
              icon="star"
              defaultRating={tool.rating}
              value={tool.rating}
              maxRating={5}
              onRate={(_e, data) =>
                setTool({
                  ...tool,
                  rating: Number(data.rating),
                })
              }
            />
          </Form.Field>
        </Form>
      </FormModal>
      {projects.map((item) => (
        <ProjectCard key={item.id} project={item} />
      ))}
    </Layout>
  );
};

export default Home;
