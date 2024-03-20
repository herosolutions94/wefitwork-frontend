import React from "react";
import Link from "next/link";
import Text from "@/components/components/text";
import http from "@/components/helpers/http";
import MetaGenerator from "@/components/components/meta-generator";
import { useRouter } from "next/router";

export const getServerSideProps = async (context) => {
    const { slug } = context.query;
  
    const result = await http
      .get(`article-detail/${slug}`)
      .then((response) => response.data)
      .catch((error) => error.response.data.message);
  
    return { props: { result } };
  };

export default function Article({ result }) {
    const router = useRouter();

  let { page_title, meta_desc, article, site_settings } = result;
  console.log(result);

  return (
    <>
      <MetaGenerator page_title={page_title} meta_desc={meta_desc} />
      <main>
        <section className="text_page">
          <div className="contain">
            <div className="sec_heading">
              <h4>
                <Text string={article?.article_name} />
              </h4>
            </div>
            <div className="ck_editor">
              <Text string={article?.detail} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
