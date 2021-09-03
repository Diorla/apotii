import ProjectProps from "../types/ProjectProps";
import React from "react";
import { Button, Form, TextArea } from "semantic-ui-react";
import FormModal from "./FormModal";
import addProject from "../firebase/addProject";

export default function ProjectForm({
  setOpenProjectModal,
  openProjectModal,
  uid,
  project,
  setProject,
}: {
  setOpenProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
  openProjectModal: boolean;
  uid: string;
  project: ProjectProps;
  setProject: React.Dispatch<React.SetStateAction<ProjectProps>>;
}) {
  return (
    <FormModal
      title="Create new project"
      trigger={
        <Button onClick={() => setOpenProjectModal(!openProjectModal)}>
          New Project
        </Button>
      }
      open={openProjectModal}
      toggleModal={setOpenProjectModal}
      submit={() =>
        addProject(uid, project, () => {
          setOpenProjectModal(false);
          setProject({
            id: "",
            name: "",
            description: "",
            projectTools: [],
            modified: Date.now(),
          });
        })
      }
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
  );
}
