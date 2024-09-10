import { useRouter } from "next/router"
import store from "@/ReduxComponent/Redux"
import { AuthProvider } from "@/DashBoard/AuthContext"
import { Provider } from "react-redux"
import "../styles/global.css"
import { ApiProvider } from "@/DashBoard/FetchContext"
import { Fraunces, Manrope } from "next/font/google"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Header from "@/component/Header"
import Footer from "@/component/Footer"
import Banner from "@/component/HeroSection"
import { CartProvider } from "@/context/CartContext"
import Layout from "@/component/Layout"

const manrope = Manrope({
  weight: ["200", "300", "400", "600", "700", "800"],
  subsets: ["latin"],
})

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const { pathname } = router

  const hideHeaderFooter = [
    "/auth/login",
    "/auth/create",
    "/auth/login",
    "/auth/create",
  ]
  const hideBanner = [
    "/auth/login",
    "/auth/create",
    "/checkout",
    "/cart",
    "/dashboard",
  ]

  return (
    <>
      <div className={`${manrope.className}`}>
        <CartProvider>
          <AuthProvider>
            <ApiProvider>
              <Provider store={store}>
                <ToastContainer />
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </Provider>
            </ApiProvider>
          </AuthProvider>
        </CartProvider>
      </div>
    </>
  )
}
