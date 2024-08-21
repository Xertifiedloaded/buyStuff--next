import { GoogleFonts } from "@/lib/GoogleFont";
import { Head, Html, NextScript, Main } from "next/document";
export default function RootLayout() {
  return (
    <Html lang="en">
      <Head />
      <GoogleFonts/>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
