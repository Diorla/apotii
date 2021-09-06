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
import firebase from "../firebase/init";
import ButtonWrapper from "../components/ButtonWrapper";

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
      const db = firebase.firestore();
      const batch = db.batch();
      tools.forEach((item) => {
        if (item.category === name) {
          const tempTool = { ...item, category: "Misc" };
          const docRef = db.doc(`users/${uid}/tools/${item.id}`);
          batch.update(docRef, tempTool);
        }
      });
      batch.commit().then((value) => console.log(value));
    });
  };
  const miscLength = tools.filter((item) => item.category === "Misc").length;
  const [search, setSearch] = useState("");
  return (
    <Layout
      path="Categories"
      searchValue={search}
      searchFn={(val) => setSearch(val)}
    >
      <ButtonWrapper>
        <CategoryForm
          setOpenCategory={setOpenModal}
          openCategory={openModal}
          category={state}
          setCategory={setState}
        />
      </ButtonWrapper>
      <Card.Group>
        {miscLength && !search && (
          <CategoryCard
            category={{ name: "Misc", description: "Default category" }}
          />
        )}
        {categories
          .filter((item) =>
            `${item.name} ${item.description}`
              .toLowerCase()
              .includes(search.toLowerCase())
          )
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
