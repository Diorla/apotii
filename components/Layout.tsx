import React, { useState } from "react";
import { useUser } from "../context";
import SignInForm from "./SignInForm";
import Link from "next/link";
import { Menu, Input, Grid, Container } from "semantic-ui-react";

const Layout = ({
  children,
  path,
  searchValue,
  searchFn,
}: {
  children: React.ReactNode;
  path: string;
  searchValue?: string;
  searchFn?: (e: string) => void;
}) => {
  const { user, loadingUser } = useUser();
  if (loadingUser) return <div>App is loading</div>;
  if (user.uid)
    return (
      <Container fluid>
        <Menu secondary>
          <Link href="/" passHref>
            <Menu.Item name="Home" active={path === "Projects"} />
          </Link>
          <Link href="/categories" passHref>
            <Menu.Item name="Categories" active={path === "Categories"} />
          </Link>
          <Link href="/tools" passHref>
            <Menu.Item name="Tools" active={path === "Tools"} />
          </Link>
          <Menu.Menu position="right">
            {searchFn && (
              <Menu.Item>
                <Input
                  icon="search"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={(e) => searchFn(e.target.value)}
                />
              </Menu.Item>
            )}
            <Menu.Item name="logout" onClick={() => console.log("logout")} />
          </Menu.Menu>
        </Menu>
        <Grid>{children}</Grid>
      </Container>
    );
  return <SignInForm />;
};

export default Layout;
