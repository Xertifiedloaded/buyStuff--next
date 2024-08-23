import store from "@/ReduxComponent/Redux";
import { AuthProvider } from "@/DashBoard/AuthContext";
import { Provider } from "react-redux";
import "../styles/global.css";
import { ApiProvider } from "@/DashBoard/FetchContext";
import { Fraunces, Manrope } from 'next/font/google'

const fraunces = Fraunces({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin-ext'],
  display: 'optional',
})
const manrope = Manrope({
  weight: ['200', '300', '400', '600', '700', '800'],
  subsets: ['latin'],
})

export default function App({ Component, pageProps }) {
  return (
    <>
      <div className={`${manrope.className}`}>
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
