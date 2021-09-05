import type { NextPage } from "next";
import { Card, List } from "semantic-ui-react";
import { useUser } from "../context";
import Layout from "../components/Layout";
import React from "react";
import CategoryCard from "../components/CategoryCard";
import updateCategory from "../firebase/updateCategory";
import addTool from "../firebase/addTool";

const Categories: NextPage = () => {
  const {
    user,
    user: { categories = [], uid },
    tools,
  } = useUser();

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
      <Card.Group>
        {miscLength && (
          <CategoryCard
            category={{ name: "Misc", description: "Default category" }}
          />
        )}
        {categories.map((category, idx) => (
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
