import type { NextPage } from "next";
import { List } from "semantic-ui-react";
import { useUser } from "../context";
import Link from "next/link";
import Layout from "../components/Layout";

const Categories: NextPage = () => {
  const {
    user: { categories = [] },
  } = useUser();
  return (
    <Layout>
      <List>
        {categories.map((category, idx) => (
          <List.Content key={idx}>
            <List.Header>{category.name}</List.Header>
            <Link href={`/category/${category.name}`} passHref>
              <List.Description as="a">{category.description}</List.Description>
            </Link>
          </List.Content>
        ))}
      </List>
    </Layout>
  );
};

export default Categories;
