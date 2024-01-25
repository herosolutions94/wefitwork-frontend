import React, { useState } from "react";
import Link from "next/link";
import Pagination from "../components/pagination";
import http from "../helpers/http";
import {
  cmsFileUrl,
  doObjToFormData,
  getObjKeyCount,
} from "../helpers/helpers";
import { Toaster } from "react-hot-toast";
import MetaGenerator from "../components/meta-generator";
import Image from "next/image";
import { encrypt_decrypt } from "../helpers/rsa-helper";

export const getServerSideProps = async () => {
  const result = await http
    .post("search-profession-page-for-review", doObjToFormData({}))
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};

export default function Search({ result }) {
  let { professions, page_title, meta_desc } = result;

  const [isSearching, setIsSearching] = useState(false);
  const [stopSearch, setStopSearch] = useState(false);
  const [searchResult, setSearchResult] = useState({
    professions: professions,
  });

  const handleSearchByName = (e) => {
    e.preventDefault();
    const inputValue = e.target.value;
    // console.log(inputValue);
    setIsSearching(true);
    try {
      http
        .post("search-profession", doObjToFormData({ search_name: inputValue }))
        .then((data) => {
          // console.log(data);
          if (data?.data?.status == true) {
            setSearchResult({ professions: data.data.professions });
            setIsSearching(false);
          } else {
            setIsSearching(false);
            setStopSearch(true);
            document.getElementById("search-list").style.display = "none";

            setTimeout(() => {
              document.getElementById("search-list").style.display = "none";
            }, 2000);
          }
        });
    } catch (errors) {
      console.log("Errors", errors);
    }
  };

  //pagination
  const itemsPerPage = 8; // Set the number of professions per page
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastProfession = currentPage * itemsPerPage;
  const indexOfFirstProfession = indexOfLastProfession - itemsPerPage;
  const currentProfessions = searchResult?.professions.slice(
    indexOfFirstProfession,
    indexOfLastProfession
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Toaster position="top-center" />
      <MetaGenerator page_title={page_title} meta_desc={meta_desc} />

      <main>
        <section className="banner_search_review">
          <div className="contain">
            <div className="cntnt">
              <h1>Search Professional</h1>
              <form>
                <input
                  type="text"
                  className="input"
                  name="search_name"
                  placeholder={"Entre Professional Name"}
                  onChange={handleSearchByName}
                />
                <button type="button">
                  <img src="/images/search.svg" alt="" />
                </button>
              </form>
            </div>
            <div className="flex flex_view">
              {!isSearching ? (
                currentProfessions?.map((val, i) => {
                  return (
                    <div className="col" key={i}>
                      <div className="inner">
                        <div className="head_professional">
                          <div className="image">
                            {val?.mem_image ? (
                              <Image
                                src={cmsFileUrl(val?.mem_image, "members")}
                                width={100}
                                height={100}
                                alt={val?.mem_fname}
                              />
                            ) : (
                              <img
                                src="/images/no-user.svg"
                                alt={val?.mem_fname}
                              />
                            )}
                          </div>
                          <div className="cntnt">
                            <h4>
                              <Link
                                href={`/search-result/${encrypt_decrypt(
                                  "encrypt",
                                  val?.mem_id
                                )}`}
                              >
                                {val?.mem_fname}
                              </Link>
                            </h4>
                            <p>{`${val?.service_title} (${val?.sub_services})`}</p>
                            <div className="rating_lbl">
                              <img src="/images/star.svg" alt="" />
                              <span>
                                {val?.avg_rating} ({val?.reviews_counts}
                                Reviews)
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="done_work">
                          <p>Projects Completed</p>
                          <h3>
                            {val?.completed_projects > 0
                              ? val?.completed_projects
                              : 0}
                          </h3>
                        </div>
                        <div className="btn_blk">
                          <Link
                            href={`/buyer-dashboard/leave-review/${encrypt_decrypt(
                              "encrypt",
                              val?.mem_id
                            )}`}
                            className="site_btn color block"
                          >
                            Leave Review
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center">
                  <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
            </div>
            <div className="text-center pagination_outer">
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(professions.length / itemsPerPage)}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
