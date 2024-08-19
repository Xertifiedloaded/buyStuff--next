import store from "@/ReduxComponent/Redux";
import { AuthProvider } from "@/DashBoard/AuthContext";
import { Provider } from "react-redux";
import "../styles/global.css";
import Header from "../component/Header";
import Footer from "@/component/Footer";

export default function App({ Component, pageProps }) {
  return (
    <>
      <div>
        <AuthProvider>
          <Provider store={store}>
            {/* <Header /> */}
            <div>
              <Component {...pageProps} />
            </div>
            {/* <Footer /> */}
          </Provider>
        </AuthProvider>
      </div>
    </>
  );
}
