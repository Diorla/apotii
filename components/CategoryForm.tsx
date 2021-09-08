import React from "react";
import { Button, Form, TextArea } from "semantic-ui-react";
import FormModal from "./FormModal";
import CategoryProps from "../types/CategoryProps";
import addCategory from "../firebase/addCategory";
import { useUser } from "../context";
import { toast } from "react-toastify";

export default function CategoryForm({
  setOpenCategory,
  openCategory,
  category,
  setCategory,
}: {
  setOpenCategory: React.Dispatch<React.SetStateAction<boolean>>;
  openCategory: boolean;
  category: CategoryProps;
  setCategory: React.Dispatch<React.SetStateAction<CategoryProps>>;
}) {
  const {
    user,
    user: { categories },
  } = useUser();
  const categoryError = categories
    .map((item) => item.name)
    .includes(category.name);
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
          toast.success(`${category.name} added`);
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
