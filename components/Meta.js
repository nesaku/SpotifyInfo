import React from "react";
import Head from "next/head";

const Meta = () => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>SpotifyInfo</title>
      <meta
        name="description"
        content="SpotifyInfo - Get Info On A Spotify Track"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#121212" />
      <meta name="msapplication-TileColor" content="#121212" />
      <meta name="theme-color" content="#ffffff"></meta>
      <meta property="og:title" content="SpotifyInfo" />
      <meta
        property="og:description"
        content="SpotifyInfo - Get Info On A Spotify Track"
      />
      <meta property="og:site_name" content="SpotifyInfo" />
      <meta
        property="og:image"
        content={`${process.env.NEXT_PUBLIC_HOST_URL}/social.png`}
      />
    </Head>
  );
};

export default Meta;
