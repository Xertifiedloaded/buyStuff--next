import Landing from "@/component/Landing";
import Head from "next/head";

import React from "react";



export default function Home() {
  return (
    <>
      <Head>
        <title>BuyStuff</title>
        <meta name="description" content="The Future Workforce" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </Head>
      <main >
        <Landing />
      </main>
    </>
  );
}