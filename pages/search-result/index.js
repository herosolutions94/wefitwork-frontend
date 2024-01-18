import React, { useState, useRef } from "react";
import Link from "next/link";
import Pagination from "../../components/pagination";
import DistanceSlider from "@/components/components/DistanceSlider";
import { isEmpty, cmsFileUrl, doObjToFormData, getObjKeyCount } from "@/components/helpers/helpers";
import http from "@/components/helpers/http";
import { encrypt_decrypt } from "@/components/helpers/rsa-helper";
import Image from "next/image";
import { useRouter } from "next/router";
import AddressAutocomplete from "@/components/components/map-autocomplete";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import PopupSmall from "@/components/components/popupSmall";
import SendMessage from "@/components/components/sendMessage";
import Text from "@/components/components/text";
import { authToken } from "@/components/helpers/authToken";
import toast, { Toaster } from "react-hot-toast";
import LoginPopup from "@/components/components/authPopup";
import MetaGenerator from "@/components/components/meta-generator";
import { startConversation } from "@/components/states/actions/chat";
import { useDispatch, useSelector } from "react-redux";
import { parse } from "cookie";

export const getServerSideProps = async (context) => {
  const query = context?.query;
  const service_id = query?.service_id;
  const sub_service_id = query?.sub_service_id;
  const latitude = query?.latitude;
  const longitude = query?.longitude;
  const radius = query?.radius;

  const cookies = parse(context?.req?.headers?.cookie || "");
  const memauthToken = cookies?.authToken || "";


  const result = await http
    .post(
      "search-profession",
      doObjToFormData({
        service_id: service_id,
        latitude: latitude,
        longitude: longitude,
        sub_service_id: sub_service_id,
        radius: radius,
        token: memauthToken,
      })
    )
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};

export default function SearchResult({ result }) {
  
  const router = useRouter();
  const route_query = router?.query;
  const service_id = route_query?.service_id;
  const sub_service_id = route_query?.sub_service_id;
  const latitude = route_query?.latitude;
  const longitude = route_query?.longitude;
  const loc_radius = route_query?.radius;


  let { professions, services, selected_service, selected_sub_service, page_title, meta_desc,memData } =
    result;

    // console.log(result)

    const token = authToken();

  const countProfessions = professions ? getObjKeyCount(professions) : 0;
  const service_tilte = selected_service ? selected_service?.title : '';

  const [viewMode, setViewMode] = useState("grid");
  const [openCat, setOpenCat] = useState(false);
  const ToggleCat = () => {
    setOpenCat(!openCat);
  };
  const toggleView = (mode) => {
    setViewMode(mode);
  };

  const [subServices, setSubServices] = useState(false);
  const [getingSubServices, setGetingSubServices] = useState(false);

  const handleGetSubService = (service_id, e) => {
    // e.preventDefault();
    setGetingSubServices(true);
    try {
      http
        .post("get-sub-services", doObjToFormData({ service_id: service_id }))
        .then((data) => {
          setGetingSubServices(false);
          if (data?.data?.status == true) {
            setSubServices(data?.data?.sub_services);
          } else {
            setSubServices(false);
          }
        });
    } catch (errors) {
      setGetingSubServices(false);
      console.log("Errors", errors);
    }
  };

  const [selectedPlace, setSelectedPlace] = useState({
    latitude: null,
    longitude: null,
  });
  const handlePlaceSelect = (place) => {
    setSelectedPlace(place);
  };

  useEffect(() => {
    console.log("selectedPlace", selectedPlace);
    setValue("latitude", selectedPlace?.latitude)
    setValue("longitude", selectedPlace?.longitude)

  }, [selectedPlace]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const handleSearch = (search_data) => {
    console.log("search_data", search_data);
    router.replace(`/search-result?${search_data?.service_id > 0 ? 'service_id='+search_data?.service_id+'&' : ''}${search_data?.sub_service_id > 0 ? 'sub_service_id='+search_data?.sub_service_id+'&' : ''}${search_data?.latitude !== null ? 'latitude='+search_data?.latitude+'&' : ''}${search_data?.longitude !== null ? 'longitude='+search_data?.longitude+'&' : ''}${search_data?.radius > 0 ? 'radius='+search_data?.radius : ''}`)
  }

  const [radius, setRadius] = useState(10);
  const handleRadiusCahnge = (newRadius) => {
    setRadius(newRadius);
  }

  useEffect(() => {
    setValue("radius", radius)
  }, [radius]);

  const [isPopupOpenSend, setIsPopupOpenSend] = useState(false);
  const [proData, setProData] = useState(false);
  const [authPopup, setAuthPopup] = useState(false);


    
    const handleOpenPopupSend = (pro_mem_data, mem_token = token) => {
      if(mem_token !== undefined && mem_token !== null && mem_token!== '' ){
        setProData(pro_mem_data);
        setIsPopupOpenSend(true);
      }else{
        toast.error("You sare not logedin. Please Login to your account to send SMS");
        setAuthPopup(true);
        setProData(pro_mem_data);
        
      }
        
    };
    const handleClosePopupSend = () => {
        setProData(false);
        setIsPopupOpenSend(false);   
        setAuthPopup(false);    
    };


    //pagination
  const itemsPerPage = 8; // Set the number of professions per page
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastProfession = currentPage * itemsPerPage;
  const indexOfFirstProfession = indexOfLastProfession - itemsPerPage;
  const currentProfessions = professions.slice(
    indexOfFirstProfession,
    indexOfLastProfession
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
    
  const dispatch = useDispatch();
    
  const isFormProcessing = useSelector((state) => state.chat.isFormProcessing);


  const handleStartChat = (receiver_id, mem_token = token) => {
    if(mem_token !== undefined && mem_token !== null && mem_token!== '' ){
      const form_data = {receiver_id : receiver_id};
      dispatch(startConversation(form_data));
    }else{
      toast.error("You are not logedin. Please Login to your account to start the chat with Professional");
      // setAuthPopup(true);
       
    }
  }

  return (
    <>
    <Toaster position="top-center" />
    <MetaGenerator page_title={page_title} meta_desc={meta_desc} />
      <main>
        <section className="search_result">
          <div className="contain">
            <div className="sec_heading">
              <h1>Search Result</h1>
            </div>
            <div className="flex flex_search_result">
              <div className="filter_mobile" onClick={ToggleCat}>
                <span>Filters</span>
              </div>
              <div className={openCat ? "colL active" : "colL"}>
                <form method="POST" onSubmit={handleSubmit(handleSearch)}>
                  <h5>Search</h5>
                  <div className="form_blk">
                    <div className="relative_field">
                      <select
                        name="service_id"
                        id="service_id"
                        className="input"
                        onChange={(e) => {
                          setValue("service_id", e.target.value);
                          handleGetSubService(e.target.value);
                        }}
                      >
                        <option value="">Choose Service</option>
                        {services?.map((ser, i) => {
                          return (
                            <option
                              value={ser?.id}
                              key={i}
                              selected={service_id === ser?.id ? true : false}
                            >
                              {ser?.title}
                            </option>
                          );
                        })}
                      </select>
                      <button type="button">
                        <img src="/images/PencilSimple.svg" alt="" />
                      </button>
                    </div>
                    <div className="validation-error" style={{ color: "red" }}>
                      {errors.service_id?.message}
                    </div>
                  </div>
                  <div className="form_blk">
                    <div className="relative_field">
                      <select
                        name="sub_service_id"
                        id="sub_service_id"
                        className="input"
                        {...register("sub_service_id")}
                      >
                        <option value="">Choose Sub Service</option>
                        {subServices &&
                          subServices?.map((sub, i) => {
                            return (
                              <option
                                value={sub?.id}
                                key={i}
                                selected={
                                  sub_service_id === sub?.id ? true : false
                                }
                              >
                                {sub?.title}
                              </option>
                            );
                          })}
                      </select>
                      <button type="button">
                        <img src="/images/PencilSimple.svg" alt="" />
                      </button>
                    </div>
                    
                  </div>
                  <div className="form_blk">
                    <div className="relative_field">
                      <AddressAutocomplete onPlaceSelect={handlePlaceSelect} />
                      {/* <input type="text" className="input" name="address" defaultValue={"1711 O Street Sanger,CA 93657 Suite 102"} /> */}
                      <button type="button">
                        <img src="/images/PencilSimple.svg" alt="" />
                      </button>

                      <input
                        type="hidden"
                        name="latitude"
                        value={selectedPlace.latitude}
                        {...register("latitude")}
                      />
                      <input
                        type="hidden"
                        name="longitude"
                        value={selectedPlace.longitude}
                        {...register("longitude")}
                      />
                    </div>
                    
                  </div>
                  <div className="mini_br"></div>
                  <h5>Distance</h5>
                  <DistanceSlider handleRadiusCahnge={handleRadiusCahnge} />
                  <input type="hidden" name="radius" value={radius} {...register("radius")}/>
                  <div className="mini_br"></div>
                  <div className="mini_br"></div>
                  <h5>Ratings</h5>
                  <div className="rating_blk_filter">
                    <div className="lbl_btn">
                      <input
                        type="checkbox"
                        name="rating"
                        defaultValue={"5"}
                        id="5_rating"
                      />
                      <label htmlFor="5_rating">
                        <img src="/images/5_star.svg" alt="5 stars" />
                        <span>5.0</span>
                      </label>
                    </div>
                    <div className="lbl_btn">
                      <input
                        type="checkbox"
                        name="rating"
                        defaultValue={"4"}
                        id="4_rating"
                      />
                      <label htmlFor="4_rating">
                        <img src="/images/4_star.svg" alt="4 stars" />
                        <span>4.0</span>
                      </label>
                    </div>
                    <div className="lbl_btn">
                      <input
                        type="checkbox"
                        name="rating"
                        defaultValue={"3"}
                        id="3_rating"
                      />
                      <label htmlFor="3_rating">
                        <img src="/images/3_star.svg" alt="3 stars" />
                        <span>3.0</span>
                      </label>
                    </div>
                    <div className="lbl_btn">
                      <input
                        type="checkbox"
                        name="rating"
                        defaultValue={"2"}
                        id="2_rating"
                      />
                      <label htmlFor="2_rating">
                        <img src="/images/2_star.svg" alt="2 stars" />
                        <span>2.0</span>
                      </label>
                    </div>
                  </div>
                  <div className="mini_br"></div>
                  <h5>Projects Completed</h5>
                  <div className="project_completed_filter">
                    <div className="lbl_btn">
                      <input
                        type="checkbox"
                        name="project_done"
                        defaultValue={"1-10"}
                        id="1_10"
                      />
                      <label htmlFor="1_10">1 - 10</label>
                    </div>
                    <div className="lbl_btn">
                      <input
                        type="checkbox"
                        name="project_done"
                        defaultValue={"10-30"}
                        id="10-30"
                      />
                      <label htmlFor="10-30">10 - 30</label>
                    </div>
                    <div className="lbl_btn">
                      <input
                        type="checkbox"
                        name="project_done"
                        defaultValue={"30-50"}
                        id="30-50"
                      />
                      <label htmlFor="30-50">30 - 50</label>
                    </div>
                    <div className="lbl_btn">
                      <input
                        type="checkbox"
                        name="project_done"
                        defaultValue={"50-100"}
                        id="50-100"
                      />
                      <label htmlFor="50-100">50 - 100+</label>
                    </div>
                  </div>
                  <div className="mini_br"></div>
                  <div className="mini_br"></div>
                  <h5>Specializations</h5>
                  <div className="specialization_filter">
                    <div className="lbl_btn">
                      <input
                        type="radio"
                        name="specialization"
                        defaultValue={"Residential"}
                        id="Residential"
                      />
                      <label htmlFor="Residential">Residential</label>
                    </div>
                    <div className="lbl_btn">
                      <input
                        type="radio"
                        name="specialization"
                        defaultValue={"Commercial"}
                        id="Commercial"
                      />
                      <label htmlFor="Commercial">Commercial</label>
                    </div>
                  </div>

                  <div className="br"></div>
                  <div className="btn_blk text-center">
                    <button type="submit" className="site_btn">
                      {" "}
                      Search{" "}
                    </button>
                  </div>
                </form>
              </div>
              <div className="colR">
                <div className="result_head">
                  <p>{countProfessions} {service_tilte !== '' && service_tilte} {countProfessions === 1 ? 'Professional' : 'Professionals' } found.</p>
                  
                  <div className="lst_grid">
                    <button
                      onClick={() => toggleView("list")}
                      className={viewMode === "list" ? "active" : ""}
                    >
                      <img src="/images/list.svg" alt="" />
                    </button>
                    <button
                      onClick={() => toggleView("grid")}
                      className={viewMode === "grid" ? "active" : ""}
                    >
                      <img src="/images/grid.svg" alt="" />
                    </button>
                  </div>
                </div>
                <div
                  className={
                    viewMode === "grid"
                      ? "flex flex_view view_grid"
                      : "flex flex_view"
                  }
                >
                  {professions ? (
                    currentProfessions?.map((val) => {
                      return (
                        <div className="col" key={val?.mem_id}>
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
                                <p><Text string={`${val?.service_title} (${val?.sub_services?.join(', ')})`} /></p>
                                {val?.distance && (
                                  <p>
                                    <strong>
                                      {parseInt(val?.distance) + " miles away"}
                                    </strong>
                                  </p>
                                )}

                                <div className="rating_lbl">
                                                    <img src="/images/star.svg" alt=""/>
                                                    <span>{val?.avg_rating} ({val?.reviews_counts} Reviews)</span>
                                                </div>
                              </div>
                            </div>
                            <div className="done_work">
                              <p>Projects Completed</p>
                              <h3>{val?.completed_projects > 0 ? val?.completed_projects : 0}</h3>
                            </div>
                            <div className="btn_blk">
                            {val?.mem_id == memData?.mem_id ? 
                            <>
                            <Link href={`/search-result/${encrypt_decrypt("encrypt",val?.mem_id)}`} className="site_btn white block">
                                    View Your Profile
                                  </Link>
                                  
                            </>
                              
                                  : 
                                  <>
                                  <button type="button" className="site_btn color block" onClick={() => handleStartChat(val?.mem_id)} disabled={isFormProcessing}>
                                Start Chat{isFormProcessing && (
                      <i
                        className={
                          isFormProcessing ? "spinner" : "spinnerHidden"
                        }
                      ></i>
                    )}
                              </button>
                              <button type="button" onClick={() => handleOpenPopupSend(val)} className="site_btn block">
                                Send SMS
                              </button>
                                  </>

                            }
                              
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center m-auto ">
                      <div className="alert alert-danger">No Record Found</div>
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
            </div>
          </div>
        </section>
      </main>

      {authPopup &&
        <PopupSmall isOpen={authPopup} onClose={handleClosePopupSend}>
          <LoginPopup handleOpenPopupSend={handleOpenPopupSend} proData={proData} setAuthPopup={setAuthPopup} />
        </PopupSmall>
      }

      <PopupSmall isOpen={isPopupOpenSend} onClose={handleClosePopupSend}>
      {proData && <SendMessage data={proData} handleClosePopupSend={handleClosePopupSend} />}
      </PopupSmall>
    </>
  );
}
