import { useRouter } from "next/router";
import store from "@/ReduxComponent/Redux";
import { AuthProvider } from "@/DashBoard/AuthContext";
import { Provider } from "react-redux";
import "../styles/global.css";
import { ApiProvider } from "@/DashBoard/FetchContext";
import { Fraunces, Manrope } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/component/Header";
import Footer from "@/component/Footer";
import Banner from "@/component/HeroSection";

const manrope = Manrope({
  weight: ["200", "300", "400", "600", "700", "800"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const { pathname } = router;

  // paths where Header, Footer, and Banner should not be displayed
  const hideHeaderFooterBanner = ["/auth/login", "/auth/create"];

  return (
    <>
      <div className={`${manrope.className}`}>
        <AuthProvider>
          <ApiProvider>
            <Provider store={store}>
              <ToastContainer />
              {!hideHeaderFooterBanner.includes(pathname) && (
                <>
                  <Header />
                  <Banner />
                </>
              )}
              <Component {...pageProps} />
              {!hideHeaderFooterBanner.includes(pathname) && <Footer />}
            </Provider>
          </ApiProvider>
        </AuthProvider>
      </div>
    </>
  );
}
