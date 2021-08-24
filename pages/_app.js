import "tailwindcss/tailwind.css"
import Router from "next/router"
import ProgressBar from "@badrap/bar-of-progress"
import { Provider } from "react-redux"
import { store } from "../app/store"
import { Provider as AuthProvider } from "next-auth/client"
import "../styles/global.css";
import Head from "next/head";
const progress = new ProgressBar({
  size: 4,
  color: "#f35953",
  className: "z-50",
  delay: 100
})

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
    <Head>
      <link rel="shortcut icon" href="https://www.airbnb.co.in/favicon.ico" />
    </Head>
    <Provider store={store}>
      <AuthProvider session={pageProps.session}>
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
    </>
  )
}

export default MyApp
