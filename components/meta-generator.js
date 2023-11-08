import React from "react";
import Head from "next/head";
import { cmsFileUrl } from "../helpers/helpers";

export default function MetaGenerator({ page_title, meta_desc }) {
  const url = typeof window !== "undefined" ? window.location.href : "";
  return (
    <>
      {page_title && meta_desc && (
        <Head>
          <title>{page_title}</title>
          <meta name="title" content={meta_desc.meta_title} />
          <meta name="description" content={meta_desc.meta_description} />
          <meta name="keywords" content={meta_desc.meta_keywords} />

          <meta property="og:type" content={meta_desc.og_type} />
          <meta property="og:url" content={url} />
          <meta property="og:title" content={meta_desc.og_title} />
          <meta property="og:description" content={meta_desc.og_description} />
          <meta property="og:image" content={cmsFileUrl(meta_desc.og_image)} />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={url} />
          <meta property="twitter:title" content={meta_desc.og_title} />
          <meta
            property="twitter:description"
            content={meta_desc.og_description}
          />
          <meta
            property="twitter:image"
            content={cmsFileUrl(meta_desc.twitter_image)}
          />
        </Head>
      )}
    </>
  );
}
