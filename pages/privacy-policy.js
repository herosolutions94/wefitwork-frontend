import React from "react";
import Link from "next/link";

import Text from "../components/text";
import http from "../helpers/http";
import MetaGenerator from "../components/meta-generator";

export const getServerSideProps = async () => {
  const result = await http
    .get("privacy-policy")
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};

export default function PrivacyPolicy({ result }) {
  let { page_title, meta_desc, content, site_settings } = result;

  return (
    <>
      <MetaGenerator page_title={page_title} meta_desc={meta_desc} />
      <main>
        <section className="text_page">
          <div className="contain">
            <div className="sec_heading">
              <h1>
                <Text string={content?.banner_heading} />
              </h1>
            </div>
            <div className="ck_editor">
              <Text string={content?.detail} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
