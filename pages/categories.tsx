import type { NextPage } from "next";
import { Card, Grid, List } from "semantic-ui-react";
import { useUser } from "../context";
import Layout from "../components/Layout";
import React, { useState } from "react";
import CategoryCard from "../components/CategoryCard";
import updateCategory from "../firebase/updateCategory";
import addTool from "../firebase/addTool";
import CategoryForm from "../components/CategoryForm";
import CategoryProps from "../types/CategoryProps";

// TODO: Add category form
/**
 * A modal to create new category
 * Another modal to add a tool to the current category
 */
const Categories: NextPage = () => {
  const {
    user,
    user: { categories = [], uid },
    tools,
  } = useUser();

  const [state, setState] = useState<CategoryProps>({
    name: "",
    description: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const deleteCategory = (name: string) => {
    const tempCategory = categories.filter((item) => item.name !== name);
    updateCategory(user, tempCategory, () => {
      tools.forEach((item) => {
        if (item.category === name) {
          // TODO: Use batch write
          const tempTool = { ...item, category: "Misc" };
          addTool(uid, tempTool, () => console.log(`${tempTool.name} updated`));
        }
      });
    });
  };
  const miscLength = tools.filter((item) => item.category === "Misc").length;
  return (
    <Layout path="Categories">
      <Grid.Row>
        <CategoryForm
          setOpenCategory={setOpenModal}
          openCategory={openModal}
          category={state}
          setCategory={setState}
        />
      </Grid.Row>
      <Card.Group>
        {miscLength && (
          <CategoryCard
            category={{ name: "Misc", description: "Default category" }}
          />
        )}
        {categories
          .sort((prev, next) =>
            prev.name.toLowerCase() > next.name.toLowerCase() ? 1 : -1
          )
          .map((category, idx) => (
            <CategoryCard
              category={category}
              key={idx}
              deleteFn={() => deleteCategory(category.name)}
            />
          ))}
      </Card.Group>
    </Layout>
  );
};

export default Categories;
