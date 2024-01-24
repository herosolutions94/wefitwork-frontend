import React, { useState } from "react";
import Link from "next/link";
import { map } from "jquery";
import Pagination from "@/components/components/pagination";
import http from "@/components/helpers/http";
import Text from "@/components/components/text";
import MetaGenerator from "@/components/components/meta-generator";
import { Toaster } from "react-hot-toast";
import { blogDate, cmsFileUrl, formatDate, doObjToFormData, isEmpty } from "@/components/helpers/helpers";

export const getServerSideProps = async () => {
  const result = await http
    .get("blogs")
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};

export default function Blog({ result }) {
  // console.log(result);
  let { page_title, meta_desc, content, cats, blogs, top_posts } = result;

  const [cat, setCat] = useState(false);
  const ToggleCat = () => {
    setCat(!cat);
  };

  const [allBlogs, setAllBlogs] =  useState(blogs)

  const [fetchingBlogs, setFetchingBlogs ] =  useState(false);

  const handelFetchBlogsByCat = (cat_id) => {
    
    setFetchingBlogs(true);
    try {
        http
          .post("blogsByCat", doObjToFormData({ cat_id: cat_id }))
          .then((data) => {
            if (data?.data?.status == true) {
              setFetchingBlogs(false);
              setAllBlogs(data?.data?.blogs);
            } else {
              setFetchingBlogs(false);
              setAllBlogs(false);
            }
          });
        
      } catch (errors) {
        setFetchingBlogs(false);
        console.log("Errors", errors);
      }
  }




  //pagination
  const itemsPerPage = 2; // Set the number of blogs per page
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastBlog = currentPage * itemsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - itemsPerPage;
  const currentBlogs = allBlogs?.slice(indexOfFirstBlog, indexOfLastBlog);


  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  

  return (
    <>
      <MetaGenerator page_title={page_title} meta_desc={meta_desc} />
      <main>
        <section className="blog_pg">
          <div className="contain">
            <div className="flex">
              <div className="colL">
                <div className="inner">
                  <h4 onClick={ToggleCat}>
                    <Text string={content?.cat_heading} />
                  </h4>
                  <ul className={cat ? "cat_ul active" : "cat_ul"}>
                  <li>
                    <Link href="#" onClick={() => window.location.reload()} >All BLogs</Link>
                </li>
                    {cats?.map((val) => {
                      return (
                        <li key={val?.id}>
                          <Link href="#" onClick={() => handelFetchBlogsByCat(val?.id)}>{val?.title}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="br"></div>
                <div className="inner">
                  <h4>
                    <Text string={content?.top_heading} />
                  </h4>
                  <ul className="top_ul">
                    {top_posts?.map((val) => {
                      return (
                        <li key={val?.id}>
                          <Link href={`/blog/${val?.slug}`} className="image">
                            <img
                              src={cmsFileUrl(val?.image, "blogs")}
                              alt={val?.title}
                            />
                          </Link>
                          <div className="cntnt">
                            <h5>
                              <Link href={`/blog/${val?.slug}`}>
                                <Text string={val?.title} />
                              </Link>
                            </h5>
                            <div className="other">
                              {/* <span>{val?.category_id}</span> */}
                              <span>{blogDate(val?.created_date)}</span>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="colR">
              {!fetchingBlogs ? 
              <>
              {!isEmpty(currentBlogs) ? 
              
              currentBlogs?.map((val) => {
                  return (
                    <div className="col" key={val?.id}>
                      <Link href={`/blog/${val?.slug}`} className="post_image">
                        <img
                          src={cmsFileUrl(val?.image, "blogs")}
                          alt={val?.title}
                        />
                      </Link>
                      <div className="post_cntnt">
                        <div className="other">
                          <span>{val?.category_id}</span>
                          <span>{blogDate(val?.created_date)}</span>
                        </div>
                        <h3>
                          <Link href={`/blog/${val?.slug}`}>
                            <Text string={val?.title} />
                          </Link>
                        </h3>
                        <p>
                          <Text string={val?.short_description} />
                        </p>
                        <Link href={`/blog/${val?.slug}`} className="read_more">
                          <Text string={content?.btn_txt} />
                        </Link>
                      </div>
                    </div>
                  );
                }) : 
                    <div className="alert alert-danger">No Blogs Found</div>
                }
              </>
              : 
              <div className="text-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    &nbsp;<span>Loading....</span>
                  </div>

              } 
                

                <div className="pagination_outer">
                {!isEmpty(currentBlogs) && allBlogs.length > itemsPerPage ?
                    <Pagination
                    currentPage={currentPage}
  totalPages={Math.ceil(allBlogs.length / itemsPerPage)}
  onPageChange={handlePageChange}
                  />
                  : 
                  ''
                }
                  
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
