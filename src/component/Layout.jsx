// import React from "react"
// import { useRouter } from "next/router"
// import Header from "@/component/Header"
// import Banner from "@/component/HeroSection"
// import Footer from "@/component/Footer"

// export default function Layout({children}) {
//   const router = useRouter()
//   const { pathname } = router

//   const hideHeaderFooter = ["/auth/login", "/auth/create"]
//   const hideBanner = [
//     "/auth/login",
//     "/auth/create",
//     "/checkout",
//     "/cart",
//     "/dashboard",
//   ]

//   return (
//     <div>
//       {!hideHeaderFooter.includes(pathname) && <Header />}
//       {!hideBanner.includes(pathname) && <Banner />}
//       {children}
//       {!hideHeaderFooter.includes(pathname) && <Footer />}
//     </div>
//   )
// }


import React from "react";
import { useRouter } from "next/router";
import Header from "@/component/Header";
import Banner from "@/component/HeroSection";
import Footer from "@/component/Footer";



export default function Layout({ children, data, loading }) {
  const router = useRouter();
  const { pathname } = router;

  const hideHeaderFooter = ["/auth/login", "/auth/create"];
  const hideBanner = [
    "/auth/login",
    "/auth/create",
    "/checkout",
    "/cart",
    "/dashboard",
  ];


  return (
    <div>
      {!hideHeaderFooter.includes(pathname) && <Header />}
      {!hideBanner.includes(pathname) && <Banner />}
      {children}
      {!hideHeaderFooter.includes(pathname) && <Footer />}
    </div>
  );
}
