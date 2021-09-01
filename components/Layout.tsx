import React from "react";
import { useUser } from "../context";
import SignInForm from "./SignInForm";
import Link from "next/link";
import styled from "styled-components";

const Header = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 4px;
  border-bottom: 1px solid silver;
`;

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, loadingUser } = useUser();
  if (loadingUser) return <div>App is loading</div>;
  if (user.uid)
    return (
      <div>
        <Header>
          <Link href="/">
            <a>Projects</a>
          </Link>
          <Link href="categories">
            <a>Categories</a>
          </Link>
          <Link href="tools">
            <a>Tools</a>
          </Link>
        </Header>
        <div>{children}</div>
      </div>
    );
  return <SignInForm />;
};

export default Layout;
