import { GoogleFonts } from "@/lib/GoogleFont";
import { Head, Html, NextScript, Main } from "next/document";
import { Fraunces, Manrope } from 'next/font/google'


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
