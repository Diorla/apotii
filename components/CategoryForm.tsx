import React from "react";
import { Button, Form, TextArea } from "semantic-ui-react";
import FormModal from "./FormModal";
import CategoryProps from "../types/CategoryProps";
import addCategory from "../firebase/addCategory";
import UserProps from "../types/UserProps";

export default function CategoryForm({
  setOpenCategory,
  openCategory,
  user,
  category,
  categoryError,
  setCategory,
}: {
  setOpenCategory: React.Dispatch<React.SetStateAction<boolean>>;
  openCategory: boolean;
  user: UserProps;
  category: CategoryProps;
  categoryError: boolean;
  setCategory: React.Dispatch<React.SetStateAction<CategoryProps>>;
}) {
  return (
    <FormModal
      title="Create new category"
      trigger={
        <Button onClick={() => setOpenCategory(!openCategory)}>
          New Category
        </Button>
      }
      open={openCategory}
      toggleModal={setOpenCategory}
      submit={() =>
        addCategory(user, category, categoryError, () => {
          setOpenCategory(false);
          setCategory({
            name: "",
            description: "",
          });
        })
      }
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
  );
}
