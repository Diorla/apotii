import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/Layout";
import { useUser } from "../../context";

export default function Category() {
  const router = useRouter();
  const { id } = router.query;
  const { tools, loadingTools } = useUser();
  const tool = tools.filter((item) => item.id === id);
  if (loadingTools) return <div>Loading tools</div>;
  return (
    <Layout>
      {tool[0] ? (
        <div>
          <div>Name: {tool[0].name} </div>
          <div>Description: {tool[0].description} </div>
          <div>Category: {tool[0].category} </div>
          <div>Rating: {tool[0].rating} </div>
        </div>
      ) : (
        <div>No tools in this categories</div>
      )}
    </Layout>
  );
}
