import store from "@/ReduxComponent/Redux";
import { AuthProvider } from "@/DashBoard/AuthContext";
import { Provider } from "react-redux";
import "../styles/global.css";
import { ApiProvider } from "@/DashBoard/FetchContext";

export default function App({ Component, pageProps }) {
  return (
    <>
      <div>
        <AuthProvider>
          <ApiProvider>
            <Provider store={store}>
              <Component {...pageProps} />
            </Provider>
          </ApiProvider>
        </AuthProvider>
      </div>
    </>
  );
}
