import "bootstrap/dist/css/bootstrap.css";
import "../styles/custom.scss";
import { Provider } from "react-redux";
import store from "../states/store";
import Layout from "../components/layout";
import http from "../helpers/http";
import NextNProgress from "nextjs-progressbar";
import { parse } from "cookie";
import { doObjToFormData } from "../helpers/helpers";

export default function App({ Component, pageProps, siteSettings }) {
  // return <Component {...pageProps} />
  // console.log(siteSettings);
  const renderWithLayout =
    Component.getLayout ||
    function (page) {
      return (
        <>
          <NextNProgress color="#004AAD" />
          <Provider store={store}>
            <Layout siteSettings={siteSettings}>{page}</Layout>
          </Provider>
        </>
      );
    };

  return renderWithLayout(<Component {...pageProps} />);
}

App.getInitialProps = async ({ ctx }) => {
  const cookies = parse(ctx?.req?.headers?.cookie || "");
  const authToken = cookies?.authToken || "";
  const siteSettings = await http
    .post("site-settings", doObjToFormData({ token: authToken }))
    .then((response) => response?.data?.site_settings)
    .catch((error) => error?.response?.data?.message);
  return { siteSettings };
};
