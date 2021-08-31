import { useUser } from "../context/userContext";
import SignInForm from "./SignInForm";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, loadingUser } = useUser();
  if (loadingUser) return <div>App is loading</div>
  if (user.uid) return <div>{children}</div>;
  return <SignInForm/>;
};

export default Layout;
