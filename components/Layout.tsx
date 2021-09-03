import React from "react";
import { useUser } from "../context";
import SignInForm from "./SignInForm";
import Link from "next/link";
import { Menu, Input } from "semantic-ui-react";

const Layout = ({
  children,
  path,
}: {
  children: React.ReactNode;
  path: string;
}) => {
  const { user, loadingUser } = useUser();
  if (loadingUser) return <div>App is loading</div>;
  if (user.uid)
    return (
      <div>
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
            <Menu.Item>
              <Input icon="search" placeholder="Search..." />
            </Menu.Item>
            <Menu.Item name="logout" onClick={() => console.log("logout")} />
          </Menu.Menu>
        </Menu>
        <div>{children}</div>
      </div>
    );
  return <SignInForm />;
};

export default Layout;
