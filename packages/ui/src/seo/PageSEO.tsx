import Head from "next/head";
import * as React from "react";

interface pageSEOProps {
  title: string;
  url: string;
  imgUrl: string;
  description: string;
}

/**
 * A page SEO component
 * @param {string} title - The title of the page
 * @param {string} url - The url of the page
 * @param {string} imgUrl - The image url of the page
 * @param {string} description - The description of the page
 * @returns jsx
 * @example
 * <PageSeo
 *  title="Meally — Find your next meal"
 *  url="https://meally.com.au/"
 *  imgUrl="https://meally.com.au/og-image.png"
 *  description="Find recipes you love all free and open source, completely powered by the community "
 * />
 */

function PageSeo({ title, url, imgUrl, description }: pageSEOProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content="Meally — Cook, Collaborate & Create" />
      <meta
        name="description"
        content="Find recipes you love all free and open source, completely powered by the community "
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content="Meally — Find your next meal" />
      <meta
        property="og:description"
        content="Find recipes you love all free and open source, completely powered by the community "
      />
      <meta property="og:image" content={imgUrl} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content="Meally — Find your next meal" />
      <meta
        property="twitter:description"
        content="Find recipes you love all free and open source, completely powered by the community "
      />
      <meta property="twitter:image" content={imgUrl}></meta>

      <link rel="manifest" href="/manifest.json" />
      <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      <link rel="apple-touch-icon" href="favicon.png" />
    </Head>
  );
}

export { PageSeo };
