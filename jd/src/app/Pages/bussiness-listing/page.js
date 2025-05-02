// "use client";
// import { useEffect, useState } from "react";
// import "./businessListing.css";
// import gourav from "../../Images/gourav.jpg";
// import gourav2 from "../../Images/gourav2.jpg";
// import gourav3 from "../../Images/gourav3.jpg";
// import Image from "next/image";
// import Link from "next/link";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import PaidListing from "../paid-listing/page";
// import banner1 from "../../Images/slide1.webp";
// import banner2 from "../../Images/slide2.webp";
// import banner3 from "../../Images/slide3.webp";
// import axios from "axios";
// import { useSearchParams } from "next/navigation";
// const Page = () => {
//   const searchParams = useSearchParams();
//   const searchQuery = searchParams.get("query") || "";
//     const searchPincode = searchParams.get("pincode") || "";

//   console.log("Fetched Listings:-", query, pincode);

//   const [visibleCount, setVisibleCount] = useState(4);
//   const [businesses, setBusinesses] = useState([]);


//   const handleToggleView = () => {
//     if (visibleCount >= businesses.length) {
//       setVisibleCount(4); // Reset to 4
//     } else {
//       setVisibleCount(visibleCount + 4); // Show next 4
//     }
//   };

//   const fetchBusinessesListing = async () => {
//     try {
//       let response;
//       if (searchPincode && searchQuery) {
//         response = await axios.get(`http://localhost:5000/api/search-listings`, {
//           params: { pincode, query }
//         });

//         console.log("Fetched Listings:- search-listings API Response:-", response.data.data);

//         setBusinesses(response.data?.data || []);
//       } else {
//         response = await axios.get("http://localhost:5000/api/get-all-listings");
//         setBusinesses(response.data.data || []);
//       }
//       console.log("Fetched Listings:", response.data.data);
//     } catch (error) {
//       console.error("Failed to fetch listings:", error);
//     }
//   };

//   useEffect(() => {
//     fetchBusinessesListing();
//   }, [pincode, query]);

//   const visibleBusinesses = businesses?.slice(0, visibleCount);
//   const bannerImages = [banner1, banner2, banner3];
//   console.log('visibleBusinesses:---', visibleBusinesses)
//   return (
//     <>
//       <section className="business-listing-page">
//         <div className="container">
//           <div className="listing-banner">
//             <Swiper
//               modules={[Autoplay]}
//               autoplay={{ delay: 3000, disableOnInteraction: false }}
//               loop={true}
//               slidesPerView={1}
//             >
//               {bannerImages.map((img, index) => (
//                 <SwiperSlide key={index}>
//                   <Image
//                     src={img}
//                     alt={`Banner ${index}`}
//                     className="business-listing-image"
//                   />
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         </div>
//         <div className="container">
//           <div className="business-listing-container">
//             <h5 className="text-dark mb-1">Business Category Name</h5>
//             <div className="row">
//               <div className="col-md-6">
//                 <div className="col-5-scroll-css">
//                   {visibleBusinesses.map((biz) => {
//                     const isOpen = true; // Isko actual logic ke sath replace karein
//                     return (
//                       <div key={biz._id}>
//                         <Link
//                           className="text-decoration-none"
//                           href={`/Pages/bussiness-listing/${biz._id}`}
//                         >
//                           <div className="business-card">
//                             <div>
//                               <img
//                                 src={biz?.businessCategory?.businessImages[0]}
//                                 alt={biz?.name}
//                                 className="listing-image"
//                               />
//                             </div>
//                             <div>
//                               <div className="d-flex gap-3 mb-2 align-items-center">
//                                 <h5>{biz?.businessDetails?.businessName?.slice(0, 15)}...</h5>
//                                 <span className="verified-text">
//                                   <i className="bi bi-check-all"></i> Biziffy
//                                   Verified
//                                 </span>
//                               </div>

//                               <div className="d-flex gap-2 align-items-center">
//                                 <p>
//                                   {biz?.rating}{" "}
//                                   <i className="bi bi-star-fill"></i>{" "}
//                                   <i className="bi bi-star-fill"></i>{" "}
//                                   <i className="bi bi-star-fill"></i>{" "}
//                                   <i className="bi bi-star-fill"></i>{" "}
//                                   <i className="bi bi-star-fill"></i>{" "}
//                                   {biz?.reviews}
//                                 </p>
//                                 <span>|</span>
//                                 <p>{biz?.businessCategory?.category.name}</p>
//                               </div>
//                               <div className="d-flex gap-2 align-items-center">
//                                 <p>7 years in business</p>
//                                 <span>|</span>
//                                 <p>{biz.businessDetails.city + " , " + biz.businessDetails.state}</p>
//                               </div>
//                               <div className="d-flex gap-2 align-items-center">
//                                 <div className="opening-hours-container">
//                                   <p
//                                     className={`status ${isOpen ? "open" : "closed"
//                                       }`}
//                                   >
//                                     {isOpen ? "Open Now" : "Closed Now"}
//                                   </p>
//                                 </div>
//                                 <span>|</span>
//                                 <p>Mobile : {biz?.contactPerson?.contactNumber}</p>
//                               </div>
//                             </div>
//                           </div>
//                         </Link>
//                       </div>
//                     );
//                   })}
//                   {businesses.length > 4 && (
//                     <div className="text-center mt-3">
//                       <div className="listing-banner">
//                         <Swiper
//                           modules={[Autoplay]}
//                           autoplay={{
//                             delay: 3000,
//                             disableOnInteraction: false,
//                           }}
//                           loop={true}
//                           slidesPerView={1}
//                         >
//                           {bannerImages.map((img, index) => (
//                             <SwiperSlide key={index}>
//                               <Image
//                                 src={img}
//                                 alt={`Banner ${index}`}
//                                 className="business-listing-image"
//                               />
//                             </SwiperSlide>
//                           ))}
//                         </Swiper>
//                       </div>
//                       <button
//                         className="business-listing-black-btn"
//                         onClick={handleToggleView}
//                       >
//                         {visibleCount >= businesses.length
//                           ? "View Less"
//                           : "View More"}
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="col-md-6">
//                 <div>
//                   <PaidListing />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* <div className="container">
//           <div className="row">
//             <h5>
//               <b>Shakubhabi Bamboo Hut in Yamunanagar Ho, Yamunanagar</b>
//             </h5>
//             <p className="biziffy-listing-text">
//               Shakubhabi Bamboo Hut in Yamunanagar Ho, Yamunanagar is known to
//               satisfactorily cater to the demands of its customer base. The
//               business came into existence in 2000 and has, since then, been a
//               known name in its field. It stands located at H. No 25, Near Bus
//               Stand, Tagore Garden, Yamunanagar HO - 135001. Near Bus Stand is a
//               prominent landmark in the area and this establishment is in close
//               proximity to the same. It has earned stamps like Jd Verified, Jd
//               Pay substantiating the credentials of the business. The business
//               strives to make for a positive experience through its offerings.
//               The accepted modes of payment such as Cash, Credit Card make every
//               business transaction easy and seamless, contributing to making the
//               entire process even more effective.
//             </p>
//             <p className="biziffy-listing-text">
//               Customer centricity is at the core of Shakubhabi Bamboo Hut in
//               Yamunanagar Ho, Yamunanagar and it is this belief that has led the
//               business to build long-term relationships. Ensuring a positive
//               customer experience, making available goods and/or services that
//               are of top-notch quality is given prime importance.
//             </p>
//             <p className="biziffy-listing-text">
//               India’s leading B2B market place, Jd Mart ensures engaging in
//               business activities is a seamless process for small and medium
//               enterprises as well as large businesses. In a wake to enable these
//               businesses to reach their audience, this portal lets them showcase
//               their offerings in terms of the products and/or services through a
//               digital catalogue.
//             </p>
//             <p className="biziffy-listing-text">
//               Kindly scroll up for the address and contact details of Shakubhabi
//               Bamboo Hut in Yamunanagar
//             </p>
//           </div>
//         </div> */}
//       </section>
//     </>
//   );
// };

// export default Page;


"use client";
import { useEffect, useState } from "react";
import "./businessListing.css";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import PaidListing from "../paid-listing/page";

import banner1 from "../../Images/slide1.webp";
import banner2 from "../../Images/slide2.webp";
import banner3 from "../../Images/slide3.webp";

const Page = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const pincode = searchParams.get("pincode") || "";

  const [visibleCount, setVisibleCount] = useState(4);
  const [businesses, setBusinesses] = useState([]);

  const bannerImages = [banner1, banner2, banner3];

  const handleToggleView = () => {
    if (visibleCount >= businesses.length) {
      setVisibleCount(4); // Reset
    } else {
      setVisibleCount((prev) => prev + 4);
    }
  };

  const fetchBusinessesListing = async () => {
    try {
      let response;
      if (pincode || query) {
        response = await axios.get("http://localhost:5000/api/search-listings", {
          params: { pincode, query },
        });
      } else {
        response = await axios.get("http://localhost:5000/api/get-all-listings");
      }
      setBusinesses(response.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch listings:", error);
    }
  };

  useEffect(() => {
    fetchBusinessesListing();
  }, [pincode, query]);

  const visibleBusinesses = businesses.slice(0, visibleCount);

  return (
    <section className="business-listing-page">
      {/* Banner Section */}
      <div className="container">
        <div className="listing-banner">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            slidesPerView={1}
          >
            {bannerImages.map((img, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={img}
                  alt={`Banner ${index + 1}`}
                  className="business-listing-image"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Business Listings */}
      <div className="container">
        <div className="business-listing-container">
          <h5 className="text-dark mb-1">Business Category Name</h5>
          <div className="row">
            {/* Business Cards */}
            <div className="col-md-6">
              <div className="col-5-scroll-css">
                {visibleBusinesses.map((biz) => {
                  const isOpen = true; // Replace with actual timing logic if needed

                  return (
                    <div key={biz._id}>
                      <Link
                        className="text-decoration-none"
                        href={`/Pages/bussiness-listing/${biz._id}`}
                      >
                        <div className="business-card">
                          <div>
                            <img
                              src={biz?.businessCategory?.businessImages?.[0]}
                              alt={biz?.name || "Business"}
                              className="listing-image"
                            />
                          </div>
                          <div>
                            <div className="d-flex gap-3 mb-2 align-items-center">
                              <h5>
                                {biz?.businessDetails?.businessName?.slice(0, 15)}...
                              </h5>
                              <span className="verified-text">
                                <i className="bi bi-check-all"></i> Biziffy Verified
                              </span>
                            </div>

                            <div className="d-flex gap-2 align-items-center">
                              <p>
                                {biz?.rating} <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i> ({biz?.reviews})
                              </p>
                              <span>|</span>
                              <p>{biz?.businessCategory?.category?.name}</p>
                            </div>

                            <div className="d-flex gap-2 align-items-center">
                              <p>7 years in business</p>
                              <span>|</span>
                              <p>
                                {biz.businessDetails?.city}, {biz.businessDetails?.state}
                              </p>
                            </div>

                            <div className="d-flex gap-2 align-items-center">
                              <div className="opening-hours-container">
                                <p className={`status ${isOpen ? "open" : "closed"}`}>
                                  {isOpen ? "Open Now" : "Closed Now"}
                                </p>
                              </div>
                              <span>|</span>
                              <p>Mobile: {biz?.contactPerson?.contactNumber}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}

                {/* View More Button */}
                {businesses.length > 4 && (
                  <div className="text-center mt-3">
                    <button
                      className="business-listing-black-btn"
                      onClick={handleToggleView}
                    >
                      {visibleCount >= businesses.length ? "View Less" : "View More"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Paid Listing Section */}
            <div className="col-md-6">
              <PaidListing visibleBusinesses={visibleBusinesses} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
