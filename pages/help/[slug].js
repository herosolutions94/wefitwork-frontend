import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import http from "@/components/helpers/http";
import MetaGenerator from "@/components/components/meta-generator";
import Text from "@/components/components/text";

export const getServerSideProps = async (context) => {
  const { slug } = context.query;

  const result = await http
    .get(`help-detail/${slug}`)
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};

export default function HelpDetails({ result }) {
  const [openCat, setOpenCat] = useState(false);
  const ToggleCat = () => {
    setOpenCat(!openCat);
  };
  const router = useRouter();
  const path = router.asPath;
  const p_name = path.split("/");
  const pageName = p_name[p_name.length - 1];
  // console.log(pageName);

  let { page_title, meta_desc, content, helps, help, help_topics } = result;

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
            <div className="help_grid_devide">
              <div className="colL">
                <h4 onClick={ToggleCat}>Categories</h4>
                <ul
                  className={openCat ? "side_cat_lst active" : "side_cat_lst"}
                >
                  {helps.map((val) => {
                    return (
                      <li
                        key={val?.id}
                        className={pageName == val?.slug ? "active" : ""}
                      >
                        <Link href={`/help/${val?.slug}`}>{val?.title}</Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="colR">
                <div className="sec_heading">
                  <h3>
                    <Text string={help?.title} />
                  </h3>
                  <div className="mini_br"></div>
                </div>
                <div className="question_blk">
                  {help_topics.map((val, i) => {
                    return (
                      <>
                        <h5>
                          <Text string={val?.topic?.title} />
                        </h5>
                        <ul>
                          {val?.articles.map((article, a) => {
                            return (
                              <li key={a}>
                                <Link href="">
                                  <Text string={article?.article_name} />
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                        <div className="mini_br"></div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
