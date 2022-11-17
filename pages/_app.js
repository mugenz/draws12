import "../css/style.css";
import "../css/form.css";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Head>
        <title>Draws App</title>
      </Head>

      <div className="top-bar">
        <div className="nav">
          <Link href="/">Home</Link>
          <Link href="/new">Add Game</Link>
        </div>

        <Image
          id="title"
          src="/draw.jpeg"
          alt="draws logo"
          width="120"
          height="80"
        ></Image>
      </div>
      <div className="grid wrapper">
        <Component {...pageProps} />
      </div>
    </ChakraProvider>
  );
}

export default MyApp;
