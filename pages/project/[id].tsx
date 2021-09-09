import router from "next/router";
import Layout from "../../components/Layout";
import Project from "../../containers/Project";

export default function ProjectID() {
  const { id } = router.query;
  if (id && typeof id === "string") return <Project id={id} />;
  return <Layout path="Projects">Sorry, project not found</Layout>;
}
