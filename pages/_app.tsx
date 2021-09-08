import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";
import UserProvider from "../context";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
export default MyApp;
