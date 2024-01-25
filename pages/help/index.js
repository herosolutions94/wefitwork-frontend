import React from "react";
import Link from "next/link";
import http from "@/components/helpers/http";
import MetaGenerator from "@/components/components/meta-generator";
import Text from "@/components/components/text";
import Image from "next/image";
import { cmsFileUrl } from "@/components/helpers/helpers";

export const getServerSideProps = async () => {
  const result = await http
    .get("help")
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};

export default function Help({ result }) {
  let { page_title, meta_desc, content, helps } = result;

  return (
    <>
      <MetaGenerator page_title={page_title} meta_desc={meta_desc} />

      <main>
        <section className="help_pg">
          <div className="contain">
            <div className="cntnt">
              <h1>
                <Text string={content?.sec1_heading} />
              </h1>
              <form>
                <input
                  type="text"
                  className="input"
                  name=""
                  placeholder={"Search.."}
                />
                <button type="submit">
                  <img src="/images/search.svg" alt="" />
                </button>
              </form>
            </div>
            <div className="flex help_flex">
              {helps.map((val) => {
                return (
                  <div className="col" key={val?.id}>
                    <div className="inner">
                      <Link href={`/help/${val?.slug}`}></Link>
                      <div className="img_icon">
                        <Image
                          src={cmsFileUrl(val?.icon, "help")}
                          width={50}
                          height={50}
                          alt={val?.title}
                        />
                      </div>
                      <h5>{val?.title}</h5>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
